import { Routes } from "@angular/router";
import { ShopsComponent } from "./shops.component";

export const routes: Routes = [
    {
        path: '',
        component: ShopsComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./list-shops/list-shops.routes').then(module => module.routes)
            },
            {
                path: 'create',
                loadChildren: () => import('./upsert-shop/upsert-shop.routes').then(module => module.routes)
            },
            {
                path: ':id',
                loadChildren: () => import('./upsert-shop/upsert-shop.routes').then(module => module.routes)
            }
        ]
    }
]