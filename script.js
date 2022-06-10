const emoji = document.getElementById("emoji");
const emobg = document.getElementById("box-emoji");
const emocolor = document.getElementById("emocolor");
const bgcolor = document.getElementById("bgcolor");
const emoKeycolor = "##ca512f";
const bgKeycolor = "#3d4392";

emocolor.oninput = function () {
  emoji.style.color = this.value;
};

bgcolor.oninput = function () {
  emobg.style.backgroundColor = this.value;
};

const sliders = document.querySelectorAll(".slider");
const sliderValues = document.querySelectorAll(".value");
const emotions = [sliders];

for (let i = 0; i < sliders.length; i++) {
  sliderValues[i].innerHTML = sliders[i].value;
}

sliders.forEach(function (slider) {
  const sliderIndex = slider.getAttribute("data-index");
  const output = document.querySelector(`.value[data-index="${sliderIndex}"]`);
  slider.oninput = function () {
    emoji.style.setProperty(`--${this.id}`, this.value);
    output.innerHTML = (this.value * 2) / 100;
  };
});

let url = new URL(window.location);

// ロード時にパラメーターを読み込む
function loadParam() {
  const urlParam = url.searchParams;
  // 色の設定
  if (urlParam.has(`em`)) {
    let emValue = urlParam.get(`em`);
    let bgValue = urlParam.get(`bg`);
    let emcValue = decodeURIComponent(emValue);
    let bgcValue = decodeURIComponent(bgValue);
    emoji.style.color = emcValue;
    emobg.style.backgroundColor = bgcValue;
    emocolor.value = emcValue;
    bgcolor.value = bgcValue;
  }
  if (urlParam.has(`morp`)) {
    sliders.forEach(function (emotion) {
      const sliderIndex = emotion.getAttribute("data-index");
      const output = document.querySelector(
        `.value[data-index="${sliderIndex}"]`
      );
      let emoVal = urlParam.get(emotion.id);
      emoji.style.setProperty(`--${emotion.id}`, emoVal);
      output.innerHTML = (emoVal * 2) / 100;
      emotion.value = emoVal;
    });
  }
}

window.onload = loadParam();

function rdmColor() {
  let r = ("0" + Math.floor(Math.random() * 255).toString(16)).slice(-2);
  let g = ("0" + Math.floor(Math.random() * 255).toString(16)).slice(-2);
  let b = ("0" + Math.floor(Math.random() * 255).toString(16)).slice(-2);
  let color = "#" + r + g + b;
  return color;
}

// パラメーターのリセット
function resetParam() {
  sliders.forEach(function (emotion) {
    url.searchParams.delete(emotion.id);
  });
  url.searchParams.delete("em");
  url.searchParams.delete("bg");
  return url.href;
}
