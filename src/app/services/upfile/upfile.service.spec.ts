import { TestBed } from '@angular/core/testing';

import { UpfileService } from './upfile.service';

describe('UpfileService', () => {
  let service: UpfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
