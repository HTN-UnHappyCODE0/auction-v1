<script setup lang="ts">
import {Button} from '@/components/ui/button';
import TheHeader from '../components/theHeader.vue';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import CardProfile from './CardProfile.vue';
import CardPassword from './CardPassword.vue';
import CardCart from './CardCart.vue';
</script>

<template>
	<TheHeader />
	<div class="flex justify-center items-center">
		<Tabs default-value="profile" class="w-[600px] mt-4">
			<TabsList class="grid w-full grid-cols-3">
				<TabsTrigger value="profile"> Profile </TabsTrigger>
				<TabsTrigger value="password"> Password </TabsTrigger>
				<TabsTrigger value="cart"> Cart </TabsTrigger>
			</TabsList>
			<TabsContent value="profile">
				<Card
					><div><CardProfile /></div>
				</Card>
			</TabsContent>
			<TabsContent value="password">
				<Card>
					<CardPassword />
				</Card>
			</TabsContent>
			<TabsContent value="cart">
				<Card>
					<CardCart />
				</Card>
			</TabsContent>
		</Tabs>
	</div>
</template>
