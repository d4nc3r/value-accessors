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
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  // this is the data coming in from an API, it should not be manipulated!
  pets = [
    { id: 1, name: 'Mitzi', species: 'cat', age: '1', gender: 'F', altered: true },
    { id: 2, name: 'Toothless', species: 'cat', age: '1', gender: 'M', altered: true },
    { id: 3, name: 'Tenshi', species: 'dog', age: '7', gender: 'F', altered: true }
  ];

  ngOnInit() {
    this.firstFormGroup = new FormGroup({
    });
    this.secondFormGroup = new FormGroup({
    });
    this.stepperForm = new FormGroup({
      firstStep: this.firstFormGroup,
      secondStep: this.secondFormGroup
    });
  }

}
