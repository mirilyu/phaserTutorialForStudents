
class Scene1 extends BaseScene {
    constructor() {
        super({ key: 'Scene1', active: true })
        
        this.passwordsData = [
            {
                text: 'q1w2e3r4',
                valid: true,
            },
            {
                text: '12345',
                valid: false
            },
            {
                text: 'mashaIdiKakats',
                valid: false
            },
            {
                text: '27pbr1E',
                valid: true
            },
        ]
        
        this.numberOfEnemies = 1;
    }
}