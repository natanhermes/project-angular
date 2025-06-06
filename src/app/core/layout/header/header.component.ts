import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      { label: 'Partes Interessadas', icon: 'pi pi-box', routerLink: 'stakeholders' },
    ];
  }
}
