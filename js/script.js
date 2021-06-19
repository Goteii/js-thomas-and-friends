const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    changeBtn();
  };

  const changeBtn = () => {
      document.getElementById('discord-btn').style.display = 'none';
      document.getElementById('copied-btn').style.display = "flex";
      document.getElementById('banner-btn').style.backgroundColor = "rgb(99, 216, 99)";
      document.getElementById('banner-btn').style.borderColor = "rgb(90, 206, 90)";
  }

  const moveToTop = () => {
    window.scrollTo(0, 0);
  }

  const wait = (delay = 0) =>
  new Promise(resolve => setTimeout(resolve, delay));

const setVisible = (elementOrSelector, visible) => 
  (typeof elementOrSelector === 'string'
    ? document.querySelector(elementOrSelector)
    : elementOrSelector
  ).style.display = visible ? 'block' : 'none';

setVisible('.content', false);
setVisible('#loading', true);

document.addEventListener('DOMContentLoaded', () =>
  wait(1000).then(() => {
    setVisible('.content', true);
    setVisible('#loading', false);
  }));