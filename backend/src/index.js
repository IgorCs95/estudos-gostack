const express = require('express');
const { uuid, isUuid } = require('uuidv4');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function logRequest(request, response, next) {
    const { method, url } = request;
    const logLabel = `[${method.toUpperCase()} ${url}]`;

    console.time(logLabel)
    next();
    console.timeEnd(logLabel);
}

function validadeId(request, response, next) {
    const { id } = request.params;

    if (!isUuid(id)) {
        return response.status(400).json({ erro: "id invalido" });
    }
    return next();
}
app.use(logRequest);

app.use('/users/:id', validadeId);

app.get('/users', (request, response) => {
    const { name } = request.query;

    const resultados = name
        ? users.filter(p => p.name.includes(name))
        : users;

    return response.json(resultados);

});

app.post('/users', (request, response) => {
    const { name, idade } = request.body;

    console.log(name, idade);

    const project = { id: uuid(), name, idade };

    users.push(project)

    return response.status(201).json(project);
});

app.put('/users/:id', (request, response) => {
    const { id } = request.params;
    const { name, idade } = request.body;

    const usersIndex = users.findIndex(p => p.id === id);

    if (usersIndex < 0) {
        return response.status(400).json({ error: 'objeto nao encontrado' });
    }

    const proj = {
        id,
        name,
        idade
    };

    users[usersIndex] = proj;

    return response.status(201).json(proj);
});

app.delete('/users/:id', (request, response) => {
    const { id } = request.params;

    const usersIndex = users.findIndex(p => p.id === id);

    if (usersIndex < 0) {
        return response.status(400).json({ error: 'objeto nao encontrado' });
    }

    users.splice(usersIndex, 1);

    return response.status(204).send();
});

app.listen(3333, () => {
    console.log('Serve backend Started! ✔ ');
});

