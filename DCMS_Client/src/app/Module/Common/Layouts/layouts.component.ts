import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { CognitoService } from '../Cognito/Service/cognito.service';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.css']
})
export class LayoutsComponent implements OnInit {
  userGroupString: string = ''; // Declare the variable

  compareUserGroup: string = "";
  constructor(private cognitoService: CognitoService, private router: Router, private activatedRoute: ActivatedRoute) { }
  chatContainerVisible = false;
  currentRoute: string = '';
  ngOnInit(): void {
    console.log("oninit");
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = this.router.url;
      }
    });

    this.activatedRoute.url.subscribe(urlSegments => {
      this.currentRoute = urlSegments.map(segment => segment.path).join('/');
    });

    let userGroups = sessionStorage.getItem('userGroups');
    this.userGroupString = userGroups || '';

    this.compareUserGroup = '["dev-dcms-admin"]';
    console.log("Layout: ", this.userGroupString);
  }
  signOut() {
    this.cognitoService.signOut().then(() => {
      console.log("Logged out!");
      this.router.navigate(['dangnhap']);
    })
  }
}
