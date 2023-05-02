import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  EditForm!: FormGroup;

  canupdate = {
    img: '',
    FName: '',
    LName: '',
    email: '',
    age: '',
    intrests: '',
    homeAddress1: '',
    homeAddress2: '',
    companyAddress1: '',
    companyAddress2: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private candidate: RegisterService,
    private http: HttpClient
  ) {}
  candidatedata: any;

  ngOnInit() {
    this.EditForm = this.formBuilder.group({
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
      email: [
        '',
        Validators.required,
        Validators.pattern(
          "[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*"
        ),
      ],
      age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      interests: [''],
      addressType: ['', Validators.required],
      companyAddress1: [''],
      companyAddress2: [''],
      homeAddress1: [''],
      homeAddress2: [''],
    });
    this.http.get('http://localhost:3000/candidate/1').subscribe((data) => {
      this.candidatedata = data;
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
      return;
    }

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
    let payload = { ...this.EditForm.value };
    payload.img = this.url;
    this.candidate.candidateput(payload).subscribe((data: any) => {
      console.log('user updated successfully');
    });
    location.reload();
  }

  onClickEdit() {
    this.http.get('http://localhost:3000/candidate/1').subscribe((data) => {
      this.candidatedata = data;
      this.url = this.candidatedata.img;
      console.log(data);
    });
  }
  onClickImg() {
    this.http.get('http://localhost:3000/candidate/1').subscribe((data) => {
      this.candidatedata = data;
      console.log(data);
    });
  }
}
{
}
