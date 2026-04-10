import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { TranslatePipe } from '../translate.pipe';

@Component({
  selector: 'app-sabhasad-master',
  imports: [ReactiveFormsModule, CommonModule, TranslatePipe],
  templateUrl: './sabhasad-master.html',
  styleUrl: './sabhasad-master.css',
})
export class SabhasadMaster {
  sabhasadForm: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.sabhasadForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      contactNo: ['', Validators.required],
      address: ['', Validators.required],
      date: ['', Validators.required],
      mailId: [''] // optional
    });
  }

  onSubmit() {
    if (this.sabhasadForm.valid) {
      const formData = this.sabhasadForm.value;
      this.api.createSabhasad(formData).subscribe({
        next: (response) => {
          console.log('Data saved successfully', response);
          this.sabhasadForm.reset();
        },
        error: (error) => {
          console.error('Error saving data', error);
        }
      });
    }
  }
}
