import { Injectable } from '@angular/core';
import { SupabaseClientService } from '../auth/supabase.client';
import { Usuario } from '../../models/usuario.model';
import { Rol } from '../../models/rol.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private readonly TABLE = 'usuarios';

  constructor(private supabase: SupabaseClientService) {}

  // ============================
  // LISTAR USUARIOS + ROL
  // ============================
  async getUsuarios(): Promise<(Usuario & { roles?: Rol | null })[]> {
    const { data, error } = await this.supabase.client
      .from(this.TABLE)
      .select(`
        id_usuario,
        nombre_usuario,
        nombre,
        apellido,
        id_rol,
        roles (
          id_rol,
          nombre_rol
        )
      `)
      .order('nombre_usuario', { ascending: true });

    if (error) throw error;
    return data as any;
  }

  // ============================
  // ACTUALIZAR ROL DE USUARIO
  // ============================
  async actualizarRolUsuario(id_usuario: string, id_rol: number | null) {
    const { error } = await this.supabase.client
      .from(this.TABLE)
      .update({ id_rol })
      .eq('id_usuario', id_usuario);

    if (error) throw error;
    return true;
  }
}
