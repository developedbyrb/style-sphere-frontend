import { Routes } from "@angular/router";
import { PagesComponent } from "./pages.component";

export const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadChildren: () => import('./components/dashboard/dashboard.routes').then((module) => module.routes)
            },
            {
                path: 'users',
                loadChildren: () => import('./components/users/users.routes').then((module) => module.routes)
            },
            {
                path: 'roles',
                loadChildren: () => import('./components/roles/roles.routes').then((module) => module.routes)
            },
            {
                path: 'products',
                loadChildren: () => import('./components/products/products.routes').then(module => module.routes)
            },
            {
                path: 'categories',
                loadChildren: () => import('./components/categories/categories.routes').then(module => module.routes)
            },
            {
                path: 'shops',
                loadChildren: () => import('./components/shops/shops.routes').then(module => module.routes)
            },
            {
                path: 'cart-items',
                loadChildren: () => import('./components/cart-items/cart-items.routes').then(module => module.routes)
            },
            {
                path: 'orders',
                loadChildren: () => import('./components/orders/orders.routes').then(module => module.routes)
            },
            {
                path: '***',
                redirectTo: 'dashboard'
            }
        ]
    },
];