import { Component, OnInit } from '@angular/core';
import { NavAdminComponent } from "../../components/nav-admin/nav-admin.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  imports: [NavAdminComponent, RouterOutlet, FooterComponent]
})
export class AdminLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
