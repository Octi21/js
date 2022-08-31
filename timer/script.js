const newYears = '1.1.2023';

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function countdown(){
    const newYearsDate = new Date(newYears);
    const curentDate = new Date();
    console.log(newYearsDate);
    console.log(curentDate);

    const seconds = (newYearsDate - curentDate) / 1000;
    
    const days = Math.floor(seconds  / 3600 / 24);
    const hours = Math.floor(seconds /3600) % 24;
    const minutes = Math.floor(seconds / 60) %60;
    const sec = Math.floor(seconds) %60;

    daysEl.innerHTML = add0(days);
    hoursEl.innerHTML = add0(hours);
    minutesEl.innerHTML = add0(minutes);
    secondsEl.innerHTML = add0(sec);

    console.log(days);
}

function add0(number)
{
    if(number< 10)
        return '0' + number;
    else
        return number;
}

//console.log(1);
//countdown();

setInterval(countdown,1000);
