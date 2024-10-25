import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from "./index.component";
import {HomeComponent} from "./page";
import {AboutComponent} from "./page/about/about.component";
import {ProfileComponent} from "./page/profile/profile.component";
import {BlogComponent} from "./page/blog/blog.component";
import {CommingSoonComponent} from "./page/comming-soon/comming-soon.component";
import {CartComponent} from "./cart/cart.component";
import {ProductComponent} from "./page/product/product.component";
import {ProductDetailsComponent} from "./page/product-details/product-details.component";

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'product',
        component: ProductComponent
      },
      {
        path: 'product-details/:id',
        component: ProductDetailsComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'profile/me',
        component: ProfileComponent
      },
      {
        path: 'blog',
        component: BlogComponent
      },
      {
        path: 'comming-soon',
        component: CommingSoonComponent
      },
      {
        path: 'me/cart',
        component: CartComponent
      },
      // {
      //   path: 'me/step',
      //   children: [
      //     {
      //       path: '1',
      //       component: Step1Component
      //     },
      //     {
      //       path: '2',
      //       component: Step2Component
      //     },
      //     {
      //       path: '3',
      //       component: Step3Component
      //     }
      //   ]
      // },
    ]
  },
  {path: '', loadChildren: () => import('./auth-web/auth-web.module').then(m => m.AuthWebModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule {
}
