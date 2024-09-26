import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {SanPhamComponent} from "./san-pham.component";

const routes: Routes = [
    {
        path: '',
        component: SanPhamComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SanPhamRoutingModule { }
