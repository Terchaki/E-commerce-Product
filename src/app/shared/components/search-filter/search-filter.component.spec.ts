import { ToastrModule } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SearchFilterComponent } from './search-filter.component';

describe('SearchFilterComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SearchFilterComponent,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SearchFilterComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
