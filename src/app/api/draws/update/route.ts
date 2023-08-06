import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request, res: Response) {

  try {
    const res = await req.json()
    
    const results = await prisma.numbersOnDraws.create({
      data: {
        numberId: res.numberId,
        drawId: res.drawId
      }
    })

    
    return NextResponse.json(results)

  } catch (err) {
    console.log(err);
    return NextResponse.json({error: err})
  }
};