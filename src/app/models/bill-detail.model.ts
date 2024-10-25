export class BillDetailModel{
  id: number | undefined;
  idHoaDon: number | undefined;
  idChiTietSanPham: number | undefined;
  donGia: number = 0;
  giaBan: number = 0;
  giamGia: number = 0;
  soLuong: number = 0;
  maSanPham: string = '';
  tenSanPham: string = '';
  tenHang: string = '';
  tenChatLieu: string = '';
  tenKichThuoc: string = '';
  tenMauSac: string = '';
  trangThai: number = 0;
  imageCTSP: string = '';
}
