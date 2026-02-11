// This script now loads data from foods.json dynamically
window.recipesData = [];

async function loadRecipes() {
    try {
        const response = await fetch('foods.json');
        if (!response.ok) throw new Error('Failed to load foods.json');
        const data = await response.json();
        window.recipesData = data;

        // Dispatch event so pages know data is ready
        window.dispatchEvent(new CustomEvent('recipesReady'));
        console.log('Recipes loaded successfully:', data.length);
    } catch (error) {
        console.error('Error loading recipes:', error);
    }
}

// Start loading immediately
loadRecipes();

// Export for use in Node.js environments (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadRecipes };
}
