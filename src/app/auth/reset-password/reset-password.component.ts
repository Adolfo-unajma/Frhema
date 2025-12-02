import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseClientService } from '../../core/services/auth/supabase.client';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent {

  nueva = '';
  confirmar = '';
  mensaje = '';
  error = '';

  constructor(private supabase: SupabaseClientService) {}

  async cambiar() {
    this.error = '';
    this.mensaje = '';

    if (this.nueva !== this.confirmar) {
      this.error = "Las contraseñas no coinciden.";
      return;
    }

    const { error } = await this.supabase.client.auth.updateUser({
      password: this.nueva
    });

    if (error) {
      this.error = error.message;
    } else {
      this.mensaje = "La contraseña se cambió correctamente. Ya puedes iniciar sesión.";
    }
  }

}
