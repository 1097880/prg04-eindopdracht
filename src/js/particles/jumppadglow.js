import { Color, EmitterType, ParticleEmitter, Vector } from "excalibur";

export class JumpPadGlow extends ParticleEmitter {
    
    #originalX;
    
    constructor() {
        super({
            emitterType: EmitterType.Rectangle,
            emitRate: 50,
            isEmitting: true,
            particle: {
                life: 500,
                fade: true,
                beginColor: Color.Green,
                endColor: Color.LightGray,
                minSize: 2,
                maxSize: 5,
                minSpeed: 50,
                maxSpeed: 65,
                minAngle: -Math.PI / 2,
                maxAngle: -Math.PI / 2,
            }
        });
        this.pos = new Vector(0, -1);

        this.#originalX = this.pos.x;
    }

    onPreUpdate(engine) {
        this.pos.x = this.#originalX + Math.random() * 30 - 15;
    }
}