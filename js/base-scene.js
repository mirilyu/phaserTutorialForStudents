
class BaseScene extends Phaser.Scene {
    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.setVelocityY(0);
            this.player.anims.play('hero_left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.setVelocityY(0);
            this.player.anims.play('hero_right', true);
        }
        else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-160);
            this.player.setVelocityX(0);
            this.player.anims.play('hero_up', true);
        }
        else if (this.cursors.down.isDown) {
            this.player.setVelocityY(160);
            this.player.setVelocityX(0);
            this.player.anims.play('hero_down', true);
        }
        else {
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);

            this.player.anims.play('hero_turn');
        }
    }

    preload() {
        this.load.image('ground', 'assets/bg.png');
        this.load.image('password', 'assets/password.png');
        this.load.image('obstacle', 'assets/obstacle2.png');
        this.load.image('boundaryTop', 'assets/boundary-top.png');
        this.load.image('boundaryLeft', 'assets/boundary-left.png');

        this.load.spritesheet('enemy',
            'assets/enemy.png',
            { frameWidth: 60, frameHeight: 52 }
        );

        this.load.spritesheet('hero',
            'assets/hero.png',
            { frameWidth: 40, frameHeight: 60 }
        );
    }

    create() {
        this.add.image(400, 300, 'ground');

        // boundaries
        this.boundaries = this.physics.add.staticGroup();

        // top and bottom boundaries
        this.boundaries.create(400, 599, 'boundaryTop');
        this.boundaries.create(400, 1, 'boundaryTop');

        // left and right boundaries
        this.boundaries.create(1, 0, 'boundaryLeft');
        this.boundaries.create(799, 0, 'boundaryLeft');

        // obstacles
        this.obstacles = this.physics.add.staticGroup();
        this.obstacles.create(600, 400, 'obstacle');
        this.obstacles.create(150, 100, 'obstacle');
        this.obstacles.create(500, 200, 'obstacle');

        this.player = this.physics.add.sprite(100, 450, 'hero');

        this.player.setCollideWorldBounds(true);

        // hero animation
        this.anims.create({
            key: 'hero_turn',
            frames: [{ key: 'hero', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'hero_left',
            frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'hero_right',
            frames: this.anims.generateFrameNumbers('hero', { start: 8, end: 11 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'hero_up',
            frames: this.anims.generateFrameNumbers('hero', { start: 12, end: 15 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'hero_down',
            frames: this.anims.generateFrameNumbers('hero', { start: 4, end: 7 }),
            frameRate: 8,
            repeat: -1
        });

        this.physics.add.collider(this.player, this.obstacles, this.test, null, this);

        this.cursors = this.input.keyboard.createCursorKeys();

        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        // enemies generation
        var i;
        for (i = 0; i < this.numberOfEnemies; i++) {
            var enemy = new Enemy(Phaser.Math.Between(0, 700), Phaser.Math.Between(0, 600), this, 100);
        }

        // generate passwords
        this.generatePasswords();

        // var leftBtn = this.add
        //     .text(500, 50, 'LEFT', { color: '#000', backgroundColor: "#fff" })
        //     .setInteractive()
        //     .on('pointerdown', () => { this.currentDirection = 'LEFT'; });

        // var rightBtn = this.add
        //     .text(550, 50, 'RIGHT', { color: '#000', backgroundColor: "#fff" })
        //     .setInteractive()
        //     .on('pointerdown', () => { this.currentDirection = 'RIGHT'; });

        // var upBtn = this.add
        //     .text(535, 20, 'UP', { color: '#000', backgroundColor: "#fff" })
        //     .setInteractive()
        //     .on('pointerdown', () => { this.currentDirection = 'UP'; });

        // var downBtn = this.add
        //     .text(530, 80, 'DOWN', { color: '#000', backgroundColor: "#fff" })
        //     .setInteractive()
        //     .on('pointerdown', () => { this.currentDirection = 'DOWN'; });
    }

    //generatePasswords() {}

    pickPassword(player, pass) {
        pass.alpha = 0;
        this.physics.world.disable(pass);

        if (pass.valid) {
            score += 10;
        } else {
            score -= 10;
        }
        scoreText.setText('Score: ' + score);

        if (score >= 10) {
            this.scene.bringToTop('Congrats');
            this.scene.setActive(false);
        }
    }

    hitEnemy() {
        this.physics.pause();

        this.player.setTint(0xff0000);

        this.player.anims.play('turn');

        this.gameOver = true;
    }

    test() { console.log('test') }

    generatePasswords() {
        this.passwords = this.physics.add.group();

        this.passwordsData.forEach(function (passObj) {
            var password = this.add.text(Phaser.Math.Between(0, 700), Phaser.Math.Between(0, 500), passObj.text, { fontSize: 14, backgroundColor: '#ffffff', color: '#333333' });
            password.valid = passObj.valid;
            this.physics.world.enable(password);
            this.passwords.add(password);
        }, this);

        this.physics.add.overlap(this.player, this.passwords, this.pickPassword, null, this);
    }
}

class Enemy {
    constructor(x, y, game, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.game = game;

        this.enemy = this.game.physics.add.sprite(this.x, this.y, 'enemy');
        this.enemy.setCollideWorldBounds(true);
        this.enemy.dir = 'left';
        this.game.physics.add.collider(this.game.player, this.enemy, this.game.hitEnemy, null, this.game);

        game.anims.create({
            key: 'enemy_left',
            frames: game.anims.generateFrameNumbers('enemy', { start: 6, end: 11 }),
            frameRate: 10,
            repeat: -1
        });
    
        game.anims.create({
            key: 'enemy_turn',
            frames: [{ key: 'enemy', frame: 4 }],
            frameRate: 20
        });
    
        game.anims.create({
            key: 'enemy_right',
            frames: game.anims.generateFrameNumbers('enemy', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        game.physics.add.collider(this.enemy, game.obstacles, this.changeEnemyDir, null, this);
        game.physics.add.collider(this.enemy, game.boundaries, this.changeEnemyDir, null, this);

        this.enemyMoveInterval = setInterval( () => {
            this.changeEnemyDir();
        }, 2000);
    }

    changeEnemyDir() {
        var direction = Math.floor(Math.random() * 4) + 1;
        
        if (direction === this.enemy.dir) {
            this.changeEnemyDir();
        }
        
        this.enemy.dir = direction;
        
        clearInterval(this.enemyMoveInterval);
        
        this.enemyMoveInterval = setInterval( () => {
            this.changeEnemyDir();
        }, 2000);

        switch (direction) {
            case 1:
                this.enemyGoRight(this.speed);
                break;
            case 2:
                this.enemyGoLeft(this.speed);
                break;
            case 3:
                this.enemyGoUp(this.speed);
                break;
            case 4:
                this.enemyGoDown(this.speed);
                break;
        }
    }

    enemyGoLeft(speed) {
        this.enemy.setVelocityX(speed - speed * 2);
        this.enemy.setVelocityY(0);
        this.enemy.anims.play('enemy_left', true);
    }

    enemyGoRight(speed) {
        this.enemy.setVelocityX(speed);
        this.enemy.setVelocityY(0);
        this.enemy.anims.play('enemy_right', true);
    }

    enemyGoUp(speed) {
        this.enemy.setVelocityX(0);
        this.enemy.setVelocityY(speed - speed * 2);
        this.enemy.anims.play('enemy_left', true);
    }

    enemyGoDown(speed) {
        this.enemy.setVelocityX(0);
        this.enemy.setVelocityY(speed);
        this.enemy.anims.play('enemy_right', true);
    }  
}