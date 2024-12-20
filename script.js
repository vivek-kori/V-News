const API_KEY = "25c5830e0c0843189149e5601801e2d6";
const API_KEY_2 = "784ef0b05253418a9b63d124baa61446";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load',() =>fetchNews("india"));

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data); 
    bindData(data.articles);
}
function bindData(articles){
    const cardConariner = document.getElementById("card-container");
    const cardTemplate = document.getElementById("card-template");

    cardConariner.innerHTML='';
    articles.forEach((article) => {
        if(!article.urlToImage) return;
        //most value able line in whole script
        const cardClone = cardTemplate.content.cloneNode(true);
        fillData(cardClone, article);
        cardConariner.appendChild(cardClone);
    });

    function fillData(cardClone,article){
        const newsImg = cardClone.querySelector("#news-img");
        const newsTitle = cardClone.querySelector("#news-title");
        const newsSource = cardClone.querySelector("#news-source");
        const newsDesc = cardClone.querySelector("#news-desc");
        newsImg.src = article.urlToImage;
        newsTitle.innerHTML = article.title;
        newsDesc.innerHTML = article.description;
        const date = new Date(article.publishedAt).toLocaleString("en-US",{
            timeZone : "Asia/jakarta"
        });

        newsSource.innerHTML = `${article.source.name}🔹${date}`;
        cardClone.firstElementChild.addEventListener('click',()=>{
            window.open(article.url,"_blank");
        })
    }
}
let curNav=null;
function navClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curNav?.classList.remove('active');
    curNav = navItem;
    curNav.classList.add('active');
}

const searchButton = document.getElementById("Search-button");
const search = document.getElementById("search");
searchButton.addEventListener('click',()=>{
    const query = search.value;
    if (!query) return;
    curNav?.classList.remove('active');
    curNav=null;
    fetchNews(query);
})

function reload(){
    window.location.reload();
}