// puting the API in a varibel to use later
const apikey = 'ca8909f65ac84eabb824275c2366d827';

// geting html elements and storing them in varibels using document.getElementById("The ID of the element")
const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-input");
const searchButton= document.getElementById("search-button");

// a funcation to get the news or the articles and storing them in varibel named data the async allows the function to use the await
async function fetchRandomNews(){
    //using try catch to print out an error in the console if it files 
    try{
        //storing the apiurl in a varibel for use later
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apikey}`;
        // geting the news from the apiurl, awaite waite the fetch to end then stor it in a varaibel
        const response = await fetch(apiUrl);
        //Converting the respinse to json, the awaite whait the response to be converted yo stor it in a varabel named data 
        const data = await response.json();
        console.log(data)
        return data.articles;
        
    }catch(error){
        //the error that will print in the console 
        console.error("Error fetching random news", error);
        return [];
    }
}

searchButton.addEventListener("click", async ()=>{
    const query = searchField.value.trim
    ()
    if(query !== "")
        try{
    const articles = await fetchNewsQuery(query)
    displayblogs(articles)
}catch(error){
    console.log("Error fetching news by query", error)
    }
})

async function fetchNewsQuery(query){
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=20&apikey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
        
    }catch(error){
        console.error("Error fetching random news", error);
        return [];
    }
  
}
//a funcation for displaying the articles or news 
function displayblogs(articles){
    //emtyes the blogContainer the main tag i.e the blog-container ID
    blogContainer.innerHTML = ""
    // => is  Immediately Invoked Function Expression (IIFE) snd it's defined and executed at the same time.
    articles.forEach((articles)=>{
        /* forEach((articles)): for every article make a new div and give it a class of blog-card ,
        and an img element and get the image src from the API and get the article title to use as an alt,
        and an h2 for the title and get the title from the API and using ternary operator to chack if the title
        is longer the 30 char if true slice every thing after the 30th char and replacing it withe ...... 
        and making a ptag for the description of the article also using ternary operator to chack
        if the description is longer then 130 char if true slice every thing after the 130th char and replacing it withe ..... */
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = articles.urlToImage;
        img.alt = articles.title;
        const title = document.createElement("h2");
        //the ternary operator is a shorthand way of writing an if-else statement (condition ? expression_if_true : expression_if_false)
        const truncatedTitle = articles.title.length > 30? articles.title.slice(0, 30) + "....." : articles.title;
        title.textContent = truncatedTitle;
        const description = document.createElement("p");
        const truncatedDec = articles.description.length > 130? articles.description.slice(0, 130) + "....." : articles.description;
        description.textContent = truncatedDec;
        //appending the elements of the blog card to it 
        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        //an IIFE function to open the article in a new page if clicked
        blogCard.addEventListener('click', ()=>{
            window.open(articles.url, "_blank")
        })
        //appending the blog card to the blog container
        blogContainer.appendChild(blogCard);
     })
}
//an IIFE function to get the articles from fetchRandomNews and dusolaying them using displayblogs finction 
(async ()=>{
    try{
        const articles = await fetchRandomNews();
        displayblogs(articles)
    }catch(error){
        console.error("Error fetching random news", error);
        
    }
})();