import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material-module';
import { HomeComponent } from './home/home.component';
import { BestSellerComponent } from './best-seller/best-seller.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {NgxUiLoaderModule, NgxUiLoaderConfig,SPINNER,PB_DIRECTION} from 'ngx-ui-loader';

const ngxUiLoaderConfig:NgxUiLoaderConfig={
  text:"Loading...",
  textColor:"white",
  textPosition:"center-center",
  pbColor:"red",
  bgsColor:"red",
  fgsColor:"red",
  fgsType:SPINNER.ballSpinClockwise,
  fgsSize:100,
  pbDirection:PB_DIRECTION.leftToRight,
  pbThickness:5

}
@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
        BestSellerComponent,
        FullComponent,
        AppHeaderComponent,
        AppSidebarComponent,
        SignupComponent
    ],
  bootstrap: [AppComponent],
  imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        SharedModule,
        NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
        LoginComponent,
        ForgotPasswordComponent
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
