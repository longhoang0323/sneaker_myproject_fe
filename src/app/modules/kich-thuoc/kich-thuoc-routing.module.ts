import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {KichThuocComponent} from "./kich-thuoc.component";

const routes: Routes = [
    {
        path: '',
        component: KichThuocComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class KichThuocRoutingModule { }
