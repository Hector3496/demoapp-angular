import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {
  constructor( private http: HttpClient) {
    this.loadLocalStorage();
   }

  private _tagsHistory: string[] = [];

  private apiKey: string = 'pIgKwlEd2LtpfBmx9VK4Nk1BWVBIVNW8';

  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  public gifList: Gif[] = [];
  public get tagHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }

  // public searchTag(tag: string): void {
  //   if(!tag) return;
  //   this.organizeHistory(tag);

  //   fetch('https://api.giphy.com/v1/gifs/search?api_key=pIgKwlEd2LtpfBmx9VK4Nk1BWVBIVNW8&q=valorant&limit=10').then(resp => resp.json()).then(data => console.log(data));
  // }

  // async searchTag(tag: string): Promise<void> {
  //   if(!tag) return;
  //   this.organizeHistory(tag);

  //   const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=pIgKwlEd2LtpfBmx9VK4Nk1BWVBIVNW8&q=valorant&limit=10');
  //   const data = resp.json();
  //   console.log(data);
  // }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if(!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
  }

  searchTag(tag: string): void {
    if(!tag) return;
    this.organizeHistory(tag);

    const params = new HttpParams().set('api_key', this.apiKey).set('limit', '10').set('api_key', this.apiKey).set('q', tag);

    this.http.get<SearchResponse>(`${this.serviceUrl}/search?`, {params: params}).subscribe(resp => {
      this.gifList = resp.data;
    });
  }

}
