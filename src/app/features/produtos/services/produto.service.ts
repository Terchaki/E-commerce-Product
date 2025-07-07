import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Services
import { IProduct, IDepartment } from '../models/produto.model';

// RXJS
import { catchError, Observable, tap, throwError } from 'rxjs';

// Services
import { ToastrFeedbackService } from '../../../shared/services/toastr-feedback.service';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(
    private http: HttpClient,
    private toastrFeedbackService: ToastrFeedbackService
  ) {}

  getProductsList(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.apiUrl}/Produto`).pipe(
      catchError((error) => {
        this.toastrFeedbackService.toast(
          'Falha ao tentar carregar os produtos, tente novamente!',
          '',
          'error'
        );
        return throwError(() => error);
      })
    );
  }

  getProduct(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.apiUrl}/Produto/${id}`).pipe(
      catchError((error) => {
        this.toastrFeedbackService.toast(
          'Falha ao tentar carregar produto, tente novamente!',
          '',
          'error'
        );
        return throwError(() => error);
      })
    );
  }

  create(produto: IProduct): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/Produto`, produto).pipe(
      tap(() => {
        this.toastrFeedbackService.toast(
          'Novo produto cadastrado!',
          '',
          'success'
        );
      }),
      catchError((error) => {
        this.toastrFeedbackService.toast(
          'Falha ao tentar editar o produto, tente novamente!',
          '',
          'error'
        );
        return throwError(() => error);
      })
    );
  }

  update(produto: IProduct): Observable<void> {
    return this.http
      .put<void>(`${this.apiUrl}/Produto/${produto.id}`, produto)
      .pipe(
        tap(() => {
          this.toastrFeedbackService.toast(
            'O produto foi editado com sucesso!',
            '',
            'success'
          );
        }),
        catchError((error) => {
          this.toastrFeedbackService.toast(
            'Falha ao tentar editar o produto, tente novamente!',
            '',
            'error'
          );
          return throwError(() => error);
        })
      );
  }

  delete(id: string | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Produto/${id}`).pipe(
      tap(() => {
        this.toastrFeedbackService.toast(
          'O produto foi excluído com sucesso!',
          '',
          'success'
        );
      }),
      catchError((error) => {
        this.toastrFeedbackService.toast(
          'Falha ao tentar excluir o produto, tente novamente!',
          '',
          'error'
        );
        return throwError(() => error);
      })
    );
  }

  getDepartaments(): Observable<IDepartment[]> {
    return this.http.get<IDepartment[]>(`${this.apiUrl}/Departamento`).pipe(
      catchError((error) => {
        this.toastrFeedbackService.toast(
          'Falha ao tentar carregar os departamentos, tente novamente!',
          '',
          'error'
        );
        return throwError(() => error);
      })
    );
  }
}
