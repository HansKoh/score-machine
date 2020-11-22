import { TestBed } from '@angular/core/testing';

import { TexasService } from './texas.service';

describe('TexasService', () => {
  let service: TexasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TexasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
