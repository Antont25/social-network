import { instance } from 'api/config';
import { AuthorizedUserType, ResponseType } from 'type';

export const authorizedApi = {
  async authorizedMe() {
    const response = await instance.get<ResponseType<AuthorizedUserType>>(`auth/me`);

    return response.data;
  },

  async logout() {
    const response = await instance.delete<ResponseType>(`auth/login`);

    return response.data;
  },

  async getCaptchaURL() {
    const response = await instance.get<{ url: string }>(`security/get-captcha-url`);

    return response.data;
  },

  async authorize(email: string, password: string, captcha: string) {
    const response = await instance.post<ResponseType<{ id: number }>>(`auth/login`, {
      email,
      password,
      captcha,
    });

    return response.data;
  },
};
