import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { UsuariosService } from '../../core/services/configuracion/usuarios.service';

@Component({
  selector: 'app-registrar-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registrar-usuario.component.html'
})
export class RegistrarUsuarioComponent {

  email = '';
  password = '';
  nombre_usuario = '';
  nombre = '';
  apellido = '';
  mensaje = '';
  error = '';

  constructor(
    private authService: AuthService,
    private usuariosService: UsuariosService
  ) {}

  async registrar() {
    this.mensaje = '';
    this.error = '';

    try {
      // 1️⃣ Crear usuario en auth.users
      const { user } = await this.authService.registerInternal(this.email, this.password);

      if (!user) throw new Error("Error al crear usuario en auth.");

      // 2️⃣ Crear perfil en tabla usuarios
      await this.usuariosService.crearPerfil({
        id_usuario: user.id,
        nombre_usuario: this.nombre_usuario,
        nombre: this.nombre,
        apellido: this.apellido,
        id_rol: null  // admin asignará después
      });

      this.mensaje = "Usuario registrado correctamente. Ahora el administrador debe asignar el rol.";
      this.email = this.password = this.nombre_usuario = this.nombre = this.apellido = '';

    } catch (err: any) {
      this.error = err.message || "Error desconocido.";
    }
  }

}

