# 🚀 Quick Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- OpenAI API key (optional - app works with demo data)

## Quick Start

1. **Install dependencies:**
   ```bash
   npm run install-all
   ```

2. **Configure environment (optional):**
   ```bash
   cp env.example .env
   # Edit .env and add your OpenAI API key
   ```

3. **Start the application:**
   ```bash
   npm run dev
   # OR
   ./start.sh
   ```

4. **Open your browser:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Features

✅ **BMI Calculator** - Calculate your Body Mass Index
✅ **Calorie Calculator** - Determine daily calorie needs
✅ **AI Meal Planning** - Generate personalized 7-day meal plans
✅ **Nutrition Tracking** - Track macronutrients and meal completion
✅ **PDF Export** - Download printable meal plans
✅ **Responsive Design** - Works on all devices
✅ **Demo Mode** - Works without OpenAI API key

## Demo Mode

If you don't have an OpenAI API key, the app will automatically use demo data for the meal plan generation. You'll see a warning message but can still use all features.

## Troubleshooting

- **Port conflicts**: Change PORT in .env file
- **API errors**: Check OpenAI API key in .env
- **Dependencies**: Run `npm run install-all` again
- **Build issues**: Clear node_modules and reinstall

## Next Steps

1. Add your OpenAI API key for AI-powered meal plans
2. Customize the meal plan based on your preferences
3. Track your progress and mark completed meals
4. Export your meal plan as PDF for offline use

Enjoy your personalized meal planning experience! 🍽️
