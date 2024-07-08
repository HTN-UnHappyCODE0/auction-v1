<script setup lang="ts">
import {Button} from '@/components/ui/button';
import TheHeader from '@/components/theHeader.vue';
import {useToast} from '@/components/ui/toast/use-toast';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {RouterLink, useRouter} from 'vue-router';
import {ref} from 'vue';
import {useAuthStore} from '@/stores/authStore';
import {useProductStore} from '@/stores/productStore';
import {Toaster} from '@/components/ui/toast';

const {toast} = useToast();

type PAYLOAD = {email: string; password: string};
const form = ref<PAYLOAD>({email: '', password: ''});
const router = useRouter();
const authStore = useAuthStore();
const productStore = useProductStore();

const onSubmit = async () => {
	try {
		await authStore.loginUser(form.value);

		router.push('/');
	} catch (error) {
		console.error(error);
		toast({
			class: 'bg-red-500 text-white',
			title: 'Login Failed',
			description: 'Invalid email or password. Please try again.',
		});
	}
};
</script>

<template>
	<Toaster />
	<div class="min-h-screen">
		<TheHeader />
		<div class="flex justify-center items-center mt-10">
			<div class="mx-auto w-full max-w-md">
				<form @submit.prevent="onSubmit">
					<Card class="overflow-y-auto">
						<CardHeader class="space-y-1">
							<CardTitle class="text-2xl font-semibold">Login account</CardTitle>
							<CardDescription>Login your account.</CardDescription>
						</CardHeader>
						<CardContent class="grid gap-4">
							<div class="grid gap-2">
								<Label for="email">Email</Label>
								<Input id="email" type="email" placeholder="Email" v-model="form.email" />
							</div>
							<div class="grid gap-2">
								<Label for="password">Password</Label>
								<Input id="password" type="password" placeholder="Password" v-model="form.password" />
							</div>
						</CardContent>
						<CardFooter class="flex-col space-y-2">
							<Button class="w-full" type="submit">Login</Button>
							<p>
								Don't have an account?
								<RouterLink to="/auth/register" class="border-b border-gray-500 text-muted-foreground hover:text-primary"
									>Register</RouterLink
								>
							</p>
						</CardFooter>
					</Card>
				</form>
			</div>
		</div>
	</div>
</template>
