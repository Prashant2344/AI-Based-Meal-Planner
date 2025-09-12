import React, { useState, useEffect } from 'react';
import BMICalculator from './components/BMICalculator';
import BMIResults from './components/BMIResults';
import MealPlan from './components/MealPlan';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorAlert from './components/ErrorAlert';
import { apiService } from './services/api';
import { AppState, UserInfo, BMICalculation } from './types';
import { Heart, Utensils, Target } from 'lucide-react';
import { generateSimpleMealPlanPDF } from './utils/pdfGenerator';
import { demoMealPlan } from './data/demoMealPlan';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({
    currentStep: 'bmi',
    userInfo: null,
    bmiResult: null,
    calorieResult: null,
    mealPlan: null,
    loading: false,
    error: null,
  });

  const handleBMICalculated = async (bmiResult: BMICalculation, userInfo: UserInfo) => {
    setAppState(prev => ({
      ...prev,
      bmiResult,
      userInfo,
      currentStep: 'calories',
      error: null,
    }));
  };

  const handleCalculateCalories = async () => {
    if (!appState.userInfo) return;

    setAppState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const calorieResult = await apiService.calculateCalories(appState.userInfo);
      setAppState(prev => ({
        ...prev,
        calorieResult,
        loading: false,
      }));
    } catch (error) {
      setAppState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to calculate calories',
      }));
    }
  };

  const handleContinueToMealPlan = async () => {
    if (!appState.userInfo || !appState.calorieResult) return;

    setAppState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const mealPlan = await apiService.generateMealPlan(
        appState.userInfo,
        appState.calorieResult.weightLossCalories
      );
      
      setAppState(prev => ({
        ...prev,
        mealPlan,
        currentStep: 'meal-plan',
        loading: false,
      }));
    } catch (error) {
      // Fallback to demo data if API fails
      console.warn('API failed, using demo data:', error);
      setAppState(prev => ({
        ...prev,
        mealPlan: demoMealPlan,
        currentStep: 'meal-plan',
        loading: false,
        error: 'Using demo meal plan (API unavailable)',
      }));
    }
  };

  const handleGenerateChart = async () => {
    if (!appState.mealPlan || !appState.userInfo) return;

    try {
      const chartData = await apiService.generateMealChart(appState.mealPlan, appState.userInfo);
      
      // Create a downloadable JSON file
      const dataStr = JSON.stringify(chartData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `meal-plan-${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    } catch (error) {
      setAppState(prev => ({
        ...prev,
        error: 'Failed to generate meal chart',
      }));
    }
  };

  const handlePrint = () => {
    if (appState.mealPlan && appState.userInfo) {
      generateSimpleMealPlanPDF(appState.mealPlan, appState.userInfo);
    }
  };

  const handleError = (error: string) => {
    setAppState(prev => ({ ...prev, error }));
  };

  const clearError = () => {
    setAppState(prev => ({ ...prev, error: null }));
  };

  const resetApp = () => {
    setAppState({
      currentStep: 'bmi',
      userInfo: null,
      bmiResult: null,
      calorieResult: null,
      mealPlan: null,
      loading: false,
      error: null,
    });
  };

  // Check API health on mount
  useEffect(() => {
    const checkHealth = async () => {
      try {
        await apiService.healthCheck();
      } catch (error) {
        handleError('Unable to connect to the server. Please make sure the backend is running.');
      }
    };
    checkHealth();
  }, []);

  const renderStepIndicator = () => {
    const steps = [
      { key: 'bmi', label: 'BMI Calculator', icon: Target },
      { key: 'calories', label: 'Calorie Needs', icon: Heart },
      { key: 'meal-plan', label: 'Meal Plan', icon: Utensils },
    ];

    return (
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = appState.currentStep === step.key;
            const isCompleted = 
              (step.key === 'bmi' && appState.bmiResult) ||
              (step.key === 'calories' && appState.calorieResult) ||
              (step.key === 'meal-plan' && appState.mealPlan);

            return (
              <div key={step.key} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition duration-200 ${
                  isCompleted 
                    ? 'bg-green-500 border-green-500 text-white' 
                    : isActive 
                      ? 'bg-primary-500 border-primary-500 text-white' 
                      : 'bg-white border-gray-300 text-gray-500'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  isActive ? 'text-primary-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-4 ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl mr-4">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Meal Planner AI</h1>
                <p className="text-sm text-gray-600">Personalized nutrition planning powered by AI</p>
              </div>
            </div>
            {appState.currentStep !== 'bmi' && (
              <button
                onClick={resetApp}
                className="text-gray-600 hover:text-gray-900 transition duration-200"
              >
                Start Over
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Step Indicator */}
          {renderStepIndicator()}

          {/* Error Alert */}
          {appState.error && (
            <ErrorAlert message={appState.error} onClose={clearError} />
          )}

          {/* Loading State */}
          {appState.loading && (
            <div className="flex justify-center">
              <div className="glass rounded-2xl p-8">
                <LoadingSpinner 
                  message={
                    appState.currentStep === 'calories' 
                      ? 'Calculating your calorie needs...' 
                      : appState.currentStep === 'meal-plan'
                      ? 'Generating your personalized meal plan...'
                      : 'Loading...'
                  } 
                  size="lg" 
                />
              </div>
            </div>
          )}

          {/* BMI Calculator */}
          {!appState.loading && appState.currentStep === 'bmi' && (
            <BMICalculator
              onBMICalculated={handleBMICalculated}
              onError={handleError}
            />
          )}

          {/* BMI Results */}
          {!appState.loading && appState.currentStep === 'calories' && appState.bmiResult && (
            <BMIResults
              bmiResult={appState.bmiResult}
              userInfo={appState.userInfo!}
              calorieResult={appState.calorieResult}
              onContinue={handleContinueToMealPlan}
              onCalculateCalories={handleCalculateCalories}
              loading={appState.loading}
            />
          )}

          {/* Meal Plan */}
          {!appState.loading && appState.currentStep === 'meal-plan' && appState.mealPlan && (
            <MealPlan
              mealPlan={appState.mealPlan}
              userInfo={appState.userInfo!}
              onGenerateChart={handleGenerateChart}
              onPrint={handlePrint}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 Meal Planner AI. Built with React, Node.js, and OpenAI.</p>
            <p className="text-sm mt-2">
              This app uses AI to generate personalized meal plans. Always consult with a healthcare professional for medical advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;