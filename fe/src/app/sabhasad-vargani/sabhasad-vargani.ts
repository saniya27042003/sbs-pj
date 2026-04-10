import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sabhasad-vargani',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sabhasad-vargani.html',
  styleUrl: './sabhasad-vargani.css',
})
export class SabhasadVargani implements OnInit {
  sabhasadVarganiForm: FormGroup;
  sabhasadOptions: Array<{ id: number; name: string }> = [];
  tranNoOptions: number[] = [];
  varganiTypes = ['monthly', 'yearly', 'special'];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.sabhasadVarganiForm = this.fb.group({
      sabhasadId: [null, Validators.required],
      tranDate: ['', Validators.required],
      tranNo: [null, Validators.required],
      varganiType: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadSabhasadOptions();
    this.loadTranNoOptions();
  }

  private loadSabhasadOptions() {
    this.http.get<any[]>('http://localhost:3000/sabhasad').subscribe({
      next: (data) => {
        this.sabhasadOptions = data.map((item) => ({ id: item.id, name: item.name }));
      },
      error: (error) => console.error('Failed to load sabhasad options', error),
    });
  }

  private loadTranNoOptions() {
    this.http.get<number>('http://localhost:3000/vargani/count').subscribe({
      next: (count) => {
        const next = count + 1;
        this.tranNoOptions = Array.from({ length: next }, (_, i) => i + 1);
        if (!this.sabhasadVarganiForm.get('tranNo')?.value) {
          this.sabhasadVarganiForm.patchValue({ tranNo: next });
        }
      },
      error: (error) => console.error('Failed to load tran no options', error),
    });
  }

  onSubmit() {
    if (this.sabhasadVarganiForm.invalid) {
      this.sabhasadVarganiForm.markAllAsTouched();
      return;
    }

    this.http.post('http://localhost:3000/vargani', this.sabhasadVarganiForm.value).subscribe({
      next: (response) => {
        console.log('Saved Vargani record', response);
        this.sabhasadVarganiForm.reset();
        this.loadTranNoOptions();
      },
      error: (error) => console.error('Failed to save Vargani record', error),
    });
  }
}

