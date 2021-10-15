/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AtivosService } from './ativos.service';

describe('Service: Ativos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AtivosService]
    });
  });

  it('should ...', inject([AtivosService], (service: AtivosService) => {
    expect(service).toBeTruthy();
  }));
});
