import React from 'react';
import { ParticlesBackground } from './features/ParticlesBackground/ParticlesBackground';
import { Preloader } from './features/MainPage/Preloader/Preloader';
import { Router } from './features/router/Router';

const App = () => {
    return (
        <div className="App">
            <ParticlesBackground />
            <Preloader text="Loading news..." />
            <Router />
        </div>
    );
};

export default App;
