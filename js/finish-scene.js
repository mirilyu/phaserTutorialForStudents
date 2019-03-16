
class FinishScene extends Phaser.Scene {
    constructor() {
        super({ key: 'FinishScene', active: true })
    }

    create() {
        let graphics = this.add.graphics();
        graphics.fillStyle(0x222222, 0.5);
        graphics.fillRect(0, 0, 800, 600);

        this.add
            .text(400, 300, 'Well done!', { fontSize: '32px', color: '#333', backgroundColor: "#fff" })
            .setInteractive()
            .setOrigin(0.5, 0.5)
            .on('pointerdown', () => { 

            });
        
    }
}