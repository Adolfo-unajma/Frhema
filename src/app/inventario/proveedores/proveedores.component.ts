import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProveedoresService } from '../../core/services/inventario/proveedores.service';
import { Proveedor } from '../../core/models/proveedor.model';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './proveedores.component.html'
})
export class ProveedoresComponent implements OnInit {

  proveedores: Proveedor[] = [];
  loading = true;

  modoEdicion = false;
  proveedor: Proveedor = this.getEmptyProveedor();

  constructor(private proveedoresService: ProveedoresService) {}

  ngOnInit() {
    this.cargarProveedores();
  }

  getEmptyProveedor(): Proveedor {
    return {
      nombre: '',
      contacto: '',
      telefono: '',
      direccion: ''
    };
  }

  // ============================
  // LISTAR
  // ============================
  async cargarProveedores() {
    this.loading = true;
    this.proveedores = await this.proveedoresService.getProveedores();
    this.loading = false;
  }

  // NUEVO
  nuevoProveedor() {
    this.modoEdicion = false;
    this.proveedor = this.getEmptyProveedor();
  }

  // EDITAR
  editarProveedor(p: Proveedor) {
    this.modoEdicion = true;
    this.proveedor = { ...p };
  }

  // GUARDAR
  async guardarProveedor() {
    try {
      if (this.modoEdicion && this.proveedor.id_proveedor) {
        await this.proveedoresService.updateProveedor(
          this.proveedor.id_proveedor,
          this.proveedor
        );
        alert('Proveedor actualizado');
      } else {
        await this.proveedoresService.addProveedor(this.proveedor);
        alert('Proveedor registrado');
      }

      this.proveedor = this.getEmptyProveedor();
      this.modoEdicion = false;
      this.cargarProveedores();

    } catch (err) {
      console.error(err);
      alert('Error al guardar');
    }
  }

  // ELIMINAR
  async eliminarProveedor(id: number) {
    if (!confirm('¿Eliminar proveedor?')) return;

    try {
      await this.proveedoresService.deleteProveedor(id);
      this.cargarProveedores();
    } catch (err) {
      alert('Error al eliminar');
    }
  }
}
