import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  error: any;
  errorMessage: any;

  constructor(private router: Router, private http: HttpClient) {}

  getToken() {
    return localStorage.getItem('token');
  }

  checkSession() {
    return this.http
      .get('http://localhost:5000/users/checksession')
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    localStorage.removeItem('token');
    return throwError(error.error);
  }

  isLogged() {
    let token = localStorage.getItem('token');
    if (token) {
      this.checkSession().subscribe((data: any) => {
        if(data.rol === "admin"){
          this.isLoggedIn = true;
          this.isAdmin = true;
        }
        if (data._id) {
          this.isLoggedIn = true;
        }
      });
    }
  }

  register(user: any) {
    return this.http.post('http://localhost:5000/users/create', user);
  }

  login(user: any) {
    this.http
      .post('http://localhost:5000/users/login', user)
      .subscribe((data: any) => {
        if(!data.token){
          this.error = data;
        }
        localStorage.setItem('token', data?.token);
        this.isLoggedIn = true;
        if(data?.userDB.rol === "admin"){
          this.isAdmin = true;
        }
        this.router.navigate(['/']);
      }, (err) => {this.errorMessage=err}
      );
  }

  logout() {
    this.isLoggedIn = false;
    this.isAdmin = false;
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
