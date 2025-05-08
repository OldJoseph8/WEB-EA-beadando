// Alap Játékos osztály
class Player {
    constructor(name, health = 100) {
        this.name = name;
        this.health = health;
    }

    attack(otherPlayer) {
        const damage = 10; // Alap támadás
        otherPlayer.health -= damage;
        console.log(`${this.name} támadja ${otherPlayer.name}-t, sebzés: ${damage}. ${otherPlayer.name} életereje: ${otherPlayer.health}`);
    }

    isAlive() {
        return this.health > 0;
    }
}

// Származtatott Varázsló osztály
class Wizard extends Player {
    constructor(name, health, magicPower) {
        super(name, health); // super() hívja az alap Player osztály konstruktorát
        this.magicPower = magicPower;
    }

    castSpell(target) {
        const spellDamage = 20; // Varázsló támadása
        target.health -= spellDamage;
        console.log(`${this.name} varázslatot küld ${target.name}-ra, sebzés: ${spellDamage}. ${target.name} életereje: ${target.health}`);
    }
}

// Játékosok kezelése
document.addEventListener('DOMContentLoaded', () => {
    const playerListDiv = document.getElementById('player-list');
    const createPlayerForm = document.getElementById('createPlayerForm');
    const attackPlayerForm = document.getElementById('attackPlayerForm');

    let players = [];
    
    // Új játékos hozzáadása
    createPlayerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const playerName = document.getElementById('playerName').value;
        const newPlayer = new Player(playerName);
        players.push(newPlayer);
        renderPlayers();
        createPlayerForm.reset();
    });

    // Játékosok listájának frissítése
    function renderPlayers() {
        playerListDiv.innerHTML = '';
        players.forEach(player => {
            const playerDiv = document.createElement('div');
            playerDiv.textContent = `Név: ${player.name}, Életerő: ${player.health}`;
            playerListDiv.appendChild(playerDiv);
        });
    }

    // Támadás
    attackPlayerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const attackerName = document.getElementById('attackPlayerName').value;
        const attacker = players.find(player => player.name === attackerName);

        if (attacker) {
            // Válasszuk ki az első életben lévő játékost
            const target = players.find(player => player !== attacker && player.isAlive());
            if (target) {
                attacker.attack(target);
                renderPlayers();
            } else {
                alert("Nincs életben lévő célpont.");
            }
        } else {
            alert("Játékos nem található!");
        }
    });
});
// Szülő osztály: Állat
class Animal {
    constructor(name, species) {
        this.name = name;
        this.species = species;
    }

    speak() {
        console.log(`${this.name} says hello!`);
    }

    // DOM elem létrehozása
    createAnimalElement() {
        const div = document.createElement('div');
        div.className = 'animal';
        div.innerHTML = `<h3>${this.name} (${this.species})</h3>`;
        document.getElementById('animalContainer').appendChild(div);
    }
}

// Láncolt osztály: Kutya
class Dog extends Animal {
    constructor(name, breed) {
        super(name, 'Dog');  // Szülő osztály konstruktor hívása
        this.breed = breed;
    }

    // Kutya beszéd
    speak() {
        console.log(`${this.name} barks!`);
    }

    // Egyedi DOM elem kutyához
    createDogElement() {
        const div = document.createElement('div');
        div.className = 'dog';
        div.innerHTML = `<h3>${this.name} (Breed: ${this.breed})</h3>`;
        document.getElementById('animalContainer').appendChild(div);
    }
}

// Új állat létrehozása
function createAnimal() {
    const dog = new Dog('Buddy', 'Golden Retriever');
    dog.speak();
    dog.createDogElement();  // Kutyát hozzáadunk a DOM-hoz
}
