
class Scene3 extends BaseScene {
    constructor() {
        super({ key: 'Scene3', active: true })

        this.groundImg = 'ground_3';
        
        this.passwordsData = [
            {
                text: 'mm9_gMl34@!',
                valid: true,
                x: 270,
                y: 200
            },
            {
                text: '_#code500',
                valid: false,
                x: 80,
                y: 25
            },
            {
                text: '8LNP$__$()',
                valid: false,
                x: 300,
                y: 500
            },
            {
                text: 'KGB_14blr',
                valid: true,
                x: 600,
                y: 320
            },
            {
                text: 'openT43_door',
                valid: true,
                x: 600,
                y: 50
            }
        ];

        this.obstaclesObj = [
            {
                x: 120,
                y: 200,
                key: 'obstacle_3'
            },
            {
                x: 200,
                y: 430,
                key: 'obstacle_3'
            },
            {
                x: 500,
                y: 80,
                key: 'obstacle_3'
            },
            {
                x: 700,
                y: 500,
                key: 'obstacle_3.1'
            },
            {
                x: 450,
                y: 300,
                key: 'obstacle_3.1'
            },
            {
                x: 670,
                y: 200,
                key: 'obstacle_3.1'
            }
        ]
        
        this.enemies = [
            {
                x: 700,
                y: 100,
                speed: 180,
                key: 'enemy_3'
            },
            {
                x: 500,
                y: 400,
                speed: 180,
                key: 'enemy_3'
            },
            {
                x: 400,
                y: 600,
                speed: 180,
                key: 'enemy_3'
            }
        ]
    }

    goToNextScene() {
        let spawned = new GameOverScene();
        this.scene.add('GameOverScene', spawned, true);
        this.scene.setActive(false);
    }
}