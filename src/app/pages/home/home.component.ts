import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Resultado } from 'src/app/interfaces/pokeapi';
import { Pokemon } from 'src/app/interfaces/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private pokemonService: PokemonService){}

  //Variable que hace referencia al elemento #tarjetas
  @ViewChild('tarjetas') tarjetasElement!:ElementRef;

  //la lista se va a llamar con los elementos ya existentes y con la nueva llamada de la Api
  listaPokemon:Resultado[] = []

  pagina:number = 1;
  cargando:boolean = false;
  pokemonSeleccionado?:Pokemon;
  detalle:boolean = false;

  ngOnInit(): void {
    this.cargarLista();
    this.pokemonService.getById("1");
  }

  async cargarLista(){
    
    this.cargando = true;
    //todos los elementos de la lista
    this.listaPokemon = [...this.listaPokemon, ...await this.pokemonService.getByPage(this.pagina)];
    console.log(this.listaPokemon)
    this.cargando = false;
    this.pagina++;

  }
  
  //evento
  onScroll(e:any){
    if(this.cargando) return;
    if(
      Math.round(
        this.tarjetasElement.nativeElement.clientHeight + this.tarjetasElement.nativeElement.scrollTop)
        === e.srcElement.scrollHeight){
          this.cargarLista();
        }
      }

      async tarjetaClickeada(id:string){
        this.pokemonSeleccionado = await this.pokemonService.getById(id);
      }

      cambiarEstadoDetalle(){
        if(this.pokemonSeleccionado) {
          this.detalle = !this.detalle;
        }
      }
  }
