import {Component, OnInit} from '@angular/core';
import {BrowserMultiFormatReader, NotFoundException} from "@zxing/library";
import {BillService} from "../../service/bill.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {ChartData, ChartOptions, ChartType} from "chart.js";


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  codeReader: BrowserMultiFormatReader;
  public scannedCode: string | null = null;
  checkCamera = false;
  tongDoanhThu: number = 0;
  doanhThuOnline: number = 0;
  doanhThuOffline: number = 0;
  tongLuongDon: number = 0;
  luongDonHoanThanh: number = 0;
  luongDonDaHuy: number = 0;
  soSanPhamDaBan: number = 0;


  constructor(private billService: BillService,
              private notification: NzNotificationService) {
    this.codeReader = new BrowserMultiFormatReader();
  }

  ngOnInit(): void {
    this.getDoanhThu();
  }

  getDoanhThu(){
    this.billService.getSumTongThanhToan(10, '', '', '').subscribe(res => {
      if(res){
        this.tongDoanhThu = res.body;
      }
    })
    this.billService.getSumTongThanhToan(0, '', '', '').subscribe(res => {
      if(res){
        this.doanhThuOffline = res.body;
      }
    })
    this.billService.getSumTongThanhToan(1, '', '', '').subscribe(res => {
      if(res){
        this.doanhThuOnline = res.body;
      }
    })
    this.billService.getCountHoaDon(10, '', '', '').subscribe(res => {
      if(res){
        this.tongLuongDon = res.body;
      }
    })
    this.billService.getCountHoaDon(1, '', '', '').subscribe(res => {
      if(res){
        this.luongDonHoanThanh = res.body;
      }
    })
    this.billService.getCountHoaDon(5, '', '', '').subscribe(res => {
      if(res){
        this.luongDonDaHuy = res.body;
      }
    })
  }

  getDoanhThuByDay(){
    if((document.getElementById('dayInput') as HTMLInputElement).value == ''){
      this.notification.error('Vui lòng chọn ngày tra cứu!', '');
      return;
    }
    const dayInput = (document.getElementById('dayInput') as HTMLInputElement).value;
    this.billService.getSumTongThanhToan(10, '', '', dayInput).subscribe(res => {
      if(res){
        this.tongDoanhThu = res.body;
      }
    })
    this.billService.getSumTongThanhToan(0, '', '', dayInput).subscribe(res => {
      if(res){
        this.doanhThuOffline = res.body;
      }
    })
    this.billService.getSumTongThanhToan(1, '', '', dayInput).subscribe(res => {
      if(res){
        this.doanhThuOnline = res.body;
      }
    })
    this.billService.getCountHoaDon(10, '', '', dayInput).subscribe(res => {
      if(res){
        this.tongLuongDon = res.body;
      }
    })
    this.billService.getCountHoaDon(1, '', '', dayInput).subscribe(res => {
      if(res){
        this.luongDonHoanThanh = res.body;
      }
    })
    this.billService.getCountHoaDon(5, '', '', dayInput).subscribe(res => {
      if(res){
        this.luongDonDaHuy = res.body;
      }
    })
  }

  getDoanhThuByKhoangNgay(){
    if((document.getElementById('startDate') as HTMLInputElement).value == '' || (document.getElementById('endDate') as HTMLInputElement).value == ''){
      this.notification.error('Vui lòng chọn ngày bắt đầu và ngày kết thúc!', '');
      return;
    }
    const startDate = (document.getElementById('startDate') as HTMLInputElement).value;
    const endDate = (document.getElementById('endDate') as HTMLInputElement).value;
    this.billService.getSumTongThanhToan(10, startDate, endDate, '').subscribe(res => {
      if(res){
        this.tongDoanhThu = res.body;
      }
    })
    this.billService.getSumTongThanhToan(0, startDate, endDate, '').subscribe(res => {
      if(res){
        this.doanhThuOffline = res.body;
      }
    })
    this.billService.getSumTongThanhToan(1, startDate, endDate, '').subscribe(res => {
      if(res){
        this.doanhThuOnline = res.body;
      }
    })
    this.billService.getCountHoaDon(10, startDate, endDate, '').subscribe(res => {
      if(res){
        this.tongLuongDon = res.body;
      }
    })
    this.billService.getCountHoaDon(1, startDate, endDate, '').subscribe(res => {
      if(res){
        this.luongDonHoanThanh = res.body;
      }
    })
    this.billService.getCountHoaDon(5, startDate, endDate, '').subscribe(res => {
      if(res){
        this.luongDonDaHuy = res.body;
      }
    })
  }

  startScanning(): void {
    // this.checkCamera = true;
    this.codeReader.decodeFromVideoDevice(null, 'video', (result, err) => {
      if (result) {
        // @ts-ignore
        this.scannedCode = result.text;
        console.log('Scanned code:', this.scannedCode);
      }
      if (err && !(err instanceof NotFoundException)) {
        console.error(err);
      }
    });
  }

  stopScanning(): void {
    // this.checkCamera = false;
    this.codeReader.reset();
  }

//   bar chart
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true
      },
      y: {
        beginAtZero: true
      }
    }
  };

  public barChartLabels: string[] = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      {
        data: [120000, 1500000, 1800000, 200000, 1700000, 2100000, 300000, 2000000, 500000, 1000000, 2000000, 1000000], // Doanh thu cho mỗi tháng
        label: 'Doanh thu', // Tên bộ dữ liệu
        backgroundColor: 'rgba(0, 123, 255, 0.6)', // Màu nền của cột
        borderColor: 'rgba(0, 123, 255, 1)', // Màu viền của cột
        borderWidth: 1
      }
    ]
  };

  public barChartType: ChartType = 'bar'; // Loại biểu đồ
  public barChartLegend = true; // Hiển thị chú thích
  public barChartPlugins = []; // Plugins nếu có

}
