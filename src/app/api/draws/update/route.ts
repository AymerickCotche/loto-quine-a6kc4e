import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

import { pusherServer } from "@/lib/pusher"

export async function POST(req: Request, res: Response) {

  try {
    const res = await req.json()
    
    const results = await prisma.numbersOnDraws.create({
      data: {
        numberId: res.numberId,
        drawId: res.drawId
      }
    })
    
    await pusherServer.trigger('test', 'number:new', res.numberValue)

    return NextResponse.json(res)

  } catch (err) {
    console.log(err);
    return NextResponse.json({error: err})
  }
};