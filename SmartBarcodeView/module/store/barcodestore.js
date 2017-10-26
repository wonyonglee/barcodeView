import axios from 'axios';

export function getBarcodeInfo(barcode) {
  return axios.get('/New/barcodeInfo.asp?BARCODE=' + barcode);
}