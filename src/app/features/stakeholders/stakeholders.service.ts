import { Injectable } from '@angular/core';
import { Stakeholder } from './stakeholder';

import * as uuid from 'uuid';
import { db } from '../../core/database/db';

@Injectable({
  providedIn: 'root'
})
export class StakeholdersService {
  stakeholders: Stakeholder[] = [];
  constructor() {
    this.loadStakeholders();
  }

  async save(stakeholder: Stakeholder) {
    stakeholder.id = uuid.v4();
    await db.stakeholders.add(stakeholder);
  }

  async update(id: string, stakeholder: Stakeholder) {
    await db.stakeholders.update(id, stakeholder);
  }

  async deleteById(id: string) {
    await db.stakeholders.delete(id);
  }

  async findAll() {
    const stakeholders = await db.stakeholders.toArray();
    this.stakeholders = stakeholders;
    return stakeholders;
  }

  findByCpfCnpj(cpfCnpj: string) {
    return this.stakeholders.find(stakeholder => stakeholder.cpfCnpj === cpfCnpj);
  }

  private loadStakeholders() {

  }
}
