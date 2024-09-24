function changeLanguage(old_lang, new_lang) {

    let oldElement = document.getElementsByClassName(old_lang);
    for (let i = 0; i < oldElement.length; i++) {
        oldElement[i].style.display = 'none';
    }

    let newElement = document.getElementsByClassName(new_lang);
    for (let i = 0; i < newElement.length; i++) {
         newElement[i].style.display = newElement[i].getAttribute("data-display-type");
    }
}