import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333',
});

export default api;

/*
    iOS com emulador: localhost
    iOS fisico: IP da maquina
    Android com Emulador: localhost (adb reverse tcp:3333 tcp:3333)
    Android com Emulador: 10.0.2.2 (Android Studio)
    Android com emulador: 10.0.3.2 (Genymotion)
    Android fisico: IP da maquina
*/