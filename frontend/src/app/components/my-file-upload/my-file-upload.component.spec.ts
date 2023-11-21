import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFileUploadComponent } from './my-file-upload.component';

describe('MyFileUploadComponent', () => {
  let component: MyFileUploadComponent;
  let fixture: ComponentFixture<MyFileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyFileUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
