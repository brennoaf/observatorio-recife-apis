const express = require('express');
const compression = require('compression'); // Novo middleware de compressão
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = ['https://observatorio-recife.vercel.app', 'http://localhost:3000', 'http://192.168.244.57:3000'];

// Adiciona middleware de compressão
app.use(compression());

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

app.use((req, res, next) => {
    const origin = req.get('origin');
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    next();
});

app.use((err, req, res, next) => {
    console.error('Erro detectado:', err.message);
    res.status(500).json({ error: 'Erro no servidor' });
});

const data_local = './json_data/';

// Nova função simplificada para enviar JSON
function sendJSON(filePath, res) {
    try {
        // Verifica se o arquivo existe
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'Arquivo não encontrado' });
        }

        // Configura os cabeçalhos
        res.setHeader('Content-Type', 'application/json');
        
        // Lê e envia o arquivo
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);

        // Tratamento de erro no stream
        fileStream.on('error', (error) => {
            console.error('Erro ao ler arquivo:', error);
            res.status(500).json({ error: 'Erro ao ler arquivo' });
        });
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

// Rota para embarque-desembarque 2023
app.get('/api/data/aeroporto/embarque-desembarque/2023', (req, res) => {
    const filePath = path.join(data_local, 'aeroporto/embarque_desembarque/2023.json');
    sendJSON(filePath, res);
});

app.get('/api/data/aeroporto/embarque-desembarque/2024', (req, res) => {
    const filePath = path.join(data_local, 'aeroporto/embarque_desembarque/2024.json');
    sendJSON(filePath, res);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});