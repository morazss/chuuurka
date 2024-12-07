const gameContainer = document.getElementById('gameContainer');
const dialogueBox = document.getElementById('dialogueBox');
const leftCharacter = document.getElementById('leftCharacter');
const rightCharacter = document.getElementById('rightCharacter');
const textDisplay = document.getElementById('textDisplay');
const choiceContainer = document.getElementById('choiceContainer');
const nextButton = document.getElementById('nextButton');

// Character models and dialogues
const characters = {
    protagonist: {
        name: "Алекс",
        image: "Cryboy.png",
        color: "#00aaff"
    },
    freddy: {
        name: "Фредди",
        image: "Freddy.png",
        color: "#ff8800"
    },
    bonnie: {
        name: "Бонни",
        image: "Bonnie.png",
        color: "#aa00ff"
    },
    foxy: {
        name: "Фокси",
        image: "Foxy.png",
        color: "#ff4444"
    },
    chica: {
        name: "Чика",
        image: "Chica.png",
        color: "#ffcc00"
    }
};

let story = [
    {
        character: "protagonist",
        text: "Я не могу поверить, что снова здесь... Все эти воспоминания оживают.",
        background: "Fnafpizza.jpeg"
    },
    {
        character: "freddy",
        text: "Ты вернулся. Смелый поступок... или глупый? Но в твоих глазах я вижу огонь.",
        background: "vnutri.jpeg"
    },
    {
        character: "protagonist",
        text: "Я не могу жить, не поняв правду. Мне нужна твоя помощь.",
        background: "vnutri.jpeg"
    },
    {
        character: "freddy",
        text: "Если ты готов рискнуть сердцем и душой, я помогу тебе. Но, будь осторожен... некоторые встречи могут изменить тебя навсегда.",
        background: "vnutri.jpeg"
    },
    {
        character: "protagonist",
        text: "Кто еще здесь? Я чувствую их присутствие.",
        background: "vnutri.jpeg"
    },
    {
        character: "freddy",
        text: "Бонни, Фокси и Чика. Каждый из них ждет тебя. Но помни: никто не остается прежним после встречи с ними.",
        background: "vnutri.jpeg"
    },
    {
        character: "protagonist",
        text: "Где я могу их найти?",
        background: "vnutri.jpeg"
    },
    {
        character: "freddy",
        text: "Иди, куда ведет сердце. У каждого из них есть своя история, но выбор останется за тобой.",
        background: "vnutri.jpeg"
    },
    {
        choice: true,
        options: [
            {
                text: "Пойти к Бонни в музыкальную комнату",
                next: "bonnieStory"
            },
            {
                text: "Искать Фокси в коридоре",
                next: "foxyStory"
            },
            {
                text: "Заглянуть на кухню к Чике",
                next: "chicaStory"
            }
        ],
        background: "vnutri.jpeg"
    }
];

const bonnieStory = [
    {
        character: "bonnie",
        text: "Ты пришел ко мне? Музыка способна исцелить душу. Позволь мне сыграть для тебя.",
        background: "music.jpeg"
    },
    {
        character: "protagonist",
        text: "Я не могу объяснить, но твоя мелодия притягивает меня. Ты будто читаешь мои мысли.",
        background: "music.jpeg"
    },
    {
        character: "bonnie",
        text: "Каждая нота говорит о чувствах, которые невозможно выразить словами. Сыграем вместе?",
        background: "music.jpeg"
    },
    {
        character: "protagonist",
        text: "Да. Но мне кажется, в этой музыке есть что-то большее, чем просто звуки.",
        background: "music.jpeg"
    },
    {
        character: "bonnie",
        text: "Ты прав... Ты заставляешь мое сердце биться быстрее. Музыка объединяет нас.",
        background: "music.jpeg"
    },
    {
        text: "Вы играли вместе до самой ночи, забыв обо всем вокруг. В этот момент ты понял, что нашел того, кто по-настоящему понимает тебя.",
        background: "music.jpeg"
    }
];


