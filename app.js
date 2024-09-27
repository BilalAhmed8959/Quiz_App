  const div = document.querySelector(".div");
    const btn = document.querySelector("button");
    let arry = [];
    let curntindex = 0;
    let score = 0;
    
    // Fetching data from the trivia API
    fetch("https://the-trivia-api.com/v2/questions")
        .then(res => res.json())
        .then(rest => {
            console.log(rest);
            arry = rest;
            display(arry[curntindex], curntindex);
        })
        .catch(err => {
            console.log("Error:", err);
        });
    
    // Function to display the question and answers
    function display(item, index) {
        div.innerHTML = `
          <div class="box">
          <h2>${item.question.text}</h2>
          <p><input type="radio" name="Ans" value="${item.incorrectAnswers[0]}">${item.incorrectAnswers[0]}</p>
          <p><input type="radio" name="Ans" value="${item.incorrectAnswers[1]}">${item.incorrectAnswers[1]}</p>
          <p><input type="radio" name="Ans" value="${item.incorrectAnswers[2]}">${item.incorrectAnswers[2]}</p>
          <p><input type="radio" name="Ans" value="${item.correctAnswer}">${item.correctAnswer}</p>
          </div>`;
    }
    
    // Button click event listener
    btn.addEventListener("click", () => {
        const answered = check(arry[curntindex]); 
        if (answered) {
            nexBtn();
        }
    });
    
    // Function to handle next button and move to the next question
    function nexBtn() {
        if (curntindex < arry.length - 1) {
            curntindex++;
            display(arry[curntindex], curntindex);
        } else {
            alert("Quiz completed! Your score is: " + score);
        }
    }
    
    // Function to check if the selected answer is correct
    function check(item) {
        const selectedAnswer = document.querySelector('input[name="Ans"]:checked');
        if (selectedAnswer) {
            const userAnswer = selectedAnswer.value;
            if (userAnswer === item.correctAnswer) {
                score++;
                console.log("Correct! Your score is now: " + score);
            } else {
                alert("Incorrect! The correct answer was: " + item.correctAnswer);
            }
            return true;
        } else {
            alert("Please select an answer!");
            return false;
        }
    }
    


