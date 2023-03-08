import React from 'react';
import { ParticlesBackground } from './features/ParticlesBackground/ParticlesBackground';
import { Router } from './features/router/Router';



const App = () => {
    return (
        <div className="App">
            <ParticlesBackground />
            <Router />
        </div>
    );
};

export default App;
