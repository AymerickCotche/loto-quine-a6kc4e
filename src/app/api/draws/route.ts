import { NextResponse, NextRequest } from "next/server"
import { revalidatePath } from 'next/cache'

import prisma from "@/lib/prisma"


export async function GET(request:NextRequest) {
  try {
    const path = request.nextUrl.searchParams.get('path')
    revalidatePath(path!)
    const results = await prisma.draw.findMany({
      include: {
        numbers: {
          select: {
            number: {
              select : {
                value: true
              }
            }
          }
        }
      }
    });

    const formatedResults = []

    for (const result of results) {
      const numberArray = []
      for (const number of result.numbers) {
        numberArray.push(number.number.value)
      }
      formatedResults.push({
        id: result.id,
        name: result.name,
        numbers: numberArray
      })
    }
    return NextResponse.json(formatedResults)

  } catch (err) {
    console.log(err);
    return NextResponse.json({error: err})
  }
};