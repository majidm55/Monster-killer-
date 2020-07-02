const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function endRound() {
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

function attackMonster(mode) {
    let maxDamage;
    if (mode === 'ATTACK') {
        maxDamage = ATTACK_VALUE;
    } else if (mode === 'STRONG_ATTACK') {
        maxDamage = STRONG_ATTACK_VALUE;
    }

    const monsterDamaged = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= monsterDamaged;
    endRound();
}

function attackHandler() {
    attackMonster('ATTACK');
}


function strongAttackhandler() {
    attackMonster('STRONG_ATTACK')
}

function healPlayerHandler() {
    let healValue;
    if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
        alert("You can't heal more than your max health!")
        healValue = chosenMaxLife - currentPlayerHealth;
    } else {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    endRound();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click',strongAttackhandler);
healBtn.addEventListener('click', healPlayerHandler)