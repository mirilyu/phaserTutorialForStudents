
class Scene2 extends BaseScene {
    constructor() {
        super({ key: 'Scene2', active: true })

        this.groundImg = 'ground_2';

        this.passwordsData = [
            {
                text: 'appleWatch',
                valid: true,
                x: 270,
                y: 200
            },
            {
                text: 'mooKing',
                valid: false,
                x: 150,
                y: 350
            },
            {
                text: 'FANCYme',
                valid: false,
                x: 400,
                y: 500
            },
            {
                text: 'championSHEEP',
                valid: true,
                x: 600,
                y: 220
            },
            {
                text: 'slugFrienD',
                valid: true,
                x: 40,
                y: 70
            }
        ]

        this.obstaclesObj = [
            {
                x: 200,
                y: 200,
                key: 'obstacle_2'
            },
            {
                x: 130,
                y: 200,
                key: 'obstacle_2'
            },
            {
                x: 550,
                y: 100,
                key: 'obstacle_2'
            },
            {
                x: 300,
                y: 540,
                key: 'obstacle_2.1'
            },
            {
                x: 400,
                y: 350,
                key: 'obstacle_2.1'
            },
            {
                x: 670,
                y: 400,
                key: 'obstacle_2.1'
            }
        ]
        
        this.enemies = [
            {
                x: 700,
                y: 100,
                speed: 160,
                key: 'enemy_2'
            },
            {
                x: 500,
                y: 400,
                speed: 160,
                key: 'enemy_2'
            }
        ]
    }

    goToNextScene() {
        let spawned = new Scene3Desc();
        this.scene.add('Scene3Desc', spawned, true);
        this.scene.setActive(false);
    }
}