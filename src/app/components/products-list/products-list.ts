import { Component, input } from '@angular/core';
import { Producto } from '../../Models/Producto';

@Component({
  selector: 'app-products-list',
  imports: [],
  templateUrl: './products-list.html',
  styleUrl: './products-list.css',
})
export class ProductsList {
  productos = input<Producto[]>([]);
}
