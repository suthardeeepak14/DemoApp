import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
// import { RegisterService } from '../register.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  successMessage: string = '';

  registrationForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    // private candidate: RegisterService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      Image: ['', Validators.required],

      FName: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
          Validators.maxLength(20),
        ],
      ],
      LName: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
          Validators.maxLength(20),
        ],
      ],
      email: ['', Validators.required],
      PhoneNumber: [
        '',
        Validators.required,
        Validators.pattern('d{5}([- ]*)d{6}'),
      ],
      age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      interests: [''],
      addressType: ['', Validators.required],
      companyAddress1: [''],
      companyAddress2: [''],
      homeAddress1: [''],
      homeAddress2: [''],
    });
  }

  //url; //Angular 8
  url: any; //Angular 11, for stricter type
  msg = '';

  //selectFile(event) { //Angular 8

  selectFile(event: any) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Only images are supported';
      return;
    }

    this.registrationForm.patchValue({
      Image: event.target.files[0],
    });

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msg = '';
      this.url = reader.result;
    };
  }

  onClickSubmit() {
    // if (this.registrationForm.value != null) {
    //   this.candidate.candidate(this.registrationForm.value).subscribe(
    //     (result) => {
    //       console.log('Form data sent to server');
    //       console.log(result);
    //     },
    //     (error) => {
    //       console.log('Error sending form data to server:', error);
    //     }
    //   );
    // }

    this.successMessage = 'Form submitted successfully!';
  }
  closeMessage() {
    this.successMessage = '';
  }
  submittedFormData: any;

  onSubmit() {
    // submit form logic here
    this.submittedFormData = this.registrationForm.value;
  }

  //Interest
  // newInterest: string = '';
  // interests: string[] = [];

  // addInterest() {
  //   const interest = this.newInterest.trim();
  //   if (interest !== '') {
  //     this.interests.push(interest);
  //     this.newInterest = '';
  //   }
  // }

  // removeInterest(interest: string) {
  //   const index = this.interests.indexOf(interest);
  //   if (index !== -1) {
  //     this.interests.splice(index, 1);
  //   }
  // }
}
