window.onload = function() {
  // DOM Elements
  const progress = document.querySelector('.progress'),
        timer = document.querySelector('.timer'),
        widthScale = window.innerWidth;
  // Timer Elements 
  const totalSeconds = 1500;
  let currentSecond = totalSeconds,
      interval,
      isPaused = true;
  const playBtn = document.querySelector('.btn.go'),
        replayBtn = document.querySelector('.btn.replay'),
        resetBtn = document.querySelector('.btn.halt');
  const doubleDigit = number => {
    if (number < 10) {
      return `0${number}`;
    } else {
      return number;
    }
  }
  const getTimeString = currentSecond => {
    const min = Math.floor(currentSecond / 60);
    const sec = currentSecond % 60;
    return `${doubleDigit(min)}:${doubleDigit(sec)}`;
  };
  const countDown = () => {
    currentSecond -= 1;
    const widthRatio = 1 - (currentSecond / totalSeconds);
    progress.style.width = `${widthRatio * widthScale}px`;
    timer.textContent = currentSecond <= 0 ? "DONE" : getTimeString(currentSecond);
    if (currentSecond <= 0) {
      clearInterval(interval);
      progress.style.opacity = 0;
      toggleReplayBtn();
    } else {
      progress.style.opacity = 1;
    }
  }
  const toggleReplayBtn = (mode) => {
    if (mode==='reset') {
      replayBtn.classList.add('isHidden');
      playBtn.classList.remove('isHidden');
    } else {
      replayBtn.classList.toggle('isHidden');
      playBtn.classList.toggle('isHidden');
    }
  }
  const togglePlayBtn = (mode) => {
    if (mode === 'reset') {
      playBtn.querySelector('.playSvg').classList.remove('isHidden');
      playBtn.querySelector('.pauseSvg').classList.add('isHidden');
    } else {

      playBtn.querySelector('.playSvg').classList.toggle("isHidden");
      playBtn.querySelector('.pauseSvg').classList.toggle("isHidden");
    }
    if (isPaused) {
      playBtn.querySelector('.txt').textContent = mode === "pause" ? "Resume" : "Start";
    } else {
      playBtn.querySelector('.txt').textContent = "Pause"
    }
  }
  const toggleTimer = (e) => {
    isPaused = !isPaused;
    if (!isPaused) {
      interval = setInterval(countDown, 1000);
    } else {
      clearInterval(interval);
    }
    togglePlayBtn('pause');
  }
  const resetTimer = () => {
    if (currentSecond === totalSeconds) return;
    if (currentSecond <= 0) toggleReplayBtn();
    currentSecond = totalSeconds;
    isPaused = true;
    progress.style.width = '0px';
    clearInterval(interval);
    togglePlayBtn('reset');
    timer.textContent = getTimeString(currentSecond);
  }
  const resetForReplay = () => {
    resetTimer();
    toggleReplayBtn('reset');
    toggleTimer();
  }
  const init = () => {
    timer.textContent = getTimeString(totalSeconds);
    playBtn.addEventListener('click', toggleTimer);
    resetBtn.addEventListener('click', resetTimer);
    replayBtn.addEventListener('click', resetForReplay)
  }
  init();
}