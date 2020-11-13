import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("Timer", () => {
    it("should be zero initially", () => {
      expect(component.timer).toBe(0)
    })
    it("should not be zero when timer is started", () => {
      component.startTimer()
      expect(component.timer).toBe(0)
    })
  })

  describe("Counter", () => {
    it("should display the counter value", () => {
      const compiled = fixture.nativeElement
      expect(compiled.querySelector(".counter-value").textContent).toBe("counter: 0")
      expect(compiled.querySelector(".counter-value").textContent).toContain("counter")
    })
  })

});
