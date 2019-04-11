import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BrMaskerIonicServices3, BrMaskServicesModel } from 'brmasker-ionic-3';
import { AlertController } from '@ionic/angular';
import { UserProvider } from '../providers/user';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {

  customerForm: FormGroup;
  brmasker;
  approvedAmount;

  constructor(
    private fb: FormBuilder,
    public alertController: AlertController,
    private brMasker: BrMaskerIonicServices3,
    private userProvider: UserProvider,
  ) {

    this.customerForm = this.fb.group({
      companyName: [{ value: '', disabled: false }, [Validators.required]],
      nit: [{ value: '', disabled: false }, [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')]],
      salary: [{ value: '', disabled: false }, [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')]],
      startDate: [{ value: '', disabled: false }, [Validators.required]],
    });
  }

  ngOnInit() { }

  /**
   * hacemos la aprobacion o no del cliente.
   */
  validate() {
    console.log('validate');
    if (this.allValidations()) {

      const startDate = this.customerForm.controls['startDate'].value;
      const salary = this.customerForm.controls['salary'].value;
      // const dateFormatted = this.parseISOString(startDate);
      const dateFormatted = this.userProvider.parseISOString(startDate);

      if (!this.yearAndHalf(dateFormatted.year, dateFormatted.month, dateFormatted.day)) {
        const title = 'Fallo';
        const message = 'No se pudo aprobbar por tiempo';
        this.presentSuccess(title, message);
      } else if (this.creditHandler(salary)) {
        const title = 'Aprobacion de Crédito Exitosa';
        const message = 'Se aprobó un crédito por monto de $ ' + this.approvedAmount;
        this.presentSuccess(title, message);
      } else {
        const title = 'Fallo';
        const message = 'No se pudo aprobar por el salario';
        this.presentSuccess(title, message);
      }
    }
  }

  yearAndHalf(year, month, day) {
    return new Date(year + 1, month + 6, day) <= new Date();
  }

  notToday(year, month, day) {
    return new Date(year, month - 1, day + 1) <= new Date();
  }

  validateSalary(value: number) {
    if (this.isInt(value) && value > 0 && value < 100000000) {
      return true;
    } else {
      return false;
    }
  }

  isInt(value) {
    const x = parseFloat(value);
    // tslint:disable-next-line:no-bitwise
    return !isNaN(value) && (x | 0) === x;
  }

  creditHandler(value) {

    if (value >= 4000000) {
      this.approvedAmount = '50.000.000';
      return true;
    } else if (value < 4000000 && value >= 1000000) {
      this.approvedAmount = '20.000.000';
      return true;
    } else if (value < 1000000 && value >= 800000) {
      this.approvedAmount = '5.000.000';
      return true;
    } else {
      return false;
    }
  }

  validateNit(value) {
    console.log('validando nit', value.length);
    if (value.toString().length === 10) {
      return false;
    } else {
      return true;
    }
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Cuidado.',
      // subHeader: 'Subtitle',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentSuccess(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  allValidations() {
    const nit = this.customerForm.controls['nit'].value;
    const salary = this.customerForm.controls['salary'].value;
    const startDate = this.customerForm.controls['startDate'].value;
    const dateFormatted = this.userProvider.parseISOString(startDate);

    if (this.validateNit(nit)) {
      const message = 'El NIT debe tener 10 dígitos';
      this.presentAlert(message);
      return false;
    } else if (!this.validateSalary(salary)) {
      const message = 'Ingresar un salario menor de $100.000.000 y número entero';
      this.presentAlert(message);
      return false;
    } else if (!this.notToday(dateFormatted.year, dateFormatted.month, dateFormatted.day)) {
      const message = 'Ingresa una fecha anterior a hoy';
      this.presentAlert(message);
      return false;
    } else {
      return true;
    }
  }

}
