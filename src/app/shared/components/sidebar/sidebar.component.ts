import { Component, EventEmitter, Output } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private gifsService: GifsService) {}

  public get tags() {
    return this.gifsService.tagHistory;
  }

  searchGifs(nameTag: string){
    this.gifsService.searchTag(nameTag);
  }
}
