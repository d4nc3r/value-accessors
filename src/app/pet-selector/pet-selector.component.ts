import { Component, Input, HostBinding, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { tap } from 'rxjs/operators';

import { Pet } from '../models';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'pet-selector',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: PetSelectorComponent,
    multi: true
  }],
  templateUrl: './pet-selector.component.html',
  styleUrls: ['./pet-selector.component.scss']
})
export class PetSelectorComponent implements OnInit, ControlValueAccessor {
  @HostBinding() class = "db mb-4";
  @Input() pets: Pet[];
  dataSource: MatTableDataSource<Pet>;
  displayedColumns = ['select', 'name', 'species'];
  selection = new SelectionModel<Pet>(true, []);
  onChange: (value: any) => void;

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Pet>(this.pets);
    this.selection.changed.pipe(
      tap(() => this.sendSelectedIds())
    ).subscribe();
  }

  registerOnTouched(fn) { }
  registerOnChange(fn) { this.onChange = fn }
  writeValue(value: any) { }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: Pet): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} ${row.name}`;
  }

  sendSelectedIds() {
    this.onChange(this.selection.selected.map(pet => pet.id));
  }

}
