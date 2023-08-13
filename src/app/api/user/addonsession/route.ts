import prisma from "@/lib/prisma"

interface RequestBody {
  userId: string
  sessionId: string
}

export async function POST(request:Request) {
  const body: RequestBody = await request.json()

  const session = await prisma.usersOnSessions.create({
    data: {
      userId: body.userId,
      sessionId: body.sessionId
    }
  })

  return new Response(JSON.stringify(session))
}