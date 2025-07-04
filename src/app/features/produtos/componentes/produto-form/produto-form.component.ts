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
import { Produto, Departamento } from '../../produto.model';
import { ProdutoService } from '../../produto.service';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.scss'],
})
export class ProdutoFormComponent implements OnInit {
  // produto: Produto = {
  //   codigo: '',
  //   descricao: '',
  //   departamentoCodigo: '',
  //   preco: 0,
  //   status: true,
  // };
  // departamentos: Departamento[] = [];

  // constructor(
  //   private service: ProdutoService,
  //   private route: ActivatedRoute,
  //   private router: Router
  // ) {}

  // ngOnInit() {
  //   const id = this.route.snapshot.paramMap.get('id');
  //   if (id) {
  //     this.service.getProduto(id).subscribe((p) => (this.produto = p));
  //   }
  //   this.service
  //     .getDepartamentos()
  //     .subscribe((dep) => (this.departamentos = dep));
  // }

  // salvar() {
  //   const obs = this.produto.id
  //     ? this.service.atualizar(this.produto)
  //     : this.service.criar(this.produto);

  //   obs.subscribe(() => this.router.navigate(['/produtos']));
  // }

  form: FormGroup;
  departamentos: Departamento[] = [];

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
        {
          value: '',
          disabled: true,
        },
      ],
      descricao: ['', Validators.compose([Validators.required])],
      departamentoCodigo: ['', Validators.compose([Validators.required])],
      preco: ['', Validators.compose([Validators.required])],
      status: ['', Validators.compose([Validators.required])],
    };
  }

  getProdutos() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.getProduto(id).subscribe((p) => {
        this.f['codigo'].setValue(p.codigo);
        this.f['descricao'].setValue(p.descricao);
        this.f['departamentoCodigo'].setValue(p.departamentoCodigo);
        this.f['preco'].setValue(p.preco);
        this.f['status'].setValue(p.status);
      });
    }
    this.service
      .getDepartamentos()
      .subscribe((dep) => (this.departamentos = dep));
  }

  salvar() {
    // const obs = this.produto.id
    //   ? this.service.atualizar(this.produto)
    //   : this.service.criar(this.produto);

    // obs.subscribe(() => this.router.navigate(['/produtos']));
  }
}
