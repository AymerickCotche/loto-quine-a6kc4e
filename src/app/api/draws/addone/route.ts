import { NextResponse } from "next/server"

import prisma from "@/lib/prisma"
import { pusherServer } from "@/lib/pusher"

export async function POST(req: Request, res: Response) {

  try {
    const body = await req.json()
    
    const results = await prisma.draw.create({
      data: {
        name: body.name,
      }
    })
    
    await pusherServer.trigger('test', 'number:new', results)

    return NextResponse.json(results)

  } catch (err) {
    console.log(err);
    return NextResponse.json({error: err})
  }
};