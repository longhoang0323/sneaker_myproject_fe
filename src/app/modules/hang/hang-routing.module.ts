import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HangComponent} from "./hang.component";

const routes: Routes = [
    {
        path: '',
        component: HangComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HangRoutingModule { }
