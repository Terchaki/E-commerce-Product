import { ILogin } from '../../auth/models/login.model';

export class SecurityUtil {
  /**
   * Saving the login token to local storage.
   */
  public static set(account: ILogin) {
    localStorage.setItem('Auth', btoa(JSON.stringify(account)));
  }

  /**
   * Return token
   */
  public static getToken(): string | null {
    const DATA = localStorage.getItem('Auth');
    if (DATA) {
      return DATA;
    } else {
      return null;
    }
  }

  public static getAccount(): ILogin | null {
    const DATA: ILogin = JSON.parse(
      atob(localStorage.getItem('Auth') as string)
    );
    const ACCOUNT: ILogin = {
      id: DATA.id,
      username: DATA.username,
    };
    if (DATA) {
      return ACCOUNT;
    } else {
      return null;
    }
  }

  public static hasToken() {
    if (this.getToken()) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * Logout
   */
  public static clear() {
    localStorage.removeItem('Auth');
    localStorage.removeItem('Cod-product');
  }
}
