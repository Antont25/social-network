import { instance } from 'api/config';
import { FetchUserType, UserProfileType } from 'type';

export const userApi = {
  async getUser(currentPage: number, searchName: string = '') {
    const response = await instance.get<FetchUserType>(
      `users?page=${currentPage}&term=${searchName}`,
    );

    return response.data;
  },

  async getUserProfile(paramsURL: number) {
    const response = await instance.get<UserProfileType>(`profile/${paramsURL}`);

    return response.data;
  },

  async getStatusUser(userId: number) {
    const response = await instance.get<string | null>(`profile/status/${userId}`);

    return response.data;
  },
};
