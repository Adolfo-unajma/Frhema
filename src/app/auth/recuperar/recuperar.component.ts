import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseClientService } from '../../core/services/auth/supabase.client';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-recuperar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './recuperar.component.html'
})
export class RecuperarComponent {

  email = '';
  mensaje = '';
  error = '';

  constructor(private supabase: SupabaseClientService) {}

  async enviar() {
    this.error = '';
    this.mensaje = '';

    const { error } = await this.supabase.client.auth.resetPasswordForEmail(
      this.email,
      {
        redirectTo: 'https://cristhianhuamanyauris.github.io/Frhema/reset-password'
      }
    );

    if (error) {
      this.error = error.message;
    } else {
      this.mensaje = 'Se ha enviado un correo con instrucciones para recuperar la contraseña.';
    }
  }
}
