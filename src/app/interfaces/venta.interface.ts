export interface Venta {
  id: number;
  empresa: string;
  descripcion: string;
  cantidad: number;
  fecha: string;
  producto: string;
  valor_total: string;
  comprador: string;
}

export interface VentaCreacion {
  producto: number;
  cantidad: number;
  persona: number;
}
