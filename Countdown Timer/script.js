let countdown;
const timerDisplay = document.querySelector('.displayTime');
const endTimed = document.querySelector('.endTime');

function timer(seconds)
{
    //clear existing timer
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds*1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) /1000);
        //check if its over
        if(secondsLeft < 0)
        {
            clearInterval(countdown);
            return;
        }
        //display
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds)
{
    const minutes = Math.floor(seconds/60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp)
{
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTimed.textContent = `Will end at ${hour > 12 ? hour - 12 :hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

document.customForm.addEventListener('submit', function(e)
{
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
});