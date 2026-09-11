import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Producto } from '../Models/Producto';
import { ProductoDto } from '../Models/Dtos/ProductoDto';
import { UpdateProductoDto } from '../Models/Dtos/UpdateProductoDto';

@Injectable({
  providedIn: 'root',
})
export class ProductoServicio {
  private http = inject(HttpClient)
  private urlBase: string = environment.apiUrl;

  getProductos(){
    return this.http.get<Producto[]>(this.urlBase + 'GetProductos');
  }

  getProducto(id: number){
    return this.http.get<Producto>(this.urlBase + 'GetProducto/' + id);
  }

  CreateProducto(item: Producto){
    return this.http.post(this.urlBase + 'CreateProducto', item, { responseType: 'text' });
  }

  UpdateProducto(item: Producto){

    const producto: UpdateProductoDto = {
        cantidad: item.cantidad,
        valor: item.valor
    }

    return this.http.put(this.urlBase + 'UpdateProducto/' + item.id, producto, { responseType: 'text' });
  }

  DeleteProducto(id: number){
    return this.http.delete(this.urlBase + 'DeleteProducto/' + id, { responseType: 'text' });
  }
}
