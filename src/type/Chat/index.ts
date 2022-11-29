export type MessageType = {
  photo: string;
  message: string;
  userName: string;
  userId: number;
};
export type SubscriberType = (message: MessageType[] | null) => void;
