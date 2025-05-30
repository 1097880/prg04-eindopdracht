import { Color, EmitterType, ParticleEmitter, Vector } from "excalibur";

export class Fly extends ParticleEmitter {
    constructor() {
        super({
            emitterType: EmitterType.Rectangle,
            emitRate: 50,
            isEmitting: false,
            particle: {
                life: 750,
                fade: true,
                beginColor: Color.White,
                endColor: Color.LightGray,
                minSize: 3,
                maxSize: 16,
                minSpeed: 100,
                maxSpeed: 135,
                minAngle: 2,
                maxAngle: 4
            }
        });
        this.pos = new Vector(-13, 0);
    }
}