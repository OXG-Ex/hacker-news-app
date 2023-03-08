import { useCallback } from "react";
import Particles, { } from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Engine, ISourceOptions } from "tsparticles-engine";
import config from './particlesConfig.json';

export const ParticlesBackground = () => {

    const particlesInit = useCallback(async (engine: Engine) => {
        await loadFull(engine);
    }, []);

    return <Particles id="particles-background" options={config as ISourceOptions} init={particlesInit} />;
};
