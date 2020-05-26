import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  stepperForm: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  colors = [ 'red', 'blue', 'green', 'purple', 'orange' ];
  // this is the data coming in from an API, it should not be manipulated!
  pets = [
    { id: 1, name: 'Mitzi', species: 'cat', gender: 'F' },
    { id: 2, name: 'Toothless', species: 'cat', gender: 'M' },
    { id: 3, name: 'Tenshi', species: 'dog', gender: 'F' }
  ];

  ngOnInit() {
    this.firstFormGroup = new FormGroup({
      // validator will be custom, we need a non-empty array at the end
      selectedPets: new FormControl([])
    });
    this.secondFormGroup = new FormGroup({
      color: new FormControl('', Validators.required)
    });
    this.stepperForm = new FormGroup({
      firstStep: this.firstFormGroup,
      secondStep: this.secondFormGroup
    });
  }




}
