import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StakeholdersService } from '../stakeholders.service';
import { MessageService } from 'primeng/api';

type StakeholderType = 'PF' | 'PJ';

@Component({
  selector: 'app-stakeholder-new',
  standalone: false,
  templateUrl: './stakeholder-new.component.html',
})
export class StakeholderNewComponent implements OnInit {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private stakeholderService: StakeholdersService,
    private toast: MessageService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  stakeholderTypes: StakeholderType[] = ['PF', 'PJ'];
  stakeholderForm!: FormGroup;
  stakeholderTypeSelected: StakeholderType | null = null;

  onStakeholderTypeChange(event: any) {
    this.stakeholderTypeSelected = event.value;
    this.stakeholderForm.get('cpfCnpj')?.enable();
  }


  async onSubmit() {
    if (this.stakeholderForm.valid) {
      try {
        await this.stakeholderService.save(this.stakeholderForm.value);
        this.toast.add({
          severity: 'success',
          summary: 'Cadastro realizado com sucesso',
          life: 3000,
          closable: true
        });
        this.router.navigate(['/stakeholders']);
      } catch (error) {
        this.toast.add({
          severity: 'error',
          summary: 'Erro ao cadastrar',
          detail: error as string,
          life: 3000,
          closable: true
        });
      }
    } else {
      this.markFormGroupTouched(this.stakeholderForm);
    }
  }

  buildForm() {
    this.stakeholderForm = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
      ]),
      cpfCnpj: new FormControl({ value: '', disabled: true }, [
        Validators.required,

      ]),
      type: new FormControl(null, [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
    });
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  private readonly errorMessages: Record<string, string> = {
    required: 'Este campo é obrigatório',
    email: 'E-mail inválido',
    pattern: 'Formato inválido'
  };

  getErrorMessage(controlName: string): string {
    const control = this.stakeholderForm.get(controlName);
    if (!control?.errors) return '';

    const errorKey = Object.keys(control.errors)[0];

    return this.errorMessages[errorKey]
  }
}
