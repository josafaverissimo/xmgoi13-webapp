import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmgoiProductsTableComponent } from './xmgoi-products-table.component';

describe('XmgoiProductsTableComponent', () => {
  let component: XmgoiProductsTableComponent;
  let fixture: ComponentFixture<XmgoiProductsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XmgoiProductsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(XmgoiProductsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
