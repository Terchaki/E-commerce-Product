import { ILogin } from '../../auth/models/login.model';

export class SecurityUtil {
  // Salvando Token de login no local storage.
  public static set(account: ILogin) {
    localStorage.setItem('Auth', btoa(JSON.stringify(account)));
  }

  /**
   * Retornar token
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

  /**
   * Possui token?
   */
  public static hasToken() {
    if (this.getToken()) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * Excluir token
   */
  public static clear() {
    localStorage.removeItem('Auth');
  }
}
