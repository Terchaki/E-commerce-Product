import { TestBed } from '@angular/core/testing';
import { LayoutsComponent } from './layouts.component';
import { RouterTestingModule } from '@angular/router/testing';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('LayoutsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutsComponent, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutsComponent, RouterTestingModule],
      providers: [provideAnimations()],
    }).compileComponents();
  });
  it('should create', () => {
    const fixture = TestBed.createComponent(LayoutsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
