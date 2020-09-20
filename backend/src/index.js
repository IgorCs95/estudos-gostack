const express = require('express');
const { uuid } = require('uuidv4');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json());


const projects = [];

app.get('/users', (request, response) => {
    const { name } = request.query;
    
    const resultados = name
        ? projects.filter(p => p.name.includes(name))
        : projects;

    return response.json(resultados);

});

app.post('/users', (request, response) => {
    const { name, idade } = request.body;

    console.log(name, idade);

    const project = { id: uuid(), name, idade };

    projects.push(project)

    return response.status(201).json(project);
});

app.put('/users/:id', (request, response) => {
    const { id } = request.params;
    const { name, idade } = request.body;

    const projectsIndex = projects.findIndex(p => p.id === id);

    if (projectsIndex < 0) {
        return response.status(400).json({ error: 'objeto nao encontrado' });
    }

    const proj = {
        id,
        name,
        idade
    };

    projects[projectsIndex] = proj;

    return response.status(201).json(proj);
});

app.delete('/users/:id', (request, response) => {
    const { id } = request.params;

    const projectsIndex = projects.findIndex(p => p.id === id);

    if (projectsIndex < 0) {
        return response.status(400).json({ error: 'objeto nao encontrado' });
    }

    projects.splice(projectsIndex, 1);

    return response.status(204).send();
});

app.listen(3333, () => {
    console.log('Serve backend Started! ✔ ');
});

