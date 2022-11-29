import { ContactsType } from 'type/Contacts';

export type UserType = {
  name: string;
  id: number;
  uniqueUrlName: null;
  photos: {
    small: null | string;
    large: null | string;
  };
  status: null | string;
  followed: boolean;
};

export type FetchUserType = {
  items: Array<UserType>;
  totalCount: number;
  error: null;
};

export type UserProfileType = {
  aboutMe: string | null;
  contacts: ContactsType;
  lookingForAJob: boolean;
  lookingForAJobDescription: string | null;
  fullName: string | null;
  userId: number;
  photos: {
    small: string | null;
    large: string | null;
  };
};

export type PhotosType = {
  small: string;
  large: string;
};

export type UpdateDateType = {
  aboutMe: string | null;
  contacts: ContactsType;
  lookingForAJob?: boolean;
  lookingForAJobDescription: string | null;
  fullName: string | null;
  userId?: number;
};
