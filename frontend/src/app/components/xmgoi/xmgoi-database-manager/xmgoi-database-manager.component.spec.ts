import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmgoiDatabaseManagerComponent } from './xmgoi-database-manager.component';

describe('XmgoiDatabaseManagerComponent', () => {
  let component: XmgoiDatabaseManagerComponent;
  let fixture: ComponentFixture<XmgoiDatabaseManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [XmgoiDatabaseManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(XmgoiDatabaseManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
