import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { SwapiService } from './swapi.service';

describe('SwapiService', () => {
  let service: SwapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(SwapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
