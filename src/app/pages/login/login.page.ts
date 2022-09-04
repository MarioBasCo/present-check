import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public lForm: FormGroup;
  public rememberMe: boolean;
  public returnUrl;
  error: any;
  loading: boolean = false;

  constructor(
    public lFormBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.lForm = lFormBuilder.group({
      email: [
        atob(localStorage.getItem("val1")) !== "ée"
          ? atob(localStorage.getItem("val1"))
          : "",
        Validators.required,
      ],
      password: [
        atob(localStorage.getItem("val2")) !== "ée"
          ? atob(localStorage.getItem("val2"))
          : "",
        Validators.required,
      ],
      showPassword: false,
    });
  }


  ngOnInit() {
    console.log(atob(localStorage.getItem("val3")));
    console.log(this.lForm);
    const tempVal3 =
      atob(localStorage.getItem("val3")) !== "ée"
        ? atob(localStorage.getItem("val3"))
        : "";
    this.rememberMe = Boolean(tempVal3);
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }


  onChangeRememberMe(token) {
    this.rememberMe =
      token === "clickedOnLabel" ? !this.rememberMe : this.rememberMe;
  }


  checkRememberMe() {
    localStorage.setItem("val3", window.btoa(this.rememberMe.toString()));
    if (this.rememberMe.toString() === "true") {
      localStorage.setItem("val1", window.btoa(this.lForm.get("email").value));
      localStorage.setItem(
        "val2",
        window.btoa(this.lForm.get("password").value)
      );
    } else {
      localStorage.removeItem("val1");
      localStorage.removeItem("val2");
    }
  }


  async onLogin() {
    
  }


  onForgotPassword() {

  }
}
