import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialRoutes } from './material.routing';
import { MaterialModule } from '../shared/material-module';
import { ViewBillProductsComponent } from './dialog/view-bill-products/view-bill-products.component';

@NgModule({ declarations: [
        ViewBillProductsComponent
    ], imports: [CommonModule,
        RouterModule.forChild(MaterialRoutes),
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        CdkTableModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class MaterialComponentsModule {}
