const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const colorPicker = document.getElementById("colorPicker");
const brushSize = document.getElementById("brushSize");
const eraserBtn = document.getElementById("eraserBtn");
const clearBtn = document.getElementById("clearBtn");
const saveBtn = document.getElementById("saveBtn");
const savePdfBtn = document.getElementById("savePdfBtn");
const sendEmailBtn = document.getElementById("sendEmailBtn");

let drawing = false;
let currentColor = colorPicker.value;
let isErasing = false;

function getCoordinates(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else {
        clientX = e.clientX;
        clientY = e.clientY;
    }
    return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY
    };
}

function startDraw(e) {
    drawing = true;
    ctx.beginPath();
    const coords = getCoordinates(e);
    ctx.moveTo(coords.x, coords.y);
    draw(e);
}

function endDraw() {
    drawing = false;
    ctx.beginPath();
}

function draw(e) {
    if (!drawing) return;
    const coords = getCoordinates(e);
    ctx.lineWidth = brushSize.value;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = isErasing ? "#FFFFFF" : currentColor;
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
}

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mouseup", endDraw);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseleave", endDraw);
canvas.addEventListener("touchstart", (e) => { startDraw(e); e.preventDefault(); });
canvas.addEventListener("touchend", (e) => { endDraw(); e.preventDefault(); });
canvas.addEventListener("touchmove", (e) => { draw(e); e.preventDefault(); });

colorPicker.addEventListener("input", () => {
    currentColor = colorPicker.value;
    isErasing = false;
    eraserBtn.textContent = "◻ Brisač";
    eraserBtn.classList.remove("active-eraser");
});

eraserBtn.addEventListener("click", () => {
    isErasing = !isErasing;
    eraserBtn.textContent = isErasing ? "✏ Olovka" : "◻ Brisač";
    if (isErasing) {
        eraserBtn.classList.add("active-eraser");
    } else {
        eraserBtn.classList.remove("active-eraser");
    }
});

clearBtn.addEventListener("click", () => {
    if (confirm("Da li želite obrisati cijelu ploču?")) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

// Snimi kao PNG
saveBtn.addEventListener("click", () => {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "moj_crtez.png";
    link.click();
});

// Snimi kao PDF
savePdfBtn.addEventListener("click", () => {
    const dataUrl = canvas.toDataURL("image/png");
    const imgEl = document.createElement("img");
    imgEl.src = dataUrl;
    imgEl.style.width = "100%";

    const wrapper = document.createElement("div");
    wrapper.style.padding = "10px";
    wrapper.style.background = "#ffffff";
    wrapper.appendChild(imgEl);

    const opt = {
        margin: 10,
        filename: "whiteboard-crtez.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "landscape" }
    };
    html2pdf().set(opt).from(wrapper).save();
});

// Email popup
function toggleEmailPopup() {
    const overlay = document.getElementById("emailOverlay");
    overlay.style.display = overlay.style.display === "flex" ? "none" : "flex";
    if (overlay.style.display === "flex") {
        document.getElementById("targetEmail").value = "";
    }
}

sendEmailBtn.addEventListener("click", toggleEmailPopup);
document.getElementById("popupCancelBtn").addEventListener("click", toggleEmailPopup);

document.getElementById("popupSendBtn").addEventListener("click", () => {
    const email = document.getElementById("targetEmail").value.trim();
    if (!email) {
        alert("Molimo unesite validnu e-mail adresu!");
        return;
    }
    const subject = encodeURIComponent("Interaktivni Whiteboard - crtež");
    const body = encodeURIComponent("U prilogu se nalazi crtež sa Interaktivnog Whiteboarda.\n\nStranica: Student Fun Zone | IPI Akademija Tuzla\nWeb programiranje 2025/2026");
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    toggleEmailPopup();
});
