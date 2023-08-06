import { verifyJwt } from "@/lib/jwt";
import prisma from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const accessToken = request.headers.get("authorization");
  if (!accessToken || !verifyJwt(accessToken)) {
    return new Response(
      JSON.stringify({
        error: "unauthorized",
      }),
      {
        status: 401,
      }
    );
  }
  const userPosts = await prisma.card.findMany({
    where: { userId: params.id },
    include: {
      user: {
        select: {
          name: true,
        },
      },
      numbers: {
        select: {
          number: {
            select: {
              id: true,
              value: true
            }
          },
        },
      },
    },
  });

  return new Response(JSON.stringify(userPosts));
}