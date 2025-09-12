import axios from 'axios';
import { UserInfo, BMICalculation, CalorieCalculation, MealPlan } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  // Calculate BMI
  calculateBMI: async (weight: number, height: number, unit: 'metric' | 'imperial'): Promise<BMICalculation> => {
    const response = await api.post('/calculate-bmi', { weight, height, unit });
    return response.data;
  },

  // Calculate daily calorie needs
  calculateCalories: async (userInfo: UserInfo): Promise<CalorieCalculation> => {
    const response = await api.post('/calculate-calories', userInfo);
    return response.data;
  },

  // Generate meal plan
  generateMealPlan: async (
    userInfo: UserInfo,
    dailyCalories: number,
    dietaryPreferences: string[] = [],
    allergies: string[] = []
  ): Promise<MealPlan> => {
    const response = await api.post('/generate-meal-plan', {
      ...userInfo,
      dailyCalories,
      dietaryPreferences,
      allergies,
    });
    return response.data;
  },

  // Generate printable meal chart
  generateMealChart: async (mealPlan: MealPlan, userInfo: UserInfo) => {
    const response = await api.post('/generate-meal-chart', { mealPlan, userInfo });
    return response.data;
  },

  // Health check
  healthCheck: async () => {
    const response = await api.get('/health');
    return response.data;
  },
};
