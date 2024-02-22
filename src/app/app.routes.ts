import { Routes } from '@angular/router';
import { authGuard } from './auth/services/guard/auth.guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then((module) => module.routes)
    },
    {
        path: '',
        loadChildren: () => import('./pages/pages.routes').then((module) => module.routes),
        canActivate: [authGuard]
    }
];
