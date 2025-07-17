let score = 0;
let currentQuestion;
let correctIndex;

const questionContainer      = document.getElementById('question-container');
const answersContainer  = document.getElementById('answers-container');
const resultsContainer  = document.getElementById('results-container');
const finalScoreEl      = document.getElementById('final-score');
const restartContainer  = document.getElementById('restart');

function clearAnswers() {
    answersContainer.innerHTML = '';
}

function showAnswers(answers) {
    clearAnswers();
    answers.forEach((text, index) => {
        const btn = document.createElement('button');
        btn.textContent = text;
        btn.dataset.index = index;
        btn.addEventListener('click', () => handleAnswer(index, btn))
            console.log('You clicked answer', index)
        answersContainer.appendChild(btn); 
})
    
    ;
    
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, showing answers...');
    showQuestion();
})



const questions = [
    { text: '7 - 4 = ?', answers: ["3","4","5"], correct: 0 },
    { text: '14 * 2 / 4 = ?', answers: ["6","7","9"], correct: 1 },
    { text: '3 * 3 + 3 = ?', answers: ["10","11","12"], correct: 2 },
]

function getQuestion() {
    const randIndex = Math.floor(Math.random() * questions.length)
    return questions[randIndex];
}

function showQuestion() {
    currentQuestion = getQuestion();
    questionContainer.textContent = currentQuestion.text;
    showAnswers(currentQuestion.answers)
}

function handleAnswer(selectedIndex, button) {
    const correctIndex = currentQuestion.correct;
    if (selectedIndex === correctIndex) {
        button.classList.add('correct');
        score++;
    } else {
        button.classList.add('wrong');
        answersContainer
            .querySelector(`button[data-index='${correctIndex}']`)
            .classList.add('correct');
    }
    Array.from(answersContainer.children).forEach(b => b.disabled = true);

    setTimeout(() => {
            showResults(selectedIndex, correctIndex);
    }, 1000);
}

function showResults(selectedIndex, correctIndex) {
    questionContainer.classList.add('hidden');
    answersContainer.classList.add('hidden');
    resultsContainer.classList.remove('hidden');
    if (selectedIndex === correctIndex) {
        finalScoreEl.textContent = `Correct!`
    } else [
        finalScoreEl.textContent = `Not quite...`
    ]
    console.log(selectedIndex);
    console.log(correctIndex);
    restartButton();
}

function restartButton() {
    restartContainer.textContent = ('Restart');
    restartContainer.addEventListener('click', () => {
        questionContainer.classList.remove('hidden');
        answersContainer.classList.remove('hidden');
        resultsContainer.classList.add('hidden');
        showQuestion();
    })
}

/* questionContainer.classlist.add('hidden');
answerContainer.classlist.add('hidden');
resultsContainer.classlist.remove('hidden'); */
