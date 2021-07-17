import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venta } from '../interfaces/venta.interface';

@Injectable({
  providedIn: 'root',
})
export class VentasService {
  baseUrl: String = 'https://ventas--api.herokuapp.com';

  constructor(private http: HttpClient) {}

  getVentas(
    empresa?: string,
    comprador?: string,
    producto?: string,
    f_inicio?: string,
    f_fin?: string
  ): Observable<Venta[]> {
    let params = new HttpParams();
    console.log(empresa);
    if (empresa) params = params.set('empresa', empresa);
    if (producto) params = params.set('producto', producto);
    if (comprador) params = params.set('comprador', comprador);
    if (f_inicio) params = params.set('fmin', f_inicio);
    if (f_fin) params = params.set('fmax', f_fin);
    console.log(params.toString());
    return this.http.get<Venta[]>(this.baseUrl + '/ventas', {
      params: params,
    });
  }
}
