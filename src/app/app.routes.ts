/*


import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./auth/login/login.component")
        .then(m => m.LoginComponent)
  },

  {
    path: "registro",
    loadComponent: () =>
      import("./auth/registro/registro.component")
        .then(m => m.RegistroComponent)
  },

  // ============================
  // DASHBOARD PRINCIPAL
  // ============================
  {
    path: "dashboard",
    canActivate: [AuthGuard],
    loadComponent: () =>
      import("./layout/dashboard-layout/dashboard-layout.component")
        .then(m => m.DashboardLayoutComponent),

    children: [

      // DASHBOARD GENERAL (todos los roles)
      { 
        path: "",
        loadComponent: () =>
          import("./layout/dashboard/dashboard.component")
            .then(m => m.DashboardComponent),
        canActivate: [RoleGuard],
        data: { roles: [1, 2, 3, 4, 5] }
      },

      // ============================
      // INVENTARIO
      // ============================
      {
        path: "productos",
        loadComponent: () =>
          import("./inventario/productos/productos.component")
            .then(m => m.ProductosComponent),
        canActivate: [RoleGuard],
        data: { roles: [1, 3] }
      },

      {
        path: "categorias",
        loadComponent: () =>
          import("./inventario/categorias/categorias.component")
            .then(m => m.CategoriasComponent),
        canActivate: [RoleGuard],
        data: { roles: [1, 3] }
      },

      {
        path: "proveedores",
        loadComponent: () =>
          import("./inventario/proveedores/proveedores.component")
            .then(m => m.ProveedoresComponent),
        canActivate: [RoleGuard],
        data: { roles: [1, 3, 4] }
      },

      // ============================
      // VENTAS
      // ============================
      {
        path: "pos",
        loadComponent: () =>
          import("./ventas/pos/pos.component")
            .then(m => m.PosComponent),
        canActivate: [RoleGuard],
        data: { roles: [1, 2] }
      },

      {
        path: "ventas",
        loadComponent: () =>
          import("./ventas/historial/historial.component")
            .then(m => m.HistorialComponent),
        canActivate: [RoleGuard],
        data: { roles: [1, 2] }
      },

      // ============================
      // COMPRAS
      // ============================
      {
        path: "compras",
        loadComponent: () =>
          import("./compras/compras-list/compras-list.component")
            .then(m => m.ComprasListComponent),
        canActivate: [RoleGuard],
        data: { roles: [1, 4] }
      },

      // ============================
      // CLIENTES
      // ============================
      {
        path: "clientes",
        loadComponent: () =>
          import("./clientes/clientes-list/clientes-list.component")
            .then(m => m.ClientesListComponent),
        canActivate: [RoleGuard],
        data: { roles: [1, 2, 5] }
      },

      // ============================
      // REPORTES (módulo completo)
      // Solo Admin (1) + Gerente (5)
      // ============================
      {
        path: "reportes",
        canActivate: [RoleGuard],
        data: { roles: [1, 5] },
        children: [

          {
            path: "ventas",
            loadComponent: () =>
              import("./reportes/ventas-reporte/ventas-reporte.component")
                .then(m => m.VentasReporteComponent)
          },

          {
            path: "compras",
            loadComponent: () =>
              import("./reportes/compras-reporte/compras-reporte.component")
                .then(m => m.ComprasReporteComponent)
          },

          {
            path: "inventario",
            loadComponent: () =>
              import("./reportes/inventario-reporte/inventario-reporte.component")
                .then(m => m.InventarioReporteComponent)
          },


          // ============================
          // ⚡ NUEVO: REPORTE GERENCIAL
          // ============================
          {
            path: "gerencial",
            loadComponent: () =>
              import("./reportes/gerencial/gerencial.component")
                .then(m => m.GerencialComponent)
          }
        ]
      },

      // ============================
      // CONFIGURACIÓN
      // ============================
      {
        path: "usuarios",
        loadComponent: () =>
          import("./configuracion/usuarios/usuarios.component")
            .then(m => m.UsuariosComponent),
        canActivate: [RoleGuard],
        data: { roles: [1] }
      }
    ]
  },

  { path: "**", redirectTo: "" }
];
*/
import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

