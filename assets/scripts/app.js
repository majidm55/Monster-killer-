const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);


function attackHandler() {
    const monsterDamaged = dealMonsterDamage(ATTACK_VALUE);
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

attackBtn.addEventListener('click', attackHandler);