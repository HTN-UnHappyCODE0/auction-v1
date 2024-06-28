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

const {displayLoader, destroyLoader, isLoading} = useGlobalLoader();
const userStore = useUserStore();
const isAuthenticated = ref();
const fetchUserInfo = async () => {
	try {
		displayLoader();
		await userStore.getUserInfo();
	} catch (error) {
		console.error(error);
	} finally {
		destroyLoader();
	}
};

const userinfo = computed(() => userStore.UserData);
console.log(userinfo);
onMounted(() => {
	const tokens = localStorage.getItem('currentAuthTokens');

	if (tokens) {
		isAuthenticated.value = true;
		fetchUserInfo();
	}
});
</script>
<template>
	<Card>
		<CardHeader>
			<CardTitle>profile</CardTitle>
			<CardDescription> Make changes to your profile here. Click save when you're done. </CardDescription>
		</CardHeader>
		<CardContent class="space-y-2">
			<div class="grid w-full max-w-sm items-center gap-1.5">
				<Label for="picture">Picture</Label>
				<div class="flex gap-4">
					<Input id="picture" type="file" />
					<Avatar>
						<AvatarImage src="" alt="@radix-vue" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				</div>
			</div>

			<div class="space-y-1">
				<Label for="profile_id">profile_id</Label>
				<!-- Sử dụng v-bind để liên kết giá trị động -->
				<Input id="profile_id" disabled :default-value="userinfo.userProfile?.profile_id || ''" />
			</div>

			<div class="space-y-1">
				<Label for="user_id">user_id</Label>
				<Input id="user_id" disabled :default-value="userinfo.userProfile?.user_id || ''" />
			</div>
			<div class="space-y-1">
				<Label for="fullname">fullname</Label>
				<Input id="fullname" :default-value="userinfo.userProfile?.fullname || ''" />
			</div>

			<div class="space-y-1">
				<Label for="phone">phone</Label>
				<Input id="phone" :default-value="userinfo.userProfile?.phone || ''" />
			</div>
			<div class="space-y-1">
				<Label for="address">address</Label>
				<Input id="address" :default-value="userinfo.userProfile?.address || ''" />
			</div>
		</CardContent>
		<CardFooter>
			<Button>Save changes</Button>
		</CardFooter>
	</Card>
</template>
<style lang=""></style>
