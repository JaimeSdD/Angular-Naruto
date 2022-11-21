import { Observable } from 'rxjs';
import { ICharacter } from 'src/app/models/interfaces';
import { CharactersService } from './../../services/characters.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-character-info',
  templateUrl: './character-info.component.html',
  styleUrls: ['./character-info.component.scss'],
})
export class CharacterInfoComponent {
  id: any;
  character: ICharacter;
  
  constructor(
    private route: ActivatedRoute,
    private characterService: CharactersService,
    private router: Router
    ) {
      this.route.paramMap.subscribe((params) => {
        this.id = params.get('id');
      this.characterService.getCharacter(this.id).subscribe((data: any) => {
        this.character = { ...data };
        console.log(this.character);
      });
    });
  }

  deleteCharacter(){
    this.characterService.deleteCharacter(this.id).subscribe(() => this.router.navigate(['/characters']))
  }


}
