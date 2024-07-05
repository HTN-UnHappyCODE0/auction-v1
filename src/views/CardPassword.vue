<script setup lang="ts">
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {useUserStore} from '@/stores/userStore';
import {ref} from 'vue';
import {Toaster} from '@/components/ui/toast';
import {useToast} from '@/components/ui/toast/use-toast';

type PAYLOAD = {
	oldPassword: string;
	newPassword: string;
};

const form = ref<PAYLOAD>({
	oldPassword: '',
	newPassword: '',
});
const {toast} = useToast();

const userStore = useUserStore();

const onSubmit = async () => {
	try {
		await userStore.updatePassword(form.value.oldPassword, form.value.newPassword);
		toast({
			class: 'bg-green-500 text-white',
			title: 'Password changed successfully',
			description: 'Password changed successfully.',
		});
	} catch (error) {
		console.error(error);
		toast({
			class: 'bg-red-500 text-white',
			title: 'Password changed failed',
			description: 'Failed to change password.',
		});
	} finally {
	}
};
</script>
<template>
	<Toaster />
	<Card>
		<form @submit.prevent="onSubmit">
			<CardHeader>
				<CardTitle>Password</CardTitle>
				<CardDescription> Change your password here. After saving, you'll be logged out. </CardDescription>
			</CardHeader>
			<CardContent class="space-y-2">
				<div class="space-y-1">
					<Label for="current">Current password</Label>
					<Input id="current" type="password" v-model="form.oldPassword" />
				</div>
				<div class="space-y-1">
					<Label for="new">New password</Label>
					<Input id="new" type="password" v-model="form.newPassword" />
				</div>
			</CardContent>
			<CardFooter>
				<Button type="submit">Save password</Button>
			</CardFooter>
		</form>
	</Card>
</template>
