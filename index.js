import map from './Customs.png';

const draw = (canvas, ctx, img, scale, pos) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, pos.x, pos.y, img.width * scale, img.height * scale);
};

const scaleMulti = 0.005;
const posMulti = 1;
let scale = 0.3;
let pos = { x: 0, y: 0 };

const clampPos = (canvasLen, imgLen, scale, pos) => {
  const max = canvasLen / 2;
  const min = canvasLen / 2 - (imgLen * scale);

  if (pos > max) {
    return max;
  }
  if (pos < min) {
    return min;
  }

  return pos;
};

const clampScale = (canvas, img, scale) => {
  const min = canvas.width - 50;
  if (img.width * scale < min) {
    return min / img.width;
  } else {
    return scale;
  }
};

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const img = new Image();
  img.addEventListener("load", () => {
    draw(canvas, ctx, img, scale, pos);

    canvas.addEventListener("wheel", (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("wheel", e);

      // This is scale
      if (e.ctrlKey) {
        scale -= e.deltaY * scaleMulti;
        scale = clampScale(canvas, img, scale);
      } else {
        // this is moving
        pos.x -= e.deltaX * posMulti;
        pos.y -= e.deltaY * posMulti;
        pos.x = clampPos(canvas.width, img.width, scale, pos.x);
        pos.y = clampPos(canvas.height, img.height, scale, pos.y);
      }
      draw(canvas, ctx, img, scale, pos);
    }, false);
  }, false);
  img.src = map;
});
