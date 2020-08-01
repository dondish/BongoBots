import { TestBed } from '@angular/core/testing';

import { SnowflakeGuard } from './snowflake.guard';
import { RouterTestingModule, setupTestingRouter } from '@angular/router/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, RouterStateSnapshot, Router } from '@angular/router';

describe('SnowflakeGuard', () => {
  let guard: SnowflakeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
          RouterTestingModule
        ]
    });
    guard = TestBed.inject(SnowflakeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('CanActivate', () => {
    let state: RouterStateSnapshot;

    beforeEach(() => {
      state = {} as RouterStateSnapshot;
    });

    it('should work with 18 digit integers', () => {
      let next = new ActivatedRouteSnapshot();
      spyOn(next.paramMap, 'get').and.returnValue('531613242473054229');
      expect(guard.canActivate(next, state)).toBeTrue();
      next = new ActivatedRouteSnapshot();
      spyOn(next.paramMap, 'get').and.returnValue('420517675509350400');
      expect(guard.canActivate(next, state)).toBeTrue();
    });

    it('should not work with less than 18 digits or text', () => {
      let next = new ActivatedRouteSnapshot();
      spyOn(next.paramMap, 'get').and.returnValue('234234234424243244asfasdf');
      expect(guard.canActivate(next, state)).toBeFalse();
      next = new ActivatedRouteSnapshot();
      spyOn(next.paramMap, 'get').and.returnValue('asdfasdfasdfasdfasdfasdf');
      expect(guard.canActivate(next, state)).toBeFalse();
    });

  });

});
