const typingText = document.querySelector(".typing-text p"),
    inpField = document.querySelector(".wrapper .input-field"),
    timeTag = document.querySelector(".time span b"),
    mistakeTag = document.querySelector(".mistake span"),
    wpmTag = document.querySelector(".wpm span"),
    cpmTag = document.querySelector(".cpm span"),
    tryAgainBtn = document.querySelector("button");

let timer,
    maxTime = 60,
    timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0;
function randomParagraph() {
    //getting random number ans it will always less than paragraph length 
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    // console.log(paragraphs[randIndex].split(""));
    //getting random item from the paragraphs array,splitting all characters
    // of it,adding each character inside span and then adding this span inside p
    typingText.innerHTML = "";
    paragraphs[randIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    //focusing input field on keydown or click event
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    // console.log(characters[0]);
    // console.log(typedChar);
    // if user hasn't entered any charctetr or pressed backspace
    if (charIndex <characters.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            // once timer is start,it won't restart again on every key clicked

            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if (typedChar == null) {
            charIndex--;
            // if user corrects his mistake by using backspace
            // decrement mistake only if the charIndex span contains incorrect class
            if (characters[charIndex].classList.contains("incorrect")) {
                mistakes--;
            }
            characters[charIndex].classList.remove("correct", "incorrect");
        }
        else {
            if (characters[charIndex].innerText === typedChar) {
                // if user typed charcter and showncharcter matched then add the 
                // correct class else increment the mistakes and add the incorrect class
                characters[charIndex].classList.add("correct");
                // console.log("correct");
            }
            else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
                // console.log("incorrect");
            }
            charIndex++; // increment charIndex either user typed correct or incorrect charcter
        }

        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
        // if wpm value is 0,empty or infinty then setting it value to 0
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        mistakeTag.innerText = mistakes;
        wpmTag.innerText = wpm;
        cpmTag.innerText = charIndex - mistakes;//cpm will not count mistakes    
    }
    else {
        inpField.value = "";
        clearInterval(timer);
    }


}

function initTimer() {
    // if timeLeft is greater than 0 then decrement the timeleft else clear the timer
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;

    }
    else {
        clearInterval(timer);
    }
}

function resetGame(){
    // Calling loadParagraph function and
    // reseting each variable and element value to defult
    randomParagraph();
    inpField.value = "";
    clearInterval();
    timeLeft = maxTime;
    charIndex = mistakes = 0;
    timeTag.innerText = timeLeft;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
 
}

randomParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click",resetGame);