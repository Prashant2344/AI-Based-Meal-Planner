import { MealPlan } from '../types';

export const demoMealPlan: MealPlan = {
  dailyTargets: {
    calories: 2000,
    protein: "130-150g",
    carbs: "180-200g",
    fats: "60-70g"
  },
  mealPlan: {
    day1: {
      breakfast: {
        name: "Scrambled Eggs with Toast",
        ingredients: "2 eggs, 2 slices whole grain bread, 1 banana, 1 tsp butter",
        portions: "2 eggs, 2 slices, 1 medium, 1 tsp",
        calories: 400,
        protein: 25,
        carbs: 40,
        fats: 12,
        instructions: "Scramble eggs in non-stick pan with butter, toast bread, serve with banana"
      },
      lunch: {
        name: "Grilled Chicken with Rice",
        ingredients: "120g chicken breast, 1 cup brown rice, mixed vegetables, 1 tsp olive oil",
        portions: "120g, 1 cup, 1 cup, 1 tsp",
        calories: 550,
        protein: 35,
        carbs: 60,
        fats: 15,
        instructions: "Season and grill chicken, cook rice, steam vegetables with olive oil"
      },
      snack: {
        name: "Apple with Almonds",
        ingredients: "1 medium apple, 10 almonds",
        portions: "1 medium, 10 pieces",
        calories: 200,
        protein: 5,
        carbs: 20,
        fats: 10,
        instructions: "Wash apple, serve with almonds"
      },
      dinner: {
        name: "Grilled Fish with Sweet Potato",
        ingredients: "150g fish fillet, 1 medium sweet potato, spinach, 1 tsp olive oil",
        portions: "150g, 1 medium, 1 cup, 1 tsp",
        calories: 600,
        protein: 35,
        carbs: 45,
        fats: 15,
        instructions: "Season and grill fish, bake sweet potato, sauté spinach with olive oil"
      },
      dailyTotal: {
        calories: 1750,
        protein: 100,
        carbs: 165,
        fats: 52
      }
    },
    day2: {
      breakfast: {
        name: "Oatmeal with Peanut Butter",
        ingredients: "1 cup oats, 1 cup low-fat milk, 1 tbsp peanut butter, 1 orange",
        portions: "1 cup, 1 cup, 1 tbsp, 1 medium",
        calories: 420,
        protein: 20,
        carbs: 45,
        fats: 15,
        instructions: "Cook oats with milk, stir in peanut butter, serve with orange"
      },
      lunch: {
        name: "Turkey Wrap",
        ingredients: "Whole grain wrap, 100g turkey slices, lettuce, tomato, 1 tsp mayo",
        portions: "1 wrap, 100g, 1 cup, 1 medium, 1 tsp",
        calories: 480,
        protein: 30,
        carbs: 50,
        fats: 12,
        instructions: "Layer ingredients in wrap, roll tightly, cut in half"
      },
      snack: {
        name: "Greek Yogurt with Berries",
        ingredients: "1 cup Greek yogurt, 1/2 cup mixed berries",
        portions: "1 cup, 1/2 cup",
        calories: 180,
        protein: 15,
        carbs: 20,
        fats: 5,
        instructions: "Mix yogurt with berries, serve chilled"
      },
      dinner: {
        name: "Stir-fried Prawns with Quinoa",
        ingredients: "150g prawns, 1 cup quinoa, mixed vegetables, 1 tsp sesame oil",
        portions: "150g, 1 cup, 1 cup, 1 tsp",
        calories: 580,
        protein: 40,
        carbs: 50,
        fats: 18,
        instructions: "Stir-fry prawns and vegetables, cook quinoa separately, combine"
      },
      dailyTotal: {
        calories: 1660,
        protein: 105,
        carbs: 165,
        fats: 50
      }
    },
    day3: {
      breakfast: {
        name: "Scrambled Eggs with Fruit",
        ingredients: "2 eggs, 1 slice whole grain bread, 1 cup mixed fruit",
        portions: "2 eggs, 1 slice, 1 cup",
        calories: 380,
        protein: 25,
        carbs: 40,
        fats: 10,
        instructions: "Scramble eggs, toast bread, serve with fresh fruit"
      },
      lunch: {
        name: "Baked Salmon with Rice",
        ingredients: "120g salmon fillet, 1 cup brown rice, green beans, lemon",
        portions: "120g, 1 cup, 1 cup, 1/2 lemon",
        calories: 520,
        protein: 30,
        carbs: 60,
        fats: 15,
        instructions: "Season and bake salmon, cook rice, steam green beans with lemon"
      },
      snack: {
        name: "Protein Shake with Banana",
        ingredients: "1 scoop protein powder, 1 cup milk, 1 banana",
        portions: "1 scoop, 1 cup, 1 medium",
        calories: 220,
        protein: 25,
        carbs: 30,
        fats: 2,
        instructions: "Blend all ingredients until smooth"
      },
      dinner: {
        name: "Grilled Chicken with Sweet Potato",
        ingredients: "150g chicken breast, 1 medium sweet potato, mixed greens",
        portions: "150g, 1 medium, 2 cups",
        calories: 590,
        protein: 35,
        carbs: 45,
        fats: 15,
        instructions: "Grill chicken, bake sweet potato, prepare salad"
      },
      dailyTotal: {
        calories: 1710,
        protein: 115,
        carbs: 175,
        fats: 42
      }
    },
    day4: {
      breakfast: {
        name: "Smoothie Bowl",
        ingredients: "Banana, spinach, low-fat milk, oats, 1 boiled egg",
        portions: "1 medium, 1 cup, 1 cup, 1/4 cup, 1 egg",
        calories: 450,
        protein: 25,
        carbs: 45,
        fats: 10,
        instructions: "Blend smoothie ingredients, top with oats, serve with egg"
      },
      lunch: {
        name: "Chickpea Curry with Rice",
        ingredients: "1 cup chickpeas, 1 cup basmati rice, curry spices, vegetables",
        portions: "1 cup, 1 cup, 1 tsp, 1 cup",
        calories: 520,
        protein: 25,
        carbs: 65,
        fats: 10,
        instructions: "Cook chickpeas with spices, prepare rice, serve together"
      },
      snack: {
        name: "Apple with Peanut Butter",
        ingredients: "1 medium apple, 1 tbsp peanut butter",
        portions: "1 medium, 1 tbsp",
        calories: 190,
        protein: 5,
        carbs: 25,
        fats: 9,
        instructions: "Slice apple, serve with peanut butter"
      },
      dinner: {
        name: "Grilled Paneer with Roasted Vegetables",
        ingredients: "150g paneer, mixed vegetables, 1 tsp olive oil, herbs",
        portions: "150g, 1 cup, 1 tsp, 1 tsp",
        calories: 580,
        protein: 30,
        carbs: 40,
        fats: 15,
        instructions: "Marinate paneer, grill, roast vegetables with herbs and oil"
      },
      dailyTotal: {
        calories: 1740,
        protein: 85,
        carbs: 175,
        fats: 44
      }
    },
    day5: {
      breakfast: {
        name: "Yogurt with Berries and Chia",
        ingredients: "1 cup low-fat yogurt, mixed berries, chia seeds, 1 slice toast",
        portions: "1 cup, 1/2 cup, 1 tbsp, 1 slice",
        calories: 420,
        protein: 20,
        carbs: 40,
        fats: 10,
        instructions: "Mix yogurt with berries and chia, serve with toast"
      },
      lunch: {
        name: "Tuna Salad with Crackers",
        ingredients: "120g tuna, cucumber, tomato, olive oil, 2 crackers",
        portions: "120g, 1/2 cup, 1 medium, 1 tsp, 2 pieces",
        calories: 480,
        protein: 30,
        carbs: 40,
        fats: 12,
        instructions: "Mix tuna with vegetables and oil, serve with crackers"
      },
      snack: {
        name: "Mixed Nuts",
        ingredients: "Handful of mixed nuts",
        portions: "1 oz",
        calories: 180,
        protein: 5,
        carbs: 10,
        fats: 12,
        instructions: "Eat as is"
      },
      dinner: {
        name: "Grilled Chicken with Mashed Potatoes",
        ingredients: "150g chicken breast, 1 cup mashed potatoes, broccoli",
        portions: "150g, 1 cup, 1 cup",
        calories: 590,
        protein: 35,
        carbs: 45,
        fats: 15,
        instructions: "Grill chicken, prepare mashed potatoes, steam broccoli"
      },
      dailyTotal: {
        calories: 1670,
        protein: 90,
        carbs: 135,
        fats: 49
      }
    },
    day6: {
      breakfast: {
        name: "Boiled Eggs with Oatmeal",
        ingredients: "2 boiled eggs, 1 cup oatmeal, 1 orange",
        portions: "2 eggs, 1 cup, 1 medium",
        calories: 400,
        protein: 25,
        carbs: 40,
        fats: 12,
        instructions: "Boil eggs, cook oatmeal, serve with orange"
      },
      lunch: {
        name: "Turkey Sandwich",
        ingredients: "Whole grain bread, 100g turkey, lettuce, tomato, 1 tsp mayo",
        portions: "2 slices, 100g, 1 cup, 1 medium, 1 tsp",
        calories: 450,
        protein: 30,
        carbs: 50,
        fats: 12,
        instructions: "Layer ingredients in sandwich, serve"
      },
      snack: {
        name: "Protein Bar or Almonds",
        ingredients: "1 protein bar or 10 almonds",
        portions: "1 bar or 10 pieces",
        calories: 200,
        protein: 10,
        carbs: 15,
        fats: 8,
        instructions: "Eat as is"
      },
      dinner: {
        name: "Baked Fish with Quinoa",
        ingredients: "150g fish fillet, 1 cup quinoa, spinach",
        portions: "150g, 1 cup, 1 cup",
        calories: 580,
        protein: 35,
        carbs: 50,
        fats: 15,
        instructions: "Season and bake fish, cook quinoa, sauté spinach"
      },
      dailyTotal: {
        calories: 1630,
        protein: 100,
        carbs: 155,
        fats: 47
      }
    },
    day7: {
      breakfast: {
        name: "Smoothie Bowl with Egg",
        ingredients: "Banana, yogurt, berries, oats, 1 boiled egg",
        portions: "1 medium, 1 cup, 1/2 cup, 1/4 cup, 1 egg",
        calories: 450,
        protein: 25,
        carbs: 40,
        fats: 10,
        instructions: "Blend smoothie ingredients, top with oats, serve with egg"
      },
      lunch: {
        name: "Grilled Chicken Salad",
        ingredients: "150g chicken breast, mixed greens, tomato, cucumber, olive oil",
        portions: "150g, 2 cups, 1 medium, 1/2 cup, 1 tsp",
        calories: 480,
        protein: 30,
        carbs: 40,
        fats: 10,
        instructions: "Grill chicken, prepare salad with vegetables and oil"
      },
      snack: {
        name: "Apple with Peanut Butter",
        ingredients: "1 medium apple, 1 tbsp peanut butter",
        portions: "1 medium, 1 tbsp",
        calories: 190,
        protein: 5,
        carbs: 25,
        fats: 9,
        instructions: "Slice apple, serve with peanut butter"
      },
      dinner: {
        name: "Stir-fried Tofu with Brown Rice",
        ingredients: "150g tofu, 1 cup brown rice, mixed vegetables, 1 tsp sesame oil",
        portions: "150g, 1 cup, 1 cup, 1 tsp",
        calories: 580,
        protein: 30,
        carbs: 50,
        fats: 15,
        instructions: "Stir-fry tofu and vegetables, cook rice separately, combine"
      },
      dailyTotal: {
        calories: 1700,
        protein: 90,
        carbs: 155,
        fats: 44
      }
    }
  }
};
