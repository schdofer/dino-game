const bg = document.querySelector('.background');
const dino = document.querySelector('.dino');
let dinoPosition = 0;
let isJumping = false;

// site "keycode.info" tem as informações de teclas
function handleKeyDown(event) {
    if (event.keyCode == 32) {
        if (!isJumping) {
            jump();
        }
    }
}

function jump() {
    isJumping = true;

    let upInterval = setInterval(() => {
        // Parando de subir
        if (dinoPosition >= 150) {
            clearInterval(upInterval);

            // Descendo
            let downInterval = setInterval(() => {
                if (dinoPosition <= 20) {
                    clearInterval(downInterval);
                    isJumping = false;
                }
                dinoPosition -= 15;
                dino.style.bottom = dinoPosition + 'px';
            }, 20);
        }
        // subindo
        dinoPosition += 20;
        dino.style.bottom = dinoPosition + 'px';
    }, 20);
}


function createCactus() {
    const cactus = document.createElement('div');
    let cactusHorizontalPosition = 1000;
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = cactusHorizontalPosition + 'px';
    bg.appendChild(cactus);

    moveAndRemoveCactus(cactus, cactusHorizontalPosition);

    // Invoca recursovamente a criação de novos Cactus
    setTimeout(createCactus, randomTime);
}


function moveAndRemoveCactus(cactus, cactusPosition) {
    let leftInterval = setInterval(() => {
        if (cactusPosition <= -60) {
            clearInterval(leftInterval);
            bg.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && dinoPosition < 60) {
            // Game Over
            gameOver();
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);
}

function gameOver(leftInterval) {
    clearInterval(leftInterval);
    document.body.innerHTML = `<div class="gameOver"><h1>Game Over</h1></div>`;
}

createCactus();
document.addEventListener('keydown', handleKeyDown);
