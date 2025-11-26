/*
// src/app/core/services/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { SupabaseClientService } from './supabase.client';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private supabaseService: SupabaseClientService,
    private router: Router
  ) {}

  // ============================
  // LOGIN
  // ============================
  async login(email: string, password: string) {
    const { data, error } = await this.supabaseService.client.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    localStorage.setItem('session', JSON.stringify(data.session));

    return data.session;
  }

  // ============================
  // REGISTER
  // ============================
  async register(email: string, password: string, nombre_usuario: string) {
    const { data, error } = await this.supabaseService.client.auth.signUp({
      email,
      password,
      options: {
        data: {
          nombre_usuario
        }
      }
    });

    if (error) throw error;

    return data;
  }

  // ============================
  // LOGOUT
  // ============================
  async logout() {
    await this.supabaseService.client.auth.signOut();
    localStorage.removeItem('session');
    this.router.navigate(['/']);
  }

  // ============================
  // GET SESSION
  // ============================
  getSession() {
    const session = localStorage.getItem('session');
    return session ? JSON.parse(session) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getSession();
  }
}
*/

// src/app/core/services/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { SupabaseClientService } from './supabase.client';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private supabaseService: SupabaseClientService,
    private router: Router
  ) {}

  // ============================
  // LOGIN
  // ============================
  async login(email: string, password: string) {
    const { data, error } = await this.supabaseService.client.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    // GUARDAR SESSION COMPLETA
    localStorage.setItem('session', JSON.stringify(data.session));

    // GUARDAR TOKEN (opcional)
    localStorage.setItem('token', data.session.access_token);

    // ⭐⭐⭐ GUARDAR USER_ID NECESARIO PARA VENTAS/COMPRAS
    localStorage.setItem('user_id', data.user.id);

    return data.session;
  }

  // ============================
  // REGISTER
  // ============================
  async register(email: string, password: string, nombre_usuario: string) {
    const { data, error } = await this.supabaseService.client.auth.signUp({
      email,
      password,
      options: {
        data: {
          nombre_usuario
        }
      }
    });

    if (error) throw error;

    return data;
  }

  // ============================
  // LOGOUT
  // ============================
  async logout() {
    await this.supabaseService.client.auth.signOut();
    localStorage.removeItem('session');
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    this.router.navigate(['/']);
  }

  // ============================
  // SESSION
  // ============================
  getSession() {
    const session = localStorage.getItem('session');
    return session ? JSON.parse(session) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getSession();
  }
}
