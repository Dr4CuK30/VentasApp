import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
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
  productoControl = new FormControl(null, [Validators.required]);
  compradorControl = new FormControl(null, [Validators.required]);
  cantidadControl = new FormControl(null, [
    Validators.required,
    Validators.min(1),
  ]);

  constructor(private datosService: DatosService, private fb: FormBuilder) {
    this.options = fb.group({
      empresa: this.empresaControl,
      producto: this.productoControl,
      comprador: this.compradorControl,
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
    this.productoControl.reset();
    this.datosService
      .getProductos(event.value)
      .subscribe((productos) => (this.productos = productos));
  }

  calcularTotal() {
    this.totalCompra =
      this.options.value.producto?.precio * this.options.value.cantidad || null;
  }
}
