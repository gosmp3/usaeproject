import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  isLoggedIn: boolean = false;


  constructor(public auth: AuthService, private router: Router ) {}
  
  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      if(isAuthenticated){
        this.router.navigate(['/dashboard'])
      }
    throw new Error('Method not implemented.');
    }
  )}
 
  
  login() {
    // Validación de credenciales
    if (this.username === 'admin' && this.password === 'admin123') {
      // Credenciales válidas
      this.isLoggedIn = true;
      console.log('Inicio de sesión exitoso');
    } else {
      // Credenciales inválidas
      this.isLoggedIn = false;
      console.log('Inicio de sesión fallido');

      this.router.navigate(['/login']); // Redirige a la página de inicio o de acceso
    }
    this.auth.loginWithRedirect()
  }
}
