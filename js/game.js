var score = 0;
var scoreText = "";

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var passwordsData = [
    {
        text: 'q1w2e3r4',
        valid: true,
        x: 670,
        y: 220
    },
    {
        text: '_evl081',
        valid: false,
        x: 270,
        y: 200
    },
    {
        text: 'sandwich',
        valid: false,
        x: 300,
        y: 500
    },
    {
        text: '27smn13a',
        valid: true,
        x: 150,
        y: 350
    },
    {
        text: 'letm31in',
        valid: true,
        x: 60,
        y: 50
    },
];

var obstaclesObj = [
    {
        x: 200,
        y: 200,
        key: 'obstacle_1'
    },
    {
        x: 500,
        y: 80,
        key: 'obstacle_1'
    },
    {
        x: 700,
        y: 500,
        key: 'obstacle_1'
    },
    {
        x:400,
        y: 350,
        key: 'obstacle_1'
    }
]

function preload() {
    this.load.image('ground_1', 'assets/bg1.png');
    this.load.image('obstacle_1', 'assets/obstacle1.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('life', 'assets/life.png');
    this.load.spritesheet('hero',
        'assets/hero.png',
        { frameWidth: 40, frameHeight: 60 }
    );
}

function create() {
    this.pickPassword = function(player, pass) {
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
            alert("Congratulations! You won!");
        }
    }
    
    this.hitEnemy = function() {
        this.health--;
        this.lives.children.entries[this.health].alpha = 0;
    
        if (this.health == 0) {
            this.gameOver();
            return;
        }
    
        this.player.x = 100;
        this.player.y = 450;
    
        var blinkNum = 0;
        var blinkInterval = setInterval(() => {
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
    
    this.gameOver = function() {
        this.physics.pause();
    
        this.player.setTint(0xff0000);
    
        this.player.anims.play('turn');
    
        this.gameOver = true;
    }
    
    this.generatePasswords = function() {
        this.passwords = this.physics.add.group();
    
        passwordsData.forEach(function (passObj) {
            var password = this.add.text(passObj.x, passObj.y, passObj.text, { fontSize: 24, color: '#ffffff', fontStyle: 'bold', fontFamily: 'Arial' });
            password.valid = passObj.valid;
            this.physics.world.enable(password);
            this.passwords.add(password);
        }, this);
    
        this.physics.add.overlap(this.player, this.passwords, this.pickPassword, null, this);
    }

    this.score = 0;
    this.correctPassNumber = passwordsData.filter(function(pass) { return pass.valid }).length;

    this.add.image(400, 300, "ground_1");

    // obstacles
    this.obstacles = this.physics.add.staticGroup();
    
    obstaclesObj.forEach(function(obstacle) {
        this.create(obstacle.x, obstacle.y, obstacle.key);
    }, this.obstacles);

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

    // generate passwords
    this.generatePasswords();

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

function update() {
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