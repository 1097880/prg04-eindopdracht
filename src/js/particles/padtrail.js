import { Color, EmitterType, ParticleEmitter, Rectangle, Vector } from "excalibur";

export class PadTrail extends ParticleEmitter {

    constructor(color) {
        super({
            emitterType: EmitterType.Rectangle,
            emitRate: 120,
            isEmitting: false,
            particle: {
                life: 350,
                fade: true,
                graphic: new Rectangle({
                    width: 20,
                    height: 20,
                    color: color,
                }),
                randomRotation: true
            }
        });
        this.pos = new Vector(0, 0);
    }

}