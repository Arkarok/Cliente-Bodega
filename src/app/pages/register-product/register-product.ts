import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductoServicio } from '../../services/producto-servicio';
import { ProductoDto } from '../../Models/Dtos/ProductoDto';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../../Models/Producto';

@Component({
  selector: 'app-register-product',
  imports: [FormsModule],
  templateUrl: './register-product.html',
  styleUrl: './register-product.css',
})
export class RegisterProduct {

  private productoServicio = inject(ProductoServicio);
  private route = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  public editando: boolean = false;
  public newProducto: Producto = {
    id : 0,
    nombre: '',
    cantidad: 0,
    valor: 0
  };

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {

      this.editando = true;
      const idProducto = Number(id);
      this.CargarProducto(idProducto);
    }

  }

  CargarProducto(id: number) {

    this.productoServicio.getProducto(id).subscribe({
      next: (producto) => {
        console.log('Producto encontrado:', producto);
        this.newProducto = producto;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error obteniendo producto:', error);
      }
    });

  }

  RegistrarProducto() {
    if (this.editando) {
      this.productoServicio.UpdateProducto(this.newProducto).subscribe({
        next: (respuesta) => {
          console.log('✅ Producto actualizado:', respuesta);
          this.route.navigate(['/']);
        },
        error: (error) => {
          console.error('❌ Error actualizando producto:', error);
        }
      });
    } else {

      this.productoServicio.CreateProducto(this.newProducto).subscribe({
        next: (respuesta) => {
          console.log('✅ Producto registrado:', respuesta);
          this.route.navigate(['/']);
        },
        error: (error) => {
          console.error('❌ Error registrando producto:', error);
        }
      });

    }
  }
}