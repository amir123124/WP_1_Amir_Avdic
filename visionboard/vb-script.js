document.addEventListener("DOMContentLoaded", () => {
    loadBoard();

    document.getElementById("addNoteBtn").addEventListener("click", () => createBoardItem("note", "Kliknite ovdje da napisete biljesku..."));
    document.getElementById("addQuoteBtn").addEventListener("click", () => createBoardItem("quote", "Upisite vas omiljeni motivacioni citat ovdje..."));
    document.getElementById("clearBoardBtn").addEventListener("click", clearBoard);

    document.getElementById("addImageBtn").addEventListener("click", () => togglePopup("imageOverlay"));
    document.getElementById("popupCancelImgBtn").addEventListener("click", () => togglePopup("imageOverlay"));
    document.getElementById("popupAddImgBtn").addEventListener("click", handleAddImage);

    document.getElementById("savePdfBtn").addEventListener("click", saveAsPdf);

    document.getElementById("sendEmailBtn").addEventListener("click", () => togglePopup("emailOverlay"));
    document.getElementById("popupCancelEmailBtn").addEventListener("click", () => togglePopup("emailOverlay"));
    document.getElementById("popupSendEmailBtn").addEventListener("click", sendEmailHandler);
});

function togglePopup(overlayId) {
    const overlay = document.getElementById(overlayId);
    overlay.style.display = overlay.style.display === "flex" ? "none" : "flex";
    // Resetuj inpute pri otvaranju
    const input = overlay.querySelector("input");
    if (input && overlay.style.display === "flex") input.value = "";
}

function handleAddImage() {
    const fileInput = document.getElementById("imageFileInput");
    const urlInput = document.getElementById("imageUrlInput").value.trim();

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            createBoardItem("image", e.target.result);
            togglePopup("imageOverlay");
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else if (urlInput) {
        createBoardItem("image", urlInput);
        togglePopup("imageOverlay");
    } else {
        alert("Odaberite sliku sa računara ili unesite URL!");
    }
}

// Snimi kao PDF
function saveAsPdf() {
    const board = document.getElementById("visionBoard");
    const opt = {
        margin: 10,
        filename: "vision-board.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, backgroundColor: "#060f1c" },
        jsPDF: { unit: "mm", format: "a4", orientation: "landscape" }
    };
    html2pdf().set(opt).from(board).save();
}

// Email handler
function sendEmailHandler() {
    const email = document.getElementById("targetEmail").value.trim();
    if (!email) {
        alert("Molimo unesite validnu e-mail adresu!");
        return;
    }

    let mailBody = "Moj Vision Board - pregled stavki:\n\n";
    document.querySelectorAll(".board-item").forEach((card, i) => {
        if (card.classList.contains("type-image")) {
            mailBody += `${i + 1}. [Slika]\n`;
        } else {
            const text = card.querySelector(".item-text");
            const type = card.classList.contains("type-quote") ? "Citat" : "Bilješka";
            mailBody += `${i + 1}. [${type}] ${text ? text.innerText : ""}\n`;
        }
    });

    if (mailBody === "Moj Vision Board - pregled stavki:\n\n") {
        mailBody += "(Ploča je prazna)";
    }

    const subject = encodeURIComponent("Vision Board - Student Fun Zone");
    const body = encodeURIComponent(mailBody + "\n\nIPI Akademija Tuzla | Web programiranje 2025/2026");
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    togglePopup("emailOverlay");
}

function createBoardItem(type, content, id = null) {
    const board = document.getElementById("visionBoard");
    const itemId = id || "item-" + Date.now();
    const randomRotation = (Math.random() * 8 - 4).toFixed(1);

    const itemCard = document.createElement("div");
    itemCard.className = `board-item type-${type}`;
    itemCard.id = itemId;
    itemCard.style.setProperty('--rotation', randomRotation);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-pin";
    deleteBtn.innerHTML = "✕";
    deleteBtn.onclick = () => deleteItem(itemId);
    itemCard.appendChild(deleteBtn);

    if (type === "image") {
        const img = document.createElement("img");
        img.src = content;
        img.className = "board-img";
        img.onerror = () => { img.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500"; };
        itemCard.appendChild(img);
    } else {
        const textPara = document.createElement("p");
        textPara.className = "item-text";
        textPara.contentEditable = "true";
        textPara.innerText = content;
        textPara.addEventListener("blur", () => saveBoard());
        itemCard.appendChild(textPara);
    }

    const footer = document.createElement("div");
    footer.className = "item-footer";
    footer.innerText = `📌 ${new Date().toLocaleDateString('bs')}`;
    itemCard.appendChild(footer);

    board.appendChild(itemCard);
    if (!id) saveBoard();
}

function deleteItem(id) {
    const item = document.getElementById(id);
    if (item) { item.remove(); saveBoard(); }
}

function clearBoard() {
    if (confirm("Da li ste sigurni da zelite ukloniti sve elemente sa Vision Board-a?")) {
        document.getElementById("visionBoard").innerHTML = "";
        localStorage.removeItem("ipiVisionBoardState");
    }
}

function saveBoard() {
    const items = [];
    document.querySelectorAll(".board-item").forEach(card => {
        const id = card.id;
        let type = "note";
        if (card.classList.contains("type-quote")) type = "quote";
        if (card.classList.contains("type-image")) type = "image";
        let content = "";
        if (type === "image") {
            content = card.querySelector(".board-img").src;
        } else {
            content = card.querySelector(".item-text").innerText;
        }
        items.push({ id, type, content });
    });
    localStorage.setItem("ipiVisionBoardState", JSON.stringify(items));
}

function loadBoard() {
    const data = localStorage.getItem("ipiVisionBoardState");
    if (!data) return;
    const items = JSON.parse(data);
    items.forEach(item => createBoardItem(item.type, item.content, item.id));
}
