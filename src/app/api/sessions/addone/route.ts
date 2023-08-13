import prisma from "@/lib/prisma"

interface RequestBody {
  name: string
  date: string
  status: boolean
}

export async function POST(request:Request) {
  const body: RequestBody = await request.json()

  const session = await prisma.session.create({
    data: {
      name: body.name,
      date: body.date,
      status: body.status
    }
  })

  return new Response(JSON.stringify(session))
}