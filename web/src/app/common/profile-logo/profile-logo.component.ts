import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../_services/auth.service';
import {User} from '../../_models/user';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-profile-logo',
  templateUrl: './profile-logo.component.html',
  styleUrls: ['./profile-logo.component.scss']
})
export class ProfileLogoComponent implements OnInit {

  user: User = {};
  private username?: string;
  shortName?: string;
  loginUrl: string = environment.authUrl + '/login?returnUnion=unions';
  registerUrl: string = environment.authUrl + '/register?returnUnion=unions';


  constructor(
    public authService: AuthService
  ) {}

  static generateShortName(user: User): string | undefined {
    return user.username?.slice(0, 2).toUpperCase();
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.authService.getUser().then(user => {
        this.user = user;
        this.username = user.username;
        this.shortName = ProfileLogoComponent.generateShortName(user);
      });
    }
  }

}
