import { Color, EmitterType, ParticleEmitter, Vector } from "excalibur";

export class FloorSlide extends ParticleEmitter {
    constructor() {
        super({
            emitterType: EmitterType.Rectangle,
            emitRate: 20,
            isEmitting: false,
            particle: {
                life: 1000,
                fade: true,
                beginColor: Color.White,
                endColor: Color.LightGray,
                minSize: 2,
                maxSize: 5,
                minSpeed: 75,
                maxSpeed: 85,
                minAngle: Math.PI,
                maxAngle: Math.PI + 0.8
            }
        });
        this.pos = new Vector(0, 16);
    }
}