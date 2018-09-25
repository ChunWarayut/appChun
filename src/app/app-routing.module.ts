import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'food', loadChildren: './food/food.module#FoodPageModule' },
  { path: 'foodDetail', loadChildren: './food-detail/food-detail.module#FoodDetailPageModule' },
  { path: 'cart', loadChildren: './cart/cart.module#CartPageModule' },
  { path: 'cartTwo', loadChildren: './cart-two/cart-two.module#CartTwoPageModule' },
  { path: 'cartload', loadChildren: './cartload/cartload.module#CartloadPageModule' },
  { path: 'detail', loadChildren: './detail/detail.module#DetailPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
