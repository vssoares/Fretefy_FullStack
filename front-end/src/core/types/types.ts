export type TableColumn = {
  dataField: string,
  caption: string,
  tipo: string
}

export type SelectItems = {
  label: string,
  value: string | number | boolean
}


export type Regiao = {
  id: string,
  nome: string,
  ativa: boolean,
  locais: Local[]
}

export type Local = {
  cidade: string
}
