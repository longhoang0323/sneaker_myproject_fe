import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {MauSacComponent} from "./mau-sac.component";

const routes: Routes = [
    {
        path: '',
        component: MauSacComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MauSacRoutingModule { }
