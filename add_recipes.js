const fs = require('fs');
const axios = require('axios');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYxMjQzNmNjNjhjZDlmMTgxMmJkYTQzIn0sImlhdCI6MTcxMjUxMDkyM30.BpUj4r3hJN53-n6hL7T6beCMTukuk8yBdaMxXUz7FFg';

// Read recipes from the JSON file
fs.readFile('recipes.json', 'utf8', async (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  const recipes = JSON.parse(data);

  for (let recipe of recipes) {
    try {
      const response = await axios.post('http://localhost:5000/api/recipes', recipe, {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        }
      });
      console.log('Recipe added successfully:', response.data);
    } catch (error) {
      console.error('Error adding recipe:', error.message);
    }
  }
});
