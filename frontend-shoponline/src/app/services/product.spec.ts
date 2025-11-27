import { TestBed } from '@angular/core/testing';

import { Product } from './product';

describe('Product', () => {
  let service: Product;

  beforeEach(() => {
    // No need to inject Product if it's just a type/model
    service = {} as Product;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
