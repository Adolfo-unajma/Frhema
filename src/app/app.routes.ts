/*
import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

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

  {
    path: "dashboard",
    canActivate: [AuthGuard],
    loadComponent: () =>
      import("./layout/dashboard-layout/dashboard-layout.component")
        .then(m => m.DashboardLayoutComponent),
    children: [
      { 
        path: "",
        loadComponent: () =>
          import("./layout/dashboard/dashboard.component")
            .then(m => m.DashboardComponent)
      },

      // INVENTARIO
      {
        path: "productos",
        loadComponent: () =>
          import("./inventario/productos/productos.component")
            .then(m => m.ProductosComponent)
      },
      {
        path: "categorias",
        loadComponent: () =>
          import("./inventario/categorias/categorias.component")
            .then(m => m.CategoriasComponent)
      },
      {
        path: "proveedores",
        loadComponent: () =>
            import("./inventario/proveedores/proveedores.component")
            .then(m => m.ProveedoresComponent)
        },


      // VENTAS
      {
        path: "pos",
        loadComponent: () =>
          import("./ventas/pos/pos.component")
            .then(m => m.PosComponent)
      },
      {
        path: "ventas",
        loadComponent: () =>
          import("./ventas/historial/historial.component")
            .then(m => m.HistorialComponent)
      },

      // COMPRAS
      {
        path: "compras",
        loadComponent: () =>
          import("./compras/compras-list/compras-list.component")
            .then(m => m.ComprasListComponent)
      },

      // CLIENTES
      {
        path: "clientes",
        loadComponent: () =>
          import("./clientes/clientes-list/clientes-list.component")
            .then(m => m.ClientesListComponent)
      },

      // CONFIGURACIÓN
      {
        path: "usuarios",
        loadComponent: () =>
          import("./configuracion/usuarios/usuarios.component")
            .then(m => m.UsuariosComponent)
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

      // INVENTARIO
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

      // VENTAS
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

      // COMPRAS
      {
        path: "compras",
        loadComponent: () =>
          import("./compras/compras-list/compras-list.component")
            .then(m => m.ComprasListComponent),
        canActivate: [RoleGuard],
        data: { roles: [1, 4] }
      },

      // CLIENTES
      {
        path: "clientes",
        loadComponent: () =>
          import("./clientes/clientes-list/clientes-list.component")
            .then(m => m.ClientesListComponent),
        canActivate: [RoleGuard],
        data: { roles: [1, 2, 5] }
      },

      // CONFIGURACIÓN (solo ADMIN)
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
