import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

// Interfaces
import { IDepartment } from '../../../features/produtos/models/produto.model';
import { ISerarchFilds } from './../../../features/produtos/models/field-search-filters.model';

// Services
import { ProdutoService } from '../../../features/produtos/services/produto.service';

@Component({
  selector: 'app-search-filter',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.scss',
})
export class SearchFilterComponent implements OnInit {
  @Output() itemsFilters = new EventEmitter<ISerarchFilds>();
  form: FormGroup;
  departamentos: IDepartment[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService
  ) {
    /**
     * Init form.
     */
    this.form = this.formBuilder.group(this.validatorsForm());
  }

  ngOnInit(): void {
    this.getDepartaments();
  }

  /**
   * Controls do formulário.
   */
  get f() {
    return this.form.controls;
  }

  /**
   * Validators form.
   */
  validatorsForm() {
    return {
      codigo: [''],
      descricao: [''],
      departamento: [''],
      status: [''],
    };
  }

  getDepartaments() {
    this.produtoService
      .getDepartaments()
      .subscribe((dep) => (this.departamentos = dep));
  }

  /**
   * Clearing form fields and notifying parent component.
   */
  clearFields() {
    this.form.reset();
    this.f['status'].setValue('');
    this.f['departamento'].setValue('');
    let envReq: ISerarchFilds = {
      codigo: this.f['codigo'].value,
      descricao: this.f['descricao'].value,
      departamento: this.f['departamento'].value,
      status: this.f['status'].value,
    };
    this.itemsFilters.emit(envReq);
  }

  /**
   * Sending the search of the applied filter to the parent component.
   */
  env() {
    let envReq: ISerarchFilds = {
      codigo: this.f['codigo'].value,
      descricao: this.f['descricao'].value,
      departamento: this.f['departamento'].value,
      status: this.f['status'].value,
    };
    this.itemsFilters.emit(envReq);
  }
}
