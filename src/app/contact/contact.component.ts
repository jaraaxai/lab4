import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {DbService} from '../db.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  myForm: FormGroup;
  submitted = false;
  user;
  posts;
  constructor(private fb: FormBuilder, public db: DbService) {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]],
      post: ['', Validators.required, this.asyncExampleValidator]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.myForm);
  }

  asyncExampleValidator(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>(
      (resolve, reject) => {
          if (control.value.length < 10) {
            resolve({'invalid': true});
          } else {
            resolve(null);
          }
      }
    );
    return promise;
  }

  getData() {
    this.db.getUser().subscribe(
      response => this.user = response.json()
    );

    this.db.getPosts().subscribe(
      response => this.posts = response.json()
    );
  }
}
