import {Injectable} from '@angular/core';

@Injectable()
export class TokenService {
  private tokenName = 'token';

  tokenExists(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenName);
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenName, token);
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }
}
