const ACTION_PLAYER_ATTACK = "PLAYER_ATTACK";
const ACTION_MONSTER_ATTACK = "MONSTER_ATTACK";
const ACTION_PLAYER_HEAL = "PLAYER_HEAL";

const NORMAL_ATTACK_POWER = 10;
const SPECIAL_ATTACK_MULTIPLIER = 3;
const SPECIAL_ATTACK_CHANCE_PERCENT = 20;

const MAX_HP = 100;
const MIN_HP = 0;

const HEALTH_BAR_COLOR = "green";
const HEALTH_BAR_TEXT_COLOR = "white";
const PERCENTAGE = "%";
const REPLACE_SIGN = "%s";

const PLAYER_ATTACK_MESSAGE = "PLAYER HITS MONSTER WITH %s DAMAGE";
const MONSTER_ATTACK_MESSAGE = "MONSTER HITS PLAYER WITH %s DAMAGE";
const PLAYER_HEAL_MESSAGE = "PLAYER HEALS %s HP";

new Vue({
    el: '#app',
    data: {
        playerHp: MIN_HP,
        monsterHp: MIN_HP,
        actionHistory: [],
        isOutOfGame: true
    }, 
    computed: {
        playerHealthBar: function() {
            if (this.playerHp <= MIN_HP) {
                this.playerHp = MIN_HP;
                this.isOutOfGame = true;
            }
            if (this.playerHp > MAX_HP) {
                this.playerHp = MAX_HP;
            }
            return {
                backgroundColor: HEALTH_BAR_COLOR,
                color: HEALTH_BAR_TEXT_COLOR,
                width: this.playerHp + PERCENTAGE
            }
        },
        monsterHealthBar: function() {
            if (this.monsterHp <= MIN_HP) {
                this.monsterHp = MIN_HP;
                this.isOutOfGame = true;
            }
            return {
                backgroundColor: HEALTH_BAR_COLOR,
                color: HEALTH_BAR_TEXT_COLOR,
                width: this.monsterHp + PERCENTAGE
            }
        },
    },
    methods: {
        startNewGame: function() {
            this.playerHp = MAX_HP;
            this.monsterHp = MAX_HP;
            this.actionHistory = [];
            this.isOutOfGame = false;
        },
        attack: function() {
            var playerAttackPower = calculateStandardAttackPower();
            var monsterAttackPower = calculateStandardAttackPower();
            this.actionHistory.push({action: ACTION_PLAYER_ATTACK, message: PLAYER_ATTACK_MESSAGE.replace(REPLACE_SIGN, playerAttackPower)});
            this.actionHistory.push({action: ACTION_MONSTER_ATTACK, message: MONSTER_ATTACK_MESSAGE.replace(REPLACE_SIGN, monsterAttackPower)});
            this.monsterHp -=  playerAttackPower;
            this.playerHp -= monsterAttackPower;
        },
        specialAttack: function() {
            var playerAttackPower = calculateSpecialAttackPower();
            var monsterAttackPower = calculateSpecialAttackPower();
            this.actionHistory.push({action: ACTION_PLAYER_ATTACK, message: PLAYER_ATTACK_MESSAGE.replace(REPLACE_SIGN, playerAttackPower)});
            this.actionHistory.push({action: ACTION_MONSTER_ATTACK, message: MONSTER_ATTACK_MESSAGE.replace(REPLACE_SIGN, monsterAttackPower)});
            this.monsterHp -=  playerAttackPower;
            this.playerHp -= monsterAttackPower;
        },
        heal: function() {
            var playerHealPower = calculateHealPower();
            var monsterAttackPower = calculateStandardAttackPower();
            this.actionHistory.push({action: ACTION_PLAYER_HEAL, message: PLAYER_HEAL_MESSAGE.replace(REPLACE_SIGN, playerHealPower)});
            this.actionHistory.push({action: ACTION_MONSTER_ATTACK, message: MONSTER_ATTACK_MESSAGE.replace(REPLACE_SIGN, monsterAttackPower)});
            this.playerHp -=  monsterAttackPower;
            this.playerHp += playerHealPower;
        },
        giveUp: function() {
            this.isOutOfGame = true;
        }
    }
})

function calculateStandardAttackPower() {
    return Math.floor((Math.random() * NORMAL_ATTACK_POWER) + 1);
}

function calculateSpecialAttackPower() {
    var normalAttack = calculateStandardAttackPower();
    var specialAttackResult = Math.random() * 100;
    var isSpecialAttack = SPECIAL_ATTACK_CHANCE_PERCENT > specialAttackResult;
    return isSpecialAttack ? normalAttack * SPECIAL_ATTACK_MULTIPLIER : normalAttack;
}

function calculateHealPower() {
    return calculateStandardAttackPower();
}