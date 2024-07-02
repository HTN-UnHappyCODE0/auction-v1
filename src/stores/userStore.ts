import type {UserInfoData, UserProfile} from '@/types';
import axios from '../plugins/axios';
import {defineStore} from 'pinia';

export const useUserStore = defineStore('UserStore', {
	state: () => ({
		UserData: {} as UserInfoData,
		loading: false,
	}),

	actions: {
		async getUserInfo() {
			return new Promise<UserInfoData>(async (resolve, reject) => {
				try {
					this.loading = true;
					const {data} = await axios.get<UserInfoData>('/api/User/info');

					this.UserData = data;

					resolve(data);
				} catch (error) {
					reject(error);
				}
			});
		},
		async updatePassword(oldPassword: string, newPassword: string) {
			return new Promise<void>(async (resolve, reject) => {
				try {
					this.loading = true;
					await axios.post('/api/User/reset-password', {
						oldPassword,
						newPassword,
					});

					resolve();
				} catch (error) {
					reject(error);
				} finally {
					this.loading = false;
				}
			});
		},
		async updateUserInfo(userProfile: UserProfile, avatarFile?: File) {
			return new Promise<void>(async (resolve, reject) => {
				try {
					this.loading = true;
					let avatarUrl = this.UserData.userProfile.avatar_url;

					if (avatarFile) {
						const formData = new FormData();
						formData.append('FileData', avatarFile);

						const uploadResponse = await axios.post<{FileName: string}>('/api/Asset/avatar/upload', formData, {
							headers: {
								'Content-Type': 'multipart/form-data',
							},
						});

						avatarUrl = uploadResponse.data.FileName;
					}

					await axios.put('/api/UserProfile', {
						...userProfile,
						avatar_url: avatarUrl,
					});

					this.UserData.userProfile = {
						...this.UserData.userProfile,
						...userProfile,
						avatar_url: avatarUrl,
					};

					resolve();
				} catch (error) {
					reject(error);
				} finally {
					this.loading = false;
				}
			});
		},
	},
});
