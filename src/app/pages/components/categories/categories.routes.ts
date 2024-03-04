import { Routes } from "@angular/router";
import { CategoriesComponent } from "./categories.component";

export const routes: Routes = [
    {
        path: '',
        component: CategoriesComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./list-categories/list-categories.routes').then((module) => module.routes)
            },
            {
                path: 'create',
                loadChildren: () => import('./upsert-categories/upsert-categories.routes').then((module) => module.routes)
            },
            {
                path: ':id',
                loadChildren: () => import('./upsert-categories/upsert-categories.routes').then((module) => module.routes)
            }
        ]
    }
];