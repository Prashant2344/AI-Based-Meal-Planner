# 🍽️ Meal Planner AI

A comprehensive meal planning application powered by AI that helps users calculate their BMI, determine calorie needs, and generate personalized meal plans using OpenAI's GPT models.

## ✨ Features

- **BMI Calculator**: Calculate Body Mass Index with metric and imperial units
- **Calorie Calculation**: Determine daily calorie needs based on age, gender, weight, height, and activity level
- **AI-Powered Meal Planning**: Generate personalized 7-day meal plans using OpenAI API
- **Nutrition Tracking**: Track macronutrients (protein, carbs, fats) for each meal
- **Interactive UI**: Modern, responsive interface with meal completion tracking
- **Printable Charts**: Export meal plans as downloadable charts
- **Real-time Progress**: Visual step-by-step process with progress indicators

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. **Clone and setup the project:**
   ```bash
   git clone <repository-url>
   cd MealPlanner
   npm run install-all
   ```

2. **Configure environment variables:**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=5000
   ```

3. **Start the development servers:**
   ```bash
   npm run dev
   ```

   This will start both the backend server (port 5000) and React frontend (port 3000).

### Alternative Setup

If you prefer to run the servers separately:

**Backend only:**
```bash
npm run server
```

**Frontend only:**
```bash
cd client
npm start
```

## 🏗️ Project Structure

```
MealPlanner/
├── server/                 # Node.js backend
│   └── index.js           # Express server with API routes
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API service layer
│   │   ├── types/         # TypeScript type definitions
│   │   └── App.tsx        # Main application component
│   └── public/            # Static assets
├── package.json           # Root package.json with scripts
└── README.md
```

## 🔧 API Endpoints

### Backend API (Port 5000)

- `POST /api/calculate-bmi` - Calculate BMI and target weight range
- `POST /api/calculate-calories` - Calculate daily calorie needs
- `POST /api/generate-meal-plan` - Generate AI-powered meal plan
- `POST /api/generate-meal-chart` - Generate printable meal chart
- `GET /api/health` - Health check endpoint

## 🎯 Usage

1. **Calculate BMI**: Enter your weight, height, age, gender, and activity level
2. **Review Results**: See your BMI category and target weight range
3. **Calculate Calories**: Get personalized daily calorie recommendations
4. **Generate Meal Plan**: Create a 7-day AI-powered meal plan
5. **Track Progress**: Mark meals as completed and monitor your nutrition

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **AI SDK** - OpenAI integration
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Axios** - HTTP client

## 📱 Features in Detail

### BMI Calculator
- Supports both metric (kg, cm) and imperial (lbs, inches) units
- Calculates BMI using standard formula
- Provides BMI category classification
- Shows target weight range for healthy BMI

### Calorie Calculation
- Uses Mifflin-St Jeor equation for BMR calculation
- Accounts for activity level multipliers
- Provides weight loss calorie targets
- Supports different activity levels

### AI Meal Planning
- Powered by OpenAI GPT-4o-mini
- Generates 7-day rotating meal plans
- Includes detailed nutrition information
- Considers dietary preferences and restrictions
- Provides cooking instructions and portion sizes

### Interactive Features
- Meal completion tracking
- Day-by-day meal plan navigation
- Real-time nutrition totals
- Responsive design for all devices

## 🔒 Environment Variables

Create a `.env` file in the root directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=5000
```

## 📦 Dependencies

### Backend Dependencies
- `express` - Web framework
- `cors` - CORS middleware
- `dotenv` - Environment variable loading
- `ai` - AI SDK for OpenAI integration
- `openai` - OpenAI client

### Frontend Dependencies
- `react` - UI library
- `typescript` - Type safety
- `tailwindcss` - CSS framework
- `lucide-react` - Icon library
- `axios` - HTTP client

## 🚀 Deployment

### Backend Deployment
1. Set environment variables in your hosting platform
2. Install dependencies: `npm install`
3. Start the server: `npm run server`

### Frontend Deployment
1. Build the React app: `npm run build`
2. Serve the `build` folder with a static file server
3. Update API URLs in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## ⚠️ Disclaimer

This application is for educational and informational purposes only. It should not replace professional medical advice, diagnosis, or treatment. Always consult with a healthcare professional before making significant changes to your diet or exercise routine.

## 🆘 Support

If you encounter any issues:

1. Check that your OpenAI API key is valid
2. Ensure all dependencies are installed
3. Verify that both servers are running
4. Check the browser console for errors

For additional support, please open an issue in the repository.
