export interface Stakeholder {
  id: string;
  name: string;
  type: 'PF' | 'PJ';
  cpfCnpj: string;
  email: string;
}
