const axios = require('axios');

async function testAPI() {
  try {
    console.log('Testing API connection...');
    
    // Test health endpoint
    const healthResponse = await axios.get('http://localhost:5000/api/health');
    console.log('Health check:', healthResponse.data);
    
    // Test calorie calculation
    const userInfo = {
      weight: 70,
      height: 175,
      age: 30,
      gender: 'male',
      activityLevel: 'moderately active',
      unit: 'metric'
    };
    
    console.log('Sending user info:', userInfo);
    const calorieResponse = await axios.post('http://localhost:5000/api/calculate-calories', userInfo);
    console.log('Calorie calculation response:', calorieResponse.data);
    
  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
  }
}

testAPI();
