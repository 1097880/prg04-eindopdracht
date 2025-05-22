import { Color, EmitterType, ParticleEmitter, Vector } from "excalibur";

export class FloorSlide extends ParticleEmitter {
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
                minSize: 2,
                maxSize: 5,
                minSpeed: 75,
                maxSpeed: 85,
                minAngle: Math.PI,
                maxAngle: Math.PI + 2
            }
        });
        this.pos = new Vector(0, 16);
    }
}