import { NgModule } from '@angular/core';
import { BrowserModule, platformBrowser } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/login/dashboard/dashboard.component'; 
import { AuthGuardService } from './guards/auth-guard.service';
import { HeaderComponent } from './components/header/header.component';
import { LoginService } from './services/login.service';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    DashboardComponent,
    HeaderComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [AuthGuardService,LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
