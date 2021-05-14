import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
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
import { CadastroProdutoComponent } from './pages/cadastro-produto/cadastro-produto.component';
import { FormsModule } from '@angular/forms';
import { VisualizacaoItemComponent } from './pages/visualizacao-item/visualizacao-item.component';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localePt,'pt');
@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    DashboardComponent,
    HeaderComponent,
    CabecalhoMenuComponent,
    CartComponent,
    FooterComponent,
    PoliticaPrivacidadeComponent,
    CadastroProdutoComponent,
    VisualizacaoItemComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(), 
    FormsModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [AuthGuardService, LoginService, {provide: LOCALE_ID, useValue: 'pt'}, {provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
