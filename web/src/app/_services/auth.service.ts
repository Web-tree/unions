import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenService} from './token.service';
import {User} from '../_models/user';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly LAST_PAGE_KEY = 'pageBeforeLogin';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router,
  ) {
  }

  getUser(): Promise<User> {
    return this.http.post(environment.authUrlBack + '/rest/checkToken', this.tokenService.getToken()).toPromise();
  }

  isLoggedIn(): boolean {
    return this.tokenService.tokenExists();
  }

  isTokenValid(): Promise<boolean> {
    return this
      .getUser()
      .then(() => Promise.resolve(true))
      .catch(reason => {
        console.log(reason);
        return false;
      });
  }

  logout(): void {
    this.tokenService.removeToken();
  }

  applyToken(token: string) {
    this.tokenService.saveToken(token);
    const page = localStorage.getItem(this.LAST_PAGE_KEY);
    localStorage.removeItem(this.LAST_PAGE_KEY);
    if (page) {
      this.router.navigate([page]);
    } else {
      this.router.navigate(['/']);
    }
  }

  redirectToRegisterPage() {
    return this.redirectToAuth(false);
  }

  redirectToLoginPage() {
    return this.redirectToAuth(true);
  }

  private async redirectToAuth(isLogin: boolean) {
    localStorage.setItem(this.LAST_PAGE_KEY, this.router.url);
    const path = isLogin ? 'login' : 'register';
    window.location.href = `${environment.authUrl}/${path}?returnUnion=${environment.returnUnion}`;
  }
}
