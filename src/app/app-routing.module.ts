import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './modules/layout/layout.component';
import {AuthGuard} from './auth/services';
import {NotFoundComponent} from "./error/not-found/not-found.component";
import {ForbiddenComponent} from "./error/forbidden/forbidden.component";

const routes: Routes = [
  {path: '', loadChildren: () => import('./web/index/index.module').then(m => m.IndexModule)},
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./modules/welcome/welcome.module').then(m => m.WelcomeModule)
      },
      {
        path: 'accounts',
        loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule)
      },
      {
        path: 'logs',
        loadChildren: () => import('./modules/logs/logs.module').then(m => m.LogsModule)
      },
      {
        path: 'account-user',
        loadChildren: () => import('./modules/account-user/account-user.module').then(m => m.AccountUserModule)
      },
      {
        path: 'customer',
        loadChildren: () => import('./modules/customer/customer.module').then(m => m.CustomerModule)
      },
      {
        path: 'voucher',
        loadChildren: () => import('./modules/voucher/voucher.module').then(m => m.VoucherModule)
      },
      {
        path: `ban-hang-tai-quay/bill/:id`,
        loadChildren: () => import('./modules/bill/bill.module').then(m => m.BillModule)
      },
      {
        path: 'hang',
        loadChildren: () => import('./modules/hang/hang.module').then(m => m.HangModule)
      },
      {
        path: 'san-pham',
        loadChildren: () => import('./modules/san-pham/san-pham.module').then(m => m.SanPhamModule)
      },
      {
        path: 'mau-sac',
        loadChildren: () => import('./modules/mau-sac/mau-sac.module').then(m => m.MauSacModule)
      },
      {
        path: 'chat-lieu',
        loadChildren: () => import('./modules/chat-lieu/chat-lieu.module').then(m => m.ChatLieuModule)
      },
      {
        path: 'size',
        loadChildren: () => import('./modules/kich-thuoc/kich-thuoc.module').then(m => m.KichThuocModule)
      },
      {
        path: 'chi-tiet-san-pham',
        loadChildren: () => import('./modules/chi-tiet-san-pham/chi-tiet-san-pham.module').then(m => m.ChiTietSanPhamModule)
      },
      {
        path: 'ban-hang-tai-quay',
        loadChildren: () => import('./modules/ban-hang/ban-hang.module').then(m => m.BanHangModule)
      }
    ]
  },
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  { path: 'forbidden', component: ForbiddenComponent },
  {
    path: '**', // Đây là route wildcard để xử lý tất cả các đường dẫn không khớp
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
