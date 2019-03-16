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
    scene: [CongratsScene, IntroScene, Scene1]
};

var game = new Phaser.Game(config);