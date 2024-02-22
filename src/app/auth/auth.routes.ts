import { Routes } from "@angular/router";
import { AuthComponent } from "./auth.component";

export const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            },
            {
                path: 'login',
                loadChildren: () => import('./components/login/login.route').then((module) => module.routes),
            },
            {
                path: 'register',
                loadChildren: () => import('./components/registration/registration.route').then((module) => module.routes)
            }
        ]
    },
];