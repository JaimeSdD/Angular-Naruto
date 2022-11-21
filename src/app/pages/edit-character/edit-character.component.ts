import { Router, ActivatedRoute } from '@angular/router';
import { CharactersService } from 'src/app/services/characters.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-character',
  templateUrl: './edit-character.component.html',
  styleUrls: ['./edit-character.component.scss'],
})
export class EditCharacterComponent implements OnInit {
  characterForm: FormGroup;
  updatedCharacter: any;
  id: any;

  constructor(
    private characterService: CharactersService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.characterService.getCharacter(this.id).subscribe((data) => {
        this.updatedCharacter = data;

        this.characterForm = this.formBuilder.group({
          name: [this.updatedCharacter.name, [Validators.required]],
          img: [this.updatedCharacter.img, [Validators.required]],
          clan: [this.updatedCharacter.clan, [Validators.required]],
          clanSymbol: [this.updatedCharacter.clanSymbol],
          village: [this.updatedCharacter.village, [Validators.required]],
          villageSymbol: [this.updatedCharacter.villageSymbol],
          jutsus: this.formBuilder.array([
            ...this.updatedCharacter.jutsus.map((el: any) => {
              return this.formBuilder.group({
                jap: [el.jap],
                eng: [el.eng],
                _id: [el._id],
              });
            }),
          ]),
        });

        this.changeDetector.detectChanges();
        
      });
    });

    this.characterForm.valueChanges.subscribe((changes) => {
      this.updatedCharacter = changes;
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
    formData.append(
      'jutsus',
      JSON.stringify(this.characterForm.get('jutsus')?.value)
    );
    this.characterService
      .editCharacter(this.id, formData)
      .subscribe(() => this.router.navigate(['/characters']));
  }
}
