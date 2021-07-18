import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { TablaComponent } from './pages/tabla/tabla.component';
import { CompraComponent } from './pages/compra/compra.component';

const routes: Routes = [
  {
    path: '',
    component: TablaComponent,
  },
  {
    path: 'comprar',
    component: CompraComponent,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatTableModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
