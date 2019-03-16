
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
        this.load.image('obstacle', 'assets/obstacle2.png');
        this.load.image('boundaryTop', 'assets/boundary-top.png');
        this.load.image('boundaryLeft', 'assets/boundary-left.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('life', 'assets/life.png');

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
        this.score = 0;
        this.correctPassNumber = this.passwordsData.filter(pass => pass.valid).length;

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
        this.obstaclesObj.forEach( obstacle => {
            this.obstacles.create(obstacle.x, obstacle.y, 'obstacle');
        });

        this.player = this.physics.add.sprite(100, 450, 'hero');
        this.player.setCollideWorldBounds(true);

        // player animation
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

        // enemies generation
        this.enemies.forEach( enemy => {
            var enemy = new Enemy(enemy.x, enemy.y, this, enemy.speed);
        });

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

        this.stars = this.physics.add.group();

        this.lives = this.physics.add.group(
            {
                key: 'life',
                repeat: 2,
                setXY: { x: 700, y: 20, stepX: 30 }
            }
        );

        this.health = 3;
    }

    pickPassword(player, pass) {
        pass.alpha = 0;
        this.physics.world.disable(pass);

        if (pass.valid) {
            var x = this.score * 30 + 20;
            this.score += 1;
            this.stars.create(x, 20, 'star');
        } else {
            this.hitEnemy();
        }
        
        if (this.score >= this.correctPassNumber) {
            this.goToNextScene();
        }
    }

    hitEnemy() {
        this.health--;
        this.lives.children.entries[this.health].alpha = 0;
        
        if (this.health == 0) {
            this.gameOver();
            return;
        }

        this.player.x = 100;
        this.player.y = 450;

        var blinkNum = 0;
        var blinkInterval = setInterval( () => {
            blinkNum++;
            if (blinkNum == 8) {
                this.player.alpha = 1;
                clearInterval(blinkInterval);
                return;
            }

            if (this.player.alpha == 0) {
                this.player.alpha = 1;
            } else {
                this.player.alpha = 0;
            }
        }, 400);

    }

    gameOver() {
        this.physics.pause();

        this.player.setTint(0xff0000);

        this.player.anims.play('turn');

        this.gameOver = true;
    }

    test() { console.log('test') }

    generatePasswords() {
        this.passwords = this.physics.add.group();

        this.passwordsData.forEach(function (passObj) {
            var password = this.add.text(passObj.x, passObj.y, passObj.text, { fontSize: 24, color: '#ffffff', fontStyle: 'bold', fontFamily: 'Arial' });
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