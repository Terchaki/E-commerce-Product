import { TestBed } from '@angular/core/testing';
import { ProdutoListComponent } from './produto-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';

describe('ProdutoListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProdutoListComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        ModalModule.forRoot(),
        ToastrModule.forRoot(),
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ProdutoListComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
