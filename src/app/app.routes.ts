import { Routes } from '@angular/router';

export const routes: Routes = [

  // =====================================================
  // LOGIN
  // =====================================================

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login')
        .then(m => m.Login)
  },


  // =====================================================
  // ADMIN
  // =====================================================

  {
    path: 'admin',

    loadComponent: () =>
      import('./shared/layout/layout.component')
        .then(m => m.LayoutComponent),

    children: [

      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/admin/dashboard/dashboard')
            .then(m => m.Dashboard)
      },

      {
        path: 'user-groups',
        loadComponent: () =>
          import('./features/admin/user-groups/user-groups')
            .then(m => m.UserGroups)
      },

      {
        path: 'users',
        loadComponent: () =>
          import('./features/admin/users/users')
            .then(m => m.Users)
      },

      {
        path: 'war-geography',
        loadComponent: () =>
          import('./features/admin/war-geography/war-geography')
            .then(m => m.WarGeography)
      }

    ]
  },


  // =====================================================
  // UNDERWRITER
  // =====================================================

  {
    path: 'underwriter',

    loadComponent: () =>
      import('./shared/layout/layout.component')
        .then(m => m.LayoutComponent),

    children: [

      // /underwriter
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },

      // /underwriter/dashboard
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/underwriter/dashboard/dashboard')
            .then(m => m.Dashboard)
      },

      // /underwriter/quotations
      {
        path: 'quotations',
        loadComponent: () =>
          import('./features/underwriter/quotations/quotations')
            .then(m => m.Quotations)
      },

      // IMPORTANT:
      // This must come BEFORE :quotationNumber
      // /underwriter/quotations/new
      {
        path: 'quotations/new',
        loadComponent: () =>
          import('./features/underwriter/quotation-form/quotation-form')
            .then(m => m.QuotationForm)
      },

      // /underwriter/quotations/:quotationNumber
      {
        path: 'quotations/:quotationNumber',
        loadComponent: () =>
          import('./features/underwriter/quotation-details/quotation-details')
            .then(m => m.QuotationDetails)
      },

      // /underwriter/policies
      {
        path: 'policies',
        loadComponent: () =>
          import('./features/underwriter/policies/policies')
            .then(m => m.Policies)
      }

    ]
  },


  // =====================================================
  // APPROVER
  // =====================================================

  {
    path: 'approver',

    loadComponent: () =>
      import('./shared/layout/layout.component')
        .then(m => m.LayoutComponent),

    children: [

      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/approver/dashboard/dashboard')
            .then(m => m.Dashboard)
      },

      {
        path: 'inbox',
        loadComponent: () =>
          import('./features/approver/inbox/inbox')
            .then(m => m.Inbox)
      }

    ]
  },


  // =====================================================
  // DEFAULT
  // =====================================================

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },


  // =====================================================
  // UNKNOWN URL
  // =====================================================

  {
    path: '**',
    redirectTo: 'login'
  }

];