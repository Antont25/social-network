import { Nullable } from 'type/nullable';

export type AuthorizedUserType = {
  id: Nullable<number>;
  email: Nullable<string>;
  login: Nullable<string>;
};
