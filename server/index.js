const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// BMI calculation endpoint
app.post('/api/calculate-bmi', (req, res) => {
  try {
    const { weight, height, unit } = req.body;
    
    let bmi;
    let heightInMeters;
    
    if (unit === 'metric') {
      // Weight in kg, height in cm
      heightInMeters = height / 100;
      bmi = weight / (heightInMeters * heightInMeters);
    } else {
      // Weight in lbs, height in inches
      bmi = (weight * 703) / (height * height);
      heightInMeters = height * 0.0254;
    }
    
    // Determine BMI category
    let category;
    if (bmi < 18.5) {
      category = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
      category = 'Normal weight';
    } else if (bmi >= 25 && bmi < 30) {
      category = 'Overweight';
    } else {
      category = 'Obese';
    }
    
    // Calculate target weight range for normal BMI
    const lowerWeight = 18.5 * (heightInMeters * heightInMeters);
    const upperWeight = 24.9 * (heightInMeters * heightInMeters);
    
    res.json({
      bmi: Math.round(bmi * 10) / 10,
      category,
      targetWeightRange: {
        lower: Math.round(lowerWeight * 10) / 10,
        upper: Math.round(upperWeight * 10) / 10
      },
      heightInMeters: Math.round(heightInMeters * 100) / 100
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Calculate daily calorie needs
app.post('/api/calculate-calories', (req, res) => {
  try {
    const { weight, height, age, gender, activityLevel } = req.body;
    
    // Convert height to meters
    const heightInMeters = height / 100;
    
    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    
    // Activity multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      'lightly active': 1.375,
      'moderately active': 1.55,
      'very active': 1.725
    };
    
    const tdee = bmr * activityMultipliers[activityLevel];
    
    // For weight loss (0.5kg per week = 500 cal deficit)
    const weightLossCalories = Math.round(tdee - 500);
    
    res.json({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      weightLossCalories,
      activityLevel
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Generate meal plan using AI
app.post('/api/generate-meal-plan', async (req, res) => {
  try {
    const { 
      dailyCalories, 
      weight, 
      height, 
      age, 
      gender, 
      activityLevel,
      dietaryPreferences = [],
      allergies = []
    } = req.body;
    
    const systemPrompt = `You are a professional nutritionist and meal planning expert specializing in Nepalese cuisine and locally available ingredients in Nepal. Create detailed, practical meal plans that are:
- Based on traditional Nepalese dishes and cooking methods
- Use ingredients commonly available in Nepal (rice, lentils, vegetables, spices, etc.)
- Include popular Nepalese foods like dal bhat, momo, sel roti, gundruk, etc.
- Nutritionally balanced with proper macronutrient distribution
- Realistic and easy to follow for Nepalese families
- Include specific portion sizes and traditional cooking methods
- Consider seasonal availability of ingredients in Nepal
- Provide accurate calorie and macro information

Always respond with valid JSON format.`;

    const userPrompt = `Create a 7-day Nepalese meal plan for a ${age}-year-old ${gender} who is ${activityLevel}.

User Details:
- Weight: ${weight} kg
- Height: ${height} cm
- Target daily calories: ${dailyCalories}
- Dietary preferences: ${dietaryPreferences.join(', ') || 'Traditional Nepalese cuisine'}
- Allergies: ${allergies.join(', ') || 'None'}

Please provide a detailed 7-day meal plan focusing on:
1. Traditional Nepalese dishes (dal bhat, momo, sel roti, gundruk, etc.)
2. Locally available ingredients in Nepal (rice, lentils, vegetables, spices, etc.)
3. Seasonal and affordable ingredients
4. Traditional cooking methods (pressure cooking, steaming, etc.)

For each day, include:
- Breakfast: Traditional Nepalese breakfast items
- Lunch: Main meal with dal bhat or similar
- Snack: Local fruits, nuts, or traditional snacks
- Dinner: Light dinner with traditional dishes

Each meal should specify:
- Traditional Nepalese dish names
- Ingredients commonly found in Nepal
- Portion sizes in local measurements (cups, pieces, etc.)
- Traditional cooking methods
- Calorie count per meal
- Macronutrient breakdown (protein, carbs, fats in grams)
- Daily totals for calories and macros

Format the response as JSON with this structure:
{
  "dailyTargets": {
    "calories": ${dailyCalories},
    "protein": "130-150g",
    "carbs": "180-200g", 
    "fats": "60-70g"
  },
  "mealPlan": {
    "day1": {
      "breakfast": {...},
      "lunch": {...},
      "snack": {...},
      "dinner": {...},
      "dailyTotal": {...}
    },
    ... (for all 7 days)
  }
}

Each meal should have: name, ingredients, portions, calories, protein, carbs, fats, instructions.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
    });

    const result = { text: response.choices[0].message.content };

    // Parse the AI response
    let mealPlan;
    try {
      // Extract JSON from the response
      const jsonMatch = result.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        mealPlan = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No valid JSON found in response');
      }
    } catch (parseError) {
      // Fallback: create a basic Nepalese meal plan structure
      mealPlan = {
        dailyTargets: {
          calories: dailyCalories,
          protein: "130-150g",
          carbs: "180-200g",
          fats: "60-70g"
        },
        mealPlan: {
          day1: {
            breakfast: {
              name: "Sel Roti with Tea",
              ingredients: "2 sel roti, 1 cup milk tea, 1 banana",
              portions: "2 pieces, 1 cup, 1 medium",
              calories: 400,
              protein: 15,
              carbs: 65,
              fats: 8,
              instructions: "Prepare sel roti traditionally, make milk tea, serve with banana"
            },
            lunch: {
              name: "Dal Bhat with Tarkari",
              ingredients: "1 cup rice, 1 cup dal, mixed vegetables, pickle",
              portions: "1 cup, 1 cup, 1 cup, 2 tbsp",
              calories: 550,
              protein: 25,
              carbs: 85,
              fats: 12,
              instructions: "Cook rice, prepare dal with spices, steam vegetables, serve with pickle"
            },
            snack: {
              name: "Chiura with Yogurt",
              ingredients: "1 cup chiura, 1/2 cup yogurt, 1 tsp sugar",
              portions: "1 cup, 1/2 cup, 1 tsp",
              calories: 200,
              protein: 8,
              carbs: 35,
              fats: 3,
              instructions: "Mix chiura with yogurt and sugar, serve chilled"
            },
            dinner: {
              name: "Momo with Soup",
              ingredients: "8 pieces momo, vegetable soup, chutney",
              portions: "8 pieces, 1 cup, 2 tbsp",
              calories: 600,
              protein: 30,
              carbs: 70,
              fats: 15,
              instructions: "Steam momo, prepare soup, serve with chutney"
            },
            dailyTotal: {
              calories: 1750,
              protein: 78,
              carbs: 255,
              fats: 38
            }
          }
        }
      };
    }

    res.json(mealPlan);
  } catch (error) {
    console.error('Error generating meal plan:', error);
    res.status(500).json({ error: 'Failed to generate meal plan' });
  }
});

// Generate printable meal chart
app.post('/api/generate-meal-chart', async (req, res) => {
  try {
    const { mealPlan, userInfo } = req.body;
    
    const chartData = {
      userInfo,
      mealPlan,
      generatedAt: new Date().toISOString()
    };
    
    res.json(chartData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate meal chart' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Meal Planner API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
