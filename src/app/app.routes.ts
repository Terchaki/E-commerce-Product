import { Routes } from '@angular/router';
import { LayoutsComponent } from './layouts/layouts.component';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    title: 'Login',
    loadComponent: () =>
      import('./auth/login/login.component').then((c) => c.LoginComponent),
  },
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
  /** Rota Coringa */
  {
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];
