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
import router from '@/router';

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

const components: {title: string; href: string}[] = [
	{
		title: 'Style',
		href: '/api/Product/filter?styles=fine_art',
	},
	{
		title: 'Subject',
		href: '/docs/primitives/hover-card',
	},
	{
		title: 'Progress',
		href: '/docs/primitives/progress',
	},
	{
		title: 'Medium',
		href: '/docs/primitives/scroll-area',
	},
];

onMounted(() => {
	const tokens = localStorage.getItem('currentAuthTokens');

	if (tokens) {
		isAuthenticated.value = true;
		fetchUserInfo();
	}
});

const logout = () => {
	localStorage.removeItem('currentAuthTokens');
	isAuthenticated.value = false;
};
</script>

<template>
	<div class="block">
		<div class="relative z-10 w-full flex flex-col">
			<div class="w-full h-11 flex items-center justify-end border-b">
				<!-- Conditional Rendering Based on Authentication State -->
				<div v-if="!isAuthenticated">
					<RouterLink
						to="/auth/login"
						class="border-r-0 border-white px-3 text-base font-semibold border-r-black hover:underline hover:text-blue-800"
					>
						log in
					</RouterLink>
					<RouterLink
						to="/auth/register"
						class="border-l-2 border-white px-3 text-base font-semibold border-l-black hover:underline hover:text-blue-800"
					>
						register
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
				<div class="relative w-72 max-w-sm items-center">
					<Input id="search1" type="text" placeholder="Search..." class="pl-10" />
					<span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
						<Search class="size-6 text-muted-foreground" />
					</span>
				</div>
			</div>
		</div>
	</div>
</template>
