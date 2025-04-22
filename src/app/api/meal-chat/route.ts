import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai= process.env.OPENAI_API_KEY;
if (!openai) throw new Error('no api key found!');

const ai = new OpenAI({ apiKey: openai });

export async function POST(req: Request) {
  try {
    let meals = await req.json();
    let foodAvailable = meals.availableFoods;

    if (!foodAvailable?.length) {
      return NextResponse.json(
        { error: 'please provide some ingredients!' },
        { status: 400 }
      );
    }

    let getUserInput = `Create a meal plan using these ingredients: ${foodAvailable.join(', ')}


Please format each meal as follows:
Breakfast:
- Ingredients that are used
- The average protein content of the meal
- Clear step by step instructions

Lunch:
- Ingredients that are used
- The average protein content of the meal
- Clear step by step instructions

Dinner:
- Ingredients that are used
- The average protein content of the meal
- Clear step by step instructions

Snack 1:
- Ingredients used
- The average protein content of the meal
- Clear step by step instructions

Snack 2:
- Ingredients used
- The average protein content of the meal
- Clear step by step instructions

Important:
- Focus on high-protein combinations
- Use only the available ingredients
- Keep instructions clear and simple
- Show protein content for each meal`;

    let food = await ai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: "You are a professional nutritionist who specializes in creating healthy, high-protein meal plans." 
        },
        { 
          role: "user", 
          content: getUserInput 
        }
      ],
      temperature: 0.7,
      max_tokens: 1500
    });

    let recipe = food.choices[0].message.content;
    console.log('Here is your meal plan:', recipe);

    return NextResponse.json({ mealPlan: recipe });

  } catch (error: any) {
    console.log('failed to create meal plan:', error);
    
    if (error?.code === 'invalid_api_key') {
      return NextResponse.json(
        {
          error: 'AI chat bot not working',
          details: 'key is broken'
        },
        { status: 500 }
      );
    }
    
    if (error?.code === 'insufficient_quota') {
      return NextResponse.json(
        {
          error: 'Need more ai call credits',
          details: 'need more tokens'
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error: 'meal plan failed :(',
        details: error?.message || 'error detected'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ai working!',
    message: 'ready to make meals'
  });
} 