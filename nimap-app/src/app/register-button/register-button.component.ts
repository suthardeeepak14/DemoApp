import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-button',
  templateUrl: './register-button.component.html',
  styleUrls: ['./register-button.component.css'],
})
export class RegisterButtonComponent {
  successMessage: string = '';

  registrationForm!: FormGroup;
  imageValid: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private candidate: RegisterService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      img: ['', Validators.required],

      FName: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
          Validators.maxLength(20),
          Validators.minLength(3),
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
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+[.]+[c]+[o]+[m]+$'
          ),
        ],
      ],
      PhoneNumber: [
        '',
        [
          Validators.required,
          // Validators.pattern('[0-9]{10}'),
          // Validators.pattern('[a-zA-Z ]*'),
          Validators.maxLength(10),
        ],
      ],
      age: ['', [Validators.required, Validators.min(18), Validators.max(80)]],
      interests: [''],
      addressType: ['', Validators.required],
      companyAddress1: ['', Validators.required],
      companyAddress2: ['', Validators.required],
      homeAddress1: ['', Validators.required],
      homeAddress2: ['', Validators.required],
    });
  }

  url: any;
  msg = '';

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

    if (event.target.files[0].size > 2048 * 1024) {
      this.msg = 'Image size should be less than 2 MB';
      this.imageValid = false;
      return;
    }

    this.imageValid = true;
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msg = '';
      this.url = reader.result;
    };
    const img = new Image();
    img.onload = () => {
      if (img.width > 310 || img.height > 325) {
        this.msg = 'Image dimensions should be 310x325 or smaller';
      }
    };
    img.src = window.URL.createObjectURL(event.target.files[0]);

    img.onerror = () => {
      this.msg = '';
    };
  }

  onClickSubmit() {
    let payload = { ...this.registrationForm.value };
    payload.img = this.url;
    if (payload != null) {
      this.candidate.candidate(payload).subscribe(
        (result) => {
          this.router.navigate([`/profile/${result.id}`]);
          console.log('Form data sent to server');
          console.log(result);
        },
        (error) => {
          console.log('Error sending form data to server:', error);
        }
      );
    }
    this.successMessage = 'Form submitted successfully!';
  }
  closeMessage() {
    this.successMessage = '';
  }
  submittedFormData: any;

  onSubmit() {
    this.submittedFormData = this.registrationForm.value;
  }
}
