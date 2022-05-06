export const GameData = {
    // this is the game data and is only updated from the game loop
    bot1Pos: {x: 5, y: 5},
    ball1: {pos: {x: 3, y: 3}, vector: {x: -1.1, y: 1}}
};

export const GameSetup = () => {
    window.document.addEventListener("keydown", keyListener, true);
}

export const GameLoop = (/*frameCount: number*/) => {
    // this method gets called over and over and updates the state that forms our game
    const step = 7;
    const {ball1, bot1Pos} = GameData;

    moveBall(ball1, step);

    checkForOverlap(ball1, bot1Pos);
}

const explode = () => {
    window.alert('boom!');
}

function checkForOverlap(ball1: { pos: { x: number; y: number; }; vector: { x: number; y: number; }; }, bot1Pos: { x: number; y: number; }) {
    const xOverlaps = (): boolean => (ball1.pos.x === bot1Pos.x) || ((ball1.pos.x < bot1Pos.x + 1) && (ball1.pos.x > bot1Pos.x));
    const yOverlaps = (): boolean => (ball1.pos.y === bot1Pos.y) || ((ball1.pos.y < bot1Pos.y + 1) && (ball1.pos.y > bot1Pos.y));

    // check for a collision - ball takes up 4 spaces unless it is exactly in a space
    // what positions is the ball in?
    if (xOverlaps() && yOverlaps()) {
        explode();
    }
}

function moveBall(ball1: { pos: { x: number; y: number; }; vector: { x: number; y: number; }; }, step: number) {
    ball1.pos.x += ball1.vector.x / step;
    if (ball1.pos.x < 2) {
        ball1.pos.x = 2;
        ball1.vector.x = -ball1.vector.x;
    }
    if (ball1.pos.x > 29) {
        ball1.pos.x = 29;
        ball1.vector.x = -ball1.vector.x;
    }
    ball1.pos.y += ball1.vector.y / step;
    if (ball1.pos.y < 2) {
        ball1.pos.y = 2;
        ball1.vector.y = -ball1.vector.y;
    }
    if (ball1.pos.y > 29) {
        ball1.pos.y = 29;
        ball1.vector.y = -ball1.vector.y;
    }
}

const moveDown = () => {
    console.log("down");
    GameData.bot1Pos.y--;
    if (GameData.bot1Pos.y <= 2) {
        GameData.bot1Pos.y = 2;
    }
}

const moveUp = () => {
    console.log("up");
    GameData.bot1Pos.y++
    if (GameData.bot1Pos.y >= 29) {
        GameData.bot1Pos.y = 29;
    }
}

const moveLeft = () => {
    console.log("left");
    GameData.bot1Pos.x-- 
    if (GameData.bot1Pos.x <= 2) {
        GameData.bot1Pos.x = 2;
    }
}

const moveRight = () => {
    console.log("right");
    GameData.bot1Pos.x++
    if (GameData.bot1Pos.x >= 29) {
        GameData.bot1Pos.x = 29;
    }
}

function keyListener(e: KeyboardEvent | undefined)
{
    if (e) {
        if (e.defaultPrevented) {
            return; // Do nothing if the event was already processed
        }
        
        switch (e.key) {
            case "ArrowDown":
                moveDown();
                break;
            case "ArrowUp":
                moveUp();
                break;
            case "ArrowLeft":
                moveLeft();
                break;
            case "ArrowRight":
                moveRight();
                break;
            default:
                return; // Quit when this doesn't handle the key event.
        }
        
        // Cancel the default action to avoid it being handled twice
        e.preventDefault();
    }
}