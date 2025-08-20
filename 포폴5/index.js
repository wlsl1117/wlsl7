//DOM 초기화
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");

const coloBtns =document.querySelectorAll(".pallet button");
const eraserBtn = document.querySelector("#eraser");
const downloadBtn = document.querySelector("#download");

//그리기
let isDrawing = false;
let isErasing = false;

ctx.lineWidth = 5;
ctx.strokeStyle = "red";

//이벤트 리스너
function startDrawing() {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}

function drawing(e) {
   if (!isDrawing) return;
   if(isErasing){
//지우기
    ctx.clearRect(e.offsetX, e.offsetY, 20, 20);

   }
   else{
    //그리기
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
   }
}

function stopDrawing() {
    isDrawing = false;
    ctx.closePath();
}

function startErasing(e) {
    isErasing = true;
    coloBtns.forEach((button) => button.classList.remove("selected"));
    eraserBtn.classList.add("selected");
}

function downloadCanvas() {
    const image = canvas.toDataURL("image/png", 1.0);
    const linkEl = document.createElement("a");
    linkEl.href = image;
    linkEl.download = 'PaintApp'
    linkEl.click();
}

function changeColor(e) {
    isErasing = false;
    ctx.strokeStyle = e.currentTarget.dataset.color;

    // 내가 선택한 색상 활성화 및 지우개 선택 해제
    coloBtns.forEach(button => {
        if(button === e.currentTarget) {
            button.classList.add("selected");
        } else {
            button.classList.remove("selected");
        }
    });
    eraserBtn.classList.remove("selected");
}


//이벤트 연결
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", stopDrawing);
coloBtns.forEach(button => button.addEventListener("click", changeColor));
eraserBtn.addEventListener("click", startErasing)
downloadBtn.addEventListener("click", downloadCanvas);