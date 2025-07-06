import { Component, LOCALE_ID, OnInit, TemplateRef } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';

// Services
import { ProdutoService } from '../../services/produto.service';

// Enum
import { Department } from '../../../../shared/enums/department.enum';

// Components
import { SearchFilterComponent } from './../../../../shared/components/search-filter/search-filter.component';

// Ngx Bootstrap
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';

// Interfaces
import { IProduto } from '../../models/produto.model';
import { ISerarchFilds } from '../../models/field-search-filters.model';

// Pt-Br
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

@Component({
  selector: 'app-produto-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TooltipModule,
    NgxPaginationModule,
    SearchFilterComponent,
  ],
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class ProdutoListComponent implements OnInit {
  pageActual: number = 1;
  itemsPerPage: number = 5;
  products: IProduto[] = [];
  productsAll: IProduto[] = [];
  productsFull: IProduto[] = [];
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
    this.getProducts();
  }

  /**
   * Getting list of products.
   */
  getProducts() {
    this.service.getProdutos().subscribe((p) => {
      this.products = p;
      this.productsFull = p;

      this.setIdNextProduct();
    });
  }

  /**
   * Generating id next new record and save localStorag.
   */
  setIdNextProduct() {
    let index = this.products?.length;
    if (index) {
      this.products.sort((a: any, b: any) => {
        const codigoA: any = a.codigo;
        const codigoB: any = b.codigo;
        return codigoA - codigoB;
      });
      let codigo = this.products[index - 1].codigo;

      localStorage.setItem('Cod-product', codigo);
    } else {
      localStorage.setItem('Cod-product', '0');
    }
  }

  /**
   * Getting list of departaments
   */
  getDepartament(cod: string): string {
    return Department[cod as keyof typeof Department];
  }

  /**
   * Filter Search
   */
  onSearch(filterFields: ISerarchFilds) {
    this.productsAll = this.productsFull;

    if (filterFields.codigo) {
      this.productsAll = this.productsAll.filter((f) => {
        return f.codigo.trim().includes(filterFields.codigo);
      });
    }

    if (filterFields.descricao) {
      this.productsAll = this.productsAll.filter((f) => {
        return f.descricao
          .trim()
          .toLowerCase()
          .includes(filterFields.descricao.toLowerCase());
      });
    }

    if (filterFields.departamento) {
      this.productsAll = this.productsAll.filter((f) => {
        return f.departamentoCodigo.trim().includes(filterFields.departamento);
      });
    }

    if (filterFields.status) {
      this.productsAll = this.productsAll.filter((f) => {
        return filterFields.status === 'true' ? f.status : !f.status;
      });
    }

    this.products = this.productsAll;
  }

  modalExcludedProduct(template: TemplateRef<any>, prod: IProduto): void {
    this.modalRef = this.modalService.show(template, this.configSm);
    this.product = prod;
  }

  confirmExclusion() {
    if (this.product) {
      this.service.delete(this.product.id).subscribe(() => {
        this.products = this.products.filter((p) => p.id !== this.product?.id);
        this.modalRef?.hide();
        if (!this.products.length) {
          localStorage.setItem('Cod-product', '0');
        }
      });
    }
  }

  descart() {
    this.modalRef?.hide();
  }
}
