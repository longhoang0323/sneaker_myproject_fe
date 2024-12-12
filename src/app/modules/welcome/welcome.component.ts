import {Component, OnInit} from '@angular/core';
import {BrowserMultiFormatReader, NotFoundException} from "@zxing/library";
import {BillService} from "../../service/bill.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {ChartData, ChartOptions, ChartType} from "chart.js";
import {DoanhThuModel} from "../../models/doanh-thu.model";


@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
    codeReader: BrowserMultiFormatReader;
    public scannedCode: string | null = null;
    checkCamera = false;
    showBarChart = 0;
    tongDoanhThu: number = 0;
    doanhThuOnline: number = 0;
    doanhThuOffline: number = 0;
    tongLuongDon: number = 0;
    luongDonHoanThanh: number = 0;
    luongDonDaHuy: number = 0;
    soSanPhamDaBan: number = 99;
    yearInput: number = new Date().getFullYear();
    public listMonth: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];


    constructor(private billService: BillService,
                private notification: NzNotificationService) {
        this.codeReader = new BrowserMultiFormatReader();
    }

    ngOnInit(): void {
        this.getDoanhThu();
        this.getDoanhThuByMonthDefault();
    }

    getDoanhThuByMonthDefault() {
        this.billService.getDoanhThuByMonth(new Date().getFullYear()).subscribe(res => {
            if (res.body.length > 0) {
                for (let x = 0; x < this.listMonth.length; x++) {
                    this.showBarChart = x;
                    for (let y = 0; y < res.body.length; y++) {
                        if (this.listMonth[x] == res.body[y].month) {
                            // this.listOnlyDoanhThu[x] = res.body[y].doanhThu;
                            this.barChartData.datasets[0].data[x] = res.body[y].doanhThu;
                        }
                    }
                }
            } else {
                this.showBarChart = 11;
                this.barChartData.datasets[0].data = [0, 0, 0, 0, 0, 200000, 400000, 60000, 0, 0, 0, 0];
            }
        })
    }

    getDoanhThuByMonth() {
        this.barChartData.datasets[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.yearInput = Number.parseInt((document.getElementById('year') as HTMLInputElement).value);
        this.billService.getDoanhThuByMonth(this.yearInput).subscribe(res => {
            if (res.body.length > 0) {
                this.barChartLegend = !this.barChartLegend;
                // for (let x = 0; x < this.listMonth.length; x++) {
                //     this.showBarChart = x;
                //     for (let y = 0; y < res.body.length; y++) {
                //         if (this.listMonth[x] == res.body[y].month) {
                //             this.barChartData.datasets[0].data[x] = res.body[y].doanhThu;
                //         }
                //     }
                // }
                setTimeout(() => {
                    this.barChartLegend = !this.barChartLegend;
                    // for (let y = 0; y < res.body.length; y++) {
                    //     this.barChartData.datasets[0].data = [
                    //         (res.body[y].month == 1 ? res.body[y].doanhThu : 0),
                    //         (res.body[y].month == 2 ? res.body[y].doanhThu : 0),
                    //         (res.body[y].month == 3 ? res.body[y].doanhThu : 0),
                    //         (res.body[y].month == 4 ? res.body[y].doanhThu : 0),
                    //         (res.body[y].month == 5 ? res.body[y].doanhThu : 0),
                    //         (res.body[y].month == 6 ? res.body[y].doanhThu : 0),
                    //         (res.body[y].month == 7 ? res.body[y].doanhThu : 0),
                    //         (res.body[y].month == 8 ? res.body[y].doanhThu : 0),
                    //         (res.body[y].month == 9 ? res.body[y].doanhThu : 0),
                    //         (res.body[y].month == 10 ? res.body[y].doanhThu : 100000),
                    //         (res.body[y].month == 11 ? res.body[y].doanhThu : 0),
                    //         (res.body[y].month == 12 ? res.body[y].doanhThu : 0)
                    //     ];
                    // }
                    for (let x = 0; x < this.listMonth.length; x++) {
                        this.showBarChart = x;
                        for (let y = 0; y < res.body.length; y++) {
                            if (this.listMonth[x] == res.body[y].month) {
                                // this.listOnlyDoanhThu[x] = res.body[y].doanhThu;
                                this.barChartData.datasets[0].data[x] = res.body[y].doanhThu;
                            }
                        }
                    }
                }, 1000)
            } else {
                this.notification.error('khoông cos', '');
                this.showBarChart = 11;
                this.barChartLegend = !this.barChartLegend;
                setTimeout(() => {
                    this.barChartLegend = !this.barChartLegend;
                    this.barChartData.datasets[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                }, 1000)
            }
        })
    }

    getDoanhThu() {
        this.billService.getSumTongThanhToan(10, '', '', '').subscribe(res => {
            if (res) {
                this.tongDoanhThu = res.body;
            }
        })
        this.billService.getSumTongThanhToan(0, '', '', '').subscribe(res => {
            if (res) {
                this.doanhThuOffline = res.body;
            }
        })
        this.billService.getSumTongThanhToan(1, '', '', '').subscribe(res => {
            if (res) {
                this.doanhThuOnline = res.body;
            }
        })
        this.billService.getCountHoaDon(10, '', '', '').subscribe(res => {
            if (res) {
                this.tongLuongDon = res.body;
            }
        })
        this.billService.getCountHoaDon(1, '', '', '').subscribe(res => {
            if (res) {
                this.luongDonHoanThanh = res.body;
            }
        })
        this.billService.getCountHoaDon(5, '', '', '').subscribe(res => {
            if (res) {
                this.luongDonDaHuy = res.body;
            }
        })
    }

    getDoanhThuByDay() {
        if ((document.getElementById('dayInput') as HTMLInputElement).value == '') {
            this.notification.error('Vui lòng chọn ngày tra cứu!', '');
            return;
        }
        const dayInput = (document.getElementById('dayInput') as HTMLInputElement).value;
        this.billService.getSumTongThanhToan(10, '', '', dayInput).subscribe(res => {
            if (res) {
                this.tongDoanhThu = res.body;
            }
        })
        this.billService.getSumTongThanhToan(0, '', '', dayInput).subscribe(res => {
            if (res) {
                this.doanhThuOffline = res.body;
            }
        })
        this.billService.getSumTongThanhToan(1, '', '', dayInput).subscribe(res => {
            if (res) {
                this.doanhThuOnline = res.body;
            }
        })
        this.billService.getCountHoaDon(10, '', '', dayInput).subscribe(res => {
            if (res) {
                this.tongLuongDon = res.body;
            }
        })
        this.billService.getCountHoaDon(1, '', '', dayInput).subscribe(res => {
            if (res) {
                this.luongDonHoanThanh = res.body;
            }
        })
        this.billService.getCountHoaDon(5, '', '', dayInput).subscribe(res => {
            if (res) {
                this.luongDonDaHuy = res.body;
            }
        })
    }

    getDoanhThuByKhoangNgay() {
        if ((document.getElementById('startDate') as HTMLInputElement).value == '' || (document.getElementById('endDate') as HTMLInputElement).value == '') {
            this.notification.error('Vui lòng chọn ngày bắt đầu và ngày kết thúc!', '');
            return;
        }
        const startDate = (document.getElementById('startDate') as HTMLInputElement).value;
        const endDate = (document.getElementById('endDate') as HTMLInputElement).value;
        this.billService.getSumTongThanhToan(10, startDate, endDate, '').subscribe(res => {
            if (res) {
                this.tongDoanhThu = res.body;
            }
        })
        this.billService.getSumTongThanhToan(0, startDate, endDate, '').subscribe(res => {
            if (res) {
                this.doanhThuOffline = res.body;
            }
        })
        this.billService.getSumTongThanhToan(1, startDate, endDate, '').subscribe(res => {
            if (res) {
                this.doanhThuOnline = res.body;
            }
        })
        this.billService.getCountHoaDon(10, startDate, endDate, '').subscribe(res => {
            if (res) {
                this.tongLuongDon = res.body;
            }
        })
        this.billService.getCountHoaDon(1, startDate, endDate, '').subscribe(res => {
            if (res) {
                this.luongDonHoanThanh = res.body;
            }
        })
        this.billService.getCountHoaDon(5, startDate, endDate, '').subscribe(res => {
            if (res) {
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
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Doanh thu cho mỗi tháng
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

    //
    public barChartData2 = {
        labels: [],
        datasets: [
            {
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Doanh thu cho mỗi tháng
                label: 'Doanh thu', // Tên bộ dữ liệu
                backgroundColor: 'rgba(0, 123, 255, 0.6)', // Màu nền của cột
                borderColor: 'rgba(0, 123, 255, 1)', // Màu viền của cột
                borderWidth: 1
            }
        ]
    };

    toggleLegend(): void {
        this.barChartLegend = !this.barChartLegend;
        this.barChartData.datasets[0].data = [0, 0, 0, 0, 0, 100000, 1000000, 0, 0, 0, 0, 0];
    }

}
