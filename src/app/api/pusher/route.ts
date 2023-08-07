import Pusher from "pusher"

interface RequestBody {
  message: string
  sender: string
}



  export const pusher = new Pusher({
    appId: process.env.APP_ID ? process.env.APP_ID : '',
    key: process.env.KEY ? process.env.KEY : '',
    secret: process.env.SECRET ? process.env.SECRET : '',
    cluster: process.env.CLUSTER ? process.env.CLUSTER : '',
    useTLS: true,
  })


export async function POST(request: Request, response: Response) {
  const body: RequestBody = await request.json()
  const { message, sender } = body;
  const result = await pusher.trigger("chat", "chat-event", {
    message,
    sender,
  });

  return new Response(JSON.stringify({ message: "completed" }))

}