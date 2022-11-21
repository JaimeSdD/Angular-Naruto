import { ICharacter } from './../../models/interfaces';
import { CharactersService } from '../../services/characters.service';
import { Component} from '@angular/core';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent {
  characters?: any[];

  constructor(private characterService: CharactersService) {
    this.characterService.getAllCharacters().subscribe((data: any) => {
      const characterData: any[] = data.map((character: ICharacter) => ({
        id: character._id,
        name: character.name,
        clan: character.clan,
        img: character.img,
      }));

      this.characters = [...characterData];
    });
  }
}
