import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserListComponent } from './feature/user/user-list/user-list.component';
import { UserCreateComponent } from './feature/user/user-create/user-create.component';
import { UserEditComponent } from './feature/user/user-edit/user-edit.component';
import { UserDetailComponent } from './feature/user/user-detail/user-detail.component';

import { VendorListComponent } from './feature/vendor/vendor-list/vendor-list.component';
import { VendorCreateComponent } from './feature/vendor/vendor-create/vendor-create.component';
import { VendorDetailComponent } from './feature/vendor/vendor-detail/vendor-detail.component';
import { VendorEditComponent } from './feature/vendor/vendor-edit/vendor-edit.component';

import { AboutComponent } from './core/menu/about/about.component';
import { ProductListComponent } from './feature/product/product-list/product-list.component';
import { PrListComponent } from './feature/pr/pr-list/pr-list.component';

const routes: Routes = [
  {path:'', redirectTo: '/user/list', pathMatch: 'full' },

  {path:'user/list', component: UserListComponent},
  {path:'user/create', component: UserCreateComponent},
  {path:'user/detail/:id', component: UserDetailComponent},
  {path:'user/edit/:id', component: UserEditComponent},
  {path:'user/remove/:id', component: UserEditComponent},
  
  {path: 'vendor/list', component: VendorListComponent},
  {path: 'vendor/create', component:VendorCreateComponent},
  {path: 'vendor/detail/:id', component: VendorDetailComponent},
  {path: 'vendor/edit/:id', component: VendorEditComponent},
  {path: 'vendor/remove/:id', component: VendorEditComponent},

  {path: 'product/list', component: ProductListComponent},

  {path: 'pr/list', component: PrListComponent},

  {path:'about', component: AboutComponent},
  
  
  {path:'**', component: UserListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
