import { Component, OnInit } from '@angular/core';
import { Stakeholder } from '../stakeholder';
import { StakeholdersService } from '../stakeholders.service';

@Component({
  selector: 'app-stakeholder-list',
  standalone: false,
  templateUrl: './stakeholder-list.component.html',

})

export class StakeholderListComponent implements OnInit {
  stakeholders: Stakeholder[] = [];

  constructor(private stakeholdersService: StakeholdersService) { }

  ngOnInit(): void {
    console.log('ngOnInit list');
    this.loadStakeholders()
  }

  onDelete(id: string) {
    this.stakeholdersService.deleteById(id)
  }

  private async loadStakeholders() {
    this.stakeholders = await this.stakeholdersService.findAll();
  }
}
