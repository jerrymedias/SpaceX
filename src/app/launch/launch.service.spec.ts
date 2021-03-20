import { TestBed } from '@angular/core/testing';

import { LaunchService } from './launch.service';

describe('LaunchService', () => {
  let service: LaunchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaunchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
