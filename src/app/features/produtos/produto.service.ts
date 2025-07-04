
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto, Departamento } from './produto.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.apiUrl}/Produto`);
  }

  getProduto(id: string): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/Produto/${id}`);
  }

  criar(produto: Produto): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/Produto`, produto);
  }

  atualizar(produto: Produto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/Produto/${produto.id}`, produto);
  }

  excluir(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Produto/${id}`);
  }

  getDepartamentos(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${this.apiUrl}/Departamento`);
  }
}
