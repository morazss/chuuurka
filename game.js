const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const map = {
    width: 3000,
    height: 3000
};

const player = {
    x: map.width / 2,
    y: map.height / 2,
    size: 20,
    speed: 5,
    dx: 0,
    dy: 0,
    dashSpeed: 15,
    isDashing: false,
    dashCooldown: false
};

let animatronics = [];
const numAnimatronics = 50;
const animatronicColors = ['red', 'green', 'yellow', 'purple'];

function createAnimatronics() {
    animatronics = [];
    for (let i = 0; i < numAnimatronics; i++) {
        animatronics.push({
            x: Math.random() * map.width,
            y: Math.random() * map.height,
            size: 30,
            dx: 0,
            dy: 0,
            isChasing: false,
            color: animatronicColors[i % animatronicColors.length]
        });
    }
}

const chaseRadius = 200;

let obstacles = [];
const numObstacles = 50;

function createObstacles() {
    obstacles = [];
    for (let i = 0; i < numObstacles; i++) {
        const type = Math.random() > 0.5 ? 'horizontal' : 'vertical';
        if (type === 'horizontal') {
            obstacles.push({
                x: Math.random() * map.width,
                y: Math.random() * map.height,
                width: 100 + Math.random() * 100,
                height: 10
            });
        } else {
            obstacles.push({
                x: Math.random() * map.width,
                y: Math.random() * map.height,
                width: 10,
                height: 100 + Math.random() * 100
            });
        }
    }
}

let isGameOver = false;
let camera = { x: 0, y: 0 };

function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x - camera.x, player.y - camera.y, player.size, player.size);
}

function drawAnimatronics() {
    animatronics.forEach(anim => {
        ctx.fillStyle = anim.color;
        ctx.fillRect(anim.x - camera.x, anim.y - camera.y, anim.size, anim.size);
    });
}

function drawObstacles() {
    ctx.fillStyle = 'gray';
    obstacles.forEach(obs => {
        ctx.fillRect(obs.x - camera.x, obs.y - camera.y, obs.width, obs.height);
    });
}

function movePlayer() {
    let moveSpeed = player.isDashing ? player.dashSpeed : player.speed;

    const nextX = player.x + player.dx * moveSpeed;
    const nextY = player.y + player.dy * moveSpeed;

    let canMoveX = true;
    let canMoveY = true;

    obstacles.forEach(obs => {
        if (
            nextX < obs.x + obs.width &&
            nextX + player.size > obs.x &&
            player.y < obs.y + obs.height &&
            player.y + player.size > obs.y
        ) {
            canMoveX = false;
        }

        if (
            player.x < obs.x + obs.width &&
            player.x + player.size > obs.x &&
            nextY < obs.y + obs.height &&
            nextY + player.size > obs.y
        ) {
            canMoveY = false;
        }
    });

    if (canMoveX) player.x += player.dx * moveSpeed;
    if (canMoveY) player.y += player.dy * moveSpeed;

    if (player.x < 0) player.x = 0;
    if (player.x + player.size > map.width) player.x = map.width - player.size;
    if (player.y < 0) player.y = 0;
    if (player.y + player.size > map.height) player.y = map.height - player.size;

    camera.x = Math.min(Math.max(player.x - canvas.width / 2, 0), map.width - canvas.width);
    camera.y = Math.min(Math.max(player.y - canvas.height / 2, 0), map.height - canvas.height);
}

function moveAnimatronics() {
    animatronics.forEach(anim => {
        const distanceToPlayer = Math.hypot(player.x - anim.x, player.y - anim.y);

        if (distanceToPlayer < chaseRadius) {
            anim.isChasing = true;
        } else {
            anim.isChasing = false;
        }

        if (anim.isChasing) {
            const angle = Math.atan2(player.y - anim.y, player.x - anim.x);
            anim.dx = Math.cos(angle) * 3;
            anim.dy = Math.sin(angle) * 3;
        } else {
            anim.dx = 0;
            anim.dy = 0;
        }

        anim.x += anim.dx;
        anim.y += anim.dy;

        if (anim.x < 0 || anim.x + anim.size > map.width) anim.dx *= -1;
        if (anim.y < 0 || anim.y + anim.size > map.height) anim.dy *= -1;
    });
}

function checkCollision() {
    animatronics.forEach(anim => {
        if (
            player.x < anim.x + anim.size &&
            player.x + player.size > anim.x &&
            player.y < anim.y + anim.size &&
            player.y + player.size > anim.y
        ) {
            isGameOver = true;
            document.getElementById('gameOver').classList.remove('hidden');
        }
    });
}

function update() {
    if (isGameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();
    drawAnimatronics();
    drawObstacles();
    movePlayer();
    moveAnimatronics();
    checkCollision();

    requestAnimationFrame(update);
}

function restartGame() {
    player.x = map.width / 2;
    player.y = map.height / 2;
    isGameOver = false;
    createAnimatronics();
    createObstacles();
    document.getElementById('gameOver').classList.add('hidden');
    update();
}

function keyDown(e) {
    if (e.key === 'w') player.dy = -1;
    if (e.key === 'a') player.dx = -1;
    if (e.key === 's') player.dy = 1;
    if (e.key === 'd') player.dx = 1;

    if (e.key === 'Shift' && !player.dashCooldown) {
        player.isDashing = true;
        player.dashCooldown = true;
        setTimeout(() => player.isDashing = false, 200);
        setTimeout(() => player.dashCooldown = false, 1000);
    }
}

function keyUp(e) {
    if (
        e.key === 'w' || e.key === 's'
    ) player.dy = 0;

    if (
        e.key === 'a' || e.key === 'd'
    ) player.dx = 0;
}
function goToMenu() {
    window.location.href = 'index.html'; // Переход на страницу меню
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

createAnimatronics();
createObstacles();
update();
