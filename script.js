const lion = document.getElementById("lion");
const stone = document.getElementById("stone");

// Initialize score and high score
let score = 0;
let highScore = parseInt(localStorage.getItem("highScore")) || 0;



// Display initial score and high score on the screen
document.getElementById("score").innerHTML = `Score: ${score} | High Score: ${highScore}`;

// Function to handle the jump action
function jump() {
    if (!lion.classList.contains("jump")) {
        lion.classList.add("jump");

        // Remove the jump class after 300ms to reset position
        setTimeout(function () {
            lion.classList.remove("jump");
        }, 300);
    }
}

// Check for collisions and update the score
let isAlive = setInterval(function () {
    // Get the current positions of lion and stone
    let lionTop = parseInt(window.getComputedStyle(lion).getPropertyValue("top"));
    let stoneLeft = parseInt(window.getComputedStyle(stone).getPropertyValue("left"));

    // Collision detection logic
    if (stoneLeft < 50 && stoneLeft > 0 && lionTop >= 140) {
        // Game Over: Stop intervals and reload the game
        clearInterval(isAlive);
        clearInterval(scoreCounter);
        alert(`Game Over! Your Score: ${score}`);

        // Update high score if necessary
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
        }

        // Reload the page to restart the game
        location.reload();
    }
}, 10);

// Score counter to update the score dynamically
let scoreCounter = setInterval(function () {
    score++; // Increment the score

    // Update score display
    document.getElementById("score").textContent = `Score: ${score} | High Score: ${highScore}`;

    // Check and update the high score
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
    }
}, 100); // Updates every 100ms

// Listen for the keydown event to trigger the jump
document.addEventListener("keydown", function () {
    jump();
});
