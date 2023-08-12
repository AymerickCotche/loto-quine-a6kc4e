import { NextResponse } from "next/server"
import { revalidatePath } from 'next/cache'

import prisma from "@/lib/prisma"

interface TestObj {
  numberValue: string
}
export async function POST(req: Request, res: Response) {
  try {
    const res = await req.json()

    const results = await prisma.card.create({
      data: {
        userId: res.userId,
        sessionId: res.sessionId,
        name: res.cardName,
        numbers: {
          createMany: {
            data: res.numbers.map((number: string) => ({numberValue: number}))
          }
        }
      }
    });

    console.log(results)
    return NextResponse.json(results)

  } catch (err) {
    console.log(err);
    return NextResponse.json({error: err})
  }
}

export const revalidate = 0