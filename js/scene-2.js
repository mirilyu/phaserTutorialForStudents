class SceneB extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneB', active: true })
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.setVelocityY(0);
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.setVelocityY(0);
            this.player.anims.play('right', true);
        }
        else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-160);
            this.player.setVelocityX(0);
            this.player.anims.play('up', true);
        }
        else if (this.cursors.down.isDown) {
            this.player.setVelocityY(160);
            this.player.setVelocityX(0);
            this.player.anims.play('down', true);
        }
        else {
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);

            this.player.anims.play('turn');
        }
    }

    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.image('password', 'assets/password.png');
        this.load.spritesheet('dude',
            'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }

    create() {
        var self = this;
        this.add.image(400, 300, 'sky');

        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        this.platforms.create(500, 300, 'ground');
        this.platforms.create(50, 250, 'ground');
        //this.platforms.create(750, 220, 'ground');

        this.player = this.physics.add.sprite(100, 450, 'dude');

        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'up',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'down',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20,
            repeat: -1
        });

        this.physics.add.collider(this.player, this.platforms);

        this.cursors = this.input.keyboard.createCursorKeys();

        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        this.passwords = this.physics.add.group();

        passwordsData.forEach(function (passObj) {
            var password = this.add.text(Phaser.Math.Between(0, 700), Phaser.Math.Between(0, 500), passObj.text, { fontSize: 14, backgroundColor: '#ffffff', color: '#333333' });
            password.valid = passObj.valid;
            this.physics.world.enable(password);
            this.passwords.add(password);
        }, this);

        this.physics.add.overlap(this.player, this.passwords, pickPassword, null, this);
    }
}