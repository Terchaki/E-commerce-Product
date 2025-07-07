import { TestBed } from '@angular/core/testing';
import { ProdutoFormComponent } from './produto-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ProdutoFormComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProdutoFormComponent,
        HttpClientTestingModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
      ],
      providers: [
        provideAnimations(),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }),
            snapshot: {
              paramMap: {
                get: () => '123',
              },
            },
          },
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ProdutoFormComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
