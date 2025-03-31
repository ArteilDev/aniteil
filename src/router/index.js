import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			meta: {
				title: "Главная",
			},
			component: HomeView
		},
		{
			path: '/animes/:id',
			name: 'animes',
			meta: {
				title: "",
			},
			component: () => import('../views/TitlePageView.vue')
		},
		{
			path: '/animes/all',
			name: 'catalog',
			meta: {
				title: "Каталог",
			},
			component: () => import('../views/CatalogView.vue')
		}
	],
	scrollBehavior() {
		// always scroll to top
		return { top: 0 }
	},
})

router.beforeEach((to, from, next) => {
	document.title = `Aniteil - ${to.meta.title}`;
	next();
});

export default router
