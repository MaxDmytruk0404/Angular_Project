import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css',
})

export class UserInfoComponent implements OnInit {

  userProfile: any;
  comonUserImg: string = 'assets/user-img.png';
  userName: string = '';

  userInfo: any = {
    email: '',
    name: '',
    img: '',
  };

  constructor(private auth: AuthService) {}

  ngOnInit(): void {

    if (typeof window !== 'undefined' && window.localStorage) {

      const userInfoLocal = localStorage.getItem('userInfo') || '';
      let user = JSON.parse(userInfoLocal)

      if (user !== '') {

        this.userInfo = {
          email: user.email,
          name: user.name,
          img: user.img,
        };

      }

    }

  }

  // Вихід

  logout() {

    this.auth.logOut();

  }
}
