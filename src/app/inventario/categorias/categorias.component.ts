import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriasService } from '../../core/services/inventario/categorias.service';
import { Categoria } from '../../core/models/categoria.model';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categorias.component.html'
})
export class CategoriasComponent implements OnInit {

  categorias: Categoria[] = [];
  loading = true;

  // Formulario
  modoEdicion = false;
  categoria: Categoria = this.getEmptyCategoria();

  constructor(private categoriasService: CategoriasService) {}

  ngOnInit() {
    this.cargarCategorias();
  }

  getEmptyCategoria(): Categoria {
    return {
      nombre: '',
      descripcion: ''
    };
  }

  // ============================
  // LISTAR
  // ============================
  async cargarCategorias() {
    this.loading = true;
    this.categorias = await this.categoriasService.getCategorias();
    this.loading = false;
  }

  // ============================
  // NUEVA
  // ============================
  nuevaCategoria() {
    this.modoEdicion = false;
    this.categoria = this.getEmptyCategoria();
  }

  // ============================
  // EDITAR
  // ============================
  editarCategoria(cat: Categoria) {
    this.modoEdicion = true;
    this.categoria = { ...cat };
  }

  // ============================
  // GUARDAR
  // ============================
  async guardarCategoria() {
    try {
      if (this.modoEdicion && this.categoria.id_categoria) {
        await this.categoriasService.updateCategoria(
          this.categoria.id_categoria,
          this.categoria
        );
        alert('Categoría actualizada');
      } else {
        await this.categoriasService.addCategoria(this.categoria);
        alert('Categoría creada');
      }

      this.categoria = this.getEmptyCategoria();
      this.modoEdicion = false;
      this.cargarCategorias();

    } catch (err) {
      alert('Error al guardar categoría');
      console.error(err);
    }
  }

  // ============================
  // ELIMINAR
  // ============================
  async eliminarCategoria(id: number) {
    if (!confirm('¿Eliminar categoría?')) return;

    try {
      await this.categoriasService.deleteCategoria(id);
      this.cargarCategorias();
    } catch (err) {
      alert('Error al eliminar');
    }
  }
}
