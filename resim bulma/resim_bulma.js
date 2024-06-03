const formWrapper= document.querySelector(".form-wrapper");
const form = document.querySelector("#form");
const searchİnput = document.querySelector("#searchİnput");
const buttonWrapper = document.querySelector(".button-wrapper");
const searchButton= document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");
const imglistWrapper = document.querySelector(".imglist-wrapper");

alert("Arayacağınız resmi ingilizce olarak giriniz");

runEventListeners();


function runEventListeners (){
form.addEventListener("submit", search);
clearButton.addEventListener("click",clear);
}

function clear(){
  
    searchİnput.value= "";
    // Array.from(imglistWrapper.children).forEach((child)=>child.remove()) /* çocukları dönebilmek için array çevirdim  */
    imglistWrapper.innerHTML="";
    
}

function search(e){

   const value =  searchİnput.value.trim(); /* Girilen değeri sağdan soldan boşlukları temizlenmiş (trim) şekilde aldık */ 
  
    /* Buraya istek atıcam*/
    fetch(`https://api.unsplash.com/search/photos?query=${value}`,{  /* istek atıyorum */
        method : "GET" ,  /* get isteğinde bullunuyoruz */
        headers : {
            Authorization: " Client-ID PJZxlyAoYLGrLEh1-w1gg7wqCNycxOc0V5eBtNgELzQ" /* yetkilendirme */
        }
    })
  
    .then((res)=> res.json())
    .then((data)=>{
        Array.from(data.results).forEach((image)=>{  /* yakaladığım resimleri dönüyorum */
           addImageToUI(image.urls.small) /* fotoğrafın small boyutunu aldım */
        });
    })
    .catch((err)=>console.log(err))

    e.preventDefault();/* flaş yazpmasını engeller */
}

function addImageToUI( url){ /* arayüze ekleme */

   /*
       <div class="card">
          <img src=""
       </div>
   */
   
    const div = document.createElement("div"); /* her resim için ayrı div */
    div.className="card";

    const img = document.createElement("img");
    img.setAttribute("src",url); /* resmin kendisini basacağımız src  */
    img.height= '400';
    img.width= '400';

    div.append(img); /* img yi div in içine koyduk */
    imglistWrapper.append(div); 
}