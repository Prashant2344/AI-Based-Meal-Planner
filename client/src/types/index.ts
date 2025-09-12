export interface UserInfo {
  weight: number;
  height: number;
  age: number;
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'lightly active' | 'moderately active' | 'very active';
  unit: 'metric' | 'imperial';
}

export interface BMICalculation {
  bmi: number;
  category: string;
  targetWeightRange: {
    lower: number;
    upper: number;
  };
  heightInMeters: number;
}

export interface CalorieCalculation {
  bmr: number;
  tdee: number;
  weightLossCalories: number;
  activityLevel: string;
}

export interface Meal {
  name: string;
  ingredients: string;
  portions: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  instructions: string;
}

export interface DayMealPlan {
  breakfast: Meal;
  lunch: Meal;
  snack: Meal;
  dinner: Meal;
  dailyTotal: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
}

export interface MealPlan {
  dailyTargets: {
    calories: number;
    protein: string;
    carbs: string;
    fats: string;
  };
  mealPlan: {
    [key: string]: DayMealPlan;
  };
}

export interface AppState {
  currentStep: 'bmi' | 'calories' | 'meal-plan' | 'tracking';
  userInfo: UserInfo | null;
  bmiResult: BMICalculation | null;
  calorieResult: CalorieCalculation | null;
  mealPlan: MealPlan | null;
  loading: boolean;
  error: string | null;
}
