<script setup lang="ts">
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import TheHeader from '@/components/theHeader.vue';
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import {RouterLink, useRouter} from 'vue-router';
import {ref} from 'vue';
import {useAuthStore} from '@/stores/authStore';

type PAYLOAD = {email: string; password: string};
const form = ref<PAYLOAD>({email: '', password: ''});
const router = useRouter();
const authStore = useAuthStore();
const errors = ref<{email: string; password: string}>({email: '', password: ''});

const validateEmail = (email: string): boolean => {
	const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return emailPattern.test(email);
};

const validatePassword = (password: string): boolean => {
	const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
	return passwordPattern.test(password);
};

const onSubmit = async () => {
	errors.value = {email: '', password: ''};

	if (!validateEmail(form.value.email)) {
		errors.value.email = 'Email invalidate.';
		return;
	}

	if (!validatePassword(form.value.password)) {
		errors.value.password =
			'Password must be from 8 to 20 characters, including uppercase letters, lowercase letters, special characters and numbers.';
		return;
	}

	try {
		await authStore.registerUser(form.value);
		router.push('/');
	} catch (error) {
		console.error(error);
	} finally {
		form.value = {email: '', password: ''};
	}
};
</script>

<template>
	<div class="min-h-screen">
		<TheHeader />
		<div class="flex justify-center items-center mt-10">
			<div class="mx-auto w-full max-w-md">
				<form @submit.prevent="onSubmit">
					<Card class="overflow-y-auto">
						<CardHeader class="space-y-1">
							<CardTitle class="text-2xl font-semibold">Register account</CardTitle>
							<CardDescription>Register your account.</CardDescription>
						</CardHeader>
						<CardContent class="grid gap-4">
							<div class="grid gap-2">
								<Label for="email">Email</Label>
								<Input id="email" type="email" placeholder="email" v-model="form.email" />
								<span class="text-red-600">{{ errors.email }}</span>
							</div>
							<div class="grid gap-2">
								<Label for="password">Password</Label>
								<Input id="password" type="password" placeholder="password" v-model="form.password" />
								<span class="text-red-600">{{ errors.password }}</span>
							</div>
						</CardContent>
						<CardFooter class="flex-col space-y-2">
							<Button class="w-full" type="submit">Register</Button>
							<p>
								Have an account?
								<RouterLink to="/auth/login" class="border-b border-gray-500 text-muted-foreground hover:text-primary">
									Login
								</RouterLink>
							</p>
						</CardFooter>
					</Card>
				</form>
			</div>
		</div>
	</div>
</template>
