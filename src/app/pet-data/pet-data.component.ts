import { Component, OnInit, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, FormControl, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';

import { Pet } from '../models';

@Component({
  selector: 'pet-data',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: PetDataComponent,
    multi: true
  }],
  templateUrl: './pet-data.component.html',
  styleUrls: ['./pet-data.component.scss']
})
export class PetDataComponent implements OnInit, ControlValueAccessor {
  selectedPets: number[];
  petInfoForm = new FormGroup({});
  @Input() pets: Pet[];
  @Input() set selectedPetIds(value: number[]) {
    // each time the selectedPets array changes, update the form
    this.selectedPets = value;
    
    // loop thru the pets
    this.pets.forEach(pet => {
      const isSelected = this.selectedPets.includes(pet.id);
      // if pet is selected, ensure a FormGroup exists
      isSelected ? this.addPetFormGroup(pet)
      // if pet is not selected, remove FormGroup (if it already exists)
        : this.removePetFormGroup(pet.id);
    })
  }
  onChange: (value: any) => void;

  ngOnInit() {
    this.petInfoForm.valueChanges.pipe(
      tap(value => {
        if(this.onChange) {
          this.onChange(value);
        }
      })
    ).subscribe();
  }

  registerOnTouched(fn) { }
  registerOnChange(fn) { this.onChange = fn }
  writeValue(value) { 
    console.log('write value for pet-data');
  }

  addPetFormGroup(pet: Pet) {
    const petId = pet.id.toString();
    // if form group doesn't exist, add it
    if(!this.petInfoForm.get(petId)) {
      this.petInfoForm.addControl(petId, new FormGroup({
        age: new FormControl(pet.age),
        gender: new FormControl(pet.gender, Validators.required),
        altered: new FormControl(pet.altered)
      }));
    }
  }

  removePetFormGroup(petId: number) {
    // if form group exists, remove it

  }

  getPet(petId: number) {
    return this.pets.find(pet => pet.id === petId);
  }

  getFormGroup(petId: number) {
    return this.petInfoForm.get(petId.toString());
  }

}
