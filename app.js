let questionCount = 1, questionCountLocalStorage = 1, correctAnswer, userAnswer, correctAnswerCount = 0, wrongAnswerCount = 0, clickChoiceControl = 0, jokerCount = 2

document.addEventListener("DOMContentLoaded",function(){
    localStorage.setItem("questionCount", questionCount)
    localStorage.setItem("jokerCount", jokerCount)
    setCorrectAnswerCount()
    setWrongAnswerCount()
    generateQuestion()
})

document.querySelector(".choice-1").addEventListener("mouseover", function(){
    document.querySelector(".choice-1").style.backgroundColor = "#212529"
    document.querySelector(".choice-1").style.color = "white"
})

document.querySelector(".choice-1").addEventListener("mouseout", function(){
    if(clickChoiceControl != 1) {
        document.querySelector(".choice-1").style.backgroundColor = "#ced4da"
        document.querySelector(".choice-1").style.color = "#212529"
    }
})

document.querySelector(".choice-2").addEventListener("mouseover", function(){
    document.querySelector(".choice-2").style.backgroundColor = "#212529"
    document.querySelector(".choice-2").style.color = "white"
})

document.querySelector(".choice-2").addEventListener("mouseout", function(){
    if(clickChoiceControl != 2) {
        document.querySelector(".choice-2").style.backgroundColor = "#ced4da"
        document.querySelector(".choice-2").style.color = "#212529"
    }
})

document.querySelector(".choice-3").addEventListener("mouseover", function(){
    document.querySelector(".choice-3").style.backgroundColor = "#212529"
    document.querySelector(".choice-3").style.color = "white"
})

document.querySelector(".choice-3").addEventListener("mouseout", function(){
    if(clickChoiceControl != 3) {
        document.querySelector(".choice-3").style.backgroundColor = "#ced4da"
        document.querySelector(".choice-3").style.color = "#212529"
    }
})

document.querySelector(".choice-4").addEventListener("mouseover", function(){
    document.querySelector(".choice-4").style.backgroundColor = "#212529"
    document.querySelector(".choice-4").style.color = "white"
})

document.querySelector(".choice-4").addEventListener("mouseout", function(){
    if(clickChoiceControl != 4) {
        document.querySelector(".choice-4").style.backgroundColor = "#ced4da"
        document.querySelector(".choice-4").style.color = "#212529"
    }
})

document.querySelector(".choice-1").addEventListener("click", function(){
    clearSelectedChoiceCss()
    document.querySelector(".choice-1").style.backgroundColor = "#212529"
    document.querySelector(".choice-1").style.color = "white"
    document.querySelector(".choice-1").setAttribute("checked","")
    document.querySelector(".choice-2").removeAttribute("checked")
    document.querySelector(".choice-3").removeAttribute("checked")
    document.querySelector(".choice-4").removeAttribute("checked")
    document.querySelector(".selectionWarningMessage").innerHTML = ""
    clickChoiceControl = 1
})

document.querySelector(".choice-2").addEventListener("click", function(){
    clearSelectedChoiceCss()
    document.querySelector(".choice-2").style.backgroundColor = "#212529"
    document.querySelector(".choice-2").style.color = "white"
    document.querySelector(".choice-2").setAttribute("checked","")
    document.querySelector(".choice-1").removeAttribute("checked")
    document.querySelector(".choice-3").removeAttribute("checked")
    document.querySelector(".choice-4").removeAttribute("checked")
    document.querySelector(".selectionWarningMessage").innerHTML = ""
    clickChoiceControl = 2
})

document.querySelector(".choice-3").addEventListener("click", function(){
    clearSelectedChoiceCss()
    document.querySelector(".choice-3").style.backgroundColor = "#212529"
    document.querySelector(".choice-3").style.color = "white"
    document.querySelector(".choice-3").setAttribute("checked","")
    document.querySelector(".choice-1").removeAttribute("checked")
    document.querySelector(".choice-2").removeAttribute("checked")
    document.querySelector(".choice-4").removeAttribute("checked")
    document.querySelector(".selectionWarningMessage").innerHTML = ""
    clickChoiceControl = 3
})

