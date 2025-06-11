import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

export interface Filter {
  degree?: string;
  justice?: string;
  court?: string;
  size?: number;
  search_after?: any[];
}

@Component({
  selector: 'app-filter-process',
  standalone: false,
  templateUrl: './filter-process.component.html',
})
export class FilterProcessComponent implements OnInit {
  @Output() filterChange = new EventEmitter<Filter>();

  constructor(private formBuilder: FormBuilder) { }

  filterForm!: FormGroup;
  filteredCourts: any[] = [];

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.buildForm();
    this.filterForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.onChange();
      });

    this.filterForm.get('justice')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(justice => {
        this.filterCourtsByJustice(justice);
      });

    this.filterCourtsByJustice(this.filterForm.value.justice);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onChange() {
    this.filterChange.emit({
      degree: this.filterForm.value.degree,
      justice: this.filterForm.value.justice,
      court: this.filterForm.value.court,
    });
  }

  buildForm() {
    this.filterForm = this.formBuilder.group({
      degree: new FormControl(null),
      justice: new FormControl('JF'),
      court: new FormControl('api_publica_trf1'),
    });
  }

  filterCourtsByJustice(justice: string) {
    const group = this.courts.find(c => c.value === justice);
    this.filteredCourts = group?.items || [];
  }

  courts = [
    {
      label: 'Tribunais Superiores',
      value: 'TS',
      items: [
        { label: 'Tribunal Superior do Trabalho', value: 'api_publica_tst' },
        { label: 'Tribunal Superior Eleitoral', value: 'api_publica_tse' },
        { label: 'Tribunal Superior de Justiça', value: 'api_publica_stj' },
        { label: 'Tribunal Superior Militar', value: 'api_publica_stm' },
      ]
    },
    {
      label: 'Justiça Federal',
      value: 'JF',
      items: [
        { label: 'Tribunal Regional Federal da 1ª Região', value: 'api_publica_trf1' },
        { label: 'Tribunal Regional Federal da 2ª Região', value: 'api_publica_trf2' },
        { label: 'Tribunal Regional Federal da 3ª Região', value: 'api_publica_trf3' },
        { label: 'Tribunal Regional Federal da 4ª Região', value: 'api_publica_trf4' },
        { label: 'Tribunal Regional Federal da 5ª Região', value: 'api_publica_trf5' },
        { label: 'Tribunal Regional Federal da 6ª Região', value: 'api_publica_trf6' },
      ]
    },
    {
      label: 'Justiça Estadual',
      value: 'JEST',
      items: [
        { label: 'Tribunal de Justiça do Acre', value: 'api_publica_tjac' },
        { label: 'Tribunal de Justiça do Alagoas', value: 'api_publica_tjal' },
        { label: 'Tribunal de Justiça do Amazonas', value: 'api_publica_tjam' },
        { label: 'Tribunal de Justiça do Amapá', value: 'api_publica_tjap' },
        { label: 'Tribunal de Justiça do Bahia', value: 'api_publica_tjba' },
        { label: 'Tribunal de Justiça do Ceará', value: 'api_publica_tjce' },
        { label: 'Tribunal de Justiça do Distrito Federal e Territórios', value: 'api_publica_tjdft' },
        { label: 'Tribunal de Justiça do Espírito Santo', value: 'api_publica_tjes' },
        { label: 'Tribunal de Justiça do Goiás', value: 'api_publica_tjgo' },
        { label: 'Tribunal de Justiça do Maranhão', value: 'api_publica_tjma' },
        { label: 'Tribunal de Justiça de Minas Gerais', value: 'api_publica_tjmg' },
        { label: 'Tribunal de Justiça do Mato Grosso de Sul', value: 'api_publica_tjms' },
        { label: 'Tribunal de Justiça do Mato Grosso', value: 'api_publica_tjmt' },
        { label: 'Tribunal de Justiça do Pará', value: 'api_publica_tjpa' },
        { label: 'Tribunal de Justiça da Paraíba', value: 'api_publica_tjpb' },
        { label: 'Tribunal de Justiça de Pernambuco', value: 'api_publica_tjpe' },
        { label: 'Tribunal de Justiça do Piauí', value: 'api_publica_tjpi' },
        { label: 'Tribunal de Justiça do Paraná', value: 'api_publica_tjpr' },
        { label: 'Tribunal de Justiça do Rio de Janeiro', value: 'api_publica_tjrj' },
        { label: 'Tribunal de Justiça do Rio Grande do Norte', value: 'api_publica_tjrn' },
        { label: 'Tribunal de Justiça de Rondônia', value: 'api_publica_tjro' },
        { label: 'Tribunal de Justiça de Roraima', value: 'api_publica_tjrr' },
        { label: 'Tribunal de Justiça do Rio Grande do Sul', value: 'api_publica_tjrs' },
        { label: 'Tribunal de Justiça de Santa Catarina', value: 'api_publica_tjsc' },
        { label: 'Tribunal de Justiça de Sergipe', value: 'api_publica_tjse' },
        { label: 'Tribunal de Justiça de São Paulo', value: 'api_publica_tjsp' },
        { label: 'Tribunal de Justiça do Tocantins', value: 'api_publica_tjto' },
      ]
    },
    {
      label: 'Justiça do Trabalho',
      value: 'JT',
      items: [
        { label: 'Tribunal Regional do Trabalho da 1ª Região', value: 'api_publica_trt1' },
        { label: 'Tribunal Regional do Trabalho da 2ª Região', value: 'api_publica_trt2' },
        { label: 'Tribunal Regional do Trabalho da 3ª Região', value: 'api_publica_trt3' },
        { label: 'Tribunal Regional do Trabalho da 4ª Região', value: 'api_publica_trt4' },
        { label: 'Tribunal Regional do Trabalho da 5ª Região', value: 'api_publica_trt5' },
        { label: 'Tribunal Regional do Trabalho da 6ª Região', value: 'api_publica_trt6' },
        { label: 'Tribunal Regional do Trabalho da 7ª Região', value: 'api_publica_trt7' },
        { label: 'Tribunal Regional do Trabalho da 8ª Região', value: 'api_publica_trt8' },
        { label: 'Tribunal Regional do Trabalho da 9ª Região', value: 'api_publica_trt9' },
        { label: 'Tribunal Regional do Trabalho da 10ª Região', value: 'api_publica_trt10' },
        { label: 'Tribunal Regional do Trabalho da 11ª Região', value: 'api_publica_trt11' },
        { label: 'Tribunal Regional do Trabalho da 12ª Região', value: 'api_publica_trt12' },
        { label: 'Tribunal Regional do Trabalho da 13ª Região', value: 'api_publica_trt13' },
        { label: 'Tribunal Regional do Trabalho da 14ª Região', value: 'api_publica_trt14' },
        { label: 'Tribunal Regional do Trabalho da 15ª Região', value: 'api_publica_trt15' },
        { label: 'Tribunal Regional do Trabalho da 16ª Região', value: 'api_publica_trt16' },
        { label: 'Tribunal Regional do Trabalho da 17ª Região', value: 'api_publica_trt17' },
        { label: 'Tribunal Regional do Trabalho da 18ª Região', value: 'api_publica_trt18' },
        { label: 'Tribunal Regional do Trabalho da 19ª Região', value: 'api_publica_trt19' },
        { label: 'Tribunal Regional do Trabalho da 20ª Região', value: 'api_publica_trt20' },
        { label: 'Tribunal Regional do Trabalho da 21ª Região', value: 'api_publica_trt21' },
        { label: 'Tribunal Regional do Trabalho da 22ª Região', value: 'api_publica_trt22' },
        { label: 'Tribunal Regional do Trabalho da 23ª Região', value: 'api_publica_trt23' },
        { label: 'Tribunal Regional do Trabalho da 24ª Região', value: 'api_publica_trt24' },
      ]
    },
    {
      label: 'Justiça Eleitoral',
      value: 'JELT',
      items: [
        { label: 'Tribunal Regional Eleitoral do Acre', value: 'api_publica_tre-ac' },
        { label: 'Tribunal Regional Eleitoral de Alagoas', value: 'api_publica_tre-al' },
        { label: 'Tribunal Regional Eleitoral do Amazonas', value: 'api_publica_tre-am' },
        { label: 'Tribunal Regional Eleitoral do Amapá', value: 'api_publica_tre-ap' },
        { label: 'Tribunal de Justiça da Bahia', value: 'api_publica_tre-ba' },
        { label: 'Tribunal Regional Eleitoral do Ceará', value: 'api_publica_tre-ce' },
        { label: 'Tribunal Regional Eleitoral do Distrito Federal', value: 'api_publica_tre-dft' },
        { label: 'Tribunal Regional Eleitoral do Espírito Santo', value: 'api_publica_tre-es' },
        { label: 'Tribunal Regional Eleitoral do Goiás', value: 'api_publica_tre-go' },
        { label: 'Tribunal Regional Eleitoral do Maranhão', value: 'api_publica_tre-ma' },
        { label: 'Tribunal Regional Eleitoral de Minas Gerais', value: 'api_publica_tre-mg' },
        { label: 'Tribunal Regional Eleitoral do Mato Grosso de Sul', value: 'api_publica_tre-ms' },
        { label: 'Tribunal Regional Eleitoral do Mato Grosso', value: 'api_publica_tre-mt' },
        { label: 'Tribunal Regional Eleitoral do Pará', value: 'api_publica_tre-pa' },
        { label: 'Tribunal Regional Eleitoral da Paraíba', value: 'api_publica_tre-pb' },
        { label: 'Tribunal Regional Eleitoral de Pernambuco', value: 'api_publica_tre-pe' },
        { label: 'Tribunal Regional Eleitoral do Piauí', value: 'api_publica_tre-pi' },
        { label: 'Tribunal Regional Eleitoral do Paraná', value: 'api_publica_tre-pr' },
        { label: 'Tribunal Regional Eleitoral do Rio de Janeiro', value: 'api_publica_tre-rj' },
        { label: 'Tribunal Regional Eleitoral do Rio Grande do Norte', value: 'api_publica_tre-rn' },
        { label: 'Tribunal Regional Eleitoral de Rondônia', value: 'api_publica_tre-ro' },
        { label: 'Tribunal Regional Eleitoral de Roraima', value: 'api_publica_tre-rr' },
        { label: 'Tribunal Regional Eleitoral do Rio Grande do Sul', value: 'api_publica_tre-rs' },
        { label: 'Tribunal Regional Eleitoral de Santa Catarina', value: 'api_publica_tre-sc' },
        { label: 'Tribunal Regional Eleitoral de Sergipe', value: 'api_publica_tre-se' },
        { label: 'Tribunal Regional Eleitoral de São Paulo', value: 'api_publica_tre-sp' },
        { label: 'Tribunal Regional Eleitoral do Tocantins', value: 'api_publica_tre-to' },
      ]
    },
    {
      label: 'Justiça Militar',
      value: 'JM',
      items: [
        { label: 'Tribunal Justiça Militar de Minas Gerais', value: 'api_publica_tjmmg' },
        { label: 'Tribunal Justiça Militar do Rio Grande do Sul', value: 'api_publica_tjmrs' },
        { label: 'Tribunal Justiça Militar de São Paulo', value: 'api_publica_tjmsp' },
      ]
    }
  ]

  degrees = [
    { label: '1º Grau', value: 'G1' },
    { label: '2º Grau', value: 'G2' },
    { label: 'Juizado Especial', value: 'JE' },
  ];

  justices = [
    {
      label: 'Tribunais Superiores',
      value: 'TS'
    },
    {
      label: 'Justiça Federal',
      value: 'JF'
    },  
    {
      label: 'Justiça Estadual',
      value: 'JEST'
    },
    {
      label: 'Justiça do Trabalho',
      value: 'JT'
    },
    {
      label: 'Justiça Eleitoral',
      value: 'JELT'
    },
    {
      label: 'Justiça Militar',
      value: 'JM'
    }
  ]
}
