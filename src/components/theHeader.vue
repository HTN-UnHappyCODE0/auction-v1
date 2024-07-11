<script setup lang="ts">
import {RouterLink, useRouter} from 'vue-router';
import Logo from '@/components/iconLogo.vue';
import {Search} from 'lucide-vue-next';
import {Input} from '@/components/ui/input';
import ListItem from './ui/listItem.vue';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {useUserStore} from '@/stores/userStore';
import {useGlobalLoader} from 'vue-global-loader';
import {computed, onMounted, ref} from 'vue';
import {Button} from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	DropdownMenuShortcut,
	DropdownMenuPortal,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';

import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {Toaster, useToast} from '@/components/ui/toast';
import {Label} from '@/components/ui/label';

const {displayLoader, destroyLoader, isLoading} = useGlobalLoader();
const userStore = useUserStore();
const isAuthenticated = ref<boolean>(false);
const userinfo = computed(() => userStore.UserData);
const inputproductname = ref('');
import {useProductStore} from '@/stores/productStore';
import {useAuthStore} from '@/stores/authStore';

const ProductStore = useProductStore();

const fetchUserInfo = async () => {
	try {
		displayLoader();
		await userStore.getUserInfo();
		isAuthenticated.value = true;
	} catch (error) {
		console.error(error);
		isAuthenticated.value = false;
	} finally {
		destroyLoader();
	}
};

const fetchProducts = async () => {
	try {
		displayLoader();
		await ProductStore.getProduct({
			product_name: inputproductname.value,
		});
	} catch (error) {
		console.error(error);
	} finally {
		destroyLoader();
	}
};

onMounted(() => {
	const tokens = localStorage.getItem('currentAuthTokens');
	if (tokens) {
		fetchUserInfo();
	}
});

const logout = () => {
	localStorage.removeItem('currentAuthTokens');
	isAuthenticated.value = false;
	router.push('/auth/login');
};
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
	<div class="block">
		<div class="relative z-10 w-full flex flex-col">
			<div class="w-full h-11 flex items-center justify-end border-b">
				<!-- Conditional Rendering Based on Authentication State -->
				<div v-if="!isAuthenticated">
					<Dialog>
						<DialogTrigger as-child>
							<Button variant="link" class="hover:text-">log in </Button>
						</DialogTrigger>
						<DialogContent>
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
											<RouterLink
												to="/auth/register"
												class="border-b border-gray-500 text-muted-foreground hover:text-primary"
												>Register</RouterLink
											>
										</p>
									</CardFooter>
								</Card>
							</form>
						</DialogContent>
					</Dialog>
					<RouterLink
						to="/auth/register"
						class="border-l-2 border-white px-4 py-2 text-sm font-semibold border-l-black hover:underline hover:text-blue-800"
						>register
					</RouterLink>
				</div>
				<div v-if="isAuthenticated" class="pr-5">
					<div class="flex items-center">
						<a class="flex items-center" href="">
							<div class="w-10 h-10 rounded-full flex">
								<div class="absolute">
									<div class="bg-inherit">
										<img
											:src="
												userinfo.userProfile?.avatar_url || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
											"
											alt=""
											class="w-10 h-10 block object-cover rounded-full pointer-events-none"
										/>
									</div>
								</div>
							</div>

							<DropdownMenu>
								<DropdownMenuTrigger as-child>
									<Button class="border-none bg-inherit shadow-none text-black hover:bg-inherit">
										{{ userinfo.userProfile?.fullname }}
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent class="w-56 mr-5">
									<DropdownMenuLabel>My Account</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuGroup>
										<router-link :to="{name: 'user-profile', params: {id: 1}}">
											<DropdownMenuItem>
												<span>Profile</span>
												<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
											</DropdownMenuItem>
										</router-link>
										<DropdownMenuItem>
											<span>Bidding</span>
											<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<span>Settings</span>
											<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
										</DropdownMenuItem>
									</DropdownMenuGroup>
									<DropdownMenuSeparator />
									<DropdownMenuItem @click="logout">
										<span>Log out</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</a>
					</div>
				</div>
			</div>

			<div class="h-16 px-6 flex justify-between items-center border-b">
				<Logo class="w-72" />
				<div class="flex items-center">
					<NavigationMenu>
						<NavigationMenuList>
							<!-- <NavigationMenuItem>
								<router-link to="/product">
									<NavigationMenuTrigger>Artwork</NavigationMenuTrigger>
								</router-link>
								<NavigationMenuContent>
									<ul class="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[minmax(1,.75fr)_minmax(0,1fr)]">
										<li class="row-span-3">
											<NavigationMenuLink as-child>
												<a
													class="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted no-underline outline-none focus:shadow-md"
													href="/"
												>
													<img
														src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/ed8945107807709.5faf55c2affa5.jpg"
														class="h-full w-full"
													/>
												</a>
											</NavigationMenuLink>
										</li>
										<li class="grid gap-3 p-4 md:grid-cols-4">
											<ListItem
												v-for="component in components"
												:key="component.title"
												:title="component.title"
												:href="component.href"
											/>
										</li>
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem> -->
							<router-link to="/product">
								<NavigationMenuLink :class="navigationMenuTriggerStyle()">Artwork</NavigationMenuLink>
							</router-link>
							<router-link to="/auction">
								<NavigationMenuItem>
									<NavigationMenuLink :class="navigationMenuTriggerStyle()">Auction</NavigationMenuLink>
								</NavigationMenuItem>
							</router-link>
						</NavigationMenuList>
					</NavigationMenu>
				</div>
				<div class="relative w-72 max-w-sm items-center"></div>
			</div>
		</div>
	</div>
</template>
