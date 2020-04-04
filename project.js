// Ana js dosyası

const form = document.querySelector("#film-form"); // form elementimizi html dosyasından seçiyoruz.
const secondCardBody = document.querySelectorAll(".card-body")[1]; //2. cardbody elementimize erişiyoruz.
const clearButton = document.getElementById("clear-films");

//Input Field'ları seçelim.
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");

eventListeners();

//Tüm Eventleri Yükleme
function eventListeners(){
    
    form.addEventListener("submit",addFilm);

    document.addEventListener("DOMContentLoaded",function(e){ // Sayfa Yüklendiğinde oluşacak event
        const films = Sotrage.getFilmsFromStorage();
        UI.loadAllFilms(films);
    });

    secondCardBody.addEventListener("click",deleteFilm);

    clearButton.addEventListener("click",clearAllFilms);

}

//Spesifik Fonksiyonlar:
function isExists(newFilm){ //Film daha önce eklendiyse eklememek için kontrol fonksiyonu
    const films = Sotrage.getFilmsFromStorage();
    let cond = false;
    films.forEach(function(film){
        if(film.title.toLowerCase() === newFilm.title.toLowerCase()){ // bu film daha önce eklenmiş.
            cond = true;
        }
    });
    return cond;
}

function addFilm(e){

    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;
    const newFilm = new Film(title,director,url);

    if(title === "" || director === "" || url === ""){
        //Bilgilendirme,Hata Mesajları
        UI.displayInfoMessages("Film Eklemek İçin Tüm Alanları Doldurmalısınız !","danger");

    }else if(isExists(newFilm)){
        //Film Zaten Daha Önce Eklenmiş
        UI.displayInfoMessages(`${newFilm.title} Filmi Zaten Eklenmiş!`,"danger");

    }else{
        //Yeni Film Ekle
        UI.addFilmToUI(newFilm); // Arayüze Film Ekleme.
        UI.displayInfoMessages(`${title} Filmi Başarıyla Eklendi.`,"success");
        
        Sotrage.addFilmToStorage(newFilm);//Storage'a Film ekleme
    }

    UI.clearInputs(titleElement,directorElement,urlElement); // Ekleme işleminden sonra kullanım kolaylığı açısından field'larımızı temizliyoruz.
    e.preventDefault();
}

function deleteFilm(e){ // Event Capturing mantığı ile CardBody'de e.target kullanarak nereye tıkalndığını saptayıp ona göre silme işlemini yapacağız.
    //Sil butnouna(a etiketi'ne) basıldığında tr elementini silmek için 2 defa üst parent'ına gitmeliyiz.    
    
    if(e.target.id === "delete-film"){ // a etiketine tıklandıysa
        UI.deleteFilmFromUI(e.target);
        Sotrage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        UI.displayInfoMessages(`${e.target.parentElement.previousElementSibling.previousElementSibling.textContent} Filmi Başarıyla Silindi.`,"success");
    }
}

function clearAllFilms(){
    if(confirm("Tüm Filmleri Silmek istediğinizden Emin Misiniz ?")){
        UI.clearAllFilmsFromUI();
        Sotrage.clearAllFilmsFromStorage();
    }
}
