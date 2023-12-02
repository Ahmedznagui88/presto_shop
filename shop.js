//Carousel (imgUNo & imgDue)
function startAnimationProd() {
    
    var i = 0;
    
    
    setInterval(()=>{
        document.getElementById("imgDue").style.transition = "2s opacity"  
        document.getElementById("imgDue").style.opacity = "0"
        document.getElementById("imgUno").style.transition = "2s opacity"  
        document.getElementById("imgUno").style.opacity = "0"
        
        setTimeout(() =>{
            if(i== 0){
                document.getElementById("imgDue").src = "./images/Ferra Borsa 2.webp"  
                document.getElementById("imgUno").src = "./images/Crema.webp"  
            }else if (i == 1){
                document.getElementById("imgDue").src = "./images/Ferra Borsa.webp" 
                document.getElementById("imgUno").src = "./images/CosmeticChanel.webp" 
            }else if (i == 2){
                document.getElementById("imgDue").src = "./images/ferragamo.webp" 
                document.getElementById("imgUno").src = "./images/Profumo.webp" 
            }else if(i == 3) {
                document.getElementById("imgDue").src = "./images/Ferra Borsa 2.webp" 
                document.getElementById("imgUno").src = "./images/Cccchanel.webp"  
                i = 0;
            }
            
            
            
            
            document.getElementById("imgDue",).style.opacity = "1"
            document.getElementById("imgDue",).style.transition = "2s opacity"
            document.getElementById("imgUno",).style.opacity = "1"
            document.getElementById("imgUno",).style.transition = "2s opacity"  
            
            
        },2000)
        
        i++
        
    },4000)
}

window.addEventListener("load", function(){
    startAnimationProd()
})


//modale
function openModal(){
    
    document.getElementById("modalDiv").style.transition = "1s opacity"  
    document.getElementById("modalDiv").style.opacity = "0"
    document.getElementById("modalDiv").style.display = "block" 
    
    setTimeout(function(){
        document.getElementById("modalDiv").style.opacity = "1"
    },20)
}
function closeModal(){
    document.getElementById("modalDiv").style.opacity = "0"
    
    setTimeout(function(){
        document.getElementById("modalDiv").style.display = "none"
    },1000)
}


//change window
window.addEventListener("load", function(){
    
    
    if(this.window.location.href.includes("shop.html")){
        console.log("questa e la pagina principale");
        
    }else if (this.window.location.href.includes("shop2.html")){
        
        let url = new URL(this.window.location.href)
        let filtroCategoria = url.searchParams.get("filterCategory")
        let filtroPrezzo = url.searchParams.get("filterPrice")
        let filtroNome = url.searchParams.get("filterNome")
        let limiteInferiorePrezzo = null;
        let limiteSuperiorePrezzo = null;
        
        
        
        if (filtroCategoria == "gioielli") {
            filtroCategoria = "jewelery"
        } else if (filtroCategoria == "elettronica") {
            filtroCategoria = "electronics"
        } else if (filtroCategoria == "modaUomo") {
            filtroCategoria = "men's clothing"
        } else if (filtroCategoria == "modaDonna") {
            filtroCategoria = "women's clothing"
        }
        
        if (filtroPrezzo != null){
            limiteInferiorePrezzo = filtroPrezzo.split("-")[0]
            limiteSuperiorePrezzo = filtroPrezzo.split("-")[1]
        }
        console.log(limiteInferiorePrezzo);
        console.log(limiteSuperiorePrezzo);
        
        filtraProdotti(filtroCategoria, filtroPrezzo, filtroNome) 
        
    }   else if (this.window.location.href.includes("prodotto.html")){
        let url = new URL(this.window.location.href)
        
        let idProdotto = url.searchParams.get("idProucts")
        
        
        ottieniProdotto(idProdotto)
        
    }
})

function cambiaPagina(){
    
    let inputCategoria = document.getElementById("inputCategoria").value
    let inputPrezzo = document.getElementById("inputPrezzo").value
    let inputNome = document.getElementById("inputNome").value
    
    
    window.location.href = "./shop2.html?" + "filterCategory=" + inputCategoria + "&filterPrice=" + inputPrezzo + "&filterNome="+ inputNome 
}   


function vaiCatalogoFiltrato() {
    
    window.location.href = "./shop2.html?" + "filterCategory=" + inputCategoria + "&filterPrice=" + inputPrezzo + "&filterNome="+ inputNome 
}   

function vaiCatalogoFiltrato() {
    
    window.location.href = "./shop2.html?" + "filterCategory=" + filtroCategoriaCategoria
}



function filtraProdotti(filterCategory, minPrice, maxPrice, filterName){
    console.log("sto prendendo i dati");
    
    
    
    
    
    fetch("https://fakestoreapi.com/products/")
    .then(response => response.json())
    .then(data => {
        
        console.log(data);
        
        let datiFiltrati = [];
        
        
        for(let i = 0 ; i < data?.length; i++){
            
            let condizione;
            
            if (filterCategory != null && minPrice != null && maxPrice != null && filterName != null) {
                condizione = data[i].price >= minPrice && data[i].price <= maxPrice && data[i].category == filterCategory && data[i].title.startsWith(filterName)
                console.log('sono il primo');
            } else if (filterCategory != null && minPrice == null && maxPrice == null && filterName == null) {
                condizione = data[i].category == filterCategory
                console.log('sono il secondo')
            }else if (filterCategory != null && minPrice != null && maxPrice != null && filterName == null) {
                condizione = data[i].price >= minPrice && data[i].price <= maxPrice && data[i].category == filterCategory
                console.log('sono il terzo')
                
            }
            
            
            console.log('sono la condizione');
            console.log('sono il primo')
            if(condizione){ 
                datiFiltrati.push(data[i]);
                
            }
            console.log("ho filtrato i dati vecioooooo");
            console.log(datiFiltrati);            
            
            for(let i = 0 ; i < datiFiltrati.length; i++){
                let divCard = document.createElement("div");
                divCard.classList.add("cardProduct");
                let urlImmagine = datiFiltrati[i].image;
                let description = datiFiltrati[i].description;
                let title = datiFiltrati[i].title;
                let price = datiFiltrati[i].price;
                
                console.log("skrrrrrrrr");  
                
                
                divCard.innerHTML = ` <img src="${urlImmagine}" style="height: 320px; width: 319px; border-top-left-radius:60px;border-top-right-radius:60px;border-bottom: 0px; object-fit: cover; ">
                
                <div style="padding: 30px;">
                
                <h3>${title}</h3>
                <p style="font-size: 20px;">${description}</p>
                <h3 style="font-size: 30px;">€${price}</h3>
                
                </div>
                `
                
                
                document.getElementById("container").appendChild(divCard);
            }
        }
    }).catch(error =>{
        console.log("Si è verificato un errore");
        console.log(error);
    })
} 
//comunicazione (protocollo HTTP) -> prevede che la comunicazione avvenga tramite pacchetti di dati (informazione)


//GET ottieni i dati dal server
//POST metti i dati al server 
//PUT aggiornare i dati 
//DELETE elimineare i dati dal server



