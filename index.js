const apikey = 'ca8909f65ac84eabb824275c2366d827';

const blogContainer = document.getElementById("blog-container");

async function fetchRandomNews(){
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;

    }catch(error){
        console.error("Error fetching random news", error);
        return [];
    }
}

function displayblogs(articles){
     blogContainer.innerHTML = ""
     articles.forEach((articles)=>{
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = articles.urlToImage;
        img.alt = articles.title;
        const title = document.createElement("h2");
        const truncatedTitle = articles.title.length > 30? articles.title.slice(0, 30) + "....." : articles.title;
        title.textContent = truncatedTitle;
        const description = document.createElement("p");
        const truncatedDec = articles.description.length > 130? articles.description.slice(0, 130) + "....." : articles.description;
        description.textContent = truncatedDec;
        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener('click', ()=>{
            window.open(articles.url, "_blank")
        })
        blogContainer.appendChild(blogCard);
     })
}

(async ()=>{
    try{
        const articles = await fetchRandomNews();
        console.log(articles)
        displayblogs(articles)
    }catch(error){
        console.error("Error fetching random news", error);
        
    }
})();