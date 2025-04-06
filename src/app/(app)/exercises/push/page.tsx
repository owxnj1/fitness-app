'use client'

import React, { useState } from 'react'
import Image from 'next/image'

// all the workout stuff we got
const workouts = {
  chest: [
    {
      name: 'Cable Flys', 
      howMany: '3-4', // sets
      timesPerSet: '10-12', // reps
      pic: '/images/exercises/CableFly.jpg',
      description: 'Cable Flys Image'
    }
  ],
  shoulders: [
    {
      name: 'Overhead Press',
      howMany: '4',
      timesPerSet: '8-12', 
      pic: '/images/exercises/miltaryPress.jpg',
      description: 'doing military press'
    },
    {
      name: 'Side Raises',
      howMany: '3', 
      timesPerSet: '12-15',
      pic: '/images/exercises/lateralRaise.jpg',
      description: 'lateral raise form'
    }
  ],
  arms: [ // triceps stuff
    {
      name: 'Cable Pushdowns',
      howMany: '3',
      timesPerSet: '12-15',
      pic: '/images/exercises/singleTricepPushdown.jpg',
      description: 'single arm pushdown'
    },
    {
      name: 'Over Head Extensions',
      howMany: '3',
      timesPerSet: '12-15',
      pic: '/images/exercises/overheadExtensions.jpg', 
      description: 'overhead extension form'
    }
  ]
}

// the main page 
function WorkoutPage() {
  // remember what exercises are completed
  const [doneExercises, setDoneExercises] = useState([])

  // toggle if its done or not
  const markAsDone = (exercise) => {
    setDoneExercises(done => {
      return done.includes(exercise) 
        ? done.filter(x => x !== exercise)
        : [...done, exercise]
    })
  }

  return (
    <div className="p-8" style={{maxWidth: '1200px', margin: '0 auto'}}>
      <h1 className="text-2xl mb-8">Push Day Exercises</h1>

      {/* chest */}
      <div style={{marginBottom: '3rem'}}>
        <h2 className="text-xl mb-6">
          › Chest Workouts
        </h2>
        {workouts.chest.map(exercise => (
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

      {/* shoulder exercises */}
      <div style={{marginBottom: '3rem'}}>
        <h2 className="text-xl mb-6">
          › Shoulder Stuff
        </h2>
        {workouts.shoulders.map(exercise => (
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

      {/* tricep stuff last */}
      <div style={{marginBottom: '3rem'}}>
        <h2 className="text-xl mb-6">
          › Tricep Exercises
        </h2>
        {workouts.arms.map(exercise => (
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

export default WorkoutPage
