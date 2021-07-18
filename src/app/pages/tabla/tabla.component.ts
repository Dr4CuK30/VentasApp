import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Venta } from 'src/app/interfaces/venta.interface';
import { DatosService } from '../../services/datos.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss'],
})
export class TablaComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  options!: FormGroup;
  primera_busqueda: boolean = true;
  empresaControl = new FormControl();
  productoControl = new FormControl();
  compradorControl = new FormControl();
  dateStart = new FormControl();
  dateEnd = new FormControl();
  spinner!: boolean;
  ventas!: MatTableDataSource<Venta>;
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

  constructor(private datosService: DatosService, private fb: FormBuilder) {
    this.options = fb.group({
      empresa: this.empresaControl,
      producto: this.productoControl,
      comprador: this.compradorControl,
      start: this.dateStart,
      end: this.dateEnd,
    });
  }

  ngOnInit(): void {
    this.spinner = true;
    this.filtrar();
  }

  cleanForm() {
    this.options.reset();
    this.dateEnd.reset();
    this.dateStart.reset();
  }

  filtrar() {
    this.spinner = true;
    const empresa = this.options.get('empresa')?.value;
    const producto = this.options.get('producto')!.value;
    const comprador = this.options.get('comprador')!.value;
    let f_inicio = this.options.get('start')!.value;
    let f_fin = this.options.get('end')!.value;
    if (f_inicio) f_inicio = new Date(f_inicio);
    if (f_fin) f_fin = new Date(f_fin);
    this.datosService
      .getVentas(
        empresa,
        comprador,
        producto,
        f_inicio?.toISOString(),
        f_fin?.toISOString()
      )
      .subscribe((ventas) => {
        if (this.primera_busqueda) this.primera_busqueda = false;
        this.ventas = new MatTableDataSource<Venta>(ventas);
        this.spinner = false;
        this.ventas.paginator = this.paginator;
        this.ventas.sort = this.sort;
      });
  }
}
