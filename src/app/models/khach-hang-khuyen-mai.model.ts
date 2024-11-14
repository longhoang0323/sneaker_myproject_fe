export class KhachHangKhuyenMaiModel{
  id: number | undefined ;
  idKhachHang: number | undefined ;
  tenKhachHang: string = '';
  idVoucher: number | undefined;
  maVoucher: string = '';
  moTaVoucher: string | undefined;
  giaTriVoucher: number = 0;
  dieuKienVoucher: number = 0;
  ngayBatDau: string | undefined;
  ngayKetThuc: string| undefined;
  loaiGiamGia: number = 0;
  trangThai: number = 0;
}
