import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/auth/LoginView.vue';
import RegisterView from '../views/auth/RegisterView.vue';
import ProductView from '../views/productView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/auth/login',
			name: 'auth-login',
			component: LoginView,
		},
		{
			path: '/auth/register',
			name: 'auth-register',
			component: RegisterView,
		},
		{
			path: '/product',
			name: 'product-view',
			component: ProductView,
		},
	],
});

export default router;
