import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}
  candidatedata: any;

  ngOnInit() {
    this.EditForm = this.formBuilder.group({
      Image: ['', Validators.required],
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
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      PhoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('[0-9]{10}'),
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
    let id = this.route.snapshot.paramMap.get('id');
    this.http.get(`http://localhost:3000/candidate/${id}`).subscribe((data) => {
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
    let id = this.route.snapshot.paramMap.get('id');
    this.http.get(`http://localhost:3000/candidate/${id}`).subscribe((data) => {
      this.url = this.candidatedata.img;
      this.candidatedata = data;
    });

    // this.http.get('http://localhost:3000/candidate/1').subscribe((data) => {
    //   this.candidatedata = data;
    //   this.url = this.candidatedata.img;
    //   console.log(data);
    // });
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
