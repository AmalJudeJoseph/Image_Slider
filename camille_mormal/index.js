const track = document.getElementById("image-track");
let sliderInterval;

window.onmousedown = e => {
  track.dataset.mouseDownAt = e.clientX;
  clearInterval(sliderInterval); // Stop any previously running slider interval
  e.preventDefault(); // Prevent default behavior of the browser when dragging images
}

window.onmousemove = e => {
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;

  track.dataset.percentage = nextPercentage;

  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });

  for (const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

window.onmouseup = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
  sliderInterval = setInterval(() => { // Start the slider interval again
    // sliding animation code goes here
  }, 1000);
}
