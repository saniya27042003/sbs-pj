import { Injectable, signal } from '@angular/core';

export type Language = 'en' | 'mr';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  language = signal<Language>('en');

  private readonly translations: Record<Language, Record<string, string>> = {
    en: {
      'nav.sabhasadMaster': 'Sabhasad Master',
      'nav.sabhasadVargani': 'Sabhasad Vargani',
      'nav.transactionDetail': 'Transaction Detail',
      'nav.report': 'Report',
      'nav.language': 'Language',
      'nav.english': 'English',
      'nav.marathi': 'Marathi',
      'sabhasadMaster.title': 'Sabhasad Master',
      'sabhasadMaster.firstName': 'First Name:*',
      'sabhasadMaster.middleName': 'Middle Name:',
      'sabhasadMaster.lastName': 'Last Name:*',
      'sabhasadMaster.contactNo': 'Contact No:*',
      'sabhasadMaster.address': 'Address:*',
      'sabhasadMaster.date': 'Date:*',
      'sabhasadMaster.mailId': 'Mail ID :',
      'sabhasadMaster.submit': 'Submit',
      'sabhasadMaster.firstNameRequired': 'First Name is required.',
      'sabhasadMaster.lastNameRequired': 'Last Name is required.',
      'sabhasadMaster.contactRequired': 'Contact No is required.',
      'sabhasadMaster.addressRequired': 'Address is required.',
      'sabhasadMaster.dateRequired': 'Date is required.',
      'sabhasadVargani.title': 'Sabhasad Vargani',
      'sabhasadVargani.sabhasadName': 'Sabhasad Name:*',
      'sabhasadVargani.tranDate': 'Tran Date:*',
      'sabhasadVargani.tranNo': 'Tran No:*',
      'sabhasadVargani.varganiType': 'Vargani Type:*',
      'sabhasadVargani.months': 'Number of Months:*',
      'sabhasadVargani.amount': 'Amount:*',
      'sabhasadVargani.selectSabhasad': 'Select Sabhasad',
      'sabhasadVargani.selectType': 'Select Type',
      'sabhasadVargani.monthly': 'monthly',
      'sabhasadVargani.yearly': 'yearly',
      'sabhasadVargani.special': 'special',
      'sabhasadVargani.required': 'This field is required.',
      'sabhasadVargani.monthsRequired': 'Number of months is required.',
      'sabhasadVargani.monthsMax': 'Number of months cannot exceed 12.',
      'sabhasadVargani.amountMin': 'Amount must be at least 100.',
      'sabhasadVargani.submit': 'Submit',
      'transactionDetail.special': 'Special Vargani',
      'transactionDetail.monthly': 'Monthly Vargani',
      'transactionDetail.sabhasadId': 'Sabhasad ID',
      'transactionDetail.fullName': 'Full Name',
      'transactionDetail.amount': 'Amount',
      'login.title': 'Login',
      'report.title': 'Report',
    },
    mr: {
      'nav.sabhasadMaster': 'सभासद मास्टर',
      'nav.sabhasadVargani': 'सभासद वरगणी',
      'nav.transactionDetail': 'व्यवहार तपशील',
      'nav.report': 'अहवाल',
      'nav.language': 'भाषा',
      'nav.english': 'English',
      'nav.marathi': 'मराठी',
      'sabhasadMaster.title': 'सभासद मास्टर',
      'sabhasadMaster.firstName': 'पहिले नाव:*',
      'sabhasadMaster.middleName': 'मधले नाव:',
      'sabhasadMaster.lastName': 'आडनाव:*',
      'sabhasadMaster.contactNo': 'संपर्क क्रमांक:*',
      'sabhasadMaster.address': 'पत्ता:*',
      'sabhasadMaster.date': 'दिनांक:*',
      'sabhasadMaster.mailId': 'ईमेल आयडी :',
      'sabhasadMaster.submit': 'सबमिट',
      'sabhasadMaster.firstNameRequired': 'पहिले नाव आवश्यक आहे.',
      'sabhasadMaster.lastNameRequired': 'आडनाव आवश्यक आहे.',
      'sabhasadMaster.contactRequired': 'संपर्क क्रमांक आवश्यक आहे.',
      'sabhasadMaster.addressRequired': 'पत्ता आवश्यक आहे.',
      'sabhasadMaster.dateRequired': 'दिनांक आवश्यक आहे.',
      'sabhasadVargani.title': 'सभासद वरगणी',
      'sabhasadVargani.sabhasadName': 'सभासदाचे नाव:*',
      'sabhasadVargani.tranDate': 'व्यवहार दिनांक:*',
      'sabhasadVargani.tranNo': 'व्यवहार क्रमांक:*',
      'sabhasadVargani.varganiType': 'वरगणी प्रकार:*',
      'sabhasadVargani.months': 'महिने संख्या:*',
      'sabhasadVargani.amount': 'रक्कम:*',
      'sabhasadVargani.selectSabhasad': 'सभासद निवडा',
      'sabhasadVargani.selectType': 'प्रकार निवडा',
      'sabhasadVargani.monthly': 'महिन्याचे',
      'sabhasadVargani.yearly': 'वार्षिक',
      'sabhasadVargani.special': 'विशेष',
      'sabhasadVargani.required': 'हा क्षेत्र आवश्यक आहे.',
      'sabhasadVargani.monthsRequired': 'महिन्यांची संख्या आवश्यक आहे.',
      'sabhasadVargani.monthsMax': 'महिन्यांची संख्या 12 पेक्षा जास्त नसावी.',
      'sabhasadVargani.amountMin': 'किमान रक्कम 100 असावी.',
      'sabhasadVargani.submit': 'सबमिट',
      'transactionDetail.special': 'विशेष वरगणी',
      'transactionDetail.monthly': 'महिन्यांची वरगणी',
      'transactionDetail.sabhasadId': 'सभासद आयडी',
      'transactionDetail.fullName': 'पूर्ण नाव',
      'transactionDetail.amount': 'रक्कम',
      'login.title': 'लॉगिन',
      'report.title': 'अहवाल',
    },
  };

  translate(key: string): string {
    const lang = this.language();
    return this.translations[lang][key] || key;
  }

  setLanguage(lang: Language) {
    this.language.set(lang);
  }
}
