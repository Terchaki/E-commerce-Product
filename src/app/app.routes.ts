import { Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth-guard.guard';
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
    path: 'cadastro',
    component: LayoutsComponent,
    children: [
      {
        path: 'produtos',
        loadComponent: () =>
          import(
            './features/produtos/componentes/produto-list/produto-list.component'
          ).then((c) => c.ProdutoListComponent),
        title: 'E-commerce - Produtos',
        canActivate: [AuthGuard],
      },
      {
        path: 'produtos/novo',
        loadComponent: () =>
          import(
            './features/produtos/componentes/produto-form/produto-form.component'
          ).then((c) => c.ProdutoFormComponent),
        title: 'E-commerce - Novo produto',
        canActivate: [AuthGuard],
      },
      {
        path: 'produtos/editar/:id',
        loadComponent: () =>
          import(
            './features/produtos/componentes/produto-form/produto-form.component'
          ).then((c) => c.ProdutoFormComponent),
        title: 'E-commerce - Editar produto',
        canActivate: [AuthGuard],
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
