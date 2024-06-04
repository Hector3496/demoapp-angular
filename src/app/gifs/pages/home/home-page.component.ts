import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  constructor(private gifsService: GifsService) {
    if(!localStorage.getItem('history')) return;
    let list = JSON.parse(localStorage.getItem('history')!);
    this.gifsService.searchTag(list[0]);
  }


  public get gifs() : Gif[] {
    return this.gifsService.gifList;
  }

}
