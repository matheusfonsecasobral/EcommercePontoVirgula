import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorStyleName : boolean = false;
  errorStyleLogin : boolean = false;
  errorStylePassword : boolean = false;
  errorStyleConfirmPassword : boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
