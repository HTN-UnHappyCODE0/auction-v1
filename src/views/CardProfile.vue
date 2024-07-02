<script setup lang="ts">
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {useUserStore} from '@/stores/userStore';
import {computed, onMounted, ref} from 'vue';
import {useGlobalLoader} from 'vue-global-loader';
import FileUploader from '@/components/FileUploader.vue';
import {useObjectUrl} from '@vueuse/core';

type PAYLOAD = {
	profile_id: number;
	user_id: string;
	fullname: string;
	phone: string;
	email: string;
	address: string;
	avatar_url: string;
	FileName: string;
	FileDate: File | undefined;
};

const form = ref<PAYLOAD>({
	profile_id: 0,
	user_id: '',
	fullname: '',
	phone: '',
	email: '',
	address: '',
	avatar_url: '',
	FileName: '',
	FileDate: undefined,
});

const {displayLoader, destroyLoader, isLoading} = useGlobalLoader();
const userStore = useUserStore();
const isAuthenticated = ref();
const fetchUserInfo = async () => {
	try {
		const UserInfo = await userStore.getUserInfo();
		console.log(UserInfo);

		if (UserInfo) {
			form.value.profile_id = UserInfo.userProfile?.profile_id;
			form.value.user_id = UserInfo.userProfile?.user_id;
			form.value.fullname = UserInfo.userProfile?.fullname;
			form.value.phone = UserInfo.userProfile?.phone;
			form.value.email = UserInfo.userProfile?.email;
			form.value.address = UserInfo.userProfile?.address;
			mainImagePreview.value.push(UserInfo.userProfile?.avatar_url);
		}
	} catch (error) {
		console.error(error);
	} finally {
	}
};
const userinfo = computed(() => userStore.UserData);

// image upload
const mainImagePreview = ref<string[]>([]);
const onMainImageDrop = (files: File[] | null) => {
	form.value.FileDate = files && files.length ? files[0] : undefined;
	if (files && files.length) {
		files.forEach((file, index) => {
			if (index == 0) {
				const url = useObjectUrl(file);
				if (url.value) {
					mainImagePreview.value = [];
					mainImagePreview.value.push(url.value);
				}
			}
		});
	}
};

const onSubmit = async () => {
	try {
		displayLoader();
		const userProfile = {
			profile_id: form.value.profile_id,
			user_id: form.value.user_id,
			fullname: form.value.fullname,
			phone: form.value.phone,
			email: form.value.email,
			address: form.value.address,
			avatar_url: form.value.avatar_url,
			FileName: form.value.FileName,
			FileDate: form.value.FileDate,
		};
		console.log(userProfile);

		const response = await userStore.updateUserInfo(userProfile, form.value.FileDate);

		console.log(response);
	} catch (error) {
		console.error(error);
	} finally {
		destroyLoader();
	}
};
const onMainImageChange = (files: FileList | null) => {
	form.value.FileDate = files && files.length ? files[0] : undefined;
	if (files && files.length) {
		Array.from(files).forEach((file, index) => {
			if (index == 0) {
				const url = useObjectUrl(file);
				if (url.value) {
					mainImagePreview.value = [];
					mainImagePreview.value.push(url.value);
				}
			}
		});
	}
};
onMounted(() => {
	const tokens = localStorage.getItem('currentAuthTokens');

	if (tokens) {
		isAuthenticated.value = true;
		fetchUserInfo();
	}
});
</script>
<template>
	<Card
		><form @submit.prevent="onSubmit" action="">
			<CardHeader>
				<CardTitle>profile</CardTitle>
				<CardDescription> Make changes to your profile here. Click save when you're done. </CardDescription>
			</CardHeader>
			<CardContent class="space-y-2">
				<div class="grid gap-2">
					<Label for="picture">Picture</Label>

					<div class="flex gap-3">
						<div class="grid w-full max-w-sm items-center gap-1.5">
							<FileUploader @on-change="onMainImageChange" @on-drop="onMainImageDrop" :multiple="false" />
						</div>

						<div class="flex gap-x-2 my-2">
							<img v-for="img in mainImagePreview" :src="img" class="h-40 w-auto object-cover border rounded-lg" />
						</div>
					</div>
				</div>

				<div class="space-y-1">
					<Label for="profile_id">profile_id</Label>
					<!-- Sử dụng v-bind để liên kết giá trị động -->
					<Input
						id="profile_id"
						type="number"
						placeholder="profile_id"
						v-model="form.profile_id"
						disabled
						:default-value="userinfo.userProfile?.profile_id || ''"
					/>
				</div>

				<div class="space-y-1">
					<Label for="user_id">user_id</Label>
					<Input
						id="user_id"
						type="text"
						placeholder="user_id"
						v-model="form.user_id"
						disabled
						:default-value="userinfo.userProfile?.user_id || ''"
					/>
				</div>
				<div class="space-y-1">
					<Label for="fullname">fullname</Label>
					<Input
						id="fullname"
						type="text"
						placeholder="fullname"
						v-model="form.fullname"
						:default-value="userinfo.userProfile?.fullname || ''"
					/>
				</div>

				<div class="space-y-1">
					<Label for="phone">phone</Label>
					<Input
						id="phone"
						type="text"
						placeholder="number"
						v-model="form.phone"
						:default-value="userinfo.userProfile?.phone || ''"
					/>
				</div>
				<div class="space-y-1">
					<Label for="address">address</Label>
					<Input
						id="address"
						type="text"
						placeholder="address"
						v-model="form.address"
						:default-value="userinfo.userProfile?.address || ''"
					/>
				</div>
			</CardContent>
			<CardFooter>
				<Button type="submit">Save changes</Button>
			</CardFooter>
		</form>
	</Card>
</template>
<style lang=""></style>
