import { Color, EmitterType, ParticleEmitter, Vector } from "excalibur";

export class OrbGlow extends ParticleEmitter {
    
    constructor(color) {
        super({
            emitterType: EmitterType.Rectangle,
            emitRate: 50,
            isEmitting: true,
            particle: {
                life: 650,
                fade: true,
                beginColor: color,
                endColor: Color.LightGray,
                minSize: 3,
                maxSize: 7,
                minSpeed: 50,
                maxSpeed: 65,
                minAngle: 0,
                maxAngle: Math.PI * 2,
            }
        });
        this.pos = new Vector(0, -6);

    }

}