const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';





const enteredValue = prompt('Max Life for the game', '100');

let chosenMaxLife = parseInt(enteredValue);
let battleLog = [];

if(isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
    chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function writeToLog(event, value, monsterHealth, playerHealth) {
    let logEntry = {
        event: event,
        value: value,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
    };
    if (event === LOG_EVENT_PLAYER_ATTACK) {
        logEntry.target = 'MONSTER';
        
    } else if (event === LOG_EVENT_PLAYER_STRONG_ATTACK) {
        logEntry = {
            event: event,
            value: value,
            target: 'MONSTER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
        

    } else if (event === LOG_EVENT_MONSTER_ATTACK) {
        logEntry = {
            event: event,
            value: value,
            target: 'PLAYER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
        
    } else if (event === LOG_EVENT_PLAYER_HEAL) {
        logEntry = {
            event: event,
            value: value,
            target: 'PLAYER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
        
    } else if (event === LOG_EVENT_GAME_OVER) {
        logEntry = {
            event: event,
            value: value,
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
        
    }
    battleLog.push(logEntry);
}

function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamaged = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamaged;
    console.log('end round => initial player, player, monster',initialPlayerHealth,currentPlayerHealth, currentMonsterHealth)

    writeToLog(
        LOG_EVENT_MONSTER_ATTACK, 
        playerDamaged, 
        currentMonsterHealth, 
        currentPlayerHealth
        );

    if (currentPlayerHealth <=0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);

        alert('Bonus Life, Monster Hunter!');
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You won!!!');
        writeToLog(
            LOG_EVENT_GAME_OVER, 
            'Player Won', 
            currentMonsterHealth, 
            currentPlayerHealth
            );
    } else if (currentPlayerHealth <= 0 && currentPlayerHealth > 0) {
        alert('The Mosnter won :(');
        writeToLog(
            LOG_EVENT_GAME_OVER, 
            'Monster Won', 
            currentMonsterHealth, 
            currentPlayerHealth
            );
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <=0) {
        alert('There is a draw!');
        writeToLog(
            LOG_EVENT_MONSTER_ATTACK, 
            'Tis a draw', 
            currentMonsterHealth, 
            currentPlayerHealth
            );
    }

    if (currentPlayerHealth <= 0 || currentMonsterHealth <= 0) {
        reset();
    }

}

function attackMonster(mode) {
    let maxDamage;
    let logEvent;
    if (mode === MODE_ATTACK) {
        maxDamage = ATTACK_VALUE;
        logEvent = LOG_EVENT_PLAYER_ATTACK;
    } else if (mode === MODE_STRONG_ATTACK) {
        maxDamage = STRONG_ATTACK_VALUE;
        logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;

    }

    const monsterDamaged = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= monsterDamaged;
    console.log('attack monster => player, monster',currentPlayerHealth, currentMonsterHealth)

    writeToLog(
        logEvent, 
        monsterDamaged, //value of the damage dealt to monster
        currentMonsterHealth, 
        currentPlayerHealth
        );
    
    endRound();
}

function attackHandler() {
    attackMonster(MODE_ATTACK);
    console.log('attack handler => player, monster',currentPlayerHealth, currentMonsterHealth)

}


function strongAttackhandler() {
    attackMonster(MODE_STRONG_ATTACK)
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
    writeToLog(
        LOG_EVENT_PLAYER_HEAL, 
        healValue, 
        currentMonsterHealth, 
        currentPlayerHealth
        );
    endRound();
}

function printLogHandler() {
    console.log(battleLog)
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click',strongAttackhandler);
healBtn.addEventListener('click', healPlayerHandler)
logBtn.addEventListener('click', printLogHandler);