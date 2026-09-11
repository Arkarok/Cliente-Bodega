import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Producto } from '../../Models/Producto';
import { ProductoServicio } from '../../services/producto-servicio';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private productoServicio = inject(ProductoServicio)
  private route = inject(Router)
  private cdr = inject(ChangeDetectorRef)
  public listaProductos: Producto[] = [];

  ngOnInit(): void {
    this.CallProducts();
  }

  GoToCreateProducts(){
    this.route.navigate(['/registrar-producto']);
  }

  GoToEditProducts(item: Producto){
    this.route.navigate(['/registrar-producto', item.id]);
  }

  CallProducts(){
    this.productoServicio.getProductos().subscribe({
      next:(data)=>{
        console.log('Productos recibidos:', data);
        this.listaProductos = data;
        this.cdr.markForCheck();
      }, error: (error) => {
        console.error('Error obteniendo productos:', error);
      }
    })
  }

  DeleteProduct(item: Producto){
    this.productoServicio.DeleteProducto(item.id).subscribe({
      next:(respuesta)=>{
        console.log('Respuesta: ', respuesta);
        this.CallProducts();
      }, error(error) {
        console.error('Error obteniendo productos:', error);
      },
    })
  }
}
