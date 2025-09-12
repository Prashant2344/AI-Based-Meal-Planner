import React, { useState } from 'react';
import { Calendar, Utensils, Download, Printer, CheckCircle } from 'lucide-react';
import { MealPlan as MealPlanType, UserInfo } from '../types';

interface MealPlanProps {
  mealPlan: MealPlanType;
  userInfo: UserInfo;
  onGenerateChart: () => void;
  onPrint: () => void;
}

const MealPlan: React.FC<MealPlanProps> = ({ mealPlan, userInfo, onGenerateChart, onPrint }) => {
  const [selectedDay, setSelectedDay] = useState('day1');
  const [completedMeals, setCompletedMeals] = useState<Set<string>>(new Set());

  const days = [
    { key: 'day1', name: 'Sunday', short: 'Sun' },
    { key: 'day2', name: 'Monday', short: 'Mon' },
    { key: 'day3', name: 'Tuesday', short: 'Tue' },
    { key: 'day4', name: 'Wednesday', short: 'Wed' },
    { key: 'day5', name: 'Thursday', short: 'Thu' },
    { key: 'day6', name: 'Friday', short: 'Fri' },
    { key: 'day7', name: 'Saturday', short: 'Sat' },
  ];

  const toggleMealCompletion = (mealKey: string) => {
    const newCompleted = new Set(completedMeals);
    if (newCompleted.has(mealKey)) {
      newCompleted.delete(mealKey);
    } else {
      newCompleted.add(mealKey);
    }
    setCompletedMeals(newCompleted);
  };

  const getMealIcon = (mealType: string) => {
    switch (mealType) {
      case 'breakfast':
        return '🌅';
      case 'lunch':
        return '☀️';
      case 'snack':
        return '🍎';
      case 'dinner':
        return '🌙';
      default:
        return '🍽️';
    }
  };

  const getMealColor = (mealType: string) => {
    switch (mealType) {
      case 'breakfast':
        return 'bg-yellow-50 border-yellow-200';
      case 'lunch':
        return 'bg-orange-50 border-orange-200';
      case 'snack':
        return 'bg-green-50 border-green-200';
      case 'dinner':
        return 'bg-purple-50 border-purple-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const currentDayPlan = mealPlan.mealPlan[selectedDay];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="glass rounded-2xl p-8 card-hover">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
            <Calendar className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your 7-Day Meal Plan</h1>
          <p className="text-gray-600 mb-4">
            Personalized nutrition plan for {userInfo.gender}, {userInfo.age} years old, {userInfo.activityLevel}
          </p>
          
          {/* Daily Targets */}
          <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Daily Targets</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary-600">{mealPlan.dailyTargets.calories}</div>
                <div className="text-sm text-gray-600">Calories</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{mealPlan.dailyTargets.protein}</div>
                <div className="text-sm text-gray-600">Protein</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{mealPlan.dailyTargets.carbs}</div>
                <div className="text-sm text-gray-600">Carbs</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{mealPlan.dailyTargets.fats}</div>
                <div className="text-sm text-gray-600">Fats</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <button
              onClick={onGenerateChart}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Chart
            </button>
            <button
              onClick={onPrint}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print Plan
            </button>
          </div>
        </div>

        {/* Day Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {days.map((day) => (
            <button
              key={day.key}
              onClick={() => setSelectedDay(day.key)}
              className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
                selectedDay === day.key
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-primary-50'
              }`}
            >
              {day.short}
            </button>
          ))}
        </div>

        {/* Selected Day Plan */}
        {currentDayPlan && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {days.find(d => d.key === selectedDay)?.name} Meal Plan
              </h2>
            </div>

            {/* Meals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(currentDayPlan).map(([mealType, meal]) => {
                if (mealType === 'dailyTotal') return null;
                
                const mealKey = `${selectedDay}-${mealType}`;
                const isCompleted = completedMeals.has(mealKey);
                
                return (
                  <div
                    key={mealType}
                    className={`rounded-xl p-6 border-2 transition duration-200 ${
                      isCompleted 
                        ? 'bg-green-50 border-green-300 opacity-75' 
                        : getMealColor(mealType)
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <span className="text-2xl mr-2">{getMealIcon(mealType)}</span>
                        <h3 className="text-lg font-semibold text-gray-900 capitalize">
                          {mealType}
                        </h3>
                      </div>
                      <button
                        onClick={() => toggleMealCompletion(mealKey)}
                        className={`p-2 rounded-full transition duration-200 ${
                          isCompleted 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{meal.name}</h4>
                        <p className="text-sm text-gray-600">{meal.ingredients}</p>
                      </div>

                      <div className="text-sm text-gray-600">
                        <p><strong>Portions:</strong> {meal.portions}</p>
                        <p><strong>Instructions:</strong> {meal.instructions}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-center p-2 bg-white rounded-lg">
                          <div className="font-bold text-primary-600">{meal.calories}</div>
                          <div className="text-gray-600">Calories</div>
                        </div>
                        <div className="text-center p-2 bg-white rounded-lg">
                          <div className="font-bold text-green-600">{meal.protein}g</div>
                          <div className="text-gray-600">Protein</div>
                        </div>
                        <div className="text-center p-2 bg-white rounded-lg">
                          <div className="font-bold text-blue-600">{meal.carbs}g</div>
                          <div className="text-gray-600">Carbs</div>
                        </div>
                        <div className="text-center p-2 bg-white rounded-lg">
                          <div className="font-bold text-purple-600">{meal.fats}g</div>
                          <div className="text-gray-600">Fats</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Daily Total */}
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 border-2 border-primary-200">
              <div className="flex items-center mb-4">
                <Utensils className="w-6 h-6 text-primary-600 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">Daily Total</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary-600">{currentDayPlan.dailyTotal.calories}</div>
                  <div className="text-sm text-gray-600">Total Calories</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">{currentDayPlan.dailyTotal.protein}g</div>
                  <div className="text-sm text-gray-600">Total Protein</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">{currentDayPlan.dailyTotal.carbs}g</div>
                  <div className="text-sm text-gray-600">Total Carbs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600">{currentDayPlan.dailyTotal.fats}g</div>
                  <div className="text-sm text-gray-600">Total Fats</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealPlan;
