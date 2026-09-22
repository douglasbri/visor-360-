import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonApiComponent } from './pokemon_api.component';

describe('PokemonApiComponent', () => {
  let component: PokemonApiComponent;
  let fixture: ComponentFixture<PokemonApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonApiComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
