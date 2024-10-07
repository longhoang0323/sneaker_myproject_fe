import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {BanHangComponent} from "./ban-hang.component";

const routes: Routes = [
  {
    path: '',
    component: BanHangComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BanHangRoutingModule { }
