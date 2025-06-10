import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter-process',
  standalone: false,
  templateUrl: './filter-process.component.html',
})
export class FilterProcessComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  filterForm!: FormGroup;

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.filterForm = this.formBuilder.group({
      degree: new FormControl('all'),
      justice: new FormControl('all'),
    })
  }

  degrees = [
    { label: 'Todos os graus', value: 'all' },
    { label: '1º Grau', value: '1' },
    { label: '2º Grau', value: '2' },
    { label: 'Superior', value: '3' },
  ];

  justice = [
    { label: 'Todas as justiças', value: 'all' },
    { label: 'Justiça Estadual', value: 'estadual' },
    { label: 'Justiça Federal', value: 'federal' },
    { label: 'Justiça Trabalhista', value: 'trabalhista' },
    { label: 'Justiça Eleitoral', value: 'eleitoral' },
    { label: 'Justiça Militar', value: 'militar' },
  ]
}
