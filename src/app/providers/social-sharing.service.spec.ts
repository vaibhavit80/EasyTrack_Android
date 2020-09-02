import { TestBed } from '@angular/core/testing';

import { SocialSharingService } from './social-sharing.service';

describe('SocialSharingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SocialSharingService = TestBed.get(SocialSharingService);
    expect(service).toBeTruthy();
  });
});
