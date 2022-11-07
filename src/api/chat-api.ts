let _subscriber = [] as SubscriberType[];

export const ChatApi = {
  ws: null as null | WebSocket,
  _subscriber: [] as SubscriberType[],
  closeID: 0,

  start() {
    this.ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")

    this.ws?.addEventListener("message", this._messageHandler)
    this.ws?.addEventListener("close", this._closeHandler.bind(this))
    this.ws?.addEventListener("open", this._openHandler)


  },
  subscriber( cb: SubscriberType ) {
    _subscriber.push(cb)
  },
  stop() {
    if (this.ws) {
      this.ws.close()
      _subscriber = []
    }
  },
  setNewMessage( message: string ) {
    this.ws?.send(message)
  },
  _messageHandler( e: WebSocketEventMap["message"] ) {
    const newMessage = JSON.parse(e.data)
    _subscriber.forEach(el => el(newMessage))
  },


  _closeHandler( e: WebSocketEventMap["close"] ) {
    if (_subscriber.length > 0) {
      debugger
      console.log(this)
      clearInterval(this.closeID)
      // @ts-ignore
      this.closeID = setInterval(() => ChatApi.start(), 3000)
    }

  },

  _openHandler() {
    clearInterval(this.closeID)
    _subscriber.forEach(el => el(null))
  }
}

//type
export type MessageType = {
  photo: string
  message: string
  userName: string
  userId: number
}
type SubscriberType = ( message: MessageType[] | null ) => void
