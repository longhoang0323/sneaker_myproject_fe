import {NgModule} from "@angular/core";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzIconModule} from "ng-zorro-antd/icon";
import {FormsModule} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzSelectModule} from "ng-zorro-antd/select";
import {KichThuocRoutingModule} from "./kich-thuoc-routing.module";
import {KichThuocComponent} from "./kich-thuoc.component";

@NgModule({
    imports: [KichThuocRoutingModule, NzBreadCrumbModule, DatePipe, NgForOf, NgIf, NzPageHeaderModule, NzSwitchModule, NzTableModule, NzIconModule, FormsModule, NzFormModule, NzGridModule, NzInputModule, NzModalModule, NzSelectModule, CurrencyPipe],
    declarations: [KichThuocComponent],
    exports: [KichThuocComponent]
})
export class KichThuocModule { }
