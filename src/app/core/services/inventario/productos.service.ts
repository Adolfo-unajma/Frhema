import { Injectable } from '@angular/core';
import { SupabaseClientService } from '../auth/supabase.client';
import { Producto } from '../../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private readonly TABLE = 'productos';

  constructor(private supabase: SupabaseClientService) {}

  // ============================
  // LISTAR
  // ============================
  async getProductos(): Promise<Producto[]> {
    const { data, error } = await this.supabase.client
      .from(this.TABLE)
      .select('*')
      .order('id_producto', { ascending: true });

    if (error) throw error;
    return data as Producto[];
  }

  // ============================
  // CREAR
  // ============================
  async addProducto(producto: Producto) {
    const { data, error } = await this.supabase.client
      .from(this.TABLE)
      .insert([producto])
      .select()
      .single();

    if (error) throw error;
    return data as Producto;
  }

  // ============================
  // ACTUALIZAR
  // ============================
  async updateProducto(id: number, producto: Partial<Producto>) {
    const { data, error } = await this.supabase.client
      .from(this.TABLE)
      .update(producto)
      .eq('id_producto', id)
      .select()
      .single();

    if (error) throw error;
    return data as Producto;
  }

  // ============================
  // ELIMINAR
  // ============================
  async deleteProducto(id: number) {
    const { error } = await this.supabase.client
      .from(this.TABLE)
      .delete()
      .eq('id_producto', id);

    if (error) throw error;
    return true;
  }
}
