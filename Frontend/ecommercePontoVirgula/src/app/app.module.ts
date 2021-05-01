import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { HeaderComponent } from './components/header/header.component';
import { LoginService } from './services/login.service';
import { CabecalhoMenuComponent } from './components/cabecalho-menu/cabecalho-menu.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { CartComponent } from './pages/cart/cart.component';
import { ToastrModule } from 'ngx-toastr';
import { FooterComponent } from './components/footer/footer.component';
import { PoliticaPrivacidadeComponent } from './politica-privacidade/politica-privacidade.component';
@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    DashboardComponent,
    HeaderComponent,
    CabecalhoMenuComponent,
    CartComponent,
    FooterComponent,
    PoliticaPrivacidadeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(), 
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [AuthGuardService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
