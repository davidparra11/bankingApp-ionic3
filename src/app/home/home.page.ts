import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UserProvider } from '../providers/user';
import { error } from '@angular/compiler/src/util';
import { RequestService } from '../providers/request.service';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  updateInfoForm: FormGroup;
  userList: any[];


  constructor(private fb: FormBuilder,
    private userProvider: UserProvider,
    public alertController: AlertController,
    private router: Router,
    private requestService: RequestService) {

    this.updateInfoForm = this.fb.group({
      identification: [{ value: '', disabled: false }, [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')]],
      firstName: [{ value: '', disabled: false }, [Validators.required]],
      lastName: [{ value: '', disabled: false }, [Validators.required]],
      birthDate: [{ value: '', disabled: false }, [Validators.required]],
    });


    this.getUserFromApi();

    // this.userProvider.getUsers();

  }

  ionViewDidLoad() {

    // console.log('DATA->', this.userProvider.getUsers());
  }

  getUserFromApi() {
    // this.requestService.getData().subscribe(
    //   data => {
    //     // refresh the list
    //     console.log('DATAs', data);
    //     data.array.forEach(element => {
    //       console.log('cadaElemnto', element)
    //       // this.userList.push(element.identification);
    //     });
    //   },
    //   error => {
    //     // return Observable.throw(error);  // Angular 5/RxJS 5.5
    //   }
    // );
  }



  is18YearsOld(year, month, day) {
    return new Date(year + 18, month - 1, day) <= new Date();
  }


  register() {

    const birthdate = this.updateInfoForm.controls['birthDate'].value;
   //  const dateFormatted = this.parseISOString(birthdate);
    const dateFormatted = this.userProvider.parseISOString(birthdate);

    console.log('Mayor de edad', this.is18YearsOld(dateFormatted.year, dateFormatted.month, dateFormatted.day))

    if (this.is18YearsOld(dateFormatted.year, dateFormatted.month, dateFormatted.day)) {
      this.setItUpAtDataBase();
    } else {
      this.presentAlert('Debes ser ciudadano mayor de edad para utilizar el servicio');

    }


  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Cuidado',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  setItUpAtDataBase() {
    const birthDate = this.updateInfoForm.controls['birthDate'].value;
    const sortedBirthDate = this.userProvider.parseISOString(birthDate);
    const birthDateParse = sortedBirthDate.day + '-' + sortedBirthDate.month + '-' + sortedBirthDate.year;
    const dto = {
      birthdate: birthDateParse,
      firstname: this.updateInfoForm.controls['firstName'].value,
      identification: this.updateInfoForm.controls['identification'].value,
      lastname: this.updateInfoForm.controls['lastName'].value
    };

    this.requestService.requesPost(dto).subscribe(
      response => {
        // refresh the list
        console.log('RESPUESTA', response);
        this.router.navigate(['customer']);
      },
      // tslint:disable-next-line:no-shadowed-variable
      error => {
        console.log('ERROR->', error);
        this.presentAlert('No podemos continuar,por favor intenta más tarde');
      }
    );
  }


}
