const rssUrl = "proxy.php";
const parentElement = document.querySelector(".movie_grid");

fetch(rssUrl)
.then(response => response.text()) /*response.text convertit le fichier xml en fichier texte.*/
.then(data => {
    let parser = new DOMParser();
    let xml = parser.parseFromString(data, "application/xml" );
    console.log(xml);
    let items = xml.querySelectorAll('item');
    let html = `` ;

    items.forEach(el =>{
        html += `
                <div class='movie'>
                    <img class='movie_img' src='assets/example_movie.png' style='width: 100%; height: 100%;' alt='affiche du film'>
                    <h3 class='categories'>
                        <a href='${el.querySelector('link').innerHTML}'>${el.querySelector('title').innerHTML}</a>
                    </h3>
                    <p class='summary'>${el.querySelector('description').innerHTML}</p>
                </div>
                `
    });
    parentElement.innerHTML = html;
});
