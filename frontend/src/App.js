import React, { useState, useEffect } from 'react';
import api from './services/api'

import Header from './components/header'


import './App.css';


function App() {
    const [projects, setProjects] = useState(['Desenvolvimento', 'Front end']);

    useEffect(() => {
        api.get('projects').then(response => {
            console.log(response);
        });
    }, []);

    function addProject() {
        setProjects([...projects, `Novo Projeto ${Date.now()}`]);
    }

    return (
        <>
            <Header title="Projetos" />


            <button type="button" onClick={addProject} >Adiciona Projeto</button>
            <ul>{projects.map(project => <li key={project} >{project}</li>)}</ul>

        </>
    );
}

export default App;