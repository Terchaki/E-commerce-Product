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
import { IProduto, IDepartamento } from '../../models/produto.model';
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
  produto!: IProduto;
  departamentos: IDepartamento[] = [];
  newProduct: string | null;

  constructor(
    private service: ProdutoService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    /**
     * Inicializando form.
     */
    this.form = this.formBuilder.group(this.validatorsForm());
    this.newProduct = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getProdutos();
  }

  /**
   * Controls do formulário.
   */
  get f() {
    return this.form.controls;
  }

  validatorsForm() {
    return {
      /**
       * Validadores do form:
       */
      codigo: [
        '',
        // {
        //   value: '',
        //   disabled: true,
        // },
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

  getProdutos() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.getProduto(id).subscribe((p) => {
        this.produto = p;
        this.f['codigo'].setValue(p.codigo);
        this.f['descricao'].setValue(p.descricao);
        this.f['departamentoCodigo'].setValue(p.departamentoCodigo);
        this.f['preco'].setValue(p.preco);
        this.f['status'].setValue(p.status ? 'Ativo' : 'Inativo');
      });
    }
    this.service
      .getDepartaments()
      .subscribe((dep) => (this.departamentos = dep));
  }

  salvar() {
    this.submittedForm = true;

    if (this.form.invalid) {
      return;
    } else {
      let envReq: IProduto = {
        id: this.produto?.id ? this.produto?.id : uuidv4(),
        codigo: this.f['codigo'].value,
        descricao: this.f['descricao'].value,
        departamentoCodigo: this.f['departamentoCodigo'].value,
        preco: this.f['preco'].value,
        status: this.f['status'].value === 'Ativo' ? true : false,
      };

      console.log(envReq);

      const obs = this.newProduct
        ? this.service.update(envReq)
        : this.service.create(envReq);

      obs.subscribe(() => this.router.navigate(['/cadastro/produtos']));
    }
  }
}
