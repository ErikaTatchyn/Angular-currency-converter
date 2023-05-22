import { Component } from '@angular/core';
import { CurrencyService } from '../services/currency.service';

@Component({
  selector: 'app-currency-conversion',
  templateUrl: './currency-conversion.component.html',
  styleUrls: ['./currency-conversion.component.css'],
})
export class CurrencyConversionComponent {
  inputValue1: number = 0;
  selectedCurrency1: string = 'USD';
  inputValue2: number = 0;
  selectedCurrency2: string = 'EUR';
  convertedValue: number = 0;
  currencies: any[] = [];

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.currencyService.getExchangeRates().subscribe((response) => {
      const rates = response.conversion_rates;
      this.currencies = Object.keys(rates);
    });
  }

  convert() {
    this.currencyService.getExchangeRates().subscribe((response) => {
      const rates = response.conversion_rates;
      const rate1 = rates[this.selectedCurrency1];
      const rate2 = rates[this.selectedCurrency2];
      if (rate1 !== undefined && rate2 !== undefined) {
        this.convertedValue = (this.inputValue1 / rate1) * rate2;
      } else {
        this.convertedValue = 0;
      }
    });
  }
}
