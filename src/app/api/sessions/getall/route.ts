import prisma from "@/lib/prisma"
import * as bcrypt from 'bcrypt'

export async function GET(request:Request) {

  const sessions = await prisma.session.findMany()
  
  const formatedSessions = sessions.map(session => ({
    sessionId: session.id,
    name: session.name,
    date: session.date,
    status: session.status
  }))
  return new Response(JSON.stringify(formatedSessions))
}

export const revalidate = 0