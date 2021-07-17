import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { TablaComponent } from './pages/tabla/tabla.component';

const routes: Routes = [
  {
    path: 'ventas',
    component: TablaComponent,
  },
  { path: '**', redirectTo: 'ventas' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatTableModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
