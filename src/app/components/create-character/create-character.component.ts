import { ICharacter } from 'src/app/models/interfaces';
import { Component, OnInit } from '@angular/core';
import { CharactersService } from 'src/app/services/characters.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.scss'],
})
export class CreateCharacterComponent implements OnInit {
  newCharacter: ICharacter = {
    name: '',
    img: '',
    clan: '',
    clanSymbol: '',
    village: '',
    villageSymbol: '',
    jutsus: [],
  };

  characterForm: FormGroup;

  constructor(
    private characterService: CharactersService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.characterForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      img: ['', [Validators.required]],
      clan: ['', [Validators.required]],
      clanSymbol: [''],
      village: ['', [Validators.required]],
      villageSymbol: [''],
      jutsus: this.formBuilder.array([]),
    });

    this.characterForm.valueChanges.subscribe((changes) => {
      this.newCharacter = changes;
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.characterForm.patchValue({
      img: file,
    });
  }

  get jutsus(): FormArray {
    return this.characterForm.controls['jutsus'] as FormArray;
  }

  deleteJutsu(id: number){
    this.jutsus.removeAt(id)
  }

  addJutsu() {
    const jutsuForm = this.formBuilder.group({
      jap: [''],
      eng: [''],
    });

    this.jutsus.push(jutsuForm);
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.characterForm.get('name')?.value);
    formData.append('img', this.characterForm.get('img')?.value);
    formData.append('clan', this.characterForm.get('clan')?.value);
    formData.append('clanSymbol', this.characterForm.get('clanSymbol')?.value);
    formData.append('village', this.characterForm.get('village')?.value);
    formData.append(
      'villageSymbol',
      this.characterForm.get('villageSymbol')?.value
    );
    formData.append('jutsus', JSON.stringify(this.characterForm.get('jutsus')?.value));
    this.characterService
      .createCharacter(formData)
      .subscribe(() => this.router.navigate(['/characters']));
  }
}
