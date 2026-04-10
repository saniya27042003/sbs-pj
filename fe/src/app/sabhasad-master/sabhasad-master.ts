import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sabhasad-master',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sabhasad-master.html',
  styleUrl: './sabhasad-master.css',
})
export class SabhasadMaster {
  sabhasadForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.sabhasadForm = this.fb.group({
      name: ['', Validators.required],
      contactNo: ['', Validators.required],
      address: ['', Validators.required],
      date: ['', Validators.required],
      mailId: [''] // optional
    });
  }

  onSubmit() {
    if (this.sabhasadForm.valid) {
      const formData = this.sabhasadForm.value;
      // Convert date string to Date object if needed, but backend can handle string
      this.http.post('http://localhost:3000/sabhasad', formData).subscribe({
        next: (response) => {
          console.log('Data saved successfully', response);
          // Reset form or show success message
          this.sabhasadForm.reset();
        },
        error: (error) => {
          console.error('Error saving data', error);
        }
      });
    }
  }
}
