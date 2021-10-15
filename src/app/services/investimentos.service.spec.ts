import { TestBed } from '@angular/core/testing';

import { InvestimentosService } from './investimentos.service';

describe('InvestimentosService', () => {
  let service: InvestimentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestimentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
