export function setOption(username) {
    const datalist = document.querySelector('#names');
    const option = document.createElement('option');
    option.value = username;
    datalist.appendChild(option);
}