document.querySelector(".choice-4").addEventListener("click", function(){
    clearSelectedChoiceCss()
    document.querySelector(".choice-4").style.backgroundColor = "#212529"
    document.querySelector(".choice-4").style.color = "white"
    document.querySelector(".choice-4").setAttribute("checked","")
    document.querySelector(".choice-1").removeAttribute("checked")
    document.querySelector(".choice-2").removeAttribute("checked")
    document.querySelector(".choice-3").removeAttribute("checked")
    document.querySelector(".selectionWarningMessage").innerHTML = ""
    clickChoiceControl = 4
})

document.querySelector(".nextQuestionBtn").addEventListener("click", function(){
    if (userAnswerControl() == true) {
        if (questionCount < 10) {
            localStorage.setItem("questionCount", questionCount += 1)
            setQuestionCount()
            generateQuestion()
            clearChoice()
            clearSelectedChoiceCss()
        } else {
            console.log("Quiz Finished..!");
            document.querySelector(".nextQuestionBtn").innerHTML = "Finished"
            document.querySelector(".nextQuestionBtn").setAttribute("disabled", "")
            document.querySelector(".jokerBtn").setAttribute("disabled", "")
            document.querySelector(".choicesDiv").className += " d-none"

            let questionCountDivClassItem = document.querySelectorAll(".questionCountDiv")
            questionCountDivClassItem.forEach((element) => {
                element.classList.add("d-none")
            })

            let questionDivClassItem = document.querySelectorAll(".questionDivRow")
            questionDivClassItem.forEach((element) => {
                element.classList.add("d-none")
            })

            let resultClassItem = document.querySelectorAll(".resultDiv")
            resultClassItem.forEach((element) => {
                element.classList.remove("d-none")
            })

            document.querySelector(".resultCorrect").innerHTML = `
            Correct<br>${correctAnswerCount}`
            document.querySelector(".resultWrong").innerHTML = `
            Wrong<br>${wrongAnswerCount}`
            document.querySelector(".resultJoker").innerHTML = `
            Joker<br>${2 - jokerCount}`

            document.querySelector(".selectionWarningMessage").innerHTML = `
            <div class="col-sm-8 col-md-7 col-lg-6 col-xl-5 text-center fs-5 fw-semibold text-bg-warning py-2">
                You have finished the quiz.
            </div>
        `
        }
    }
    else {
        document.querySelector(".selectionWarningMessage").innerHTML = `
            <div class="col-sm-8 col-md-7 col-lg-6 col-xl-5 text-center text-bg-danger py-2">
                Please select an option!
            </div>
        `
    }
})

document.querySelector(".startAgainBtn").addEventListener("click", function(){
    location.reload()
})

document.querySelector(".jokerBtn").addEventListener("click", function(){
    if(jokerCount > 0) {
        if(correctAnswer == "A") {
            document.querySelector(".choice-1").style.backgroundColor = "#157347"
            document.querySelector(".choice-1").style.color = "white"
        }
        else if(correctAnswer == "B") {
            document.querySelector(".choice-2").style.backgroundColor = "#157347"
            document.querySelector(".choice-2").style.color = "white"
        }
        else if(correctAnswer == "C") {
            document.querySelector(".choice-3").style.backgroundColor = "#157347"
            document.querySelector(".choice-3").style.color = "white"
        }
        else if(correctAnswer == "D") {
            document.querySelector(".choice-4").style.backgroundColor = "#157347"
            document.querySelector(".choice-4").style.color = "white"
        }

        jokerCount--
        localStorage.setItem("jokerCount", jokerCount)
        jokerCountLocalStorage = localStorage.getItem("jokerCount")
        document.querySelector(".jokerBtn").innerHTML = `Joker <${jokerCountLocalStorage}>`
    }
    if(jokerCount == 0) {
        document.querySelector(".jokerBtn").setAttribute("disabled", "")
    }
})

