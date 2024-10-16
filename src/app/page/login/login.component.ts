import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  validateMassage: string = '';
  errorMessage: string = '';
  message: string = '';

  email: string = '';
  password: string = '';

  rememberChecbox: boolean = true;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    
    if (typeof window !== 'undefined' && window.localStorage) {

      // registration complite message

      const localMessage = localStorage.getItem('message') || '';

      if (localMessage !== '') {

        this.message = localMessage;

        setTimeout(() => {
          this.message = this.message.replace(localMessage, '');
        }, 2800);

        localStorage.setItem('message', '');

      }

      // error

      const localError = localStorage.getItem('errorMessage') || '';

      if (localError !== '') {

        this.errorMessage = localError;

        setTimeout(() => {
          this.errorMessage = this.errorMessage.replace(localError, '');
        }, 2800);

        localStorage.setItem('errorMessage', '');

      }

    }

  }

  // Логін

  login() {

    if (this.email == '') {

      this.validateMassage = 'Please enter Email';

      return;

    } else if (!this.email.includes('@gmail.com')) {

      this.validateMassage = 'Field must contain @gmail.com';

      return;

    } else {

      this.validateMassage = '';

    }

    if (this.password == '') {

      this.validateMassage = 'Please enter Password';

      return;

    } else if (this.password.length < 6) {

      this.validateMassage = 'The field must contain more than 6 characters';

      return;

    } else {

      this.validateMassage = '';

    }

    if (this.validateMassage == '') {

      this.auth.login(this.email, this.password);
      this.email = '';
      this.password = '';

    }
  }

  // Вхід через гугл

  signWithGoogle(): void {

    this.auth.googleSignIn();

  }

}
