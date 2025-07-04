import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Produto } from '../../produto.model';
import { ProdutoService } from '../../produto.service';
import { Department } from '../../../../shared/enums/department.enum';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

@Component({
  selector: 'app-produto-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class ProdutoListComponent implements OnInit {
  produtos: Produto[] = [];

  constructor(private service: ProdutoService) {}

  ngOnInit() {
    this.service.getProdutos().subscribe((p) => (this.produtos = p));
  }

  getDepartament(cod: string): string {
    return Department[cod as keyof typeof Department];
  }

  excluir(id: string | undefined) {
    if (id && confirm('Deseja excluir o produto?')) {
      this.service.excluir(id).subscribe(() => {
        this.produtos = this.produtos.filter((p) => p.id !== id);
      });
    }
  }
}
