import { TestBed } from '@angular/core/testing';

import { MensajesServiceService } from './mensajes-service.service';

describe('MensajesServiceService', () => {
  let service: MensajesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MensajesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
