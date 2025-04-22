'use client'

import React, { useState } from 'react'

type FoodItem = {
  name: string
  calories: number
}

type Meal = {
  name: string
  calories: number
  time: string
  items: FoodItem[]
}


function FoodTracker() {
  // track all the foods
  const [foods, setFoods] = useState<Meal[]>([
    { name: 'breakfast', calories: 0, time: 'Morning', items: [] },
    { name: 'lunch', calories: 0, time: 'Afternoon', items: [] }, 
    { name: 'dinner', calories: 0, time: 'Evening', items: [] },
    { name: 'snacks', calories: 0, time: 'Throughout the day', items: [] }
  ])

  // figure out calories eaten
  const totalCals = foods.reduce((total, food) => total + food.calories, 0)

  // add food when button clicked
  const addFood = (mealName: string) => {
    const foodName = prompt('what food did you eat?')
    const calories = parseInt(prompt('how many calories was it?') || '0')
    
    if(foodName && calories) {
      setFoods(foods.map(food => {
        if(food.name === mealName) {
          return {
            ...food,
            calories: food.calories + calories,
            items: [...food.items, { name: foodName, calories }]
          }
        }
        return food
      }))
    }
  }

  return (
    <div className='p-6 min-h-screen bg-slate-50'>
      <div style={{margin: '0 auto', maxWidth: '950px'}}>
        
        <h1 className='text-3xl mb-8'>
          Food Tracker
        </h1>

        <div className='bg-white rounded p-8 shadow mb-6'>
          <h2 className='text-2xl' style={{marginBottom: '1.5rem'}}>
            Todays foods
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className='p-4 bg-gray-50 rounded'>
              <p className='text-gray-600'>calories goal</p>
              <p className='text-2xl'>2000</p>
            </div>

            <div className='p-4 rounded' style={{backgroundColor: '#f8fafc'}}>
              <p className='text-gray-600'>calories eaten</p>
              <p className='text-2xl'>{totalCals}</p>
            </div>

            <div className='p-4 bg-gray-50 rounded-lg'>
              <p className='text-gray-600'>remaining calories</p>
              <p className='text-2xl'>{2000 - totalCals}</p>
            </div>
          </div>

          <div className='space-y-6'>
            {foods.map((food) => (
              <div key={food.name} 
                className={`border rounded p-4 ${food.calories > 0 ? 'bg-gray-50' : ''}`}>
                <div className='flex justify-between items-center'>
                  <div>
                    <h3 className='text-lg font-medium'>{food.name}</h3>
                    <p className='text-gray-500'>{food.time}</p>
                  </div>

                  <button 
                    onClick={() => addFood(food.name)}
                    className='px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700'
                    style={{transition: 'all .2s'}}
                  >
                    add meal
                  </button>
                </div>

                {food.calories > 0 && (
                  <div className='mt-3'>
                    <p>today you ate {food.calories} calories</p>
                    <ul className='mt-2 text-sm text-gray-600'>
                      {food.items.map((item, idx) => (
                        <li key={idx}>
                          • {item.name} ({item.calories} cals)
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FoodTracker