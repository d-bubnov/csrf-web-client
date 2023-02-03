import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CSRFTokenComponent } from './csrftoken.component';

describe('CSRFTokenComponent', () => {
  let component: CSRFTokenComponent;
  let fixture: ComponentFixture<CSRFTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CSRFTokenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CSRFTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
