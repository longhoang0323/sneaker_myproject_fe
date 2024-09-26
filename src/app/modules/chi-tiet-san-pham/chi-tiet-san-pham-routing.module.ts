import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ChiTietSanPhamComponent} from "./chi-tiet-san-pham.component";

const routes: Routes = [
    {
        path: '',
        component: ChiTietSanPhamComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChiTietSanPhamRoutingModule { }
