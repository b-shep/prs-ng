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
import { ProductCreateComponent } from './feature/product/product-create/product-create.component';
import { ProductEditComponent } from './feature/product/product-edit/product-edit.component';
import { ProductDetailComponent } from './feature/product/product-detail/product-detail.component';
import { PrCreateComponent } from './feature/pr/pr-create/pr-create.component';
import { PrEditComponent } from './feature/pr/pr-edit/pr-edit.component';
import { PrDetailComponent } from './feature/pr/pr-detail/pr-detail.component';
import { UserLoginComponent } from './feature/user/user-login/user-login.component';
import { PrLinesComponent } from './feature/pr/pr-lines/pr-lines.component';
import { PrliEditComponent } from './feature/prli/prli-edit/prli-edit.component';
import { PrliCreateComponent } from './feature/prli/prli-create/prli-create.component';
import { PrReviewComponent } from './feature/pr/pr-review/pr-review.component';
import { MenuComponent } from './core/menu/menu.component';

const routes: Routes = [
  {path:'', redirectTo: '/home', pathMatch: 'full' },

  {path:'user/list', component: UserListComponent},
  {path:'user/create', component: UserCreateComponent},
  {path:'user/detail/:id', component: UserDetailComponent},
  {path:'user/edit/:id', component: UserEditComponent},
  {path:'user/remove/:id', component: UserEditComponent},
  {path:'user/login', component: UserLoginComponent},
  
  {path: 'vendor/list', component: VendorListComponent},
  {path: 'vendor/create', component:VendorCreateComponent},
  {path: 'vendor/detail/:id', component: VendorDetailComponent},
  {path: 'vendor/edit/:id', component: VendorEditComponent},
  {path: 'vendor/remove/:id', component: VendorEditComponent},

  {path: 'product/list', component: ProductListComponent},
  {path: 'product/create', component: ProductCreateComponent},
  {path: 'product/edit/:id', component: ProductEditComponent},
  {path: 'product/detail/:id', component: ProductDetailComponent},

  {path: 'pr/list', component: PrListComponent},
  {path: 'pr/create', component: PrCreateComponent},
  {path: 'pr/edit/:id', component: PrEditComponent},
  {path: 'pr/detail/:id', component: PrDetailComponent},
  {path: 'pr/lines/:id', component: PrLinesComponent},
  {path: 'pr/review', component: PrReviewComponent},

  
  {path: 'prli/edit/:id', component: PrliEditComponent},
  {path: 'prli/create/:id', component: PrliCreateComponent},
  

  {path:'about', component: AboutComponent},
  
  
  {path:'**', component: UserListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
