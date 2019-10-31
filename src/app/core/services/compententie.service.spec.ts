import { TestBed } from '@angular/core/testing';

import { CompententieService } from './compententie.service';

describe('CompententieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompententieService = TestBed.get(CompententieService);
    expect(service).toBeTruthy();
  });
});
