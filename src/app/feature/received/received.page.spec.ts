import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReceivedPage } from './received.page';

describe('ReceivedPage', () => {
  let component: ReceivedPage;
  let fixture: ComponentFixture<ReceivedPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceivedPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReceivedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
