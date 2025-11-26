import { Injectable } from '@angular/core';
import { SupabaseClientService } from '../auth/supabase.client';
import { Categoria } from '../../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private readonly TABLE = 'categorias';

  constructor(private supabase: SupabaseClientService) {}

  // ===========================
  // LISTAR
  // ===========================
  async getCategorias(): Promise<Categoria[]> {
    const { data, error } = await this.supabase.client
      .from(this.TABLE)
      .select('*')
      .order('id_categoria', { ascending: true });

    if (error) throw error;
    return data as Categoria[];
  }

  // ===========================
  // CREAR
  // ===========================
  async addCategoria(categoria: Categoria) {
    const { data, error } = await this.supabase.client
      .from(this.TABLE)
      .insert([categoria])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // ===========================
  // ACTUALIZAR
  // ===========================
  async updateCategoria(id: number, categoria: Partial<Categoria>) {
    const { data, error } = await this.supabase.client
      .from(this.TABLE)
      .update(categoria)
      .eq('id_categoria', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // ===========================
  // ELIMINAR
  // ===========================
  async deleteCategoria(id: number) {
    const { error } = await this.supabase.client
      .from(this.TABLE)
      .delete()
      .eq('id_categoria', id);

    if (error) throw error;
    return true;
  }
}
