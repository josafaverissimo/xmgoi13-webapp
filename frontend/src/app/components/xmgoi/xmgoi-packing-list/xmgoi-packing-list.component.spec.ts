import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmgoiPackingListComponent } from './xmgoi-packing-list.component';

describe('XmgoiPackingListComponent', () => {
  let component: XmgoiPackingListComponent;
  let fixture: ComponentFixture<XmgoiPackingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XmgoiPackingListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(XmgoiPackingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
