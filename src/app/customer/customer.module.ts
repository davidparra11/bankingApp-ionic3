import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CustomerPage } from './customer.page';
import { NgxMaskModule } from 'ngx-mask';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { UserProvider } from '../providers/user';

const routes: Routes = [
  {
    path: '',
    component: CustomerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrMaskerModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [CustomerPage],
  providers: [
    UserProvider
  ]
})
export class CustomerPageModule {}
