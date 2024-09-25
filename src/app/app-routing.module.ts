import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementComponent } from './components/management/management.component';
import { RegisterComponent } from './components/register/register.component';
import { TableComponent } from './table/table.component';
const routes: Routes = [
  { path: '', redirectTo: '/management', pathMatch: 'full' },
  { path: 'management', component: ManagementComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'table', component: TableComponent },
  // Add
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
