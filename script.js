let True = 0;
let False = 0;
let num = 0;

let userName = prompt('Enter your name') || 'Player';
userName = userName.trim() === '' ? 'Player' : userName;
$('#user-name').text(userName);

const easy = {
    wordEnglish: ['Apple','Dog ','Blue ','House ','Happy ','Adventure ','Delicious ','Elephant ','Mystery ','Harmony','Intricate','Serendipity ','Ubiquitous ','Esoteric ','Quixotic'],
    wordUkrainian: ['Яблуко','Собака','Синій','Будинок','Щасливий','Пригода','Смачний','Слон','Таємниця','Гармонія','Складний','Серендіпіті','Всюдисущий','Езотеричний','Квіксотичний'],
};

const medium = {
    wordEnglish: ['Acceptable', 'Brave', 'Curious', 'Delight', 'Enthusiastic', 'Flexible', 'Generous', 'Honest', 'Inspire', 'Joyful', 'Kind', 'Lively', 'Modest', 'Optimistic', 'Patient'],
    wordUkrainian: ['Прийнятний', 'Хоробрий', 'Цікавий', 'Задоволення', 'Ентузіастичний', 'Гнучкий', 'Щедрий', 'Чесний', 'Надихати', 'Радісний', 'Ласкавий', 'Жвавий', 'Скромний', 'Оптимістичний', 'Терплячий'],
};

const hard = {
    wordEnglish: ['Sophisticated', 'Resilient', 'Profound', 'Eloquent', 'Innovative', 'Meticulous', 'Surreptitious', 'Ubiquitous', 'Prolific', 'Voracious', 'Ephemeral', 'Cacophony', 'Ubiquity', 'Ineffable', 'Pernicious'],
    wordUkrainian: ['Складний', 'Стійкий', 'Глибокий', 'Елегантний', 'Інноваційний', 'Акуратний', 'Таємничий', 'Всюдисущий', 'Плідний', 'Ненажерливий', 'Ефемерний', 'Какофонія', 'Всюдиприсутність', 'Незбагненний', 'Погані'],
};

let startSize = easy.wordEnglish.length;
let rand;
let temp

function setDifficulty(difficulty) {
    reset();
    let currentDifficulty;
    let words;

    switch (difficulty) {
        case 'easy':
            currentDifficulty = easy;
            words = easy.wordEnglish;
            break;
        case 'normal':
            currentDifficulty = medium;
            words = medium.wordEnglish;
            break;
        case 'hard':
            currentDifficulty = hard;
            words = hard.wordEnglish;
            $('#number').text(`${startSize}/${num}`);
            $('#score').text(`True:${True} False:${False}`);
            break;
        default:
            alert('Invalid difficulty');
            return;
    }

    startSize = words.length;
    rand = generateRandom(words);
    $('#question').text(words[rand]);
    temp = { ...currentDifficulty };

    $('#button-addon2').off('click');
    $('#button-addon2').click(() => test(temp));
}

$('#number').text(`${startSize}/0`);
$('#button-addon2').click(() => alert('Choice difficulty '));

$('#easy').click(() => setDifficulty('easy'));
$('#normal').click(() => setDifficulty('normal'));
$('#hard').click(() => setDifficulty('hard'));


function reset() {
    True = 0
    False = 0
    num = 0

    $('#number').text(`${startSize}/${num}`)
    $('#score').text(`True:${True} False:${False}`)
}

function generateRandom(array) {
    return parseInt(Math.random() * array.length);
}

function test(questionAndAnswer) {
    const userAnswer = String($('#answer').val()).trim().toLowerCase();
    const correctAnswer = questionAndAnswer.wordUkrainian[rand].toLowerCase();

    if (userAnswer === correctAnswer) {
        True++;
        num++;

        const indexToRemove = questionAndAnswer.wordUkrainian.findIndex(item => correctAnswer === item);
        questionAndAnswer.wordUkrainian.splice(indexToRemove, 1);
        questionAndAnswer.wordEnglish.splice(indexToRemove, 1);

        if (questionAndAnswer.wordUkrainian.length > 0) {
            rand = Math.floor(Math.random() * questionAndAnswer.wordUkrainian.length);
            $('#question').text(questionAndAnswer.wordEnglish[rand]);
        }
    } else {
        alert('Wrong answer');
        False++;
    }

    $('#answer').val('');
    $('#number').text(`${startSize}/${num}`);
    $('#score').text(`True:${True} False:${False}`);

    if (questionAndAnswer.wordEnglish.length === 0) {
        $('#question').text(`Test over`);
        const levelMessage =
            False === 0 ? 'Your level of English is C2' :
            False < 6 ? 'Your level of English is B2' :
            False < 11 ? 'Your level of English is A2' :
            'Your level of English is A0';
        alert(levelMessage);
    }
}