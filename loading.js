const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
let progress = 0;

const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 12) + 3;
    
    if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 600);
    }

    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${progress}%`;
}, 200);
