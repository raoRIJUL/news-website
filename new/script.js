const api_key="aea3580d01bb4c18a35efdf923a6f1a3";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=>fetchNews("india"));
function reload(){
    window.location.reload();
}
var i=5;

async function fetchNews(query){
    const res=await fetch(`${url}${query}&apiKey=${api_key}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}
 function bindData(articles){
    const cardContainer=document.getElementById("card-container");
    const newsCardTemplate=document.getElementById("tem-news-card");

    cardContainer.innerHTML='';
    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone=newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardContainer.appendChild(cardClone);
    });
 }
 function fillDataInCard(cardClone,article){
    const newsImg=cardClone.querySelector('#news-image')
    const newsTitle=cardClone.querySelector('#news-title');
    const newsSource=cardClone.querySelector('#news-source');
    const newsDesc=cardClone.querySelector('#news-desc');

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;

    const date=new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"
    })
    newsSource.innerHTML=`${article.source.name} ${date}`;
    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    });
 }
 let curSelectedNav=null;
 
 function onNavClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=navItem;
    curSelectedNav.classList.add('active');
 }

 const searchText=document.getElementById('search-Text');
 const searchButton=document.getElementById('search-button');

 searchButton.addEventListener('click',()=>{
    const query=searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=null;
 });
