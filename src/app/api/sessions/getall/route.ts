import prisma from "@/lib/prisma"
import * as bcrypt from 'bcrypt'

export async function GET(request:Request) {

  const sessions = await prisma.session.findMany()
  
  return new Response(JSON.stringify(sessions))
}

export const revalidate = 0