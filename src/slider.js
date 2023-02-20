sliderApp = {};
sliderApp.images = [
    {
        src: './assets/home-image-6.jpg',
        alt: 'corner view of a pink building'
    },
    {
        src: './assets/home-image-7.jpg',
        alt: 'an airplane in the sky'
    },
    {
        src: './assets/home-image-8.jpg',
        alt: 'pink and blue clouds'
    }
];

sliderApp.init = () => {

    sliderApp.ulTarget = document.querySelector('.imageGallery');
    sliderApp.arrowsClicked();
    sliderApp.display();

}
sliderApp.display = () => {
    sliderApp.images.forEach((image) => {
        const listElement = document.createElement('li');
        listElement.innerHTML = `
        <img class = "gallery__item" src="${image['src']}" alt="${image['alt']}">
        `;
        sliderApp.ulTarget.appendChild(listElement);
    });

}
sliderApp.arrowsClicked = () => {
    const buttons = document.querySelectorAll('.sliderButton');

    buttons.forEach((button) => {
        button.addEventListener('click', function () {
            if (button.classList.contains('sliderButtonLeft')) {
                const removedImage = sliderApp.images.shift();
                sliderApp.ulTarget.innerHTML = '';
                sliderApp.images.push(removedImage);
                sliderApp.display();
            }
            else if (button.classList.contains('sliderButtonRight')) {
                const removedImage = sliderApp.images.pop();
                sliderApp.ulTarget.innerHTML = '';
                sliderApp.images.unshift(removedImage);
                sliderApp.display();
            }

        });
    });

}



sliderApp.init();
