import prisma from "@/lib/prisma"

interface RequestBody {
  data: {
    userId: string
    sessionId: string
    sessionName: string
  }
}

export async function POST(request:Request) {
  const body: RequestBody = await request.json()

  const session = await prisma.usersOnSessions.create({
    data: {
      userId: body.data.userId,
      sessionId: body.data.sessionId
    }
  })

  const sessionWithName = {...session, sessionName: body.data.sessionName}

  return new Response(JSON.stringify(sessionWithName))
}