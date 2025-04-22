import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

// handle when someone finishes their workout
export async function POST(req: Request) {
  try {
    // check if they logged in
    let authUser = await getServerSession(authOptions)

    if (!authUser?.user?.email) {
      return NextResponse.json(
        { error: 'hey, you need to login first!' },
        { status: 401 }
      )
    }

    // get what they did
    let execrises = await req.json()
    let { workoutType: workoutType, completedExercises: workoutCompleted } = execrises

    // find their account
    let currentUser = await prisma.user.findUnique({
      where: { 
        email: authUser.user.email 
      }
    })

    // uh oh they dont exist
    if (!currentUser) {
      return NextResponse.json(
        { error: 'cant find you in the system 🤔' },
        { status: 404 }
      )
    }

    // update user stats
    let updatedStats = await prisma.user.update({
      where: { 
        id: currentUser.id 
      },
      data: {
        // increment their numbers
        totalWorkouts: { 
          increment: 1  // add another workout
        },
        completedExercises: { 
          increment: workoutCompleted.length  // count what they finished
        },
        lastWorkoutDate: new Date(), // remember when they worked out
      }
    })

    return NextResponse.json({
      success: true,
      stats: {
        workouts: updatedStats.totalWorkouts,  // how many theyve done
        exercises: updatedStats.completedExercises,  // total exercises completed
      }
    })

  } catch (oops) {
    // error handling
    console.log('uh oh workout tracking broke:', oops)
    return NextResponse.json(
      { 
        error: 'something went wrong saving your workout 😢',
        errorMessage: oops?.message || 'not sure what happened'
      },
      { status: 500 }
    )
  }
} 