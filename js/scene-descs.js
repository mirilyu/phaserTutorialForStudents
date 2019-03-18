
class Scene1Desc extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene1Desc', active: true });
    }

    create() {
        let graphics = this.add.graphics();
        graphics.fillStyle(0x222222, 1);
        graphics.fillRect(0, 0, 800, 600);

        this.add
            .text(400, 300, 'Start Game', { fontSize: '32px', color: '#333', backgroundColor: "#fff" })
            .setInteractive()
            .setOrigin(0.5, 0)
            .on('pointerdown', () => {
                let spawned = new Scene1();
                this.scene.add('Scene1', spawned, true);
                this.scene.setActive(false);
            });
        
        this.add
            .text(400, 150, 'Pick passwords meeting \nthe following requirements:')
            .setStyle({ fontSize: '24px', color: '#fff', align: 'center' })
            .setOrigin(0.5, 0)
            .setLineSpacing(8)

        this.add  
            .text(400, 220, '* have at least 8 characters \n* have letters and numbers')
            .setStyle({ fontSize: '20px', color: '#fff', align: 'left' })
            .setOrigin(0.5, 0)
            .setLineSpacing(5)
    }
}

class Scene2Desc extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene2Desc', active: true });
    }

    create() {
        let graphics = this.add.graphics();
        graphics.fillStyle(0x222222, 1);
        graphics.fillRect(0, 0, 800, 600);

        this.add
            .text(400, 350, 'Continue', { fontSize: '32px', color: '#333', backgroundColor: "#fff" })
            .setInteractive()
            .setOrigin(0.5, 0)
            .on('pointerdown', () => {
                let spawned = new Scene2();
                this.scene.add('Scene2', spawned, true);
                this.scene.setActive(false);
            });
        
        this.add
            .text(400, 150, 'Pick passwords meeting \nthe following requirements:')
            .setStyle({ fontSize: '24px', color: '#fff', align: 'center' })
            .setOrigin(0.5, 0)
            .setLineSpacing(8)

        this.add  
            .text(400, 220, '* have at least 8 characters \n* have letters and numbers \n* have uppercase and lowercase characters')
            .setStyle({ fontSize: '20px', color: '#fff', align: 'left' })
            .setOrigin(0.5, 0)
            .setLineSpacing(5)
    }
}

class Scene3Desc extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene3Desc', active: true });
    }

    create() {
        let graphics = this.add.graphics();
        graphics.fillStyle(0x222222, 1);
        graphics.fillRect(0, 0, 800, 600);

        this.add
            .text(400, 370, 'Continue', { fontSize: '32px', color: '#333', backgroundColor: "#fff" })
            .setInteractive()
            .setOrigin(0.5, 0)
            .on('pointerdown', () => {
                let spawned = new Scene3();
                this.scene.add('Scene3', spawned, true);
                this.scene.setActive(false);
            });
        
        this.add
            .text(400, 150, 'Pick passwords meeting \nthe following requirements:')
            .setStyle({ fontSize: '24px', color: '#fff', align: 'center' })
            .setOrigin(0.5, 0)
            .setLineSpacing(8)

        this.add  
            .text(400, 220, '* have at least 8 characters \n* have letters and numbers \n* have uppercase and lowercase characters \n* have special characters')
            .setStyle({ fontSize: '20px', color: '#fff', align: 'left' })
            .setOrigin(0.5, 0)
            .setLineSpacing(5)
    }
}