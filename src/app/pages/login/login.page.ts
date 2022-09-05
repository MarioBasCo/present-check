import { LstorageService } from './../../services/lstorage.service';
import { UtilService } from './../../services/util.service';
import { AlertService } from './../../services/alert.service';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  lForm: FormGroup;
  rememberMe: boolean;
  showPassword = false;
  passwordToggleIcon = 'eye-off-outline';

  constructor(
    public lFormBuilder: FormBuilder,
    private router: Router,
    private serLogin: LoginService,
    private serAlert: AlertService,
    private serUtil: UtilService,
    private serStorage: LstorageService
  ) {
    this.buildForm()
  }

  buildForm() {
    this.lForm = this.lFormBuilder.group({
      correo: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      clave: ['', [Validators.required]],
    });
  }


  ngOnInit() {

  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon == 'eye-off-outline') {
      this.passwordToggleIcon = 'eye-outline';
    } else {
      this.passwordToggleIcon = 'eye-off-outline';
    }
  }

  ingresar() {
    console.log(JSON.stringify(this.lForm.value));
    this.serLogin.fun_login(this.serUtil.objectToFormData(this.lForm.value)).subscribe(res => {
      if (res.status == true) {
        this.serStorage.set('user', res.data);
        this.limpiarForm();
        this.router.navigateByUrl('/home', { replaceUrl: true });
      } else {
        this.serAlert.showToast('Credenciales incorrectas', 'danger');
      }
    });
  }

  limpiarForm(){
    this.buildForm();
    this.lForm.reset(this.lForm.value);
  }

  onForgotPassword() {

  }
}
