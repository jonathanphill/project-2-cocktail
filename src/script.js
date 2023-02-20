

let noOfChar = 150;
let contents = document.querySelectorAll(".content");
// console.log(contents)

contents.forEach(content => {
    // if the length is less than noOfChar.then
    if(content.textContent.length < noOfChar){
        content.nextElementSibling.style.display = "none";
    }
    else{
        let displayText = content.textContent.slice(0, noOfChar);
        let moreText = content.textContent.slice(noOfChar);
        // console.log(displayText);
        content.innerHTML =`${displayText}<span class="dots">...</span><span class="hide more">${moreText}</span>`;
    }

});

function readMore(btn){
    let post = btn.parentElement;
    // console.log(post);
    post.querySelector(".dots").classList.toggle("hide");
    post.querySelector(".more").classList.toggle("hide");
    btn.textContent == "Read More" ? btn.textContent ="Read Less": btn.textContent ="Read More";

}



