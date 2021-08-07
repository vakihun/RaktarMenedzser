import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { ThingsComponent } from './things/things.component';
import { WarehousesComponent } from './warehouses/warehouses.component';
import { ThingEditComponent } from './things/thing-edit/thing-edit.component';
import { ConfirmationDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { WarehouseEditComponent } from './warehouses/warehouse-edit/warehouse-edit.component';
import { WarehouseFitcheckComponent } from './warehouses/warehouse-fitcheck/warehouse-fitcheck.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from "./shared/material.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    ThingsComponent,
    WarehousesComponent,
    ThingEditComponent,
    ConfirmationDialogComponent,
    WarehouseEditComponent,
    WarehouseFitcheckComponent,
  ],
  imports: [
    LayoutModule,
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
