import { Routes } from "@angular/router";
import { CartItemsComponent } from "./cart-items.component";

export const routes: Routes = [
    {
        path: '',
        component: CartItemsComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./list-cart-items/list-cart-items.routes').then(module => module.routes)
            }
        ]
    }
]