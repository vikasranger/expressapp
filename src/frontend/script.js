const buttonHeight = 50;
const buttonWidth = 150;

const maxHeight = window.innerHeight - buttonHeight - 50;
const maxWidth = window.innerWidth - buttonWidth - 50;

function onClickYes()
{
  const image = document.getElementById("gif");
  const button = document.getElementById("yes");
  const label = document.getElementById("label");
  image.src = "assets/yes.gif";
  button.textContent = "It's Date 😍";
  label.textContent = "Yeeyy | Finally 😍";
}

function hoverNoButton()
{
  const button = document.getElementById("no");
  console.log("yes hover me");
  button.style.left = Math.floor(Math.random() * (maxWidth + 1)) + "px";
  button.style.top = Math.floor(Math.random() * (maxHeight + 1)) + "px";
}

const noButton = document.getElementById("no");
noButton.addEventListener("touchstart", function()
{
  hoverNoButton();
});

function playSound()
{
  document.getElementById("audio").play();
}

function onClickNo()
{
  console.log("Clicked No");
}
