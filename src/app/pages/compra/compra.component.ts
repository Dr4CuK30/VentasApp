import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/interfaces/producto.interface';
import { Empresa } from '../../interfaces/empresa.interface';
import { Persona } from '../../interfaces/persona.interface';
import { DatosService } from '../../services/datos.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.scss'],
})
export class CompraComponent implements OnInit {
  totalCompra!: number | null;
  proveedores!: Empresa[];
  compradores!: Persona[];
  productos: Producto[] = [];
  options!: FormGroup;
  empresaControl = new FormControl(null, [Validators.required]);
  productoControl = new FormControl({ value: null, disabled: true }, [
    Validators.required,
  ]);
  compradorControl = new FormControl(null, [Validators.required]);
  cantidadControl = new FormControl(null, [
    Validators.required,
    Validators.min(1),
  ]);

  constructor(
    private datosService: DatosService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.options = fb.group({
      empresa: this.empresaControl,
      producto: this.productoControl,
      persona: this.compradorControl,
      cantidad: this.cantidadControl,
    });
  }

  ngOnInit(): void {
    this.datosService.getEmpresas().subscribe((empresas) => {
      this.proveedores = empresas;
    });
    this.datosService.getPersonas().subscribe((personas) => {
      this.compradores = personas;
    });
  }

  loadProductos(event: MatSelectChange) {
    this.toastr.success('Cargados correctamente');
    this.productoControl.reset();
    this.datosService.getProductos(event.value).subscribe((productos) => {
      this.productos = productos;
      if (productos.length != 0) this.options.controls.producto.enable();
      else this.options.controls.producto.disable();
    });
  }

  calcularTotal() {
    this.totalCompra =
      this.options.value.producto?.precio * this.options.value.cantidad || null;
  }

  comprar() {
    if (this.options.valid) {
      const valores = this.options.value;
      const { empresa, ...venta } = valores;
      this.datosService
        .createVenta({ ...venta, producto: venta.producto.id })
        .subscribe((res) => {
          if (res.error) {
            return this.toastr.error('Error al realizar registro');
          }
          return this.toastr.success('Compra realizada correctamente');
        });
    }
  }
}
