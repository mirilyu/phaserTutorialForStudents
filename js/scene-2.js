
class Scene2 extends BaseScene {
    constructor() {
        super({ key: 'Scene2', active: true });

        this.passwordsData = [
            {
                text: 'app1eWatch',
                valid: true,
                x: 270,
                y: 200
            },
            {
                text: '123mypass',
                valid: false,
                x: 650,
                y: 220
            },
            {
                text: 'FANCY4MNL',
                valid: false,
                x: 300,
                y: 500
            },
            {
                text: '46rBR0102',
                valid: true,
                x: 150,
                y: 350
            },
            {
                text: 'SAY99friend',
                valid: true,
                x: 40,
                y: 70
            }
        ]

        this.obstaclesObj = [
            {
                x: 200,
                y: 200
            },
            {
                x: 500,
                y: 80
            },
            {
                x: 700,
                y: 500
            }
        ]
        
        this.enemies = [
            {
                x: 700,
                y: 100,
                speed: 160
            },
            {
                x: 500,
                y: 400,
                speed: 160
            }
        ]
    }

    goToNextScene() {
        let spawned = new Scene3Desc();
        this.scene.add('Scene3Desc', spawned, true);
        this.scene.setActive(false);
    }
}