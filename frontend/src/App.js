import React, { useState, useEffect } from 'react';
import api from './services/api'

import Header from './components/header'


import './App.css';


function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('users').then(response => {
            setProjects(response.data);
        });
    }, []);

    async function addProject() {
        // setProjects([...projects, `Novo Projeto ${Date.now()}`]);
        const response = await api.post('users', {
            name: `Novo Projeto ${Date.now()}`,
            idade: 30
        });

        const user = response.data;

        setProjects([...projects, user]);

    }

    return (
        <>
            <Header title="Projetos" />

            <button type="button" onClick={addProject} >Adiciona Projeto</button>

            <ul>
                {projects.map(user => <li key={user.id}>{user.name}</li>)}
            </ul>

        </>
    );
}

export default App;