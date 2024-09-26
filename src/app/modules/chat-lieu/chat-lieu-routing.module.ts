import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ChatLieuComponent} from "./chat-lieu.component";

const routes: Routes = [
    {
        path: '',
        component: ChatLieuComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChatLieuRoutingModule { }
