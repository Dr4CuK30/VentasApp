import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Venta } from 'src/app/interfaces/venta.interface';
import { VentasService } from '../../services/ventas.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss'],
})
export class TablaComponent implements OnInit {
  options!: FormGroup;
  empresaControl = new FormControl();
  productoControl = new FormControl();
  compradorControl = new FormControl();
  dateStart = new FormControl();
  dateEnd = new FormControl();
  progress!: boolean;

  ventas: Venta[] = [];
  displayedColumns: string[] = [
    'id',
    'empresa',
    'producto',
    'descripcion',
    'cantidad',
    'fecha',
    'valor_total',
    'comprador',
  ];

  constructor(private ventasService: VentasService, private fb: FormBuilder) {
    this.options = fb.group({
      empresa: this.empresaControl,
      producto: this.productoControl,
      comprador: this.compradorControl,
      start: this.dateStart,
      end: this.dateEnd,
    });
  }

  ngOnInit(): void {
    this.progress = true;
    this.ventasService.getVentas().subscribe((ventas) => {
      this.ventas = ventas;
      this.progress = false;
    });
  }

  cleanForm() {
    this.options.reset();
    this.dateEnd.reset();
    this.dateStart.reset();
  }

  filtrar() {
    this.progress = true;
    const empresa = this.options.get('empresa')?.value;
    const producto = this.options.get('producto')!.value;
    const comprador = this.options.get('comprador')!.value;
    let f_inicio = this.options.get('start')!.value;
    let f_fin = this.options.get('end')!.value;
    if (f_inicio) f_inicio = new Date(f_inicio);
    if (f_fin) f_fin = new Date(f_fin);
    this.ventasService
      .getVentas(
        empresa,
        comprador,
        producto,
        f_inicio?.toISOString(),
        f_fin?.toISOString()
      )
      .subscribe((ventas) => {
        this.ventas = ventas;
        this.progress = false;
      });
  }
}
