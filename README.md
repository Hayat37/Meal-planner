# Project Report: FreshPlan - Recipe Meal Planner

## Purpose of the Website
FreshPlan is an interactive web application designed to help users manage their healthy eating habits. The primary goal is to provide a user-friendly platform where individuals can browse a curated list of healthy recipes, filter them based on dietary preferences (Vegan, Vegetarian, Gluten-Free), and organize them into a personalized meal plan. The app automatically calculates nutrition totals to help users stay on track with their health goals.

## Features
- **Multi-Page Navigation:** Five distinct, semantic HTML pages (Home, Recipes, Recipe Detail, Meal Plan, About).
- **Interactive Recipe Grid:** Dynamic rendering of recipe cards with search and filtering capabilities.
- **Detailed Recipe Views:** A dedicated page for each recipe showing full ingredients and step-by-step instructions.
- **Meal Planning System:** Users can add/remove recipes to a "Meal Plan".
- **Dynamic Nutrition Tracking:** Automatic calculation of total calories and prep time for the entire meal plan using JavaScript.
- **Persistent Storage:** State is maintained across different pages using the browser's `localStorage`.
- **Responsive Design:** A mobile-first approach using CSS Flexbox and Grid, ensuring the app works perfectly on all devices.

## Technologies Used
- **HTML5:** For creating a semantic and accessible document structure (header, nav, main, section, footer).
- **CSS3:** For modern styling, layout management (Flexbox/Grid), and interactive hover effects.
- **Vanilla JavaScript:** For all DOM manipulations, event handling, state management, and filtering logic. No external libraries or frameworks (like Bootstrap) were used.
- **LocalStorage API:** For persisting user data across different pages and sessions.

## Challenges & Solutions
1. **Challenge:** Sharing the "Meal Plan" state across multiple separate HTML pages without a backend.
   - **Solution:** Utilized the `localStorage` API to store the meal plan array as a JSON string and implemented shared utility functions in a `main.js` file to sync the state on every page load.
2. **Challenge:** Creating a responsive layout that looks premium on both mobile and desktop.
   - **Solution:** Used CSS Grid for the recipe cards and summary layout, which allows for easy column adjustment based on screen width using media queries.
3. **Challenge:** Dynamically updating totals when a recipe is removed.
   - **Solution:** Implemented a `renderPlan()` function that recalculates the sum of calories and time from the modified array and updates the DOM immediately without refreshing the page.

## Conclusion
This project demonstrates a comprehensive understanding of front-end development by combining semantic structure, modern layout techniques, and interactive logic to solve a real-world problem.
