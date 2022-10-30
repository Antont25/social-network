let ws: WebSocket | null = null
let subscriber = [] as SubscriberType[]

const messageHandler = (e: WebSocketEventMap['message']) => {
    const newMessage = JSON.parse(e.data)
    subscriber.forEach(el => el(newMessage))
}

let closeID: NodeJS.Timer

const closeHandler = (e: WebSocketEventMap['close']) => {
    clearInterval(closeID)
    closeID = setInterval(() => ChatApi.start(), 3000)

}

const openHandler = () => {
    clearInterval(closeID)
    subscriber.forEach(el => el(null))

}

export const ChatApi = {
    start: () => {

        ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')


        ws?.addEventListener('message', messageHandler)
        ws?.addEventListener('close', closeHandler)
        ws?.addEventListener('open', openHandler)

    },
    subscriber: (cb: SubscriberType) => {
        subscriber.push(cb)

    },
    stop: () => {
        if (ws) {
            ws.close()
            subscriber = []
        }
    },
    setNewMessage: (message: string) => {
        ws?.send(message)
    }

}

//type
export type MessageType = {
    photo: string
    message: string
    userName: string
    userId: number
}
type SubscriberType = (message: MessageType[] | null) => void
