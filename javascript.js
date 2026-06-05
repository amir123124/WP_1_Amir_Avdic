document.addEventListener("DOMContentLoaded", () => {
    const iframe = document.getElementById("sadrzajOkvir");
    const pocetniSadrzaj = document.getElementById("pocetniSadrzaj");
    const funZoneLinks = document.querySelectorAll(".dropdown-content a");

    funZoneLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (pocetniSadrzaj) pocetniSadrzaj.style.display = "none";
            if (iframe) {
                iframe.style.display = "block";
                iframe.style.width = "100%";
            }
        });
    });

    if (iframe) {
        iframe.addEventListener("load", () => {
            try {
                iframe.contentWindow.document.body.style.overflow = "hidden";
                const visinaIgrice = iframe.contentWindow.document.documentElement.scrollHeight || iframe.contentWindow.document.body.scrollHeight;
                iframe.style.height = (visinaIgrice + 50) + "px";
            } catch (e) {
                iframe.style.height = "1150px";
            }
        });
    }

    // Dropdown s delay-om da se ne zatvori prebrzo
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach(dropdown => {
        let closeTimer = null;

        function openDropdown() {
            clearTimeout(closeTimer);
            dropdown.classList.add("open");
        }

        function closeDropdown() {
            closeTimer = setTimeout(() => {
                dropdown.classList.remove("open");
            }, 300); // 300ms delay prije zatvaranja
        }

        dropdown.addEventListener("mouseenter", openDropdown);
        dropdown.addEventListener("mouseleave", closeDropdown);

        const content = dropdown.querySelector(".dropdown-content");
        if (content) {
            content.addEventListener("mouseenter", openDropdown);
            content.addEventListener("mouseleave", closeDropdown);
        }
    });
});
