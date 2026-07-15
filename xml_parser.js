const rssUrl = "proxy.php";
const parentElement = document.querySelector(".movie_grid");
const loadMore = document.querySelector('.voir_plus');

let html = ``;
let currentResultCount = 6;



fetch(rssUrl)
.then(response => response.text()) /*response.text convertit le fichier xml en fichier texte.*/
.then(data => {
    let parser = new DOMParser();
    let xml = parser.parseFromString(data, "application/xml" );
    let items = xml.querySelectorAll('item');
    const firstSixResults = Array.prototype.slice.call(xml.querySelectorAll('item'), 0,6);
    let html = `` ;

    firstSixResults.forEach(el =>{
        html += `
                <div class='movie'>
                    <img class='movie_img' src='${el.getElementsByTagName('media:thumbnail')[0].getAttribute('url')}' style='width: 100%; height: 100%;' alt='affiche du film'>
                    <h3 class='categories'>
                        <a href='${el.querySelector('link').textContent}'>${el.querySelector('title').textContent}</a>
                    </h3>
                    <p class='summary'>${el.querySelector('description').textContent}</p>
                </div>
                `
    });
        parentElement.innerHTML = html;
});
