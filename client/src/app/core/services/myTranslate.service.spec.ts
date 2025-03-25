/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MyTranslateService } from './myTranslate.service';

describe('Service: MyTranslate', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyTranslateService]
    });
  });

  it('should ...', inject([MyTranslateService], (service: MyTranslateService) => {
    expect(service).toBeTruthy();
  }));
});
