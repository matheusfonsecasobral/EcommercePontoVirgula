import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];



@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent];