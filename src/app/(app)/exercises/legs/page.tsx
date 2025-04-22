'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

// all the leg exercises we got
const workouts = {
  legs: [
    {
      name: 'Squats',
      howMany: '3-4',
      timesPerSet: '8-12',
      pic: '/images/exercises/squat.jpg',
      description: 'Squat form'
    },
    {
      name: 'Lunges',
      howMany: '3-4',
      timesPerSet: '10-12',
      pic: '/images/exercises/lunges.jpg',
      description: 'Lunges form'
    },
    {
      name: 'Calf Raises',
      howMany: '3-4',
      timesPerSet: '15-20',
      pic: '/images/exercises/calveRaise.jpg',
      description: 'Calf raises form'
    }
  ]
}

interface Exercise {
  name: string
  howMany: string
  timesPerSet: string
  pic: string
  description: string
}

function LegsWorkoutPage() {
  const [doneExercises, setDoneExercises] = useState<string[]>([])
  const [workoutCompleted, setWorkoutCompleted] = useState(false)

  // Check if all exercises are completed
  useEffect(() => {
    const allExercises = workouts.legs.map(ex => ex.name)
    const isAllDone = allExercises.every(ex => doneExercises.includes(ex))
    
    if (isAllDone && !workoutCompleted && doneExercises.length === allExercises.length) {
      handleWorkoutComplete()
      setWorkoutCompleted(true)
    }
  }, [doneExercises])

  // Handle completed workout
  const handleWorkoutComplete = async () => {
    try {
      const response = await fetch('/api/workouts/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          workoutType: 'legs',
          completedExercises: doneExercises
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update workout stats')
      }

      //Show success message
      alert('Great job! Workout completed! 💪')

    } catch (error) {
      console.error('Error updating workout stats:', error)
    }
  }

  const markAsDone = (exercise: string) => {
    setDoneExercises(done => {
      const newDone = done.includes(exercise)
        ? done.filter(x => x !== exercise)
        : [...done, exercise]
      return newDone
    })
  }

  return (
    <div className="p-8" style={{maxWidth: '1200px', margin: '0 auto'}}>
      <h1 className="text-2xl mb-8">Leg Day Exercises</h1>

      {/* leg exercises */}
      <div style={{marginBottom: '3rem'}}>
        <h2 className="text-xl mb-6">
          › Leg Workouts
        </h2>
        {workouts.legs.map(exercise => (
          <div key={exercise.name} className="flex gap-6 mb-6 bg-gray-50 p-6 rounded">
            <div className="relative rounded overflow-hidden" style={{width: '500px', height: '300px'}}>
              <Image 
                src={exercise.pic}
                alt={exercise.description}
                fill
                className="object-contain"
                style={{background: '#f3f4f6'}}
              />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg mb-2">{exercise.name}</h3>
                <p className="text-gray-600">
                  Do {exercise.howMany} sets of {exercise.timesPerSet} reps
                </p>
              </div>
              <button 
                onClick={() => markAsDone(exercise.name)}
                className={
                  doneExercises.includes(exercise.name)
                    ? 'bg-green-600 text-white p-3 rounded'
                    : 'bg-gray-800 text-white p-3 rounded'
                }
              >
                {doneExercises.includes(exercise.name) ? '✓ All Done!' : 'Mark as Done'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LegsWorkoutPage
