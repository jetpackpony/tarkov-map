import map from './Customs.png';

const marker = {
  x: 490,
  y: 550
};

const drawMarker = (ctx, x, y) => {
  ctx.save();
  ctx.strokeStyle = "rgb(214, 19, 51)";
  ctx.lineWidth = 3;
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.arc(0, 0, 15, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
};

const draw = (canvas, ctx, img, scale, pos) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
    ctx.translate(pos.x, pos.y);
    ctx.save();
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0);
    ctx.restore();
    drawMarker(ctx, marker.x * scale, marker.y * scale);
  ctx.restore();
};

const scaleMulti = 0.01;
const posMulti = 1;
let scale = 1;
let pos = { x: 0, y: 0 };
let drawing = false;

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
  const max = 3;
  const min = canvas.width - 50;
  if (img.width * scale < min) {
    return min / img.width;
  }
  if (scale > max) {
    return max;
  }
  return scale;
};

const updatePosOnScale = (img, pos, prevScale, scale, cursorPos) => {
  let wp = (cursorPos.x - pos.x) / (img.width * prevScale);
  let hp = (cursorPos.y - pos.y) / (img.height * prevScale);
  return {
    x: cursorPos.x - (img.width * scale) * wp,
    y: cursorPos.y - (img.height * scale) * hp
  };
};

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const img = new Image();
  img.addEventListener("load", () => {
    const drawStuff = () => {
      draw(canvas, ctx, img, scale, pos);
    };
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawStuff();
    };
    window.addEventListener("resize", resizeCanvas, false);
    resizeCanvas();

    canvas.addEventListener("wheel", (e) => {
      e.preventDefault();

      // This is scale
      if (e.ctrlKey) {
        let prevScale = scale;
        scale -= e.deltaY * scaleMulti;
        scale = clampScale(canvas, img, scale);
        pos = updatePosOnScale(img, pos, prevScale, scale, { x: e.offsetX, y: e.offsetY });
      } else {
        // this is moving
        pos.x -= e.deltaX * posMulti;
        pos.y -= e.deltaY * posMulti;
        pos.x = clampPos(canvas.width, img.width, scale, pos.x);
        pos.y = clampPos(canvas.height, img.height, scale, pos.y);
      }

      if (!drawing) {
        requestAnimationFrame(() => {
          drawStuff();
          drawing = false;
        });
        drawing = true;
      }
    }, false);
  }, false);
  img.src = map;
});
