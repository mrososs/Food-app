import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecipeDialogComponent } from './view-recipe-dialog.component';

describe('ViewRecipeDialogComponent', () => {
  let component: ViewRecipeDialogComponent;
  let fixture: ComponentFixture<ViewRecipeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewRecipeDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRecipeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
