import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { fadeAnimation } from 'src/core/animations';
import { GestaoRegioesService } from 'src/core/services/gestao-regioes.service';
import { Regiao, SelectItems } from 'src/core/types/types';

@Component({
  selector: 'app-regiao',
  templateUrl: './regiao.component.html',
  styleUrls: ['./regiao.component.scss'],
  animations: [fadeAnimation]
})
export class RegiaoComponent implements OnInit {

  isCadastroRegiao = false;
  idRegiao: string;
  regiao: Regiao;

  formCadastro: FormGroup;
  textoErro: string;

  cidades: SelectItems[] = [];
  subs: Subscription[] = [];

  get locaisFormArray() {
    return this.formCadastro.get('locais') as FormArray;
  }

  constructor(
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private gestaoRegioesService: GestaoRegioesService,
  ) {
    this.idRegiao = this.activeRoute.snapshot.params.id;
    this.isCadastroRegiao = !this.idRegiao;
  }

  ngOnInit() {
    this.formCadastro = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required]],
      ativa: [true, [Validators.required]],
      locais: this.formBuilder.array([]),
    })

    this.subs.push(
      this.formCadastro.valueChanges.subscribe({
        next: () => {
          this.textoErro = '';
        }
      })
    )

    if (this.isCadastroRegiao)
      this.adicionarLocal();

    this.buscarCidades();

    if (this.idRegiao) {
      this.buscarRegiao(this.idRegiao);
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

  buscarRegiao(id: string) {
    this.subs.push(
      this.gestaoRegioesService.buscarRegiao(id).subscribe({
        next: (regiao: Regiao) => {
          this.regiao = regiao;
          this.formCadastro.patchValue(regiao);
          regiao?.locais.forEach((local) => {
            this.adicionarLocal();
            this.locaisFormArray.at(this.locaisFormArray.length - 1).patchValue(local);
          })
        }
      })
    )
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
          this.router.navigate(['/home']);
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
          this.router.navigate(['/home']);
        }
      })
    )
  }


  ngOnDestroy(): void {
    this.subs?.forEach((sub) => sub.unsubscribe());
  }
}
