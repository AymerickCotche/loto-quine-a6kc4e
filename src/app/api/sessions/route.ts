import { NextResponse } from "next/server"
import { revalidatePath } from 'next/cache'

import prisma from "@/lib/prisma"


export async function POST(req: Request, res: Response) {
  try {
    const res = await req.json()
    const results = await prisma.usersOnSessions.findMany({
      where: {
        userId: res.userId ? res.userId: ''
      },
      include: {
        session: true
      }
    });


    return NextResponse.json(results)

  } catch (err) {
    console.log(err);
    return NextResponse.json({error: err})
  }
}

export const revalidate = 0