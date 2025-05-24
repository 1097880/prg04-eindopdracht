import { Color, EmitterType, ParticleEmitter, Rectangle, Vector } from "excalibur";

export class JumpPadTrail extends ParticleEmitter {

    constructor() {
        super({
            emitterType: EmitterType.Rectangle,
            emitRate: 120,
            isEmitting: false,
            particle: {
                life: 350,
                fade: true,
                graphic: new Rectangle({
                    width: 25,
                    height: 25,
                    color: Color.Green,
                }),
                randomRotation: true
            }
        });
        this.pos = new Vector(0, 0);
    }

}