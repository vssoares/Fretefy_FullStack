import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { SelectComponent } from 'src/app/shared/components/select/select.component';
import { GestaoRegioesService } from '../gestao-regioes.service';
import { fadeAnimation } from 'src/app/shared/animations';
import { Regiao, SelectItems } from 'src/app/shared/types/types';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  animations: [fadeAnimation],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SelectComponent
  ]
})
export class CadastroComponent implements OnInit {
  private activeRoute: ActivatedRoute = inject(ActivatedRoute);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private gestaoRegioesService: GestaoRegioesService = inject(GestaoRegioesService);

  isCadastroRegiao = false;
  idRegiao: string;
  regiao: Regiao;

  formCadastro: UntypedFormGroup;

  cidades: SelectItems[] = [];
  subs: Subscription[] = [];

  get locaisFormArray() {
    return this.formCadastro.get('locais') as UntypedFormArray;
  }

  constructor(

  ) {
    this.idRegiao = this.activeRoute.snapshot.params.id;
    this.isCadastroRegiao = !this.idRegiao;

    this.formCadastro = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required]],
      ativa: [true, [Validators.required]],
      locais: this.formBuilder.array([]),
    })

    // Caso seja edição, preenche os campos com os dados da região vindos do resolver
    this.activeRoute.data.subscribe((response: any) => {
      if (Object.keys(response).length) {
        this.regiao = response?.regiao;
        this.formCadastro.patchValue(this.regiao);
        this.regiao?.locais.forEach((local) => {
          this.adicionarLocal();
          this.locaisFormArray.at(this.locaisFormArray.length - 1).patchValue(local);
        })
      }
    });

  }

  ngOnInit() {
    // Adiciona um local caso seja um cadastro, assim o usuário já pode adicionar a primeira cidade
    if (this.isCadastroRegiao)
      this.adicionarLocal();

    this.buscarCidades();
  }

  onChangeCidade(control) {
    const cidade = control.value;
    const locais = this.locaisFormArray.value;
    const cidadeExistente = locais.filter((local) => local.cidade === cidade).length > 1;
    if (cidadeExistente) {
      alert('Cidade já adicionada!');
      control.setValue('');
      control.setErrors({ cidadeExistente: true });
    } else {
      control.setErrors(null);
    }
  }

  adicionarLocal() {
    this.locaisFormArray.push(this.formBuilder.group({
      cidade: ['', [Validators.required]],
    }));
  }

  removerLocal(index: number) {
    this.locaisFormArray.removeAt(index);
  }

  buscarCidades() {
    this.subs.push(
      this.gestaoRegioesService.buscarCidades().subscribe({
        next: (cidades) => {
          this.cidades = cidades;
        }
      })
    )
  }

  regiaoExistente(nome: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.subs.push(
        this.gestaoRegioesService.buscarRegioes().subscribe({
          next: (regioes: Regiao[]) => {
            const regiaoExistente = regioes.some((regiao: Regiao) => regiao.nome.toLowerCase() === nome.toLowerCase() && regiao.id != this.idRegiao);
            if (regiaoExistente) {
              alert('Já existe uma região com este nome!');
              this.formCadastro.get('nome').setErrors({ regiaoExistente: true });
              resolve(true);
            } else {
              this.formCadastro.get('nome').setErrors(null);
              resolve(false);
            }
          }
        })
      )
    })
  }

  async cadastrarRegiao() {
    this.formCadastro.markAllAsTouched();
    if (this.formCadastro.invalid) {
      return;
    }

    // Simulando um retorno do back antes de cadastrar
    const regiaoExistente: boolean = await this.regiaoExistente(this.formCadastro.get('nome').value);
    if (regiaoExistente) {
      return;
    }

    this.subs.push(
      this.gestaoRegioesService.cadastrarRegiao(this.formCadastro.value).subscribe({
        next: () => {
          const alerta = this.isCadastroRegiao ? 'Região cadastrada com sucesso!' : 'Região editada com sucesso!';
          alert(alerta);
          this.router.navigate(['/gestao-regioes/listagem']);
        },
        error: () => {
          alert('Erro ao cadastrar região!');
        }
      })
    )
  }

  excluirRegiao() {
    if (!confirm('Deseja realmente excluir esta região?')) {
      return;
    }

    this.subs.push(
      this.gestaoRegioesService.excluirRegiao(this.idRegiao).subscribe({
        next: () => {
          this.router.navigate(['/gestao-regioes/listagem']);
        },
        error: () => {
          alert('Erro ao excluir região!');
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subs?.forEach((sub) => sub.unsubscribe());
  }
}
