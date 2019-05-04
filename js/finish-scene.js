
class FinishScene extends Phaser.Scene {
    constructor() {
        super({ key: 'FinishScene', active: true })
    }

    preload() {
        this.load.image('intro4', 'assets/intro4.png');
    }

    create() {
        this.add.image(400, 300, 'intro4');  
    }
}