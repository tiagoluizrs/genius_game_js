const   parts = [
            document.getElementById('part-0'),
            document.getElementById('part-1'),
            document.getElementById('part-2'),
            document.getElementById('part-3'),
            document.getElementById('part-4')
        ],
        sounds = [
            new Audio('./assets/sounds/sound0.wav'),
            new Audio('./assets/sounds/sound1.wav'),
            new Audio('./assets/sounds/sound2.wav'),
            new Audio('./assets/sounds/sound3.wav'),
            new Audio('./assets/sounds/erro.mp3')
        ],
        score = document.getElementById('genius__score'),
        finishModal = new bootstrap.Modal(document.getElementById('finishModal'), {keyboard: false});
        
let positions = [], mPositions = [];

const setConfigs = async () => {
    parts.map((part, index) => {
        if(index === 4){
            part.style.marginLeft = `-${part.offsetWidth / 2}px`;
            part.style.marginTop = `-${part.offsetWidth / 2}px`;
        }
        part.style.height = `${part.offsetWidth}px`;
        part.addEventListener('click', (event) => setMPosition(event));
    })
}

const loadPositions = async () => {
    let aleatory = 0;

    if (positions.length >= 4){
        aleatory = Math.floor(Math.random() * 4);    
    }else{
        if (positions.length > 0) {
            aleatory = positions[positions.length - 1] + 1;
        }
    }
    
    positions.push(aleatory);
    await iluminatePositons();
    mPositions = []
}

const setMPosition = async (event) => {
    let element = event.currentTarget.getAttribute('source');
    sounds[element].play();
    mPositions.push(parseInt(element));

    let currentPosition = mPositions.length - 1
    setTimeout(async () => {
        if (positions[currentPosition] !== mPositions[currentPosition]) {
            sounds[4].play();
            finishModal.show()
        } else {
            if (currentPosition === positions.length - 1) {
                setTimeout(async () => {
                    score.children[0].innerText = positions.length;
                    await loadPositions();
                }, 500);
            }
        }
    }, 1000);
}

const iluminatePositons = async () => {
    let i = 0;
    let interval = setInterval(async () => {
        item = positions[i];

        await sounds[item].play();
        await parts[item].classList.add(`genius__item--${item}__active`)

        setTimeout(async () => {
            await parts[item].classList.remove(`genius__item--${item}__active`)
        }, 700)

        i++;

        if (i == positions.length) {
            clearInterval(interval)
        }
    }, 2000)
}

const restart = () => {
    finishModal.hide();
    positions = [], mPositions = [];
    loadPositions();
}

document.addEventListener("DOMContentLoaded", (event) => {
    setConfigs();
});