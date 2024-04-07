const axios = require('axios');

// Function to generate a random number within a range
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Function to generate random ingredients
const generateIngredients = () => {
  const ingredients = [];
  const ingredientNames = ['Flour', 'Sugar', 'Eggs', 'Milk', 'Butter', 'Salt', 'Baking Powder', 'Vanilla Extract', 'Chocolate Chips', 'Vegetables', 'Fruits', 'Spices'];

  for (let i = 0; i < getRandomNumber(3, 8); i++) {
    const ingredient = {
      name: ingredientNames[getRandomNumber(0, ingredientNames.length - 1)],
      quantity: `${getRandomNumber(1, 3)}`,
      unit: 'cup' // You can modify this to generate different units
    };
    ingredients.push(ingredient);
  }

  return ingredients;
};

// Function to generate random instructions
const generateInstructions = () => {
  const instructions = [];
  const steps = [
    'Preheat the oven',
    'Mix the ingredients',
    'Pour the mixture into a pan',
    'Bake in the oven',
    'Let it cool before serving',
    'Enjoy!'
  ];

  for (let i = 0; i < getRandomNumber(3, 6); i++) {
    instructions.push(steps[i]);
  }

  return instructions;
};

// Function to generate a single recipe
const generateRecipe = (id) => {
  return {
    title: `Recipe ${id}`,
    description: `Description for Recipe ${id}`,
    ingredients: generateIngredients(),
    instructions: generateInstructions(),
    cookingTime: getRandomNumber(20, 60),
    imageUrl: `https://example.com/recipe-${id}.jpg`, // You can use a placeholder URL or generate random images
    videoUrl: `https://example.com/recipe-${id}.mp4` // You can use a placeholder URL or generate random videos
  };
};

// Function to generate multiple recipes and add them using the API
const addRecipesViaAPI = async (count) => {
  const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYxMjQzNmNjNjhjZDlmMTgxMmJkYTQzIn0sImlhdCI6MTcxMjUxMDkyM30.BpUj4r3hJN53-n6hL7T6beCMTukuk8yBdaMxXUz7FFg';
  const config = {
    headers: {
      'Authorization': userToken
    }
  };

  try {
    for (let i = 1; i <= count; i++) {
      const recipe = generateRecipe(i);
      await axios.post('http://localhost:5000/api/recipes', recipe, config);
      console.log(`Recipe ${i} added successfully!`);
    }
  } catch (error) {
    console.error('Error adding recipes:', error);
  }
};

// Add 10 recipes via API
addRecipesViaAPI(10);
