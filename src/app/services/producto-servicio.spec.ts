import { TestBed } from '@angular/core/testing';

import { ProductoServicio } from './producto-servicio';

describe('ProductoServicio', () => {
  let service: ProductoServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
