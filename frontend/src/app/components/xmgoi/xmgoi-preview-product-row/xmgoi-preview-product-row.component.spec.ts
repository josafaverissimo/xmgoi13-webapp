import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmgoiPreviewProductRowComponent } from './xmgoi-preview-product-row.component';

describe('XmgoiPreviewProductRowComponent', () => {
  let component: XmgoiPreviewProductRowComponent;
  let fixture: ComponentFixture<XmgoiPreviewProductRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XmgoiPreviewProductRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(XmgoiPreviewProductRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
