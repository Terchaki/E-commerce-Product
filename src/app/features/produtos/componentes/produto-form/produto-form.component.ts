import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

// Interfaces
import { IProduct, IDepartment } from '../../models/produto.model';

// Componentes
import { ProdutoService } from '../../services/produto.service';

// GUID
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.scss'],
})
export class ProdutoFormComponent implements OnInit {
  form: FormGroup;
  submittedForm = false;
  product!: IProduct;
  department: IDepartment[] = [];
  newProduct: string | null;

  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group(this.validatorsForm());

    /**
     * checking the route to see if it is a new record.
     */
    this.newProduct = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getProduts();
    this.getCodProduct();
  }

  /**
   * Controls form.
   */
  get f() {
    return this.form.controls;
  }

  /**
   * Init form.
   */
  validatorsForm() {
    return {
      codigo: [
        {
          value: '',
          disabled: true,
        },
      ],
      descricao: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),
      ],
      departamentoCodigo: ['', Validators.compose([Validators.required])],
      preco: ['', Validators.compose([Validators.required, Validators.min(0)])],
      status: ['', Validators.compose([Validators.required])],
    };
  }

  /**
   * setting id in code field.
   */
  getCodProduct() {
    if (localStorage.getItem('Cod-product')) {
      const cod = Number(localStorage.getItem('Cod-product')) + 1;
      this.f['codigo'].setValue(cod.toString());
    } else {
      this.f['codigo'].setValue(uuidv4());
    }
  }

  /**
   * filling in form fields.
   */
  getProduts() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.produtoService.getProduct(id).subscribe((p) => {
        this.product = p;
        this.f['codigo'].setValue(p.codigo);
        this.f['descricao'].setValue(p.descricao);
        this.f['departamentoCodigo'].setValue(p.departamentoCodigo);
        this.f['preco'].setValue(p.preco);
        this.f['status'].setValue(p.status ? 'Ativo' : 'Inativo');
      });
    }
    this.produtoService
      .getDepartaments()
      .subscribe((dep) => (this.department = dep));
  }

  save() {
    this.submittedForm = true;

    if (this.form.invalid) {
      return;
    } else {
      let envReq: IProduct = {
        id: this.product?.id ? this.product?.id : uuidv4(),
        codigo: this.f['codigo'].value,
        descricao: this.f['descricao'].value,
        departamentoCodigo: this.f['departamentoCodigo'].value,
        preco: this.f['preco'].value,
        status: this.f['status'].value === 'Ativo' ? true : false,
      };

      const obs = this.newProduct
        ? this.produtoService.update(envReq)
        : this.produtoService.create(envReq);

      obs.subscribe(() => this.router.navigate(['/cadastro/produtos']));
    }
  }
}