export const routes: Routes = [

  // ============================
  // LOGIN ÚNICO PÚBLICO
  // ============================
  {
    path: "",
    loadComponent: () =>
      import("./auth/login/login.component")
        .then(m => m.LoginComponent)
  },

  {
    path: 'recuperar',
    loadComponent: () =>
      import('./auth/recuperar/recuperar.component')
        .then(m => m.RecuperarComponent)
  },

  {
    path: 'reset-password',
    loadComponent: () =>
      import('./auth/reset-password/reset-password.component')
        .then(m => m.ResetPasswordComponent)
  },


  // ============================
  // DASHBOARD PRINCIPAL (privado)
  // ============================
  {
    path: "dashboard",
    canActivate: [AuthGuard],
    loadComponent: () =>
      import("./layout/dashboard-layout/dashboard-layout.component")
        .then(m => m.DashboardLayoutComponent),

    children: [

      // ============================
      // INICIO
      // ============================
      { 
        path: "",
        loadComponent: () =>
          import("./layout/dashboard/dashboard.component")
            .then(m => m.DashboardComponent),
        canActivate: [RoleGuard],
        data: { roles: [1, 2, 3, 4, 5] }
      },

      // ============================
      // INVENTARIO
      // ============================
      {
        path: "productos",
        loadComponent: () =>
          import("./inventario/productos/productos.component")
            .then(m => m.ProductosComponent),
        canActivate: [RoleGuard],
        data: { roles: [1, 3] }
      },

      {
        path: "categorias",
        loadComponent: () =>
          import("./inventario/categorias/categorias.component")
            .then(m => m.CategoriasComponent),
        canActivate: [RoleGuard],
        data: { roles: [1, 3] }
      },

      {
        path: "proveedores",
        loadComponent: () =>
          import("./inventario/proveedores/proveedores.component")
            .then(m => m.ProveedoresComponent),
        canActivate: [RoleGuard],
        data: { roles: [1, 3, 4] }
      },

      // ============================
      // VENTAS
      // ============================
      {
        path: "pos",
        loadComponent: () =>
          import("./ventas/pos/pos.component")
            .then(m => m.PosComponent),
        canActivate: [RoleGuard],
        data: { roles: [1, 2] }
      },

      {
        path: "ventas",
        loadComponent: () =>
          import("./ventas/historial/historial.component")
            .then(m => m.HistorialComponent),
        canActivate: [RoleGuard],
        data: { roles: [1, 2] }
      },

      // ============================
      // COMPRAS
      // ============================
      {
        path: "compras",
        loadComponent: () =>
          import("./compras/compras-list/compras-list.component")
            .then(m => m.ComprasListComponent),
        canActivate: [RoleGuard],
        data: { roles: [1, 4] }
      },

      // ============================
      // CLIENTES
      // ============================
      {
        path: "clientes",
        loadComponent: () =>
          import("./clientes/clientes-list/clientes-list.component")
            .then(m => m.ClientesListComponent),
        canActivate: [RoleGuard],
        data: { roles: [1, 2, 5] }
      },

      // ============================
      // REPORTES (Admin + Gerente)
      // ============================
      {
        path: "reportes",
        canActivate: [RoleGuard],
        data: { roles: [1, 5] },
        children: [
          {
            path: "ventas",
            loadComponent: () =>
              import("./reportes/ventas-reporte/ventas-reporte.component")
                .then(m => m.VentasReporteComponent)
          },
          {
            path: "compras",
            loadComponent: () =>
              import("./reportes/compras-reporte/compras-reporte.component")
                .then(m => m.ComprasReporteComponent)
          },
          {
            path: "inventario",
            loadComponent: () =>
              import("./reportes/inventario-reporte/inventario-reporte.component")
                .then(m => m.InventarioReporteComponent)
          },
          {
            path: "gerencial",
            loadComponent: () =>
              import("./reportes/gerencial/gerencial.component")
                .then(m => m.GerencialComponent)
          }
        ]
      },

      // ============================
      // CONFIGURACIÓN
      // ============================
      {
        path: "usuarios",
        loadComponent: () =>
          import("./configuracion/usuarios/usuarios.component")
            .then(m => m.UsuariosComponent),
        canActivate: [RoleGuard],
        data: { roles: [1] }
      },

      // ✅ NUEVO: REGISTRAR USUARIO DESDE ADMIN
      {
        path: "registrar-usuario",
        loadComponent: () =>
          import("./configuracion/registrar-usuario/registrar-usuario.component")
            .then(m => m.RegistrarUsuarioComponent),
        canActivate: [RoleGuard],
        data: { roles: [1] }
      }
    ]
  },

  // ============================
  // 404 → LOGIN
  // ============================
  { path: "**", redirectTo: "" }
];
