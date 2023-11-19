import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmgoiPageComponent } from './xmgoi-page.component';

describe('XmgoiPageComponent', () => {
  let component: XmgoiPageComponent;
  let fixture: ComponentFixture<XmgoiPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [XmgoiPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(XmgoiPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
