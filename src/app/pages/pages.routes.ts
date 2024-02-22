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
                loadChildren: () => import('./components/dashboard/dashboard.route').then((module) => module.routes)
            },
            {
                path: 'users',
                loadChildren: () => import('./components/users/users.route').then((module) => module.routes)
            },
            {
                path: 'roles',
                loadChildren: () => import('./components/roles/roles.route').then((module) => module.routes)
            },
        ]
    },
];