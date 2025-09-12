import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MealPlan as MealPlanType, UserInfo } from '../types';

export const generateMealPlanPDF = async (
  mealPlan: MealPlanType,
  userInfo: UserInfo,
  elementId: string = 'meal-plan-content'
) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Meal plan content not found');
    }

    // Create a clone of the element for PDF generation
    const clonedElement = element.cloneNode(true) as HTMLElement;
    clonedElement.style.position = 'absolute';
    clonedElement.style.left = '-9999px';
    clonedElement.style.top = '0';
    clonedElement.style.width = '210mm'; // A4 width
    clonedElement.style.backgroundColor = 'white';
    clonedElement.style.padding = '20px';
    clonedElement.style.fontSize = '12px';
    
    document.body.appendChild(clonedElement);

    // Generate canvas from the cloned element
    const canvas = await html2canvas(clonedElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
    });

    // Remove the cloned element
    document.body.removeChild(clonedElement);

    // Create PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save the PDF
    const fileName = `meal-plan-${userInfo.gender}-${userInfo.age}-${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
};

export const generateSimpleMealPlanPDF = (mealPlan: MealPlanType, userInfo: UserInfo) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = 210;
  const pageHeight = 295;
  let yPosition = 20;

  // Helper function to add text with word wrapping
  const addText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 12) => {
    pdf.setFontSize(fontSize);
    const lines = pdf.splitTextToSize(text, maxWidth);
    pdf.text(lines, x, y);
    return y + (lines.length * fontSize * 0.4);
  };

  // Helper function to check if we need a new page
  const checkNewPage = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - 20) {
      pdf.addPage();
      yPosition = 20;
      return true;
    }
    return false;
  };

  // Header
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('🍽️ Personalized Meal Plan', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 15;

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Generated for: ${userInfo.gender}, ${userInfo.age} years old`, pageWidth / 2, yPosition, { align: 'center' });
  pdf.text(`Activity Level: ${userInfo.activityLevel}`, pageWidth / 2, yPosition + 5, { align: 'center' });
  pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPosition + 10, { align: 'center' });
  yPosition += 25;

  // Daily Targets
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Daily Nutrition Targets', 20, yPosition);
  yPosition += 10;

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  const targets = [
    `Calories: ${mealPlan.dailyTargets.calories}`,
    `Protein: ${mealPlan.dailyTargets.protein}`,
    `Carbs: ${mealPlan.dailyTargets.carbs}`,
    `Fats: ${mealPlan.dailyTargets.fats}`
  ];
  
  targets.forEach(target => {
    pdf.text(target, 20, yPosition);
    yPosition += 5;
  });
  yPosition += 10;

  // Days of the week
  const days = [
    { key: 'day1', name: 'Sunday' },
    { key: 'day2', name: 'Monday' },
    { key: 'day3', name: 'Tuesday' },
    { key: 'day4', name: 'Wednesday' },
    { key: 'day5', name: 'Thursday' },
    { key: 'day6', name: 'Friday' },
    { key: 'day7', name: 'Saturday' },
  ];

  days.forEach(day => {
    const dayPlan = mealPlan.mealPlan[day.key];
    if (!dayPlan) return;

    checkNewPage(50);

    // Day header
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${day.name}`, 20, yPosition);
    yPosition += 8;

    // Meals
    const meals = [
      { name: 'Breakfast', meal: dayPlan.breakfast, emoji: '🌅' },
      { name: 'Lunch', meal: dayPlan.lunch, emoji: '☀️' },
      { name: 'Snack', meal: dayPlan.snack, emoji: '🍎' },
      { name: 'Dinner', meal: dayPlan.dinner, emoji: '🌙' },
    ];

    meals.forEach(({ name, meal, emoji }) => {
      checkNewPage(25);

      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${emoji} ${name}: ${meal.name}`, 25, yPosition);
      yPosition += 6;

      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      yPosition = addText(`Ingredients: ${meal.ingredients}`, 25, yPosition, pageWidth - 50, 9);
      yPosition = addText(`Portions: ${meal.portions}`, 25, yPosition, pageWidth - 50, 9);
      yPosition = addText(`Instructions: ${meal.instructions}`, 25, yPosition, pageWidth - 50, 9);
      
      pdf.text(`Calories: ${meal.calories} | Protein: ${meal.protein}g | Carbs: ${meal.carbs}g | Fats: ${meal.fats}g`, 25, yPosition);
      yPosition += 8;
    });

    // Daily total
    checkNewPage(15);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Daily Total: ${dayPlan.dailyTotal.calories} calories | ${dayPlan.dailyTotal.protein}g protein | ${dayPlan.dailyTotal.carbs}g carbs | ${dayPlan.dailyTotal.fats}g fats`, 20, yPosition);
    yPosition += 15;
  });

  // Footer
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Generated by Meal Planner AI - Always consult with a healthcare professional for medical advice.', pageWidth / 2, pageHeight - 10, { align: 'center' });

  // Save the PDF
  const fileName = `meal-plan-${userInfo.gender}-${userInfo.age}-${new Date().toISOString().split('T')[0]}.pdf`;
  pdf.save(fileName);
};
