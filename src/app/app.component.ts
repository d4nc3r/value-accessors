import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  stepperForm: FormGroup;
  selectedPets: FormControl;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  // fake code table :)
  colors = [ 'red', 'blue', 'green', 'purple', 'orange' ];
  // this is the data coming in from an API, it should not be manipulated!
  pets = [
    { id: 1, name: 'Mitzi', species: 'cat', age: '1', gender: 'F', altered: true },
    { id: 2, name: 'Toothless', species: 'cat', age: '1', gender: 'M', altered: true },
    { id: 3, name: 'Tenshi', species: 'dog', age: '7', gender: 'F', altered: true }
  ];

  ngOnInit() {
    this.selectedPets = new FormControl([1, 3], validateSelection);
    this.firstFormGroup = new FormGroup({
      // validator will be custom, we need a non-empty array at the end
      selectedPets: this.selectedPets
    });
    this.secondFormGroup = new FormGroup({
      // validator will be custom, need a way to indicate something is wrong w/ the child form
      petData: new FormControl()
    });
    this.stepperForm = new FormGroup({
      firstStep: this.firstFormGroup,
      secondStep: this.secondFormGroup
    });
  }

}

function validateSelection(control: FormControl) {
  // test for empty array
  const isNotEmpty = control.value.length > 0;
  return isNotEmpty ? null : { validateSelection: { valid: false } };
}
