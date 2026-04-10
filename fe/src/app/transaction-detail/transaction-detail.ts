import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { TranslatePipe } from '../translate.pipe';

@Component({
  selector: 'app-transaction-detail',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './transaction-detail.html',
  styleUrl: './transaction-detail.css',
})
export class TransactionDetail implements OnInit {
  monthlyData: any[] = [];
  specialData: any[] = [];
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getVargani().subscribe(data => {
      const specialItems = data
        .filter(item => item.varganiType === 'special')
        .map((item: any) => ({
          sabhasadid: item.sabhasadId,
          fullname: item.fullName,
          amount: Number(item.amount) || 0
        }));

      const monthlyItems = data.filter(item => item.varganiType !== 'special');
      monthlyItems.sort((a, b) => a.sabhasadId - b.sabhasadId || a.id - b.id);

      const grouped = monthlyItems.reduce((acc, item) => {
        if (!acc[item.sabhasadId]) {
          acc[item.sabhasadId] = {
            sabhasadId: item.sabhasadId,
            fullname: item.fullName,
            varganiList: []
          };
        }
        const parsedAmount = Number(item.amount) || 0;
        acc[item.sabhasadId].varganiList.push({ ...item, amount: parsedAmount });
        return acc;
      }, {} as { [key: number]: { sabhasadId: number; fullname: string; varganiList: any[] } });

      this.monthlyData = Object.values(grouped).map((group: any) => {
        let filledCount = 0;
        let totalAmount = 0;
        let monthAmounts: { [key: string]: number } = {};
        this.months.forEach(m => monthAmounts[m] = 0);

        group.varganiList.forEach((item: any) => {
          if (filledCount >= 12) {
            return;
          }

          if (item.varganiType === 'yearly') {
            const remainingMonths = 12 - filledCount;
            for (let i = 0; i < remainingMonths; i++) {
              monthAmounts[this.months[filledCount + i]] += 100;
            }
            totalAmount += remainingMonths * 100;
            filledCount = 12;
          } else if (item.varganiType === 'monthly') {
            const requestedMonths = Number(item.months) || 0;
            const remainingMonths = 12 - filledCount;
            const monthsToFill = Math.min(requestedMonths, remainingMonths);

            for (let i = 0; i < monthsToFill; i++) {
              monthAmounts[this.months[filledCount + i]] += 100;
            }

            totalAmount += monthsToFill * 100;
            filledCount += monthsToFill;
          }
        });

        return {
          sabhasadid: group.sabhasadId,
          fullname: group.fullname,
          amount: totalAmount,
          ...monthAmounts
        };
      });

      this.specialData = specialItems;
    });
  }
}
