import { Routes } from "@angular/router";
import { OrdersComponent } from "./orders.component";

export const routes: Routes = [
    {
        path: '',
        component: OrdersComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./list-orders/list-orders.routes').then(module => module.routes)
            },
            {
                path: 'create',
                loadChildren: () => import('./create-order/create-order.routes').then(module => module.routes)
            }
        ]
    }
];