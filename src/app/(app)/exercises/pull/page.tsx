'use client'

import React, { useState } from 'react'
import Image from 'next/image'

// all the workouts we got
const workouts = {
  back: [
    {
      name: 'Pull-ups',
      howMany: '3-4',
      timesPerSet: '8-12',
      pic: '/images/exercises/pull-ups.jpg',
      description: 'Pull-ups form'
    },
    {
      name: 'Barbell Rows',
      howMany: '3-4',
      timesPerSet: '8-12',
      pic: '/images/exercises/barbell-rows.jpg',
      description: 'Barbell rows form'
    }
  ],
  biceps: [
    {
      name: 'Bicep Curls',
      howMany: '3-4',
      timesPerSet: '8-12',
      pic: '/images/exercises/bicep-curls.jpg',
      description: 'Bicep curls form'
    },
    {
      name: 'Hammer Curls',
      howMany: '3-4',
      timesPerSet: '8-12',
      pic: '/images/exercises/hammer-curls.jpg',
      description: 'Hammer curls form'
    }
  ]
}

// add this interface above the component
interface Exercise {
  name: string
  howMany: string
  timesPerSet: string
  pic: string
  description: string
}

// the main page 
function PullWorkoutPage() {
  // type the state array
  const [doneExercises, setDoneExercises] = useState<string[]>([])

  // type the exercise parameter
  const markAsDone = (exercise: string) => {
    setDoneExercises(done => {
      return done.includes(exercise)
        ? done.filter(x => x !== exercise)
        : [...done, exercise]
    })
  }

  return (
    <div className="p-8" style={{maxWidth: '1200px', margin: '0 auto'}}>
      <h1 className="text-2xl mb-8">Pull Day Exercises</h1>

      {/* back exercises */}
      <div style={{marginBottom: '3rem'}}>
        <h2 className="text-xl mb-6">
          › Back Workouts
        </h2>
        {workouts.back.map(exercise => (
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

      {/* biceps exercises */}
      <div style={{marginBottom: '3rem'}}>
        <h2 className="text-xl mb-6">
          › Biceps Exercises
        </h2>
        {workouts.biceps.map(exercise => (
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

export default PullWorkoutPage