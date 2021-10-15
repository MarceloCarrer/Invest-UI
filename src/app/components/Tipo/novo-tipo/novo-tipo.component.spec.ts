import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoTipoComponent } from './novo-tipo.component';

describe('NovoTipoComponent', () => {
  let component: NovoTipoComponent;
  let fixture: ComponentFixture<NovoTipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoTipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
