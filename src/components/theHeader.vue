<template>
	<div class="block">
		<div class="relative z-10 w-full flex flex-col">
			<div class="w-full h-11 flex items-center justify-end border-b">
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
			<div class="h-16 px-6 flex justify-between items-center border-b">
				<Logo class="w-72" />
				<div class="flex items-center">
					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuTrigger>Paintings</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul class="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[minmax(1,.75fr)_minmax(0,1fr)]">
										<li class="row-span-3">
											<NavigationMenuLink as-child>
												<a
													class="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted no-underline outline-none focus:shadow-md"
													href="/"
												>
													<img
														src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/ed8944107807709.5faf55c2affa5.jpg"
														class="h-full w-full"
													/>
												</a>
											</NavigationMenuLink>
										</li>
										<!-- <ListItem
											v-for="component in components"
											:key="component.title"
											:title="component.title"
											:href="component.href"
										>
											{{ component.description }}
										</ListItem> -->
										<li class="grid gap-3 p-4 md:grid-cols-4">
											<ListItem
												v-for="component in components"
												:key="component.title"
												:title="component.title"
												:href="component.href"
											>
											</ListItem>
										</li>
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuTrigger>Photography</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul class="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[minmax(1,.75fr)_minmax(0,1fr)]">
										<li class="row-span-3">
											<NavigationMenuLink as-child>
												<a
													class="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted no-underline outline-none focus:shadow-md"
													href="/"
												>
													<img
														src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/e41338141446491.625444f8987e1.jpg"
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
											>
											</ListItem>
										</li>
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuTrigger> <RouterLink to="/auction">Auction</RouterLink></NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul class="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[minmax(1,.75fr)_minmax(0,1fr)]">
										<li class="row-span-3">
											<NavigationMenuLink as-child>
												<RouterLink
													to="/auction"
													class="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted no-underline outline-none focus:shadow-md"
												>
													<img
														src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/84bb9986262225.5d9fddfe07643.jpg"
														class="h-full w-full"
													/>
												</RouterLink>
											</NavigationMenuLink>
										</li>

										<li class="grid gap-3 p-4 md:grid-cols-4">
											<ListItem
												v-for="component in components"
												:key="component.title"
												:title="component.title"
												:href="component.href"
											>
											</ListItem>
										</li>
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</div>
				<div class="relative w-72 max-w-sm items-center">
					<Input id="search" type="text" placeholder="Search..." class="pl-10" />
					<span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
						<Search class="size-6 text-muted-foreground" />
					</span>
				</div>
			</div>
		</div>
	</div>
</template>
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

const components: {title: string; href: string}[] = [
	{
		title: 'Style',
		href: '/docs/primitives/alert-dialog',
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
</script>
