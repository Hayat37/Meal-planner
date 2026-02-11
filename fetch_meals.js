const fs = require('fs');
const https = require('https');

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
let allMeals = [];

async function fetchByLetter(letter) {
    return new Promise((resolve, reject) => {
        https.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    resolve(json.meals || []);
                } catch (e) {
                    resolve([]);
                }
            });
        }).on('error', (err) => {
            console.error(`Error fetching letter ${letter}:`, err.message);
            resolve([]);
        });
    });
}

async function start() {
    console.log('Starting data collection from TheMealDB...');

    for (const letter of alphabet) {
        process.stdout.write(`Fetching '${letter}'... `);
        const meals = await fetchByLetter(letter);
        console.log(`Found ${meals.length} meals.`);
        allMeals = allMeals.concat(meals);
    }

    // Transform data to match our schema and add hardcoded calories/time
    const structuredData = allMeals.map((meal, index) => {
        // Collect ingredients and measures
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient && ingredient.trim()) {
                ingredients.push(`${measure ? measure.trim() + ' ' : ''}${ingredient.trim()}`);
            }
        }

        return {
            id: parseInt(meal.idMeal),
            name: meal.strMeal,
            image: meal.strMealThumb,
            prepTime: Math.floor(Math.random() * 45) + 15, // Mock: 15-60 mins
            calories: Math.floor(Math.random() * 400) + 300, // Mock: 300-700 kcal
            dietary: [meal.strCategory, meal.strArea].filter(x => x),
            ingredients: ingredients,
            instructions: meal.strInstructions ?
                meal.strInstructions
                    .split(/\r\n|\n|\r/)
                    .filter(line => line.trim().length >= 10)
                    .map(line => line.trim()) : []
        };
    });

    fs.writeFileSync('foods.json', JSON.stringify(structuredData, null, 2));
    console.log(`\nSuccessfully saved ${structuredData.length} meals to foods.json!`);
}

start();
