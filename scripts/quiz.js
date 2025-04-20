const quizWord = document.getElementById('quiz-word');
const quizNextBtn = document.getElementById('quiz-next-btn');
const quizCon = document.getElementById('quiz-con');
const scoreCon = document.getElementById('score-con');
const quizQusNum = document.getElementById('quiz-qus-num');
let ScoreCount = 0;
const quizOptCheck = document.querySelectorAll('.quiz-opt-check')
function disOp() {
    quizOptCheck.forEach(opt => opt.disabled = true);
}
function enOp() {
    quizOptCheck.forEach(opt => opt.disabled = false);
}

let randomCorrectOpt = null;
let QuizCount = 1;
    quizNextBtn.addEventListener('click', async () => {
        document.getElementById('quiz-img').classList.add('hidden')
        quizCon.classList.remove('hidden')
        enOp()
        if(QuizCount >= 11) {
            quizNextBtn.disabled = true;
            quizCon.classList.add('hidden')
            scoreCon.classList.remove('hidden')
            quizNextBtn.classList.add('hidden')
        }
        quizQusNum.innerText = `${QuizCount}.`
        QuizCount++
        const quizDatas = await fetch('https://openapi.programming-hero.com/api/words/all');
        const quizWords = await quizDatas.json();
        const wordsHaveMeaning = quizWords.data.filter(word => word.meaning);
        const randomQuizQesWordIndex = Math.floor(Math.random() * wordsHaveMeaning.length);
        const randomQuizQesWord = wordsHaveMeaning[randomQuizQesWordIndex];
        quizWord.innerText = randomQuizQesWord.word;
        const WordsWrongOptipns = wordsHaveMeaning.filter((word, index) => index !== randomQuizQesWordIndex && word.meaning !== randomQuizQesWord.meaning);
        for (let i = 0; i < 4; i++) {
            const reset = document.getElementById(`quiz-op-${i}`)
            reset.innerText = "";
            reset.classList.remove('btn-wrong', 'btn-right')
            reset.classList.add('btn-main')
        }
        randomCorrectOpt = Math.floor(Math.random() * 4);
        document.getElementById(`quiz-op-${randomCorrectOpt}`).innerText = randomQuizQesWord.meaning;
        let count = 0;
        while (count < 3) {
            const randomOtherOpt = Math.floor(Math.random() * 4);
            if (document.getElementById(`quiz-op-${randomOtherOpt}`).innerText === "" && randomOtherOpt !== randomCorrectOpt) {
                const RandomWrongMeaning = WordsWrongOptipns[Math.floor(Math.random() * WordsWrongOptipns.length)];
                document.getElementById(`quiz-op-${randomOtherOpt}`).innerText = RandomWrongMeaning.meaning;
                count++;
            }
        }
    });
    
quizOptCheck.forEach(element => {
        element.addEventListener('click', () =>{
            if(element.id === `quiz-op-${randomCorrectOpt}`){
                document.getElementById(`quiz-op-${randomCorrectOpt}`).classList.remove('btn-main')
                document.getElementById(`quiz-op-${randomCorrectOpt}`).classList.add('btn-right')
                ScoreCount++;
                document.getElementById('score-num').innerText = `${ScoreCount}`
            }
            else{
                document.getElementById(element.id).classList.remove('btn-main')
                document.getElementById(element.id).classList.add('btn-wrong')
                
            }
            disOp();
        })
    });
    
