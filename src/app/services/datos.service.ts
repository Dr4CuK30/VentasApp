import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from '../interfaces/empresa.interface';
import { Venta, VentaCreacion } from '../interfaces/venta.interface';
import { Persona } from '../interfaces/persona.interface';
import { Producto } from '../interfaces/producto.interface';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class DatosService {
  baseUrl: String = environment.api_url;

  constructor(private http: HttpClient) {}

  getVentas(
    empresa?: string,
    comprador?: string,
    producto?: string,
    f_inicio?: string,
    f_fin?: string
  ): Observable<Venta[]> {
    let params = new HttpParams();
    if (empresa) params = params.set('empresa', empresa);
    if (producto) params = params.set('producto', producto);
    if (comprador) params = params.set('comprador', comprador);
    if (f_inicio) params = params.set('fmin', f_inicio);
    if (f_fin) params = params.set('fmax', f_fin);
    return this.http.get<Venta[]>(this.baseUrl + '/ventas', {
      params: params,
    });
  }

  getEmpresas() {
    return this.http.get<Empresa[]>(this.baseUrl + '/empresas');
  }

  getPersonas() {
    return this.http.get<Persona[]>(this.baseUrl + '/personas');
  }

  getProductos(id: number) {
    return this.http.get<Producto[]>(this.baseUrl + `/empresas/${id}`);
  }

  createVenta(venta: VentaCreacion) {
    console.log(venta);
    return this.http.post<{ [name: string]: any }>(
      this.baseUrl + `/ventas`,
      venta
    );
  }
}
