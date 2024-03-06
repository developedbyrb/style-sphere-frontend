import { Routes } from "@angular/router";
import { ProductsComponent } from "./products.component";

export const routes: Routes = [
    {
        path: '',
        component: ProductsComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./list-products/list-products.routes').then(module => module.routes)
            },
            {
                path: 'create',
                loadChildren: () => import('./upsert-products/upsert-products.routes').then(module => module.routes)
            },
            {
                path: ':id',
                loadChildren: () => import('./upsert-products/upsert-products.routes').then(module => module.routes)
            }
        ]
    }
]