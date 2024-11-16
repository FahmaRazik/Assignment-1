// Game elements
const lion = document.getElementById("lion");
const stone = document.getElementById("stone");

// Initialize score and high score
let score = 0;
let highScore = parseInt(localStorage.getItem("highScore")) || 0;

// Game Over Popup Elements
const gameOverPopup = document.getElementById("game-over-popup");
const finalScore = document.getElementById("final-score");
const finalHighScore = document.getElementById("final-high-score");
const restartBtn = document.getElementById("restart-btn");
const popupLogoutBtn = document.getElementById("popup-logout-btn");

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

// Function to reset the game state
function resetGame() {
    score = 0;
    document.getElementById("score").textContent = `Score: ${score} | High Score: ${highScore}`;
    gameOverPopup.style.display = "none";

    // Reset stone position and restart intervals
    stone.style.left = "580px";
    startGameIntervals();
}

// Function to handle game over logic
function gameOver() {
    // Stop intervals
    clearGameIntervals();

    // Update the high score if necessary
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
    }

    // Show the game over popup
    finalScore.textContent = score;
    finalHighScore.textContent = highScore;
    gameOverPopup.style.display = "block";
}

// Intervals for game mechanics
let isAlive, scoreCounter;

// Function to start game intervals
function startGameIntervals() {
    isAlive = setInterval(function () {
        // Get the current positions of lion and stone
        let lionTop = parseInt(window.getComputedStyle(lion).getPropertyValue("top"));
        let stoneLeft = parseInt(window.getComputedStyle(stone).getPropertyValue("left"));

        // Collision detection logic
        if (stoneLeft < 50 && stoneLeft > 0 && lionTop >= 140) {
            gameOver();
        }
    }, 10);

    scoreCounter = setInterval(function () {
        score++; // Increment the score
        document.getElementById("score").textContent = `Score: ${score} | High Score: ${highScore}`;
    }, 100); // Updates every 100ms
}

// Function to clear game intervals
function clearGameIntervals() {
    clearInterval(isAlive);
    clearInterval(scoreCounter);
}

// Restart button functionality
restartBtn.addEventListener("click", resetGame);

// Logout button functionality in the popup
popupLogoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser"); // Clear user session
    window.location.reload(); // Reload the page to show the login page
});

// Page elements for login and signup
const loginPage = document.getElementById("login-page");
const signupPage = document.getElementById("signup-page");
const gamePage = document.getElementById("game-page");

const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const goToSignup = document.getElementById("go-to-signup");
const goToLogin = document.getElementById("go-to-login");
const logoutBtn = document.getElementById("logout-btn");

// Toggle between login and signup pages
goToSignup.addEventListener("click", () => {
    loginPage.style.display = "none";
    signupPage.style.display = "block";
});

goToLogin.addEventListener("click", () => {
    signupPage.style.display = "none";
    loginPage.style.display = "block";
});

// Signup logic
signupBtn.addEventListener("click", () => {
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;

    if (username && password) {
        const users = JSON.parse(localStorage.getItem("users")) || {};
        if (users[username]) {
            alert("Username already exists! Please choose another.");
        } else {
            users[username] = password;
            localStorage.setItem("users", JSON.stringify(users));
            alert("Signup successful! Please log in.");
            signupPage.style.display = "none";
            loginPage.style.display = "block";
        }
    } else {
        alert("Please fill in all fields.");
    }
});

// Login logic
loginBtn.addEventListener("click", () => {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[username] && users[username] === password) {
        alert(`Welcome, ${username}!`);
        localStorage.setItem("currentUser", username);
        loginPage.style.display = "none";
        gamePage.style.display = "block";

        // Start the game
        resetGame();
    } else {
        alert("Invalid username or password.");
    }
});

// Logout button in the game page
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser"); // Clear user session
    window.location.reload(); // Redirect to the login page
});

// Check if user is already logged in
const currentUser = localStorage.getItem("currentUser");
if (currentUser) {
    loginPage.style.display = "none";
    gamePage.style.display = "block";
    alert(`Welcome back, ${currentUser}!`);

    // Start the game
    resetGame();
}

// Listen for the keydown event to trigger the jump
document.addEventListener("keydown", jump);
