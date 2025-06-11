export interface Process {
    id: string;
    classe: {
        codigo: number;
        nome: string;
    };
    numeroProcesso: string;
    sistema: {
        codigo: number;
        nome: string;
    };
    formato: {
        codigo: number;
        nome: string;
    };
    tribunal: string;
    dataHoraUltimaAtualizacao: string;
    grau: string;
    '@timestamp': string;
    dataAjuizamento: string;
    movimentos: {
        complementosTabelados?: {
            codigo: number;
            valor: number;
            nome: string;
            descricao: string;
        }[];
        codigo: number;
        nome: string;
        dataHora: string;
    }[];
    nivelSigilo: number;
    orgaoJulgador: {
        codigoMunicipioIBGE: number;
        codigo: number;
        nome: string;
    };
    assuntos: {
        codigo: number;
        nome: string;
    }[];
}


export interface ProcessResponse {
    hits: {
        hits: {
            _source: Process;
            sort: number[];
        }[];
    }
}