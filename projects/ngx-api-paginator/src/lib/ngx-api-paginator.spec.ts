import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxApiPaginator } from './ngx-api-paginator';

describe('NgxApiPaginator', () => {
  let component: NgxApiPaginator;
  let fixture: ComponentFixture<NgxApiPaginator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxApiPaginator],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxApiPaginator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