const foxyStory = [
    {
        character: "foxy",
        text: "Ну, здравствуй, смельчак. Не каждый решится подойти ко мне.",
        background: "logovo.jpeg"
    },
    {
        character: "protagonist",
        text: "Ты как будто испытываешь меня. Но я не боюсь. Ты манишь меня своим взглядом.",
        background: "logovo.jpeg"
    },
    {
        character: "foxy",
        text: "Маню? Может быть... Но разве тебе не интересно, что скрывается за этой улыбкой?",
        background: "logovo.jpeg"
    },
    {
        character: "protagonist",
        text: "Ты загадка, которую я хочу разгадать.",
        background: "logovo.jpeg"
    },
    {
        character: "foxy",
        text: "Тогда рискни. Доверься мне... Если осмелишься.",
        background: "logovo.jpeg"
    },
    {
        text: "Вы провели ночь, наполненную адреналином и страстью. Фокси показал тебе мир, о котором ты даже не мечтал. Ты понял, что именно он был твоим выбором.",
        background: "logovo.jpeg"
    }
];


const chicaStory = [
    {
        character: "chica",
        text: "Ты выглядишь уставшим... Позволь мне позаботиться о тебе.",
        background: "kitchen.jpeg"
    },
    {
        character: "protagonist",
        text: "Здесь так уютно. Ты создаешь ощущение, будто я дома.",
        background: "kitchen.jpeg"
    },
    {
        character: "chica",
        text: "Это потому, что я хочу, чтобы ты чувствовал себя в безопасности. Твоя улыбка значит для меня больше, чем ты думаешь.",
        background: "kitchen.jpeg"
    },
    {
        character: "protagonist",
        text: "Ты заставляешь меня забыть о страхе. Почему ты так заботишься обо мне?",
        background: "kitchen.jpeg"
    },
    {
        character: "chica",
        text: "Может быть, потому что ты заставляешь меня чувствовать себя живой. Останься со мной.",
        background: "kitchen.jpeg"
    },
    {
        text: "Чика обняла тебя, и мир вокруг замер. Вы поняли, что нашли друг в друге уют и тепло, которых так не хватало.",
        background: "kitchen.jpeg"
    }
];


let currentDialogueIndex = 0;
let currentStory = story;
let typing = false;

// Функция для изменения фона
function changeBackground(imageUrl) {
    if (imageUrl) {
        gameContainer.style.backgroundImage = `url(${imageUrl})`;
        gameContainer.style.backgroundSize = "cover";
        gameContainer.style.backgroundPosition = "center";
        gameContainer.style.backgroundRepeat = "no-repeat";
    } else {
        console.error("Изображение фона не найдено!");
    }
}

function loadCharacterSide(characterKey, side) {
    const character = characters[characterKey];
    const element = side === 'left' ? leftCharacter : rightCharacter;
    if (character) {
        element.style.backgroundImage = `url(${character.image})`;
        element.style.backgroundSize = "contain";
        element.style.backgroundRepeat = "no-repeat";
        element.style.backgroundPosition = "center";
    } else {
        element.style.backgroundImage = "";
    }
}

function showDialogue(dialogue) {
    if (dialogue.choice) {
        choiceContainer.innerHTML = "";
        dialogueBox.style.display = "none";
        choiceContainer.style.display = "flex";
        dialogue.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option.text;
            button.onclick = () => {
                currentStory = eval(option.next);
                currentDialogueIndex = 0;
                nextDialogue();
            };
            choiceContainer.appendChild(button);
        });
        return;
    }

    choiceContainer.style.display = "none";
    dialogueBox.style.display = "block";

    const { character, text } = dialogue;

    // Изменяем фон, если указан
    if (dialogue.background) {
        changeBackground(dialogue.background);
    }

    if (character) {
        const charData = characters[character];
        textDisplay.style.color = charData.color;
        dialogueBox.style.borderColor = charData.color;
    }

    textDisplay.innerHTML = "";
    let index = 0;
    typing = true;
    function typeWriter() {
        if (index < text.length) {
            textDisplay.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeWriter, 50);
        } else {
            typing = false;
        }
    }

    typeWriter();

    if (character === "protagonist") {
        leftCharacter.style.opacity = 1;
        rightCharacter.style.opacity = 0.5;
    } else {
        rightCharacter.style.opacity = 1;
        leftCharacter.style.opacity = 0.5;
    }
}

function nextDialogue() {
    if (typing) return; // Предотвращаем переход, пока печатается текст

    if (currentDialogueIndex < currentStory.length) {
        const dialogue = currentStory[currentDialogueIndex];
        const characterSide = dialogue.character === "protagonist" ? "left" : "right";

        if (dialogue.character) {
            loadCharacterSide(dialogue.character, characterSide);
        }
        showDialogue(dialogue);

        currentDialogueIndex++;
    } else {
        alert("Конец истории! Вы можете перезапустить игру или выбрать другую ветку.");
    }
}

// Initial load
nextDialogue();

nextButton.addEventListener("click", nextDialogue);