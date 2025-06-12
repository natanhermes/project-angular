import { Component, OnInit } from '@angular/core';
import { Stakeholder } from '../stakeholder';
import { StakeholdersService } from '../stakeholders.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-stakeholder-list',
  standalone: false,
  templateUrl: './stakeholder-list.component.html',

})

export class StakeholderListComponent implements OnInit {
  stakeholders: Stakeholder[] = [];

  constructor(private stakeholdersService: StakeholdersService, private toast: MessageService) { }

  ngOnInit(): void {
    this.loadStakeholders()
  }

  onDelete(id: string) {
    this.stakeholdersService.deleteById(id)
      .then(() => {
        this.loadStakeholders();
        this.toast.add({
          severity: 'success',
          summary: 'Deletado com sucesso',
          life: 3000,
          closable: true
        });
      })
      .catch((error) => {
        this.toast.add({
          severity: 'error',
          summary: 'Erro ao deletar',
          detail: error as string,
          life: 3000,
          closable: true
        });
      });
  }

  private async loadStakeholders() {
    this.stakeholders = await this.stakeholdersService.findAll();
  }
}
