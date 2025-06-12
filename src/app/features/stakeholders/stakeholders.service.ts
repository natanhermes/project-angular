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
    this.findAll()
  }

  async save(stakeholder: Stakeholder): Promise<void> {
    try {
      await this.validateUniqueFields(stakeholder);
      
      const newStakeholder = {
        ...stakeholder,
        id: uuid.v4()
      };
      
      await db.stakeholders.add(newStakeholder);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  private async validateUniqueFields(stakeholder: Stakeholder): Promise<void> {
    const [cpfCnpjExists, emailExists] = await Promise.all([
      this.findByCpfCnpj(stakeholder.cpfCnpj),
      this.findByEmail(stakeholder.email)
    ]);

    if (cpfCnpjExists) {
      throw 'CPF/CNPJ já cadastrado';
    }

    if (emailExists) {
      throw 'E-mail já cadastrado';
    }
  }

  async update(id: string, stakeholder: Stakeholder) {
    await db.stakeholders.update(id, stakeholder);
  }

  async deleteById(id: string) {
    const stakeholder = await db.stakeholders.get(id);
    if (!stakeholder) {
      throw 'Parte interessada não encontrada';
    }
    await db.stakeholders.delete(id);
  }

  async findAll() {
    const stakeholders = await db.stakeholders.toArray();
    this.stakeholders = stakeholders;
    return stakeholders;
  }

  async findByEmail(email: string) {
    const stakeholders = await db.stakeholders.toArray();
    return stakeholders.find(stakeholder => stakeholder.email === email);
  }

  async findByCpfCnpj(cpfCnpj: string) {
    const stakeholders = await db.stakeholders.toArray();
    return stakeholders.find(stakeholder => stakeholder.cpfCnpj === cpfCnpj);
  }
}
