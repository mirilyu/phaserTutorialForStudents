
class Scene1 extends BaseScene {
    constructor() {
        super({ key: 'Scene1', active: true })

        this.groundImg = 'ground_1';
        
        this.passwordsData = [
            {
                text: 'monkeyboy',
                valid: true,
                x: 600,
                y: 80
            },
            {
                text: 'sababa',
                valid: false,
                x: 270,
                y: 200
            },
            {
                text: 'sandwich',
                valid: true,
                x: 400,
                y: 500
            },
            {
                text: 'whale',
                valid: false,
                x: 150,
                y: 350
            },
            {
                text: 'snailknight',
                valid: true,
                x: 60,
                y: 50
            },
        ];

        this.obstaclesObj = [
            {
                x: 200,
                y: 200,
                key: 'obstacle_1'
            },
            {
                x: 500,
                y: 60,
                key: 'obstacle_1'
            },
            {
                x: 600,
                y: 300,
                key: 'obstacle_1.2'
            },
            {
                x: 300,
                y: 500,
                key: 'obstacle_1.2'
            }
        ]
        
        this.enemies = [
            {
                x: 700,
                y: 100,
                speed: 120,
                key: 'enemy_1'
            }
        ]
    }

    goToNextScene() {
        let spawned = new Scene2Desc();
        this.scene.add('Scene2Desc', spawned, true);
        this.scene.setActive(false);
    }
}