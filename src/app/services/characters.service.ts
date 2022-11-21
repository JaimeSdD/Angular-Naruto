import { ICharacter } from 'src/app/models/interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {

  constructor(private http: HttpClient) {}

  public getAllCharacters(): Observable<any> {
    return this.http.get('http://localhost:5000/characters');
  }

  public getCharacter(id: string): Observable<any> {
    return this.http.get('http://localhost:5000/characters/' + id);
  }

  public createCharacter(newCharacter:any){
    return this.http.post("http://localhost:5000/characters/create", newCharacter);
  }

  public editCharacter(id: string, updatedCharacter:any){
    return this.http.put("http://localhost:5000/characters/edit/" + id, updatedCharacter)
  }

  public deleteCharacter(id: string){
    return this.http.delete("http://localhost:5000/characters/delete/" +id)
  }
}
