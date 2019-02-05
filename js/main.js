console.log('Starting up');

var gProjs;

function initPage() {
    createProjs();
    renderProjs();
}

function renderProjs() {
    var projs = getProjs();

    var strHTML = projs.map(function (proj) {
        var badges = proj.labels.map(function (badge) {
            return  badge;
        });

        return `<div class="col-md-4 col-sm-6 portfolio-item" id="${proj.id}" onclick="getId('${proj.id}')">
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1">
          <div class="portfolio-hover">
            <div class="portfolio-hover-content">
              <i class="fa fa-plus fa-3x"></i>
            </div>
          </div>
          <img class="img-fluid" src="img/portfolio/${proj.id}-thumbnail.jpg" alt="">
        </a>
        <div class="portfolio-caption">
          <h4>${proj.name}</h4>
          <p class="text-muted">${proj.title}</p>
          <div class="badges">${badges.join(', ')}</div>
        </div>
        </div>`
    })
    // console.log(strHTML)
    $('.portfolio-container').html(strHTML);
}

function getId(id) {
    console.log('id: ', id);
    renderModal(id);
}

function renderModal(id) {
    var proj = getProjById(id);
    
    var strHTML = `<h2>${proj.name}</h2>
        <p class="item-intro text-muted">${proj.title}</p>
        <img class="img-fluid d-block mx-auto" src="img/portfolio/${proj.id}-full.jpg" alt="">
        <p>${proj.desc}</p>
        <ul class="list-inline">
          <li>Date: ${new Date(proj.publishedAt).toDateString()}</li>
          <li>Category: ${proj.title}</li>
          <li>link: <a href=" ${proj.url}" target="_blank">${proj.name}</a>  </li>
        </ul>
        <button class="btn btn-primary" data-dismiss="modal" type="button">
            <i class="fa fa-times"></i>
            Close Project</button>`
    
    $('.modal-body').html(strHTML);    
}
function createProjs() {

    gProjs = [{
        "id": "chess",
        "name": "Chess game",
        "title": "board game",
        "desc": "Chess is a two-player strategy board game played on a chessboard, a checkered gameboard with 64 squares arranged in an 8×8 grid. The game is played by millions of people worldwide.",
        "url": "projs/chess/index.html",
        "publishedAt": 1548002827000,
        "labels": ["Matrixes", "keyboard events"]
    },
    {
        "id": "pacman",
        "name": "Pacman",
        "title": "Arcade game",
        "desc": "The player navigates Pac-Man through a maze containing dots, known as Pac-Dots, and four multi-colored ghosts: Blinky, Pinky, Inky and Clyde. The goal of the game is to accumulate as many points as possible by collecting the dots and eating ghosts. When all of the dots in a stage is eaten, that stage is completed and the player win",
        "url": "projs/pacman/index.html",
        "publishedAt": 327825187000,
        "labels": ["Matrixes", "keyboard events"]
    }]
}
function getProjs() {
    return gProjs;
}
function getProjById(id) {
   return gProjs.find(function(proj){
        return proj.id === id;
    })
}

function openNewWindow(url) {
    console.log(url)
    window.open(url, '_blank')
}