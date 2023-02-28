document.addEventListener('DOMContentLoaded', main);

function main(evt) {
    const upBtn = document.getElementById('upBtn');
    upBtn.addEventListener('click', handleClickUpBtn);
}

const handleClickUpBtn = async (evt) => {
    const url = "../api/upDir";
    const res = await fetch(url);
    const resData = await res.json();

    const dirsEntry = resData.children.map((dir) => {
        const div = document.createElement('div');
        div.className = 'dir';
        div.textContent = dir;
        div.addEventListener('click' , handleClickDirEntry);
        return div;
    })

    const dirsArea = document.getElementById('dirsArea');
    cleanDirsArea();
    dirsArea.append(...dirsEntry);
}

const handleClickDirEntry = async (evt) => {
    const dir = encodeURIComponent(evt.target.textContent) ;
    const url = `../api/childDir?dirEntry=${dir}`;
    const res = await fetch(url);
    const resData = await res.json();

    const dirsEntry = resData.children.map((dir) => {
        const div = document.createElement('div');
        div.className = 'dir';
        div.textContent = dir;
        div.addEventListener('click' , handleClickDirEntry);
        return div;
    })

    const dirsArea = document.getElementById('dirsArea');
    cleanDirsArea();
    dirsArea.append(...dirsEntry);
}

const cleanDirsArea = () => {
    document.getElementById('dirsArea').innerHTML = '';
}