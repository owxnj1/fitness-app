'use client';

import { useState } from 'react';

type RecipeIdea = {
  name: string,  // meal names
  steps: string[] 
}


const MealPlanner = () => {
  let [mealPlan, updateMealPlan] = useState('')
  let [recipeIdeas, setRecipes] = useState('')
  let [generateMealPlan, setBusy] = useState(false)
  let [cookingFail, setFail] = useState('')

  // Takes the AI's wall of text and makes it readable
  function textHTML(messyText: string) {
    let niceRecipes: RecipeIdea[] = []
    let currentRecipe: RecipeIdea | null = null

    // Split by lines and process each line
    messyText.split('\n').forEach(line => {
      line = line.trim()
      if (!line) return

      // Check if this is a meal title
      if (line.match(/^(Breakfast|Lunch|Dinner|Snack\s*\d*|Morning Snack|Afternoon Snack):/i)) {
        if (currentRecipe) {
          niceRecipes.push(currentRecipe)
        }
        currentRecipe = {
          name: line,
          steps: []
        }
      }
      // Add content to current recipe
      else if (currentRecipe) {
        // Don't add empty lines or separator lines
        if (!line.match(/^[-#]+$/)) {
          currentRecipe.steps.push(line)
        }
      }
    })

    // Add the last recipe if exists
    if (currentRecipe) {
      niceRecipes.push(currentRecipe)
    }

    return niceRecipes
  }

  // Creating the new meal plan
  const createMealPlan = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setFail('')
    setRecipes('')
    
    try {
      const whatWeHave = mealPlan
        .split(',')
        .map(i => i.trim())
        .filter(Boolean)

      if (!whatWeHave.length) {
        throw new Error('Please input some ingredients')
      }

      // Updated API endpoint to use Next.js route
      const aiResponse = await fetch('/api/meal-chat', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          availableFoods: whatWeHave
        })
      })

      const ideas = await aiResponse.json()

      if (!aiResponse.ok) {
        throw new Error(ideas.error || ideas.details || 'Failed to generate meal plan')
      }
      if (!ideas.mealPlan) {
        throw new Error('No meal plan received from the server')
      }
      
      setRecipes(ideas.mealPlan)
    } catch (oops: any) {
      setFail(oops.message || 'Failed to generate meal plan')
    }
    setBusy(false)
  }

  // Creates meal plan cards to separate the meal plans
  const todaysMeals = recipeIdeas ? textHTML(recipeIdeas) : []

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center">🥗 Meal Planner</h1>
      
      {/* Ask user to input their ingredients */}
      <form onSubmit={createMealPlan} className="space-y-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <label 
            htmlFor="ingredients" 
            className="block text-lg font-medium text-gray-700 mb-3"
          >
            🍅 Please input the foods and ingredients you have available.  
          </label>
          <textarea
            id="ingredients"
            value={mealPlan}
            onChange={e => updateMealPlan(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
              focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 
              transition-all duration-200"
            rows={4}
            placeholder="Tell me your ingredients! (like: chicken, eggs, avocado...)"
            required
          />
          <p className="mt-2 text-sm text-gray-500">
            Please separate each ingredient with a comma.
          </p>
        </div>
        
        <button
          type="submit"
          disabled={generateMealPlan || !mealPlan.trim()}
          className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg 
            hover:bg-emerald-700 transform hover:scale-[1.02]
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 
            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {generateMealPlan ? 'Generating Meal Plan...' : 'Generate Meal Plan!'}
        </button>
      </form>

      {/* Error display */}
      {cookingFail && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 
          text-red-700 rounded-lg animate-fade-in">
          <p>{cookingFail}</p>
        </div>
      )}

      {/* Meal plans display */}
      {todaysMeals.length > 0 && (
        <div className="mt-8 animate-fade-in">
          <h2 className="text-2xl font-semibold mb-6 text-center">Meal Plans 👩‍🍳</h2>
          <div className="grid gap-6 md:grid-cols-1">
            {todaysMeals.map((recipe, idx) => (
              <article 
                key={idx} 
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <header className="bg-emerald-600 text-white px-5 py-3">
                  <h3 className="text-lg font-semibold">
                    {recipe.name}
                  </h3>
                </header>
                
                <div className="p-5 space-y-2">
                  {recipe.steps.map((step, i) => (
                    <p key={i} className="text-gray-600">
                      {step}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
export default MealPlanner 