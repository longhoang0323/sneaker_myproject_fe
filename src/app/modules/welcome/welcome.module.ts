import { NgModule } from '@angular/core';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';
import {CurrencyPipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzBreadCrumbModule } from "ng-zorro-antd/breadcrumb";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { FormsModule } from "@angular/forms";
import {NzProgressModule} from "ng-zorro-antd/progress";

@NgModule({
  imports: [
    WelcomeRoutingModule,
    NgStyle,
    NzGridModule,
    NzBreadCrumbModule,
    NzPageHeaderModule,
    NgIf,
    FormsModule,
    NgForOf,
    CurrencyPipe,
    NzProgressModule,
  ],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent],
})
export class WelcomeModule { }
