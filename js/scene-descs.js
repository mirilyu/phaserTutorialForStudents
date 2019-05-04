
class Scene1Desc extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene1Desc', active: true });
    }

    preload() {
        this.load.image('intro1', 'assets/intro1.png');
        this.load.image('btn-start', 'assets/btn-start.png');
    }

    create() {
        this.add.image(400, 300, 'intro1');

        this.add.image(400, 450, 'btn-start')
            .setInteractive()
            .on('pointerdown', () => {
                let spawned = new Scene1();
                this.scene.add('Scene1', spawned, true);
                this.scene.setActive(false);
            });
    }
}

class Scene2Desc extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene2Desc', active: true });
    }

    preload() {
        this.load.image('intro2', 'assets/intro2.png');
        this.load.image('btn-continue', 'assets/btn-continue.png');
    }

    create() {
        this.add.image(400, 300, 'intro2');

        this.add.image(400, 450, 'btn-continue')
            .setInteractive()
            .on('pointerdown', () => {
                let spawned = new Scene2();
                this.scene.add('Scene2', spawned, true);
                this.scene.setActive(false);
            });
    }
}

class Scene3Desc extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene3Desc', active: true });
    }

    preload() {
        this.load.image('intro3', 'assets/intro3.png');
        this.load.image('btn-continue', 'assets/btn-continue.png');
    }

    create() {
        this.add.image(400, 300, 'intro3');

        this.add.image(400, 450, 'btn-continue')
            .setInteractive()
            .on('pointerdown', () => {
                let spawned = new Scene3();
                this.scene.add('Scene3', spawned, true);
                this.scene.setActive(false);
            });
    }
}

class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene', active: true });
    }

    preload() {
        this.load.image('btn-restart', 'assets/btn-restart.png');
    }

    create() {
        let graphics = this.add.graphics();
        graphics.fillStyle(0x222222, 1);
        graphics.fillRect(0, 0, 800, 600);

        this.add.image(400, 450, 'btn-restart')
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.setActive(false);
                game.destroy(true);
                game = new Phaser.Game(config);
            });
    }
}