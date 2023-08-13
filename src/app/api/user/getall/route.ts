import prisma from "@/lib/prisma"
import * as bcrypt from 'bcrypt'

export async function GET(request:Request) {

  const users = await prisma.user.findMany({
    include: {
      sessions: {
        include: {
          session: {
            select: {
              name: true
            }
          }
        }
      }
    }
  })
  const usersWithouPass = users.map(user => (
    {
      id: user.id,
      name: user.name,
      sessions: user.sessions.map(session => (
        {
          id: session.sessionId,
          name: session.session.name
        }
      ))
    }
  ))
  return new Response(JSON.stringify(usersWithouPass))
}

export const revalidate = 0