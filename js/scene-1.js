
class Scene1 extends BaseScene {
    constructor() {
        super({ key: 'Scene1', active: true })

        this.groundImg = 'ground_1';
        
        this.passwordsData = [
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

        this.obstaclesObj = [
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
                key: 'obstacle_1.2'
            },
            {
                x:400,
                y: 350,
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