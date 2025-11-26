export interface Producto {
  id_producto?: number;
  codigo: string;
  nombre: string;
  descripcion?: string;
  id_categoria?: number | null;
  id_proveedor?: number | null;
  unidad_medida: string;
  stock_actual: number;
  stock_minimo: number;
  precio_unitario: number;
  precio_mayor?: number | null;
  tiene_caducidad: boolean;
  fecha_vencimiento?: string | null; // ISO format
  tiene_garantia: boolean;
  meses_garantia?: number | null;
}
