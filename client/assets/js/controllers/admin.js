var link = document.querySelector('.head').getElementsByTagName('li');
link.onclick = function () {
    console.log('.................',123);
    link.classList.add('select');
};