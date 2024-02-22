import { Route } from "@angular/router";
import { UsersComponent } from "./users.component";
import { ListUserComponent } from "./list-user/list-user.component";
import { UpsertUserComponent } from "./upsert-user/upsert-user.component";

export const routes: Route[] = [
    {
        path: '',
        component: UsersComponent,
        children: [
            {
                path: '',
                component: ListUserComponent
            },
            {
                path: 'create',
                component: UpsertUserComponent
            },
            {
                path: 'edit/:id',
                component: UpsertUserComponent
            }
        ]
    }
]