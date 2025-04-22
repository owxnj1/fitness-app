'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    completedExercises: 0,
    workoutStreak: 0
  })

  // Fetch user stats when component mounts
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/user/stats')
        const data = await response.json()
        if (data.success) {
          setStats({
            totalWorkouts: data.stats.totalWorkouts,
            completedExercises: data.stats.completedExercises,
            workoutStreak: calculateStreak(data.stats.lastWorkoutDate)
          })
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      }
    }

    if (session?.user) {
      fetchStats()
    }
  }, [session])

  // Calculate streak based on last workout date
  const calculateStreak = (lastWorkoutDate: string | null) => {
    if (!lastWorkoutDate) return 0
    
    const lastWorkout = new Date(lastWorkoutDate)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - lastWorkout.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    return diffDays <= 1 ? 1 : 0 // Basic streak calculation
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Please log in to view your profile</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>

        <div className="space-y-6">
          {/* User Details */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-xl font-semibold mb-4">Account Information</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Username
                </label>
                <div className="mt-1 text-lg">
                  {session.user.username}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <div className="mt-1 text-lg">
                  {session.user.email}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Member Since
                </label>
                <div className="mt-1 text-lg">
                  {session.user.createdAt 
                    ? new Date(session.user.createdAt).toLocaleDateString()
                    : 'Not available'}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Workout Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Total Workouts</div>
                <div className="text-2xl font-bold">{stats.totalWorkouts}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Completed Exercises</div>
                <div className="text-2xl font-bold">{stats.completedExercises}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Workout Streak 🔥</div>
                <div className="text-2xl font-bold flex items-center gap-2">
                  {stats.workoutStreak} days
                  <span className="animate-pulse text-2xl">🔥</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

