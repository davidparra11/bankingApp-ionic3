import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { UserProvider } from '../providers/user';
import { RequestService } from '../providers/request.service';
import { HttpClientModule } from '@angular/common/http';
import {NgxMaskModule} from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [HomePage],
  providers: [
    UserProvider,
    RequestService
]
})
export class HomePageModule {}
