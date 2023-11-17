import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyNameComponent } from './my-name.component';

describe('MyNameComponent', () => {
  let component: MyNameComponent;
  let fixture: ComponentFixture<MyNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyNameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