function generateQuestion(){
    if (questionCount == 10) {
        document.querySelector(".nextQuestionBtn").innerHTML = "Finish The Quiz"
    }

    setQuestionCount()
    fetch("questions.json")
    .then(response => response.json())
    .then(value => {
        let rndQsCount = Math.floor(Math.random() * value.length);
        
        document.querySelector(".questionDiv").innerHTML = value[rndQsCount].question
        document.querySelector(".choice-1").innerHTML = `A) ${value[rndQsCount].A}`
        document.querySelector(".choice-2").innerHTML = `B) ${value[rndQsCount].B}`
        document.querySelector(".choice-3").innerHTML = `C) ${value[rndQsCount].C}`
        document.querySelector(".choice-4").innerHTML = `D) ${value[rndQsCount].D}`
        correctAnswer = value[rndQsCount].answer
        console.log("Correct Answer : " + correctAnswer);
    })
}

function clearChoice(){
    document.querySelector(".choice-1").removeAttribute("checked")
    document.querySelector(".choice-2").removeAttribute("checked")
    document.querySelector(".choice-3").removeAttribute("checked")
    document.querySelector(".choice-4").removeAttribute("checked")
}

function clearSelectedChoiceCss(){
    document.querySelector(".choice-1").style.backgroundColor = "#ced4da"
    document.querySelector(".choice-1").style.color = "#212529"
    document.querySelector(".choice-2").style.backgroundColor = "#ced4da"
    document.querySelector(".choice-2").style.color = "#212529"
    document.querySelector(".choice-3").style.backgroundColor = "#ced4da"
    document.querySelector(".choice-3").style.color = "#212529"
    document.querySelector(".choice-4").style.backgroundColor = "#ced4da"
    document.querySelector(".choice-4").style.color = "#212529"

    clickChoiceControl = 0
}

function setQuestionCount() {
    questionCountLocalStorage = localStorage.getItem("questionCount")
    document.querySelector(".questionCountDiv").innerHTML = `Question ${questionCountLocalStorage} / 10`
}

function setCorrectAnswerCount() {
    localStorage.setItem("correctAnswerCount", correctAnswerCount)
}

function setWrongAnswerCount() {
    localStorage.setItem("wrongAnswerCount", wrongAnswerCount)
}

function userAnswerControl() {
    if (document.querySelector(".choice-1").hasAttribute("checked")) {
        userAnswer = "A"
        if (userAnswer == correctAnswer) {
            correctAnswerCount += 1
            setCorrectAnswerCount()
        }
        else {
            wrongAnswerCount += 1
            setWrongAnswerCount()
        }
        console.log("User Answer : " + userAnswer);
        return true
    }
    else if (document.querySelector(".choice-2").hasAttribute("checked")) {
        userAnswer = "B"
        if (userAnswer == correctAnswer) {
            correctAnswerCount += 1
            setCorrectAnswerCount()
        }
        else {
            wrongAnswerCount += 1
            setWrongAnswerCount()
        }
        console.log("User Answer : " + userAnswer);
        return true
    }
    else if (document.querySelector(".choice-3").hasAttribute("checked")) {
        userAnswer = "C"
        if (userAnswer == correctAnswer) {
            correctAnswerCount += 1
            setCorrectAnswerCount()
        }
        else {
            wrongAnswerCount += 1
            setWrongAnswerCount()
        }
        console.log("User Answer : " + userAnswer);
        return true
    }
    else if (document.querySelector(".choice-4").hasAttribute("checked")) {
        userAnswer = "D"
        if (userAnswer == correctAnswer) {
            correctAnswerCount += 1
            setCorrectAnswerCount()
        }
        else {
            wrongAnswerCount += 1
            setWrongAnswerCount()
        }
        console.log("User Answer : " + userAnswer);
        return true
    }
    else {
        return false
    }
}