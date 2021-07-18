let menuOpen = false;

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

  const moveToSection = (id) => {
    if(id === 'top') {
      const scrollOptions = {
        top: 0,
        behavior: 'smooth',
      }
      window.scrollTo(scrollOptions);
    }
    else {
    const containerIDOffset = document.getElementById(id).offsetTop;
    const scrollOptions = {
      top: containerIDOffset,
      behavior: 'smooth',
    }
    window.scrollTo(scrollOptions);
    }
  }

  const handleMobileNav = () => {
    if(!menuOpen) {
    document.getElementById('slider').style.transform = 'translateX(0%)';
    document.querySelector('.menu-btn').classList.add('open');
    menuOpen = true;
    }
    else {
      document.getElementById('slider').style.transform = 'translateX(100%)';
      document.querySelector('.menu-btn').classList.remove('open');
      menuOpen = false;
    }
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
  wait(1200).then(() => {
    setVisible('.content', true);
    setVisible('#loading', false);
  }));


  const showLightbox = (id, title) => {
    const video = $(`iframe[id='${id}']`);
    $('.lightbox-container').empty().append(video).fadeIn(1000);
    $('.lightbox').css('display', 'block');
    $('.lightbox-header').html(title);
  }

  const closeLightbox = () => {
    const videoItem = $('.lightbox').find('iframe');
    const videoId = $(videoItem).attr('id');
    const videoContainer = $(`div[id='${videoId}']`);
    $(videoContainer).append(videoItem);
    $('.lightbox').css('display', 'none');
  }