const paragraphs = [
    "Augmented Reality (AR) and Virtual Reality (VR) are immersive technologies that transform the way we perceive and interact with the digital and physical worlds. Augmented Reality enhances the real-world environment by overlaying digital information or content onto it. This is typically achieved through the use of devices like smartphones, tablets, or AR glasses. AR applications range from gaming and navigation to education and industrial training, providing users with an enriched experience that combines the virtual and real.",
    "On the other hand, Virtual Reality creates a fully immersive, computer-generated environment that completely replaces the real world. VR is typically experienced through specialized headsets that cover the user's field of vision, shutting out the external environment. This technology transports users to entirely different realms, allowing for deeply immersive experiences in various fields such as gaming, simulation, education, and healthcare. VR is particularly effective in creating environments that simulate real-world scenarios for training and therapeutic purposes.",
    "One key distinction between AR and VR lies in their level of immersion. AR supplements the real world, allowing users to interact with both the physical and virtual elements simultaneously. In contrast, VR completely replaces the real world with a computer-generated one, providing a more immersive and isolated experience. Both technologies, however, share common goals of enhancing user experiences and creating new possibilities for entertainment, education, and productivity.",
    "The applications of AR and VR continue to expand rapidly. In the business sector, AR is utilized for tasks like remote assistance, maintenance, and design visualization. VR, on the other hand, finds applications in architectural design, medical training simulations, and virtual tourism. As these technologies evolve, the boundary between the virtual and real worlds is becoming increasingly blurred, opening up exciting possibilities for innovation and exploration in numerous industries.",
    "In conclusion, Augmented Reality and Virtual Reality are transformative technologies that redefine how we engage with digital content and information. While AR enhances the real world by adding virtual elements, VR immerses users in entirely computer-generated environments. Both technologies have diverse applications across industries, from entertainment and education to healthcare and business, offering new and exciting ways to interact with the digital and physical realms. As technology continues to advance, the potential for AR and VR to shape the future of human experience is limitless."
];

const pg = document.getElementById("pg");
const userinput = document.querySelector(".textinput");
const resetBtn = document.querySelector(".containerin button");
const totalTime = document.querySelector(".time .txt2");
const totalWpm = document.querySelector(".wpm .txt2");
const totalMistake = document.querySelector(".mistake .txt2");
const totalCpm = document.querySelector(".cpm .txt2");

let timer;
let maxTime = 120;
let timeRemaining = maxTime;
let charIndex = 0;
let mistakes = 0;
let wpm = 0;
let isTyping = false;

const setParagraph = () => {
    const randIndex = Math.floor(Math.random() * paragraphs.length);
    pg.innerHTML = paragraphs[randIndex]
        .split("")
        .map(char => `<span>${char}</span>`)
        .join("");

    pg.querySelectorAll("span")[0].classList.add("active");

    document.addEventListener("keydown", () => {
        userinput.focus();
    });
    pg.addEventListener("click", () => {
        userinput.focus();
    });

    totalTime.innerText = timeRemaining;
    totalWpm.innerText = 0;
    totalMistake.innerText = 0;
    totalCpm.innerText = 0;
};

const startTyping = () => {
    let characters = pg.querySelectorAll("span");
    let typedChar = userinput.value.charAt(charIndex);

    if (charIndex < characters.length - 1 && timeRemaining > 0) {
        if (!isTyping) {
            timer = setInterval(startTimer, 1000);
            isTyping = true;
        }
        if (typedChar === "") {
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("incorrect", "correct");
            }
        } else {
            if (characters[charIndex].innerText === typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                characters[charIndex].classList.add("incorrect");
                mistakes++;
            }
            charIndex++;
        }

        characters.forEach(char => {
            char.classList.remove("active");
        });

        characters[charIndex].classList.add("active");

        let cpm = Math.round(((charIndex - mistakes) / (maxTime - timeRemaining)) * 60);
        cpm = cpm < 0 || !cpm || cpm === Infinity ? 0 : cpm;
        totalCpm.innerText = cpm;
        totalMistake.innerText = mistakes;
        totalWpm.innerText = Math.round(cpm / 5);
    } else {
        clearInterval(timer);
        isTyping = false;
    }
};

const startTimer = () => {
    if (timeRemaining > 0) {
        timeRemaining--;
        totalTime.innerText = timeRemaining;
    } else {
        clearInterval(timer);
        isTyping = false;
    }
};

const resetGame = () => {
    setParagraph();
    clearInterval(timer);
    timeRemaining = maxTime;
    charIndex = 0;
    mistakes = 0;
    wpm = 0;
    isTyping = false;
    userinput.value = "";
    totalTime.innerText = timeRemaining;
    totalWpm.innerText = 0;
    totalMistake.innerText = 0;
    totalCpm.innerText = 0;
};

setParagraph();
resetBtn.addEventListener("click", resetGame);
userinput.addEventListener("input", startTyping);
