const express = require('express');
const fs = require('fs');
const Papa = require('papaparse');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = ['https://observatorio-recife.vercel.app'];

app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Origem não permitida pelo CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200,
}));

//definir cabeçalho
app.use((req, res, next) => {
    const origin = req.get('origin');
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    next();
});

//processar erros com middleware
app.use((err, req, res, next) => {
    console.error('Erro detectado:', err.message);
    res.status(500).json({ error: 'Erro no servidor' });
});
  

const data_local = './data/'

function parseData(filePath, res) {

    fs.readFile(filePath, 'utf8', (err, csvData) => {
        if (err) {
        return res.status(500).json({ error: 'Erro ao ler o arquivo CSV' });
        }
    
        Papa.parse(csvData, {
        header: true,
        complete: function (results) {
            res.json(results.data); 
        },
        error: function (error) {
            res.status(500).json({ error: 'Erro ao processar o CSV' });
        },
        });
    });
}


//aeroporto

//DADOS COMPLETOS
app.get('/api/data/aeroporto/2024', (req, res) => {
  const filePath = path.join(data_local, 'aeroporto/2024/resumo_anual.csv');

  parseData(filePath, res);
});

// DADOS COMPLETOS
app.get('/api/data/aeroporto/2023', (req, res) => {
    const filePath = path.join(data_local, 'aeroporto/2023/resumo_anual.csv');

    parseData(filePath, res);
});

// DADOS TRATADOS
app.get('/api/data/aeroporto/embarque-desembarque/2023_2024', (req, res) => {
    const filePath = path.join(data_local, 'aeroporto/embarque_desembarque/2023-2024/embarque_desembarque.csv');

    parseData(filePath, res);
});




//Balanco comercial

// DADOS COMPLETOS
app.get('/api/data/balanco-comercial/exportacao/2024', (req, res) => {
const filePath = path.join(data_local, 'balanco_comercial/exportacao/2024/exportacao_municipio.csv');

    parseData(filePath, res);
});

// DADOS COMPLETOS
app.get('/api/data/balanco-comercial/geral/2023_2024', (req, res) => {
    const filePath = path.join(data_local, 'balanco_comercial/geral/2023-2024/base_dados.csv');
    
    parseData(filePath, res);
});

// DADOS COMPLETOS
app.get('/api/data/balanco_comercial/importacao/2024', (req, res) => {
    const filePath = path.join(data_local, 'balanco_comercial/importacao/2024/importacao_municipios.csv');
    
    parseData(filePath, res);
});


///// Emprego

// DADOS TRATADOS
app.get('/api/data/emprego/empregados/2021_2024', (req, res) => {
    const filePath = path.join(data_local, 'emprego/empregados/2021-2024/empregados.csv');
    
    parseData(filePath, res);
});



///// Empresas

// DADOS COMPLETOS
app.get('/api/data/empresas/por-municipio/dados-totais/2023_2024', (req, res) => {
    const filePath = path.join(data_local, 'empresas/por_municipio/dados_totais/2023-2024/empresas.csv');
    
    parseData(filePath, res);
});

// DADOS COMPLETOS
app.get('/api/data/empresas/por-municipio/somente-com-baixas/2021_2024', (req, res) => {
    const filePath = path.join(data_local, 'empresas/por_municipio/somente_com_baixas/2021-2024/empresas.csv');
    
    parseData(filePath, res);
});

app.get('/api/data/empresas/recife/ativas/2020_2024', (req, res) => {
    const filePath = path.join(data_local, 'empresas/recife/ativas/2020-2024/empresas.csv');
    
    parseData(filePath, res);
});

app.get('/api/data/empresas/recife/inativas/2020_2024', (req, res) => {
    const filePath = path.join(data_local, 'empresas/recife/inativas/2020-2024/empresas.csv');
    
    parseData(filePath, res);
});



//// IPCA
app.get('/api/data/ipca/indice-geral/2023_2024', (req, res) => {
    const filePath = path.join(data_local, 'ipca/indice_geral/2023-2024/indice_geral.csv');
    
    parseData(filePath, res);
});

app.get('/api/data/ipca/grupos/2023_2024', (req, res) => {
    const filePath = path.join(data_local, 'ipca/grupos/2023-2024/grupos.csv');
    
    parseData(filePath, res);
});

app.get('/api/data/ipca/tabelas/2023_2024', (req, res) => {
    const filePath = path.join(data_local, 'ipca/tabelas/2023-2024/tabelas.csv');
    
    parseData(filePath, res);
});



//// PIB
app.get('/api/data/pib/municipios/2010_2021', (req, res) => {
    const filePath = path.join(data_local, 'pib/municipios/2010-2021/pib_municipios.csv');
    
    parseData(filePath, res);
});



//// PIB
app.get('/api/data/pib/municipios/2010_2021', (req, res) => {
    const filePath = path.join(data_local, 'pib/municipios/2010-2021/pib_municipios.csv');
    
    parseData(filePath, res);
});



//// Ranking
app.get('/api/data/ranking/2021-2024/pilares', (req, res) => {
    const filePath = path.join(data_local, 'ranking/2021-2024/ranking_pilares.csv');
    
    parseData(filePath, res);
});

app.get('/api/data/ranking/2021-2024/geral', (req, res) => {
    const filePath = path.join(data_local, 'ranking/2021-2024/ranking_geral.csv');
    
    parseData(filePath, res);
});

app.get('/api/data/ranking/2021-2024/indicador', (req, res) => {
    const filePath = path.join(data_local, 'ranking/2021-2024/ranking_indicador.csv');
    
    parseData(filePath, res);
});

app.get('/api/data/ranking/2021-2024/dimensao', (req, res) => {
    const filePath = path.join(data_local, 'ranking/2021-2024/ranking_dimensao.csv');
    
    parseData(filePath, res);
});



//// SELIC
app.get('/api/data/selic/2021_2024', (req, res) => {
    const filePath = path.join(data_local, 'selic/2021-2024/taxa_selic.csv');
    
    parseData(filePath, res);
});



// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
