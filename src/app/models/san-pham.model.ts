export class SanPhamModel{
  id: number | undefined;
  ma: string = '';
  ten: string = '';
  idHang: number | undefined;
  tenHang: string = '';
  idChatLieu: number | undefined;
  tenChatLieu: string = '';
  trangThai: number = 0;
  imageDefault: string = '';
  qrCode: string = '';
  giaThapNhat: number = 0;
  giaCaoNhat: number = 0;
}
