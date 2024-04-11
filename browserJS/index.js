const contents = document.querySelectorAll('.nav p');

window.addEventListener('popstate', () => {
    const path = window.location.pathname;
    const paths = ['main', 'info', 'content'];
    console.log(path)

    const index = paths.indexOf(path.substring(1));
    if (index !== -1) {
        contents.forEach(el => el.classList.remove('active'));
        contents[index].classList.add('active');
    }
});

contents.forEach((content, index) => {
    content.addEventListener('click', () => {
        const path = ['main', 'info', 'content'][index];
        history.pushState({}, path, path);
        document.title = path;
        contents.forEach(el => el.classList.remove('active'));
        content.classList.add('active');
    });
});