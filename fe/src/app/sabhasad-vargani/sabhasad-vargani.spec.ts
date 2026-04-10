import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SabhasadVargani } from './sabhasad-vargani';

describe('SabhasadVargani', () => {
  let component: SabhasadVargani;
  let fixture: ComponentFixture<SabhasadVargani>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SabhasadVargani]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SabhasadVargani);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
