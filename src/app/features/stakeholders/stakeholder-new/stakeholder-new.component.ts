import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StakeholdersService } from '../stakeholders.service';

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
    private stakeholderService: StakeholdersService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  peopleTypes: StakeholderType[] = ['PF', 'PJ'];

  stakeholderForm!: FormGroup;

  async onSubmit() {
    console.log('onSubmit', this.stakeholderForm.value);
    if (this.stakeholderForm.valid) {
      try {
        await this.stakeholderService.save(this.stakeholderForm.value);
        this.router.navigate(['/stakeholders']);
      } catch (error) {
        console.error(error);
      }
    }
  }

  buildForm() {
    this.stakeholderForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      cpfCnpj: new FormControl('', [Validators.required]),
      type: new FormControl(null, [Validators.required]),
      email: new FormControl('', [Validators.required]),
    })
  }
}
