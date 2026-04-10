import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sabhasad-master',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sabhasad-master.html',
  styleUrl: './sabhasad-master.css',
})
export class SabhasadMaster {
  sabhasadForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.sabhasadForm = this.fb.group({
      name: ['', Validators.required],
      // id: ['', Validators.required],
      contactNo: ['', Validators.required],
      address: ['', Validators.required],
      date: ['', Validators.required],
      mailId: [''] // optional
    });
  }

  onSubmit() {
    if (this.sabhasadForm.valid) {
      console.log(this.sabhasadForm.value);
      // Handle form submission
    }
  }
}
