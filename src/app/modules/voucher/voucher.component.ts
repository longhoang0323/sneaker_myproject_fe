import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {NzMessageService} from "ng-zorro-antd/message";
import {environment} from "../../../environments/environment";
import {VoucherModel} from "../../models/voucher.model";
import {VoucherService} from "../../service/voucher.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../../service/customer.service";
import {CustomerModel} from "../customer/models/customer.model";
import {KhachHangKhuyenMaiService} from "../../service/khach-hang-khuyen-mai-service";

@Component({
  selector: 'cons-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent implements OnInit{
  voucher: VoucherModel[] = [];
  currentVoucher!: VoucherModel;
  message ='';
  isVisible = false;
  isOkLoading = false;
  id: number | undefined;
  form: FormGroup;
  customerList: CustomerModel[] = [];
  ngayBatDau: Date | null = null;
  ngayKetThuc: Date | null = null;


  isVisibleTaoMoi = false;
  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<number>();
  listOfCurrentPageData: readonly CustomerModel[] = [];

  showModal(id: any): void {
    this.isVisible = true;
    this.id = id;
    this.voucherService.get(this.id).subscribe((data: VoucherModel) => {
      this.currentVoucher = data;
      console.log(this.currentVoucher);
    });
  }

  handleOk(): void {
    if (!this.form.valid) {
      return;
    }
    this.isOkLoading = true;
    this.updateVoucher();
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 500);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  constructor(private voucherService: VoucherService,
              private customerService: CustomerService,
              private khachHangKhuyenMaiService: KhachHangKhuyenMaiService,
              private router: Router,
              private route: ActivatedRoute,
              private messageNoti: NzMessageService,
              private formBuilder: FormBuilder
              ) {
    this.form = this.formBuilder.group({
      moTa: [''],
      giamGia: [0],
      ngayBatDau: [''],
      ngayKetThuc: [''],
      soLuong: [0]
    })
  }

  private getVouchers(): void {
    this.voucherService.getVoucherList(1, 50).subscribe(res => {
      if (res && res.content) {
        this.voucher= res.content;
      }
    })
  }

  searchInput :string = '';
  getVouchersSearch(): void {
    const inputElement = document.getElementById('searchInput') as HTMLInputElement;
    this.searchInput = inputElement.value;
    this.voucherService.getVoucherListSearch(1, 50, this.searchInput).subscribe(res => {
      if (res && res.content) {
        this.voucher= res.content;
      }
    })
  }

  getListKHByString(): void {
    const inputElement = document.getElementById('searchKH') as HTMLInputElement;
    this.searchInput = inputElement.value;
    this.customerService.getListKHBySearch(1, 50, this.searchInput).subscribe(res => {
      if (res && res.content) {
        this.customerList = res.content;
      }
    })
  }

  getCustomers(): void {
    this.customerService.getCustomerList(1, 50).subscribe(res => {
      if (res && res.content) {
        this.customerList= res.content;
      }
    })
  }

  updateVoucherStatus(id: any, status: number): void {
    this.voucherService.get(id).subscribe((data: VoucherModel) => {
      this.currentVoucher = data;
      console.log(this.currentVoucher);
    });
    this.voucherService.updateStatus(id, status)
      .subscribe({
        next: (res) => {
          this.message = res.message
          this.currentVoucher.trangThai = status
          this.getVouchers();
        },
      });
  }

  updateVoucher(): void {
    this.voucherService
      .update(this.currentVoucher.id, this.currentVoucher)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : this.messageNoti.success('Update thành công', {
              nzDuration: 5000
            });
          this.getVouchers();
        },
        error: (e) => console.error(e)
      });
  }

  showModalTaoMoi(){
    this.getCustomers();
    this.isVisibleTaoMoi = true;
  }

  handleCancelTaoMoi(){
    this.isVisibleTaoMoi = false;
  }

  createNewVoucher(){
    const dataCreate = {
      ma: (document.getElementById('maGiamGia') as HTMLInputElement).value,
      moTa: (document.getElementById('moTaMoi') as HTMLInputElement).value,
      giamGia: (document.getElementById('giamGiaMoi') as HTMLInputElement).value,
      dieuKien: (document.getElementById('dieuKienMoi') as HTMLInputElement).value,
      soLuong: (document.getElementById('soLuongMoi') as HTMLInputElement).value,
      ngayBatDau: this.ngayBatDau,
      ngayKetThuc: this.ngayKetThuc,
      loaiGiamGia: Number.parseInt((document.getElementById('loaiGiamGia') as HTMLInputElement).value),
      trangThai: 1
    }
    this.voucherService.create(dataCreate).subscribe(res => {
      if(res){
        console.log(res);
        this.khachHangKhuyenMaiService.create(res.id, this.listOfCurrentPageData).subscribe(res2 => {
          if (res2.code == "200"){
            this.messageNoti.success('Tạo mã giảm giá thành công!');
            this.isVisibleTaoMoi = false;
            this.getVouchers();
            console.log(res2.body);
          }
        })
      }
    })
  }

  ngOnInit() {
    this.getVouchers();
  }

  // table khach hang
  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
    console.log(this.listOfCurrentPageData);
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
    console.log(this.listOfCurrentPageData);
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly CustomerModel[]): void {
    this.listOfCurrentPageData = $event;
    console.log(this.listOfCurrentPageData);
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }


}
