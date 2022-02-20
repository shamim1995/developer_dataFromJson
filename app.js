const create_devs = document.getElementById('create_devs')


devsData();
function devsData() {
    fetch('http://localhost:5050/devs').then(data => data.json()).then(data => {

        console.log(data);
    });
}
