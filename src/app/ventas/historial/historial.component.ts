
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentasService } from '../../core/services/ventas/ventas.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historial.component.html'
})
export class HistorialComponent implements OnInit {

  ventas: any[] = [];
  detalle: any[] = [];
  mostrandoDetalle = false;
  ventaSeleccionada: any = null;

  loading = true;

  constructor(private ventasService: VentasService) {}

  async ngOnInit() {
    await this.cargarVentas();
  }

  // ============================
  // CARGAR VENTAS
  // ============================
  async cargarVentas() {
    this.loading = true;
    this.ventas = await this.ventasService.getVentas();
    this.loading = false;
  }

  // ============================
  // VER DETALLE
  // ============================
  async verDetalle(venta: any) {
    this.ventaSeleccionada = venta;
    this.detalle = await this.ventasService.getDetalle(venta.id_venta);
    this.mostrandoDetalle = true;
  }

  // ============================
  // CERRAR DETALLE
  // ============================
  cerrarDetalle() {
    this.mostrandoDetalle = false;
    this.detalle = [];
    this.ventaSeleccionada = null;
  }

}
