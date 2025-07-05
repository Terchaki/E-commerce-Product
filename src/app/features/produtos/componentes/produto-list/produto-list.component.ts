import { Component, LOCALE_ID, OnInit, TemplateRef } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IProduto } from '../../produto.model';
import { ProdutoService } from '../../produto.service';
import { Department } from '../../../../shared/enums/department.enum';
// Ngx Bootstrap
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import localePt from '@angular/common/locales/pt';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
registerLocaleData(localePt);

@Component({
  selector: 'app-produto-list',
  standalone: true,
  imports: [CommonModule, RouterModule, TooltipModule],
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class ProdutoListComponent implements OnInit {
  produtos: IProduto[] = [];
  product: IProduto | undefined;

  modalRef?: BsModalRef;
  configSm = {
    keyboard: false,
    ignoreBackdropClick: true,
    class: 'modal-dialog-centered modal-sm',
  };

  constructor(
    private service: ProdutoService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.service.getProdutos().subscribe((p) => (this.produtos = p));
  }

  getDepartament(cod: string): string {
    return Department[cod as keyof typeof Department];
  }

  modalExcludedProduct(template: TemplateRef<any>, prod: IProduto): void {
    this.modalRef = this.modalService.show(template, this.configSm);
    this.product = prod;
  }

  confirmExclusion() {
    if (this.product) {
      this.service.delete(this.product.id).subscribe(() => {
        this.produtos = this.produtos.filter((p) => p.id !== this.product?.id);
        this.modalRef?.hide();
      });
    }
  }

  descart() {
    this.modalRef?.hide();
  }

  // excluir(id: string | undefined) {
  //   if (id && confirm('Deseja excluir o produto?')) {
  //     this.service.excluir(id).subscribe(() => {
  //       this.produtos = this.produtos.filter((p) => p.id !== id);
  //     });
  //   }
  // }
}
