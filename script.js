const apiKey = "f3731d275a3f4fbc8e06657f0b559929";
const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

async function fetchRandomNews(){
    try{
       const apiUrl = `https://newsapi.org/v2/top-headlines?sources=bbc-news&pageSize=10&apiKey=${apiKey}`;
       const response = await fetch(apiUrl);
       const data = await response.json();
       return data.articles;
    }
    catch(error){
         console.error("Error fetching random news",error);
         return [];
    }
}

searchButton.addEventListener("click",async ()=>{
    const query = searchField.value.trim();
    if(query!=""){
        try{
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        }
        catch(error){
           console.log("Error fetching news by query",error);
        }
    }
})

async function fetchNewsQuery(Query)
{
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${Query}&pageSize=20&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
     }
     catch(error){
          console.error("Error fetching random news",error);
          return [];
     }
}

function displayBlogs(articles){
    blogContainer.innerHTML = "";
    articles.forEach((article)=>{
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;
        const title = document.createElement("h2");
        const truncatedTitle = article.title.length >30? article.title.slice(0,30)+"....":article.title;
        title.textContent = truncatedTitle;
        const description = document.createElement("p");
        description.textContent = article.description;
        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener("click",()=>{
            window.open(article.url,"_blank");
        })
        blogContainer.appendChild(blogCard);
    });
}

(async ()=>{
    try{
       const articles = await fetchRandomNews();
       displayBlogs(articles);
    }
    catch(error){
        console.error("Error fetching random news",error);
    }
})();