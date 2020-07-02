const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);


function attackMonster(mode) {
    let maxDamage;
    if (mode === 'ATTACK') {
        maxDamage = ATTACK_VALUE;
    } else if (mode === 'STRONG_ATTACK') {
        maxDamage = STRONG_ATTACK_VALUE;
    }

    const monsterDamaged = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= monsterDamaged;
    const playerDamaged = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamaged;

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You won!!!')
    } else if (currentPlayerHealth <= 0 && currentPlayerHealth > 0) {
        alert('The Mosnter won :(')
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <=0) {
        alert('There is a draw!')
    }
}

function attackHandler() {
    attackMonster('ATTACK');
}


function strongAttackhandler() {
    attackMonster('STRONG_ATTACK')
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click',strongAttackhandler);