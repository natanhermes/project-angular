import Dexie, { Table } from 'dexie';
import { Stakeholder } from '../../features/stakeholders/stakeholder';

export class AppDatabase extends Dexie {
  stakeholders!: Table<Stakeholder>;

  constructor() {
    super('appDatabase');
    this.version(1).stores({
      stakeholders: 'id, code, name, type, cpfCnpj, email',
    })
  }
}

export const db = new AppDatabase();
