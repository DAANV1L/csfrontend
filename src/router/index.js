import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/homeview.vue";
import aboutview from "../views/aboutview.vue";
import loginview from "../views/loginview.vue";
import accountview from '../views/AccountView.vue';
import searchview from "@/views/searchview.vue";
import BookingVerification from "@/components/BookingVerification.vue";
import Booking from "../views/bookingsView.vue";
import PersonalLocationChange from "@/views/PersonalLocationChange.vue";

const routes = [
    {path: '/home', name: 'home', component: HomeView},
    {path: '/about', name: 'about', component: aboutview},
    {path: '/login', name: 'login', component: loginview},
    {path: '/account', name: 'account', component: accountview},
    {path: '/search', name: 'search', component: searchview},
    {path: '/location/:location', name: 'location', component: BookingVerification},
    {path: '/Bookings', name: 'Bookings', component: Booking},
    {path: '/PersonalLocationChange', name: 'PersonalLocationChange', component: PersonalLocationChange},
    {path: '/:pathMatch(.*)*', redirect: '/home'},
    {path: '/', redirect: '/home'},
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;  