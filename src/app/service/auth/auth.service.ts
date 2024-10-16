import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth'
import { GoogleAuthProvider } from '@angular/fire/auth'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  errorMessage: string = ''

  constructor(private fireauth : AngularFireAuth, private router : Router) { }

  // login

  login(email : string, password : string): void {

    this.fireauth.signInWithEmailAndPassword(email, password).then( res =>{

      if(res.user?.emailVerified == true) {

        let userInfo = {
          name: email.replace("@gmail.com", ""),
          email: email,
          img: ''
        }

        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        localStorage.setItem('message', 'Login complite');
        localStorage.setItem('logged', 'true');

        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });

      } else {

        this.router.navigate(['/EmailVerify']).then(() => {
          window.location.reload();
        });

      }

    }, err => {

      this.errorMessage = 'Check if the fields are entered correctly';
      localStorage.setItem('errorMessage', this.errorMessage);
      window.location.reload();

    })
  }

  // registration

  register(email: string, password : string): void {

    this.fireauth.createUserWithEmailAndPassword(email, password).then( res => {


      let userInfo = {
        name: email.replace("@gmail.com", ""),
        email: email,
        img: ''
      }

      localStorage.setItem('userInfo', JSON.stringify(userInfo));

      this.sendEmailForValidation(res.user);

    }, err => {

      this.errorMessage = 'This account is already in use';
      localStorage.setItem('errorMessage', this.errorMessage);
      window.location.reload();

    })

  }

  // sign out

  logOut():void {

    this.fireauth.signOut().then( () => {

      localStorage.setItem('logged', '');
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });

    }, err => {

      this.errorMessage = err.message ;
      localStorage.setItem('errorMessage', this.errorMessage);

      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });

    })
  }

  //  Forgot Password

  forgotPassword(email: string): void {

    this.fireauth.sendPasswordResetEmail(email).then( () => {

      this.router.navigate(['/EmailSent']);

    }, err => {

      this.errorMessage = 'Mail not found';
      localStorage.setItem('errorMessage', this.errorMessage);
      window.location.reload();
    })

  }

  // EmailValidation

  sendEmailForValidation(user: any): void {

    user.sendEmailVerification().then( (res: any) => {
      
      this.router.navigate(['/EmailVerify']);

    }, (err: any) => {

      this.errorMessage = 'Something went wrong. Not able to send mail to your email.';
      localStorage.setItem('errorMessage', this.errorMessage);
      window.location.reload();

    })
  }

  // sign in with gogle

  googleSignIn() {

    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then( res => {

      let user = res.user;

      let userInfo = {
        name: user?.displayName,
        email: user?.email,
        img: user?.photoURL
      }

      localStorage.setItem('userInfo', JSON.stringify(userInfo))

      this.router.navigate(['/Profile']).then((result) => {
        localStorage.setItem('logged', JSON.stringify(res.user?.uid));
        window.location.reload();
      });

    }, err => {

      this.errorMessage = err.message;
      localStorage.setItem('errorMessage', this.errorMessage);
      window.location.reload();

    })

  }


}
