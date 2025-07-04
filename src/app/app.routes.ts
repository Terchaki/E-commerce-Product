import { Routes } from '@angular/router';
import { ProdutoFormComponent } from './features/produtos/componentes/produto-form/produto-form.component';
import { ProdutoListComponent } from './features/produtos/componentes/produto-list/produto-list.component';
import { LayoutsComponent } from './layouts/layouts.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  // { path: 'produtos', component: ProdutoListComponent },
  // { path: 'produtos/novo', component: ProdutoFormComponent },
  // { path: 'produtos/editar/:id', component: ProdutoFormComponent },

  {
    path: '',
    component: LayoutsComponent,
    children: [
      {
        path: 'produtos',
        loadComponent: () =>
          import(
            './features/produtos/componentes/produto-list/produto-list.component'
          ).then((c) => c.ProdutoListComponent),
      },
      {
        path: 'produtos/novo',
        loadComponent: () =>
          import(
            './features/produtos/componentes/produto-form/produto-form.component'
          ).then((c) => c.ProdutoFormComponent),
      },
      {
        path: 'produtos/editar/:id',
        loadComponent: () =>
          import(
            './features/produtos/componentes/produto-form/produto-form.component'
          ).then((c) => c.ProdutoFormComponent),
      },
    ],
  },
];
