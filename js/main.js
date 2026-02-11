// Meal Plan Storage Logic
const MEAL_PLAN_KEY = 'meal_planner_data';

const getMealPlan = () => {
    const data = localStorage.getItem(MEAL_PLAN_KEY);
    return data ? JSON.parse(data) : [];
};

const saveMealPlan = (plan) => {
    localStorage.setItem(MEAL_PLAN_KEY, JSON.stringify(plan));
    updateCartBadge();
};

const addToMealPlan = (recipe) => {
    const plan = getMealPlan();
    if (!plan.find(item => item.id === recipe.id)) {
        plan.push(recipe);
        saveMealPlan(plan);
        alert(`${recipe.name} added to your meal plan!`);
    } else {
        alert("This recipe is already in your meal plan.");
    }
};

const removeFromMealPlan = (recipeId) => {
    let plan = getMealPlan();
    plan = plan.filter(item => item.id !== recipeId);
    saveMealPlan(plan);
};

const updateCartBadge = () => {
    const countElement = document.getElementById('meal-plan-count');
    if (countElement) {
        const plan = getMealPlan();
        countElement.textContent = plan.length;
    }
};

// Initialize navigation highlighting and badge
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();

    // Highlight current page in nav
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath.split('/').pop()) {
            link.classList.add('active');
        }
    });
});

// Utility to get URL parameters
const getUrlParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};
