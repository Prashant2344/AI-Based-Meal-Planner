import React, { useState } from 'react';
import { Calculator, Scale, Ruler, TrendingUp } from 'lucide-react';
import { apiService } from '../services/api';
import { BMICalculation, UserInfo } from '../types';

interface BMICalculatorProps {
  onBMICalculated: (bmiResult: BMICalculation, userInfo: UserInfo) => void;
  onError: (error: string) => void;
}

const BMICalculator: React.FC<BMICalculatorProps> = ({ onBMICalculated, onError }) => {
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    unit: 'metric' as 'metric' | 'imperial',
    age: '',
    gender: 'male' as 'male' | 'female',
    activityLevel: 'moderately active' as 'sedentary' | 'lightly active' | 'moderately active' | 'very active',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const weight = parseFloat(formData.weight);
      const height = parseFloat(formData.height);
      const age = parseInt(formData.age);

      if (!weight || !height || !age) {
        throw new Error('Please fill in all fields');
      }

      // Calculate BMI
      const bmiResult = await apiService.calculateBMI(weight, height, formData.unit);
      
      // Create user info object
      const userInfo: UserInfo = {
        weight,
        height: formData.unit === 'metric' ? height : height * 2.54, // Convert inches to cm
        age,
        gender: formData.gender,
        activityLevel: formData.activityLevel,
        unit: formData.unit,
      };

      onBMICalculated(bmiResult, userInfo);
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Failed to calculate BMI');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="glass rounded-2xl p-8 card-hover">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
            <Calculator className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">BMI Calculator</h1>
          <p className="text-gray-600">Calculate your Body Mass Index and get personalized nutrition recommendations</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Unit Selection */}
          <div className="flex justify-center space-x-4 mb-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="unit"
                value="metric"
                checked={formData.unit === 'metric'}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span className="text-gray-700">Metric (kg, cm)</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="unit"
                value="imperial"
                checked={formData.unit === 'imperial'}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span className="text-gray-700">Imperial (lbs, ft/in)</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Weight */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Scale className="inline w-4 h-4 mr-1" />
                Weight ({formData.unit === 'metric' ? 'kg' : 'lbs'})
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                step="0.1"
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder={formData.unit === 'metric' ? '70' : '154'}
                required
              />
            </div>

            {/* Height */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Ruler className="inline w-4 h-4 mr-1" />
                Height ({formData.unit === 'metric' ? 'cm' : 'inches'})
              </label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                step="0.1"
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder={formData.unit === 'metric' ? '175' : '67'}
                required
              />
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age (years)
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                min="1"
                max="120"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="29"
                required
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Activity Level */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <TrendingUp className="inline w-4 h-4 mr-1" />
                Activity Level
              </label>
              <select
                name="activityLevel"
                value={formData.activityLevel}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="sedentary">Sedentary (little to no exercise)</option>
                <option value="lightly active">Lightly Active (light exercise 1-3 days/week)</option>
                <option value="moderately active">Moderately Active (moderate exercise 3-5 days/week)</option>
                <option value="very active">Very Active (hard exercise 6-7 days/week)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold py-4 px-6 rounded-lg transition duration-200 flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Calculating...
              </>
            ) : (
              <>
                <Calculator className="w-5 h-5 mr-2" />
                Calculate BMI & Continue
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BMICalculator;
