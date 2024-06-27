import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/auth/LoginView.vue';
import RegisterView from '../views/auth/RegisterView.vue';
import ProductView from '../views/productView.vue';
import AuctionView from '../views/AuctionView.vue';
import AuctionLiveView from '../views/AuctionLiveView.vue';
import ProductDetail from '../views/productDetail.vue';
import AuctionDetail from '../views/AuctionDetail.vue';
import UserProfile from '../views/UserProfile.vue';

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
		{path: '/auction', name: 'auction-view', component: AuctionView},
		{path: '/aucionLive/:id', name: 'auction-live', component: AuctionLiveView},
		{path: '/auctionDetail/:id', name: 'auction-detail', component: AuctionDetail},
		{path: '/productDetail/:id', name: 'product-detail', component: ProductDetail},
		{path: '/userProfile', name: 'user-profile', component: UserProfile},
	],
});

export default router;
