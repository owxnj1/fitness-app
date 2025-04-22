// This is our exercises page where users can browse and select workouts

'use client'

import React from 'react'
import Link from 'next/link'

// workout page 
function ExercisesPage() {
  // 3 different types of workouts
  let workouts = [
    {
      type: 'Push workout', 
      where: '/exercises/push',
      desc: 'chest and shoulders'
    },
    {
      type: 'Pull workout',
      where: '/exercises/pull', 
      desc: 'back and biceps'
    },
    {
      type: 'Leg workout', 
      where: '/exercises/legs',
      desc: 'legs and glutes'
    }
  ]

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
      
      {/* workout boxes side by side */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
        {workouts.map(w => (
          <Link 
            href={w.where} 
            key={w.type}
          >
            <div 
              className="border-2 rounded-lg p-8 hover:shadow-lg"
              style={{
                transition: 'all .2s',
                minHeight: '180px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <h2 className="mb-4 text-xl">{w.type}</h2>
              <p style={{color: '#666'}}>{w.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* ask user to choose a workout */}
      <h1 className="text-3xl text-center">
        Choose your workout for today
      </h1>
    </div>
  )
}

export default ExercisesPage 