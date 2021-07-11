import Swal from 'sweetalert2';

const refs = {
    daysEl: document.querySelector("[data-days]"),
    hoursEl: document.querySelector("[data-hours]"),
    minsEl: document.querySelector("[data-minutes]"),
    secsEl: document.querySelector("[data-seconds]"),
    timer: document.querySelector(".timer"),
    inputEl: document.querySelector("#date-selector"),
    btnEl: document.querySelector("[data-start]")
}

refs.btnEl.setAttribute('disabled', true);
refs.inputEl.addEventListener('input', onInputChange);
const inputVal = refs.inputEl.value;

function onInputChange(event) {

    if (event.currentTarget.value.trim() !== '') {       
        const inputTime = new Date(refs.inputEl.value.split(".").reverse().join(".")).getTime();
        
        if (inputTime > Date.now()) {
            refs.btnEl.removeAttribute('disabled', false);
            refs.btnEl.addEventListener('click', onBtnClick);

            function onBtnClick() {
                refs.btnEl.setAttribute('disabled', true);

                class CountdownTimer {
                    constructor({ onTick }) {
                        this.onTick = onTick;
                        this.isActive = false;
                        this.intervalId = null;
                        this.start();
                    }
                        
                    start() {
                        if (this.isActive) {
                            return;
                        }
                        this.isActive = true;
                        

                        this.intervalId = setInterval(() => {
                            
                            const currentTime = Date.now();
                            const ms = inputTime - currentTime;
                            const time = this.convertMs(ms);
                            this.onTick(time);

                            if (ms < 1000) {
                                timer.stop();
                            }
                        }, 1000);
                    };

                    stop() {
                        clearInterval(this.intervalId);
                    }
                    
                    pad(value) {
                        return String(value).padStart(2, "0");
                    } 
                
                    convertMs(ms) {
                        const pad = this.pad;

                        const second = 1000;
                        const minute = second * 60;
                        const hour = minute * 60;
                        const day = hour * 24;

                        const days = pad(Math.floor(ms / day));
                        const hours = pad(Math.floor((ms % day) / hour));
                        const minutes = pad(Math.floor(((ms % day) % hour) / minute));
                        const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

                        return { days, hours, minutes, seconds };
                    }
                }
                const timer = new CountdownTimer({
                    onTick: updateClockFace
                });
            }            
        }

        if (inputTime < Date.now()) {
            Swal.fire({
                title: 'Error!',
                text: "Please choose a date in the future",
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    }
        
    if (event.currentTarget.value.trim() === '') {
        refs.btnEl.setAttribute('disabled', true);
        return;
    }
}

function onBtnClick(){
    timer.start();
}

function updateClockFace({ days, hours, minutes, seconds }) {
    refs.daysEl.textContent = `${days}`;
    refs.hoursEl.textContent = `${hours}`;
    refs.minsEl.textContent = `${minutes}`;
    refs.secsEl.textContent = `${seconds}`;
}