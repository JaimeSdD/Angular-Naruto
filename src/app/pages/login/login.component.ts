import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.pattern(/^[ñA-Z0-9._%+-]+@[ñA-Z0-9.-]+\.[ñA-Z]{2,4}$/i)]],
      password: ["", [Validators.required, Validators.pattern(/^(?=.*[ñA-Za-z])(?=.*\d)[ñA-Za-z\d]{8,}$/)]]
    })
  }

  public handleError(){
    this.authService.errorMessage= false;
  }
  public handleError1(){
    this.authService.error= false;
  }

  public onSubmit(){
    this.authService.login(this.loginForm.value);
  }
}
