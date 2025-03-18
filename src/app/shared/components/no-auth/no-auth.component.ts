import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-auth',
  templateUrl: './no-auth.component.html',
  styleUrls: ['./no-auth.component.scss'],
})
export class NoAuthComponent implements OnInit {
  constructor(private router:Router) {}

  ngOnInit() {}
  goToHome(){
    this.router.navigate(['dashboard/home'])

  }
}
