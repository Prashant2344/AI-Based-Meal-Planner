import React from 'react';
import { CheckCircle, Target, Zap, ArrowRight } from 'lucide-react';
import { BMICalculation, UserInfo, CalorieCalculation } from '../types';

interface BMIResultsProps {
  bmiResult: BMICalculation;
  userInfo: UserInfo;
  calorieResult: CalorieCalculation | null;
  onContinue: () => void;
  onCalculateCalories: () => void;
  loading: boolean;
}

const BMIResults: React.FC<BMIResultsProps> = ({
  bmiResult,
  userInfo,
  calorieResult,
  onContinue,
  onCalculateCalories,
  loading
}) => {
  const getBMICategoryColor = (category: string) => {
    switch (category) {
      case 'Underweight':
        return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'Normal weight':
        return 'text-green-600 bg-green-100 border-green-200';
      case 'Overweight':
        return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'Obese':
        return 'text-red-600 bg-red-100 border-red-200';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getBMICategoryIcon = (category: string) => {
    switch (category) {
      case 'Underweight':
        return '📉';
      case 'Normal weight':
        return '✅';
      case 'Overweight':
        return '⚠️';
      case 'Obese':
        return '🚨';
      default:
        return '📊';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="glass rounded-2xl p-8 card-hover">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your BMI Results</h1>
          <p className="text-gray-600">Here's your personalized health assessment</p>
        </div>

        {/* BMI Display */}
        <div className="text-center mb-8">
          <div className="inline-block p-8 bg-white rounded-2xl shadow-lg">
            <div className="text-6xl font-bold text-gray-900 mb-2">
              {bmiResult.bmi}
            </div>
            <div className="text-lg text-gray-600 mb-4">BMI Score</div>
            <div className={`inline-flex items-center px-4 py-2 rounded-full border-2 ${getBMICategoryColor(bmiResult.category)}`}>
              <span className="text-2xl mr-2">{getBMICategoryIcon(bmiResult.category)}</span>
              <span className="font-semibold">{bmiResult.category}</span>
            </div>
          </div>
        </div>

        {/* Target Weight Range */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <div className="flex items-center mb-4">
            <Target className="w-6 h-6 text-primary-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-900">Target Weight Range</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {bmiResult.targetWeightRange.lower} kg
              </div>
              <div className="text-sm text-gray-600">Lower Limit</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">
                {userInfo.weight} kg
              </div>
              <div className="text-sm text-gray-600">Current Weight</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {bmiResult.targetWeightRange.upper} kg
              </div>
              <div className="text-sm text-gray-600">Upper Limit</div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-primary-50 rounded-lg">
            <p className="text-sm text-primary-800">
              <strong>Goal:</strong> To reach a normal BMI range, you need to be between{' '}
              <strong>{bmiResult.targetWeightRange.lower} kg</strong> and{' '}
              <strong>{bmiResult.targetWeightRange.upper} kg</strong>.
              {userInfo.weight > bmiResult.targetWeightRange.upper && (
                <span className="block mt-1">
                  You need to lose approximately{' '}
                  <strong>{Math.round((userInfo.weight - bmiResult.targetWeightRange.upper) * 10) / 10} kg</strong>{' '}
                  to reach the upper end of the normal range.
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Calorie Information */}
        {calorieResult ? (
          <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
            <div className="flex items-center mb-4">
              <Zap className="w-6 h-6 text-primary-600 mr-2" />
              <h3 className="text-xl font-semibold text-gray-900">Daily Calorie Needs</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {calorieResult.bmr}
                </div>
                <div className="text-sm text-gray-600">BMR (kcal/day)</div>
                <div className="text-xs text-gray-500">Base Metabolic Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {calorieResult.tdee}
                </div>
                <div className="text-sm text-gray-600">TDEE (kcal/day)</div>
                <div className="text-xs text-gray-500">Total Daily Energy Expenditure</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {calorieResult.weightLossCalories}
                </div>
                <div className="text-sm text-gray-600">Weight Loss (kcal/day)</div>
                <div className="text-xs text-gray-500">For 0.5kg/week loss</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
            <div className="text-center">
              <Zap className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Calculate Your Calorie Needs</h3>
              <p className="text-gray-600 mb-4">
                Get personalized calorie recommendations based on your activity level
              </p>
              <button
                onClick={onCalculateCalories}
                disabled={loading}
                className="bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center mx-auto"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Calculating...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Calculate Calories
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Continue Button */}
        <div className="text-center">
          <button
            onClick={onContinue}
            disabled={!calorieResult}
            className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-4 px-8 rounded-lg transition duration-200 flex items-center mx-auto"
          >
            <ArrowRight className="w-5 h-5 mr-2" />
            Generate Meal Plan
          </button>
          {!calorieResult && (
            <p className="text-sm text-gray-500 mt-2">
              Please calculate your calorie needs first
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BMIResults;
