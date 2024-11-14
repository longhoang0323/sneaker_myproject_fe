import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";
import {ProfileComponent} from "./profile/profile.component";
import {BlogComponent} from "./blog/blog.component";
import {CommingSoonComponent} from "./comming-soon/comming-soon.component";
import {ProductComponent} from "./product/product.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {ResultPaymentSuccessComponent} from "./result-payment-success/result-payment-success.component";


export const pages: any[] = [
  HomeComponent,
  ProductComponent,
  ProductDetailsComponent,
  AboutComponent,
  ProfileComponent,
  BlogComponent,
  CommingSoonComponent,
  ResultPaymentSuccessComponent
];

export * from './home/home.component';
