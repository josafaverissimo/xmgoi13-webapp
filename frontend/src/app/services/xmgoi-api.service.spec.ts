import { TestBed } from '@angular/core/testing';

import { XmgoiApiService } from './xmgoi-api.service';

describe('XmgoiApiService', () => {
  let service: XmgoiApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XmgoiApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
