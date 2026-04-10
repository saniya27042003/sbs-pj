import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SabhasadMaster } from './sabhasad-master';

describe('SabhasadMaster', () => {
  let component: SabhasadMaster;
  let fixture: ComponentFixture<SabhasadMaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SabhasadMaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SabhasadMaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
