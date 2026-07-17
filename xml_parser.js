const rssUrl = "proxy.php";
const parentElement = document.querySelector(".movie_grid");
const loadMore = document.querySelector('.voir_plus');
let searchbar = document.getElementById('searchbar');
var view = {
    news : [],
    currentResultCount : 3
};
//une fonction pour load les news, une pour générer l'affichage avec le bouton load more

function loadAndShowNews() {
    fetch(rssUrl + '?count='+ view.currentResultCount)  //reçoit le nb d'items voulu à charger
    .then(response => response.text())
    .then(data => {
        let parser = new DOMParser();
        let xml = parser.parseFromString(data, "application/xml" );
        let items = Array.from(xml.querySelectorAll('item'));
        let results = Array.prototype.slice.call(xml.querySelectorAll('item'), 0,view.currentResultCount);

        //... = déploie le tableau et le transforme en n arguments
        view.news = results.map(function (el) {

            let img = el.getElementsByTagName('media:thumbnail')[0].getAttribute('url');
            let link = el.querySelector('link').textContent;
            let title = el.querySelector('title').textContent;
            let description = el.querySelector('description').textContent
            return {
                img, link, title, description
            }
        });
    displayNews();
    });
};
    
loadAndShowNews();

function displayNews() {
    let html = '';
    view.news.slice(-view.currentResultCount).forEach(item => {
        html += `
                <div class='movie'>
                    <img class='movie_img' src='${item.img}' style='width: 100%; height: 100%;' alt='affiche du film'>
                    <h3 class='categories'>
                        <a href='${item.link}'>${item.title}</a>
                    </h3>
                    <p class='summary'>${item.description}</p>
                </div>
                `;
                
    });
    parentElement.innerHTML = html;
}
loadMore.addEventListener('click', () => {
    
    view.currentResultCount += 3;
    loadAndShowNews();
});

searchbar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    view.news.forEach(item => {
        const filteredNews = view.news.filter(item => {
        return(
            item.title.toLowerCase().includes(searchString) ||
            item.description.toLowerCase().includes(searchString)
        );
    });
    console.log(filteredNews);
    });
});

