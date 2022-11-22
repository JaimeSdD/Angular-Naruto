import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.pattern(/^[ñA-Z0-9._%+-]+@[ñA-Z0-9.-]+\.[ñA-Z]{2,4}$/i)]],
      password: ["", [Validators.required, Validators.pattern(/^(?=.*[ñA-Za-z])(?=.*\d)[ñA-Za-z\d]{8,}$/)]]
    })
  }
  

  public onSubmit(){
    this.authService.register(this.registerForm.value).subscribe(data => {
      this.router.navigate(["/login"])
    })
  }

}
