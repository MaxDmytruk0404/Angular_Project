import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})

export class ForgotPasswordComponent implements OnInit {

  email: string = '';
  errorMessage: string = '';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {

    if (typeof window !== 'undefined' && window.localStorage) {

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

  forgotPassword(){

    this.auth.forgotPassword(this.email);
    this.email = '';

  }
  
}
