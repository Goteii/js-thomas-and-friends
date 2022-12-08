import { MEMBERS, VIDEOS } from "../utils/utils.js";

let menuOpen = false;

const copyToClipboard = (str) => {
  const el = document.createElement("textarea");
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  changeBtn();
};

const changeBtn = () => {
  document.getElementById("discord-btn").style.display = "none";
  document.getElementById("copied-btn").style.display = "flex";
  document.getElementById("banner-btn").style.backgroundColor =
    "rgb(99, 216, 99)";
  document.getElementById("banner-btn").style.borderColor = "rgb(90, 206, 90)";
};

const moveToSection = (id) => {
  if (id === "top") {
    const scrollOptions = {
      top: 0,
      behavior: "smooth",
    };
    window.scrollTo(scrollOptions);
  } else {
    const containerIDOffset = document.getElementById(id).offsetTop;
    const scrollOptions = {
      top: containerIDOffset,
      behavior: "smooth",
    };
    window.scrollTo(scrollOptions);
  }
};

const handleMobileNav = () => {
  if (!menuOpen) {
    document.getElementById("slider").style.transform = "translateX(0%)";
    document.querySelector(".menu-btn").classList.add("open");
    menuOpen = true;
  } else {
    document.getElementById("slider").style.transform = "translateX(100%)";
    document.querySelector(".menu-btn").classList.remove("open");
    menuOpen = false;
  }
};

const wait = (delay = 0) =>
  new Promise((resolve) => setTimeout(resolve, delay));

const setVisible = (elementOrSelector, visible) =>
  ((typeof elementOrSelector === "string"
    ? document.querySelector(elementOrSelector)
    : elementOrSelector
  ).style.display = visible ? "block" : "none");

setVisible(".content", false);
setVisible("#loading", true);

document.addEventListener("DOMContentLoaded", () =>
  wait(1200).then(() => {
    setVisible(".content", true);
    setVisible("#loading", false);
  })
);

const showLightbox = (id, title) => {
  const video = $(`iframe[id='${id}']`);
  $(".lightbox-container").empty().append(video).fadeIn(1000);
  $(".lightbox").css("display", "block");
  $(".lightbox-header").html(title);
};

export const closeLightbox = () => {
  const videoItem = $(".lightbox").find("iframe");
  const videoId = $(videoItem).attr("id");
  const videoContainer = $(`div[id='${videoId}']`);
  $(videoContainer).append(videoItem);
  $(".lightbox").css("display", "none");
};

const getCrewMembers = () => {
  const wrapper = document.getElementById("crew-wrapper");

  MEMBERS.forEach((el, i) => {
    const crewWrapper = document.createElement("div");
    crewWrapper.className = el.parentDivClassName || "crew-member";
    const crewRank = document.createElement("h2");
    crewRank.className = "crew-rank";
    crewRank.innerHTML = el.crewRank;
    crewWrapper.appendChild(crewRank);
    const crewImg = document.createElement("img");
    crewImg.className = "crew-avatar";
    crewImg.src = el.imgSrc;
    crewImg.alt = `${el.crewName} discord picture`;
    crewWrapper.appendChild(crewImg);
    const crewName = document.createElement("span");
    crewName.className = "crew-name";
    crewName.innerHTML = el.crewName;
    crewWrapper.appendChild(crewName);
    const crewDescription = document.createElement("span");
    crewDescription.className = "crew-description";
    crewDescription.innerHTML = el.crewDescription;
    crewWrapper.appendChild(crewDescription);

    wrapper.appendChild(crewWrapper);
  });
};

const getVideos = () => {
  const videoWrapper = document.getElementById("video-wrapper");

  VIDEOS.forEach((el) => {
    const videoDiv = document.createElement("div");
    videoDiv.className = "video";
    videoDiv.id = el.id;
    const videoOverlay = document.createElement("div");
    videoOverlay.className = "video-overlay";
    videoOverlay.addEventListener("click", () => showLightbox(el.id, el.title));
    videoDiv.appendChild(videoOverlay);
    const videoDescription = document.createElement("div");
    videoDescription.class = "video__description";
    videoDescription.innerHTML = el.title;
    videoDiv.appendChild(videoDescription);
    const iframe = document.createElement("iframe");
    iframe.className = "about__video";
    iframe.id = el.id;
    iframe.title = el.title;
    iframe.width = "100%";
    iframe.height = "80%";
    iframe.src = el.iframeSrc;
    iframe.frameborder = "0px";
    iframe.allowFullscreen = true;
    videoDiv.appendChild(iframe);

    videoWrapper.appendChild(videoDiv);
  });
};

if (
  document.readyState === "interactive" ||
  document.readyState === "complete"
) {
  getCrewMembers();
  getVideos();
  document
    .getElementById("lightbox")
    .addEventListener("click", closeLightbox());
  //global methods
  window.handleMobileNav = handleMobileNav;
  window.copyToClipboard = copyToClipboard;
  window.moveToSection = moveToSection;
}
