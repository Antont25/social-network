import { instance } from 'api/config';
import { PhotosTypeResponse, ResponseType, UpdateDateType } from 'type';

export const profileApi = {
  async statusUpdates(newStatus: string) {
    const response = await instance.put<ResponseType>(`profile/status`, {
      status: newStatus,
    });

    return response.data;
  },

  async getStatusUser(userId: number) {
    const response = await instance.get<string | null>(`profile/status/${userId}`);

    return response.data;
  },

  async savePhoto(image: string) {
    const bodyFormData = new FormData();

    bodyFormData.append('image', image);

    const response = await instance.put<ResponseType<PhotosTypeResponse>>(
      `profile/photo`,
      bodyFormData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );

    return response.data;
  },

  async unFollowUser(usersId: number) {
    const response = await instance.delete<ResponseType>(`follow/${usersId}`);

    return response.data;
  },

  async followUser(usersId: number) {
    const response = await instance.post<ResponseType>(`follow/${usersId}`);

    return response.data;
  },

  async updateContacts(data: UpdateDateType) {
    const response = await instance.put<ResponseType>(`profile`, data);

    return response.data;
  },
};
