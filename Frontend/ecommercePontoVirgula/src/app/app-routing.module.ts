import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { CartComponent } from './pages/cart/cart.component';
import { PoliticaPrivacidadeComponent } from './politica-privacidade/politica-privacidade.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuardService] },
  { path: 'politica-privacidade', component: PoliticaPrivacidadeComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];



@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent];