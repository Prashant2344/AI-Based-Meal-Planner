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
    
    const systemPrompt = `You are a professional nutritionist and meal planning expert specializing in healthy Nepalese cuisine. Create detailed, practical meal plans that are:

CRITICAL REQUIREMENTS:
- MUST provide accurate calorie counts that match the daily target (within 50 calories)
- Focus on HEALTHY traditional Nepalese dishes with proper nutritional balance
- Prioritize whole grains, lean proteins, and fresh vegetables
- Use authentic Nepalese ingredients available in Nepal
- Include specific portion sizes in local measurements (cups, pieces, tablespoons)
- Ensure proper macronutrient distribution (protein 20-25%, carbs 45-50%, fats 25-30%)
- Emphasize nutrient-dense foods over calorie-dense options
- Use healthy cooking methods (steaming, boiling, pressure cooking, minimal oil)
- Make meals realistic for daily preparation by Nepalese families
- Avoid fried foods, excessive oil, and processed ingredients

HEALTHY NEPALESE FOODS TO FOCUS ON:
- Whole grains: brown rice, quinoa, millet, buckwheat
- Lean proteins: dal (lentils), beans, lean meat, fish, eggs
- Fresh vegetables: leafy greens, cruciferous vegetables, root vegetables
- Healthy fats: nuts, seeds, ghee (in moderation), coconut oil
- Traditional healthy dishes: dal bhat, vegetable curries, steamed vegetables, soups

NUTRITIONAL ACCURACY:
- Each meal must have precise calorie counts
- Macronutrient breakdown must be realistic and accurate
- Daily totals must match or be very close to the target calories
- Use traditional portion sizes that are commonly consumed in Nepal
- Ensure adequate fiber, vitamins, and minerals

Always respond with valid JSON format only.`;

    const userPrompt = `Create a 7-day HEALTHY NEPALESE meal plan for a ${age}-year-old ${gender} who is ${activityLevel}.

USER DETAILS:
- Weight: ${weight} kg
- Height: ${height} cm
- Target daily calories: ${dailyCalories} (MUST be accurate within 50 calories)
- Dietary preferences: ${dietaryPreferences.join(', ') || 'Healthy traditional Nepalese cuisine'}
- Allergies: ${allergies.join(', ') || 'None'}

HEALTHY MEAL PLAN REQUIREMENTS:
1. Focus on NUTRITIOUS traditional Nepalese dishes: dal bhat, vegetable curries, steamed vegetables, soups, whole grain porridge
2. Use healthy ingredients: brown rice, quinoa, lentils (masoor, moong, chana), fresh vegetables (saag, gobi, aloo), lean proteins
3. Emphasize whole grains, lean proteins, and fresh vegetables
4. Ensure calorie accuracy - daily total must be ${dailyCalories} ± 50 calories
5. Use realistic portion sizes commonly consumed in Nepal
6. AVOID fried foods, excessive oil, processed foods, and unhealthy snacks

DAILY STRUCTURE:
- Breakfast: Healthy traditional items (whole grain porridge, boiled eggs, fresh fruits, herbal tea)
- Lunch: Main meal (dal bhat with steamed vegetables, brown rice, lean protein)
- Snack: Fresh fruits, nuts, or healthy traditional snacks
- Dinner: Light healthy meal (vegetable soup, steamed vegetables, lean protein)

HEALTHY NEPALESE FOODS TO INCLUDE:
- Whole grains: brown rice, quinoa, millet, buckwheat
- Lean proteins: dal (lentils), beans, lean meat, fish, eggs
- Fresh vegetables: saag, gobi, aloo, carrots, beans
- Healthy fats: nuts, seeds, ghee (in moderation)
- Traditional healthy dishes: dal bhat, vegetable curries, steamed vegetables, soups

EACH MEAL MUST INCLUDE:
- Healthy Nepalese dish name
- Nutritious ingredients available in Nepal
- Portion sizes in local measurements
- Accurate calorie count
- Macronutrient breakdown (protein, carbs, fats in grams)
- Healthy cooking instructions (steaming, boiling, minimal oil)

RESPONSE FORMAT (JSON only):
{
  "dailyTargets": {
    "calories": ${dailyCalories},
    "protein": "calculated based on weight",
    "carbs": "calculated based on calories", 
    "fats": "calculated based on calories"
  },
  "mealPlan": {
    "day1": {
      "breakfast": {"name": "Healthy dish", "ingredients": "list", "portions": "specific", "calories": number, "protein": number, "carbs": number, "fats": number, "instructions": "healthy cooking method"},
      "lunch": {...},
      "snack": {...},
      "dinner": {...},
      "dailyTotal": {"calories": number, "protein": number, "carbs": number, "fats": number}
    }
  }
}

IMPORTANT: Focus on healthy, nutritious Nepalese cuisine. Avoid fried foods, excessive oil, and processed ingredients.`;

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
      // Fallback: create a healthy Nepalese meal plan structure
      const targetCalories = dailyCalories || 2000;
      const proteinTarget = Math.round(weight * 1.2); // 1.2g per kg body weight
      const carbTarget = Math.round(targetCalories * 0.5 / 4); // 50% of calories from carbs
      const fatTarget = Math.round(targetCalories * 0.25 / 9); // 25% of calories from fats
      
      mealPlan = {
        dailyTargets: {
          calories: targetCalories,
          protein: `${proteinTarget}g`,
          carbs: `${carbTarget}g`,
          fats: `${fatTarget}g`
        },
        mealPlan: {
          day1: {
            breakfast: {
              name: "Quinoa Porridge with Nuts and Fruits",
              ingredients: "1/2 cup quinoa, 1 cup milk, 1 banana, 10 almonds, 1 tsp honey",
              portions: "1/2 cup, 1 cup, 1 medium, 10 pieces, 1 tsp",
              calories: Math.round(targetCalories * 0.25),
              protein: Math.round(proteinTarget * 0.2),
              carbs: Math.round(carbTarget * 0.25),
              fats: Math.round(fatTarget * 0.2),
              instructions: "Cook quinoa in milk, add chopped banana and almonds, sweeten with honey"
            },
            lunch: {
              name: "Dal Bhat with Steamed Vegetables",
              ingredients: "1 cup brown rice, 1 cup masoor dal, mixed steamed vegetables (saag, gobi, carrots), 1 tsp ghee",
              portions: "1 cup, 1 cup, 1 cup, 1 tsp",
              calories: Math.round(targetCalories * 0.4),
              protein: Math.round(proteinTarget * 0.4),
              carbs: Math.round(carbTarget * 0.4),
              fats: Math.round(fatTarget * 0.4),
              instructions: "Cook brown rice, prepare dal with turmeric and cumin, steam vegetables, serve with ghee"
            },
            snack: {
              name: "Fresh Fruits with Nuts",
              ingredients: "1 apple, 1 orange, 10 walnuts, 1 cup herbal tea",
              portions: "1 medium, 1 medium, 10 pieces, 1 cup",
              calories: Math.round(targetCalories * 0.15),
              protein: Math.round(proteinTarget * 0.15),
              carbs: Math.round(carbTarget * 0.15),
              fats: Math.round(fatTarget * 0.15),
              instructions: "Cut fruits into pieces, serve with walnuts and herbal tea"
            },
            dinner: {
              name: "Vegetable Soup with Boiled Egg",
              ingredients: "Mixed vegetable soup (carrots, beans, spinach), 1 boiled egg, 1 slice whole grain bread",
              portions: "1 cup, 1 piece, 1 slice",
              calories: Math.round(targetCalories * 0.2),
              protein: Math.round(proteinTarget * 0.25),
              carbs: Math.round(carbTarget * 0.2),
              fats: Math.round(fatTarget * 0.25),
              instructions: "Prepare vegetable soup with ginger and garlic, boil egg, serve with whole grain bread"
            },
            dailyTotal: {
              calories: targetCalories,
              protein: proteinTarget,
              carbs: carbTarget,
              fats: fatTarget
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
