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
  // LOGIN CORRECTO CON ROLES
  // ============================
  async login(email: string, password: string) {

    // 1️⃣ LOGIN en auth.users
    const { data, error } = await this.supabaseService.client.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    const user = data.user;

    // 2️⃣ OBTENER PERFIL DE TABLA "usuarios"
    const { data: perfil, error: e2 } = await this.supabaseService.client
      .from("usuarios")
      .select("id_rol")
      .eq("id_usuario", user.id)
      .single();

    if (e2 || !perfil) throw new Error("Usuario sin rol asignado.");

    // 3️⃣ GUARDAR SESSION
    localStorage.setItem("session", JSON.stringify(data.session));
    localStorage.setItem("token", data.session.access_token);
    localStorage.setItem("user_id", user.id);

    // 4️⃣ GUARDAR ROL EN LOCALSTORAGE (🔴 ESTO FALTABA)
    localStorage.setItem("rol", perfil.id_rol.toString());

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
