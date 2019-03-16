
class Scene3 extends BaseScene {
    constructor() {
        super({ key: 'Scene3', active: true })
        
        this.passwordsData = [
            {
                text: 'mm9_gMl34@!',
                valid: true,
                x: 270,
                y: 200
            },
            {
                text: '__code500',
                valid: false,
                x: 100,
                y: 125
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
                x: 40,
                y: 70
            }
        ];

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
                speed: 180
            },
            {
                x: 500,
                y: 400,
                speed: 180
            },
            {
                x: 400,
                y: 600,
                speed: 180
            }
        ]
    }

    goToNextScene() {
        let spawned = new FinishScene();
        this.scene.add('FinishScene', spawned, true);
        this.scene.setActive(false);
    }
}