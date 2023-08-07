import PusherServer from "pusher"
import PusherClient from "pusher-js"

export const pusherServer = new PusherServer({
  appId: process.env.APP_ID!,
  key: process.env.NEXT_PUBLIC_APP_KEY!,
  secret: process.env.SECRET!,
  cluster: process.env.CLUSTER!,
  useTLS: true,
})


export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_APP_KEY!,
  {
    cluster: 'eu'
  }
  
)

