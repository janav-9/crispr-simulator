import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideRNAComponent } from './guide-rna.component';

describe('GuideRNAComponent', () => {
  let component: GuideRNAComponent;
  let fixture: ComponentFixture<GuideRNAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuideRNAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideRNAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
