import { PhotosType } from 'type/User';

export type PhotosTypeResponse = {
  photos: PhotosType;
};

export type ResponseType<T = {}> = {
  resultCode: number;
  messages: string[];
  data: T;
};
