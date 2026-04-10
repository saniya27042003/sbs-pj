import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ApiService, SabhasadOption } from '../api.service';

@Component({
  selector: 'app-sabhasad-vargani',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sabhasad-vargani.html',
  styleUrl: './sabhasad-vargani.css',
})
export class SabhasadVargani implements OnInit {
  sabhasadVarganiForm: FormGroup;
  sabhasadOptions: Array<{ id: number; name: string; fullName: string }> = [];
  tranNoOptions: number[] = [];
  varganiTypes = ['monthly', 'yearly', 'special'];
  allVargani: any[] = [];
  remainingMonths = 12;

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.sabhasadVarganiForm = this.fb.group({
      sabhasadId: [null, Validators.required],
      tranDate: ['', Validators.required],
      tranNo: [null, Validators.required],
      varganiType: ['', Validators.required],
      months: [{ value: null, disabled: true }, []],
      amount: [{ value: null, disabled: true }, [Validators.required]],
    });
  }

  ngOnInit() {
    this.loadAllVargani();
    this.loadSabhasadOptions();
    this.loadTranNoOptions();
    
    this.sabhasadVarganiForm.get('sabhasadId')?.valueChanges.subscribe(() => {
      this.updateRemainingMonths();
      if (this.sabhasadVarganiForm.get('varganiType')?.value === 'monthly') {
        this.updateMonthlyValidators();
      }
    });

    this.sabhasadVarganiForm.get('varganiType')?.valueChanges.subscribe((type) => {
      const amountControl = this.sabhasadVarganiForm.get('amount');
      const monthsControl = this.sabhasadVarganiForm.get('months');
      
      if (type === 'monthly') {
        this.updateRemainingMonths();
        this.updateMonthlyValidators();
        monthsControl?.enable();
        amountControl?.setValidators([Validators.required]);
        amountControl?.disable();
        monthsControl?.setValue(null);
        amountControl?.setValue(null);
      } else if (type === 'yearly') {
        monthsControl?.setValidators([]);
        monthsControl?.disable();
        amountControl?.setValidators([Validators.required]);
        amountControl?.setValue(1200);
        amountControl?.disable();
        monthsControl?.setValue(null);
      } else if (type === 'special') {
        monthsControl?.setValidators([]);
        monthsControl?.disable();
        amountControl?.setValidators([Validators.required, Validators.min(100)]);
        amountControl?.setValue(null);
        amountControl?.enable();
        monthsControl?.setValue(null);
      }
      monthsControl?.updateValueAndValidity();
      amountControl?.updateValueAndValidity();
    });

    this.sabhasadVarganiForm.get('months')?.valueChanges.subscribe((months) => {
      if (months && this.sabhasadVarganiForm.get('varganiType')?.value === 'monthly') {
        const calculatedAmount = months * 100;
        this.sabhasadVarganiForm.get('amount')?.setValue(calculatedAmount);
      }
    });
  }

  private loadSabhasadOptions() {
    this.api.getSabhasadOptions().subscribe({
      next: (data) => {
        this.sabhasadOptions = data.map((item) => {
          const fullName =
            item.fullName ||
            item.name ||
            [item.firstName, item.middleName, item.lastName].filter(Boolean).join(' ');
          return {
            id: item.id,
            name: fullName,
            fullName,
          };
        });
      },
      error: (error) => console.error('Failed to load sabhasad options', error),
    });
  }

  private loadTranNoOptions() {
    this.api.getVarganiCount().subscribe({
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

  private loadAllVargani() {
    this.api.getVargani().subscribe({
      next: (data) => {
        this.allVargani = data || [];
      },
      error: (error) => console.error('Failed to load Vargani data', error),
    });
  }

  private computeRemainingMonths(sabhasadId: number): number {
    if (!sabhasadId) {
      return 12;
    }

    const records = this.allVargani.filter(
      (item) => item.sabhasadId === sabhasadId && item.varganiType !== 'special'
    );

    let filled = 0;
    for (const record of records) {
      if (record.varganiType === 'yearly') {
        filled = 12;
        break;
      }
      filled += Number(record.months) || 0;
      if (filled >= 12) {
        filled = 12;
        break;
      }
    }

    return Math.max(0, 12 - filled);
  }

  private updateRemainingMonths() {
    const sabhasadId = Number(this.sabhasadVarganiForm.get('sabhasadId')?.value);
    this.remainingMonths = this.computeRemainingMonths(sabhasadId);
  }

  private updateMonthlyValidators() {
    const monthsControl = this.sabhasadVarganiForm.get('months');
    if (!monthsControl) {
      return;
    }

    const validators = [Validators.required, Validators.min(1), this.maxMonthsValidator.bind(this)];
    if (this.remainingMonths > 0) {
      validators.push(Validators.max(this.remainingMonths));
    }

    monthsControl.setValidators(validators);
    monthsControl.updateValueAndValidity();
  }

  private maxMonthsValidator(control: AbstractControl) {
    const months = Number(control.value);
    if (!months || months <= 0) {
      return null;
    }

    if (months > this.remainingMonths) {
      return { monthLimit: { max: this.remainingMonths, actual: months } };
    }

    return null;
  }

  onSubmit() {
    if (this.sabhasadVarganiForm.invalid) {
      this.sabhasadVarganiForm.markAllAsTouched();
      return;
    }

    const selectedSabhasadId = Number(this.sabhasadVarganiForm.get('sabhasadId')?.value);
    const selectedSabhasad = this.sabhasadOptions.find((option) => option.id === selectedSabhasadId);

    const payload = {
      ...this.sabhasadVarganiForm.value,
      fullName: selectedSabhasad?.fullName || '',
      sabhasadId: selectedSabhasadId,
      amount: this.sabhasadVarganiForm.get('amount')?.value,
    };

    this.api.createVargani(payload).subscribe({
      next: (response) => {
        console.log('Saved Vargani record', response);
        this.sabhasadVarganiForm.reset();
        this.loadTranNoOptions();
      },
      error: (error) => console.error('Failed to save Vargani record', error),
    });
  }
}

