import { SubscriberType } from 'type';

let subscribers = [] as SubscriberType[];

export const chatApi = {
  ws: null as null | WebSocket,
  subscribers: [] as SubscriberType[],
  closeID: 0,

  start() {
    this.ws = new WebSocket(
      'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx',
    );

    this.ws?.addEventListener('message', this.messageHandler);
    this.ws?.addEventListener('close', this.closeHandler.bind(this));
    this.ws?.addEventListener('open', this.openHandler);
  },
  subscriber(cb: SubscriberType) {
    subscribers.push(cb);
  },
  stop() {
    if (this.ws) {
      this.ws.close();
      subscribers = [];
    }
  },
  setNewMessage(message: string) {
    this.ws?.send(message);
  },
  // eslint-disable-next-line no-undef
  messageHandler(e: WebSocketEventMap['message']) {
    const newMessage = JSON.parse(e.data);

    subscribers.forEach(el => el(newMessage));
  },

  closeHandler() {
    if (subscribers.length > 0) {
      clearInterval(this.closeID);
      // @ts-ignore
      // eslint-disable-next-line no-magic-numbers
      this.closeID = setInterval(() => ChatApi.start(), 3000);
    }
  },

  openHandler() {
    clearInterval(this.closeID);
    subscribers.forEach(el => el(null));
  },
};
