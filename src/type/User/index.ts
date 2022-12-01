import { ContactsType } from 'type/Contacts';
import { Nullable } from 'type/nullable';

export type UserType = {
  name: string;
  id: number;
  uniqueUrlName: null;
  photos: {
    small: Nullable<string>;
    large: Nullable<string>;
  };
  status: Nullable<string>;
  followed: boolean;
};

export type FetchUserType = {
  items: Array<UserType>;
  totalCount: number;
  error: null;
};

export type UserProfileType = {
  aboutMe: Nullable<string>;
  contacts: ContactsType;
  lookingForAJob: boolean;
  lookingForAJobDescription: Nullable<string>;
  fullName: Nullable<string>;
  userId: number;
  photos: {
    small: Nullable<string>;
    large: Nullable<string>;
  };
};

export type PhotosType = {
  small: string;
  large: string;
};

export type UpdateDateType = {
  aboutMe: Nullable<string>;
  contacts: ContactsType;
  lookingForAJob?: boolean;
  lookingForAJobDescription: Nullable<string>;
  fullName: Nullable<string>;
  userId?: number;
};
