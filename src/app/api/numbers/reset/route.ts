import { NextResponse } from "next/server"

import prisma from "@/lib/prisma"


export async function POST(req: Request, res: Response) {

  try {
    await prisma.number.updateMany({
      where: {
        drawn: true
      },
      data: {
        drawn: false
      }
    })
    


    return NextResponse.json({done: 'ok'})

  } catch (err) {
    console.log(err);
    return NextResponse.json({error: err})
  }
};