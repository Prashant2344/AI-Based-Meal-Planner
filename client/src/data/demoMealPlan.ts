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
        name: "Sel Roti with Tea",
        ingredients: "2 sel roti, 1 cup milk tea, 1 banana, 1 tsp sugar",
        portions: "2 pieces, 1 cup, 1 medium, 1 tsp",
        calories: 400,
        protein: 15,
        carbs: 65,
        fats: 8,
        instructions: "Prepare sel roti traditionally, make milk tea with sugar, serve with banana"
      },
      lunch: {
        name: "Dal Bhat with Tarkari",
        ingredients: "1 cup rice, 1 cup dal, mixed vegetables, pickle, 1 tsp ghee",
        portions: "1 cup, 1 cup, 1 cup, 2 tbsp, 1 tsp",
        calories: 550,
        protein: 25,
        carbs: 85,
        fats: 12,
        instructions: "Cook rice, prepare dal with spices, steam vegetables, serve with pickle and ghee"
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
        ingredients: "8 pieces momo, vegetable soup, chutney, 1 tsp oil",
        portions: "8 pieces, 1 cup, 2 tbsp, 1 tsp",
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
    },
    day2: {
      breakfast: {
        name: "Chiya with Roti",
        ingredients: "1 cup chiya, 2 pieces roti, 1 boiled egg, 1 tsp sugar",
        portions: "1 cup, 2 pieces, 1 egg, 1 tsp",
        calories: 420,
        protein: 18,
        carbs: 50,
        fats: 12,
        instructions: "Make chiya with milk and sugar, serve with roti and boiled egg"
      },
      lunch: {
        name: "Thukpa with Vegetables",
        ingredients: "1 cup thukpa noodles, mixed vegetables, 1 egg, 1 tsp oil",
        portions: "1 cup, 1 cup, 1 egg, 1 tsp",
        calories: 480,
        protein: 22,
        carbs: 65,
        fats: 10,
        instructions: "Cook thukpa noodles with vegetables, add beaten egg, season with spices"
      },
      snack: {
        name: "Gundruk with Chiura",
        ingredients: "1/2 cup gundruk, 1/2 cup chiura, 1 tsp oil",
        portions: "1/2 cup, 1/2 cup, 1 tsp",
        calories: 180,
        protein: 8,
        carbs: 25,
        fats: 6,
        instructions: "Mix gundruk with chiura, add oil and spices, serve"
      },
      dinner: {
        name: "Kwati with Rice",
        ingredients: "1 cup mixed beans, 1 cup rice, vegetables, 1 tsp ghee",
        portions: "1 cup, 1 cup, 1 cup, 1 tsp",
        calories: 580,
        protein: 28,
        carbs: 85,
        fats: 12,
        instructions: "Cook mixed beans with vegetables, serve with rice and ghee"
      },
      dailyTotal: {
        calories: 1660,
        protein: 76,
        carbs: 225,
        fats: 40
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
