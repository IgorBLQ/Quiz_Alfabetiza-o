const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answersButtonsElement = document.getElementById('answer-buttons')
const scoreDisplay = document.getElementById('score-display')

let shuffledQuestions, currentQuestionIndex, score

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () =>{
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    console.log('started')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - 0.5)
    currentQuestionIndex = 0
    score = 0
    updateScore()
    scoreDisplay.classList.remove('hide')
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function updateScore() {
    scoreDisplay.innerText = score
    
    scoreDisplay.classList.add("updated")
    setTimeout(() => {
        scoreDisplay.classList.remove("updated")
    }, 300)
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerHTML = ""

    if (question.audio) {
        const audioBtn = document.createElement("button")
        audioBtn.innerText = "🔊"
        audioBtn.classList.add("btn", "audio-btn")
        audioBtn.addEventListener("click", () => {
            const audio = new Audio(question.audio)
            audio.play()
        })
        questionElement.appendChild(audioBtn)
    }

    if (question.image) {
        const img = document.createElement("img")
        img.src = question.image
        img.alt = question.question || "Questão"
        img.classList.add("question-img")
        questionElement.appendChild(img)
    }

    if (question.question) {
        const text = document.createElement("div")
        text.innerText = question.question
        questionElement.appendChild(text)
    }

    const shuffledAnswers = question.answers.sort(() => Math.random() - 0.5)
    shuffledAnswers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answersButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answersButtonsElement.firstChild) {
        answersButtonsElement.removeChild
        (answersButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct

    Array.from(answersButtonsElement.children).forEach(button => {
        button.disabled = true
    })

    if (correct) {
        score++
        updateScore()
    }

    setStatusClass(document.body, correct)
    Array.from(answersButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
    } else {
        endGame()
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function endGame() {
    questionContainerElement.classList.add('hide')
    startButton.innerText = 'Iniciar novamente'
    startButton.classList.remove('hide')

    const finalScore = document.createElement("div")
    finalScore.id = "final-score"
    finalScore.innerText = `Fim de jogo! Você acertou ${score} de ${shuffledQuestions.length}! 🎉`

    const oldFinalScore = document.getElementById("final-score")
    if (oldFinalScore) oldFinalScore.remove()
    document.querySelector(".container").appendChild(finalScore)
}


// ALTERNATIVAS DO QUIZ

const questions = [
// 🔡 Troca de letras parecidas (p/b, g/q)
    {
        question: "COMO ESCREVE?",
        audio: "audio/pato.opus",
        image: "assets/pato.jpeg",
        answers: [
            {text: 'Pato', correct: true},
            {text: 'Bato', correct: false},   // PATO
            {text: 'Patu', correct: false},
            {text: 'Gato', correct: false}
        ]
    },
    {
        question: "COMO ESCREVE?",
        audio: "audio/bola.opus",
        image: "assets/bola.jpeg",
        answers: [
            {text: 'Bola', correct: true},
            {text: 'Pola', correct: false},     // BOLA
            {text: 'Bóra', correct: false},
            {text: 'Cola', correct: false}
        ]
    },
    {
        question: "COMO ESCREVE?",
        audio: "audio/gato.opus",
        image: "assets/gato.jpeg",
        answers: [
            {text: 'Gato', correct: true},
            {text: 'Qato', correct: false},         // GATO
            {text: 'Bato', correct: false},
            {text: 'Gatu', correct: false}
        ]
    },
    {
        question: "COMO ESCREVE?",
        audio: "audio/queijo.opus",
        image: "assets/queijo.jpeg",
        answers: [
            {text: 'Queijo', correct: true},
            {text: 'Gueijo', correct: false},     // QUEIJO
            {text: 'Quijo', correct: false},
            {text: 'Beijo', correct: false}
        ]
    },


// 🔊 Confusão de sons (s/z, rr/r, e/i, o/ô)
    {
        question: "COMO ESCREVE?",
        audio: "audio/casa.opus",
        image: "assets/casa.jpeg",
        answers: [
            {text: 'Casa', correct: true},
            {text: 'Caza', correct: false},   // CASA
            {text: 'Cassa', correct: false},
            {text: 'Gassa', correct: false}
        ]
    },
    {
        question: "COMO ESCREVE?",
        audio: "audio/sapo.opus",
        image: "assets/sapo.jpeg",
        answers: [
            {text: 'Sapo', correct: true},
            {text: 'Zapo', correct: false},     // SAPO
            {text: 'Sappo', correct: false},
            {text: 'Sabu', correct: false}
        ]
    },
    {
        question: "COMO ESCREVE?",
        audio: "audio/rato.opus",
        image: "assets/rato.jpeg",
        answers: [
            {text: 'Rato', correct: true},
            {text: 'Rrato', correct: false},         // RATO
            {text: 'Lato', correct: false},
            {text: 'Ratu', correct: false}
        ]
    },
    {
        question: "COMO ESCREVE?",
        audio: "audio/pente.opus",
        image: "assets/pente.jpeg",
        answers: [
            {text: 'Pente', correct: true},
            {text: 'Pinti', correct: false},     // PENTE
            {text: 'Pentchi', correct: false},
            {text: 'Penti', correct: false}
        ]
    },
    {
        question: "COMO ESCREVE?",
        audio: "audio/bola.opus",
        image: "assets/bola.jpeg",
        answers: [
            {text: 'Bola', correct: true},
            {text: 'Bôla', correct: false},     // BOLA 
            {text: 'Pola', correct: false},
            {text: 'Bóla', correct: false}
        ]
    }, 
// 📖 Tonicidade / Palavras parecidas
{
    question: "COMO ESCREVE?",
    audio: "audio/janela.opus",
    image: "assets/janela.jpeg",
    answers: [
        {text: 'Janela', correct: true},        // JANELA
        {text: 'Janelá', correct: false},
        {text: 'Janéla', correct: false},
        {text: 'Janella', correct: false}
    ]
},
{
    question: "COMO ESCREVE?",
    audio: "audio/banana.opus",
    image: "assets/banana.jpeg",
    answers: [
        {text: 'Banana', correct: true},
        {text: 'Banána', correct: false},       // BANANA
        {text: 'Bánana', correct: false},
        {text: 'Banna', correct: false}
    ]
},

// ✂️ Separação de palavras
{
    question: "COMO ESCREVE?",
    audio: "audio/uma_casa.opus",
    image: "assets/casa.jpeg",
    answers: [
        {text: 'Umacasa', correct: false},
        {text: 'Uma casa', correct: true},          // UMA CASA
        {text: 'U macasa', correct: false},
        {text: 'Uma-casa', correct: false}
    ]
},
{
    question: "COMO ESCREVE?",
    audio: "audio/o_menino.opus",
    image: "assets/menino.jpeg",
    answers: [
        {text: 'O menino', correct: true},
        {text: 'Omenino', correct: false},
        {text: 'O me nino', correct: false},        // O MENINO
        {text: 'O-meninu', correct: false}
    ]
}       
]