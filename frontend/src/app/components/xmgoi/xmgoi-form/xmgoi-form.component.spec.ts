import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmgoiFormComponent } from './xmgoi-form.component';

describe('XmgoiFormComponent', () => {
  let component: XmgoiFormComponent;
  let fixture: ComponentFixture<XmgoiFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XmgoiFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(XmgoiFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
