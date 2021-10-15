import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoInvestimentoComponent } from './novo-investimento.component';

describe('NovoInvestimentoComponent', () => {
  let component: NovoInvestimentoComponent;
  let fixture: ComponentFixture<NovoInvestimentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoInvestimentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoInvestimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
