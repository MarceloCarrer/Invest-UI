import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarTipoComponent } from './atualizar-tipo.component';

describe('AtualizarTipoComponent', () => {
  let component: AtualizarTipoComponent;
  let fixture: ComponentFixture<AtualizarTipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtualizarTipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtualizarTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
