const buttons = document.querySelectorAll("button")
const selectLinkQRButton = document.getElementById("link-QR");
const selectVCardButton = document.getElementById("vcard");
const heading = document.querySelector("h1");
const selectionContent = document.getElementById("selection-content");
const linkQRContent = document.getElementById("link-QR-content");
const vcardContent = document.getElementById("vcard-content");
const form = document.querySelector("form");
const smallLabel = document.querySelector(".small-label");
const goButton = document.getElementById("go-button");
const wrapper = document.querySelector(".wrapper");
const imageQR = document.querySelector(".sample-qr");
const contentWrapper = document.querySelector(".content-wrapper");
const urlInput = document.getElementById("url-input");
const inputs = document.querySelectorAll("input");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const mobile = document.getElementById("mobile");
const email = document.getElementById("email");
const address = document.getElementById("address");
const website = document.getElementById("vcard-link");
vcardContent.style.display = "none";
// linkQRContent.style.display = "none";
let whatIsRevealed = "selection";

function buttonClicked(e) {
    if (e.target.id == "link-QR") {
        goTolinkQR();
        whatIsRevealed = "link-QR";
    }
    if (e.target.id == "vcard") {
        goTovcard();
        whatIsRevealed = "vcard";
    }
    if (e.target.id == "go-button" && urlInput.value && whatIsRevealed == "link-QR") {
        createQR(urlInput.value);
        setTimeout(() => clearInputs(), 1)
    }
    if (e.target.id == "go-button" && firstname.value && whatIsRevealed == "vcard") {
        createVcard(firstname.value, lastname.value, email.value, mobile.value, website.value, address.value);
        setTimeout(() => clearInputs(), 1)
    }
}

function clearInputs() {
    inputs.forEach(input => input.value = "");
}

function createQR(value) {
    imageQR.setAttribute("src", `http://api.qrserver.com/v1/create-qr-code/?data=${value}&size=150x150&margin=15`);
}

function createVcard(firstname, lastname, email, mobile, website, address) {
    imageQR.setAttribute("src", `https://qrickit.com/api/qr.php?d=BEGIN%3aVCARD%0d%0aVERSION%3a3.0%0d%0aN%3a${encodeURIComponent(lastname)}%3b${encodeURIComponent(firstname)}%0d%0aEMAIL%3a${encodeURIComponent(email)}%0d%0aTEL%3bTYPE%3d
CELL%3a${encodeURIComponent(mobile)}%0d%0aURL%3a${encodeURIComponent(website)}%0d%0aADR%3a%3b%3b${encodeURIComponent(lastname)}%0d%0aEND%3aVCARD%0A&addtext=&txtcolor=000000&fgdcolor=000000&bgdcolor=FFFFFF&qrsize=200`);
}

function goTolinkQR() {
    selectionContent.style.display = "none";
    form.setAttribute("data-page", "link-QR");
    linkQRContent.style.display = "unset";
    heading.setAttribute("data-page", "link-QR");
    heading.textContent = "Link QR";
    smallLabel.removeAttribute("data-page");
    imageQR.setAttribute("data-page", "link-QR");
    goButton.setAttribute("data-page", "link-QR");
}

function goTovcard() {
    form.setAttribute("data-page", "vcard");
    selectionContent.style.display = "none";
    vcardContent.style.display = "unset";
    wrapper.setAttribute("data-page", "vcard");
    imageQR.setAttribute("data-page", "vcard");
    heading.setAttribute("data-page", "vcard");
    heading.textContent = "Virtual Card";
    contentWrapper.setAttribute("data-page", "vcard");
    smallLabel.removeAttribute("data-page");
}

buttons.forEach(btn => btn.addEventListener('click', buttonClicked));
