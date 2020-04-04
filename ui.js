// Arayüz işlemleri için

class UI { //ES6 Standartlarında UI Classı
    
    static addFilmToUI (newFilm){
        // araYüze ekleme işlemi için önce tbody elementimizi seçmeliyiz
        /*
        //Bu Yapıyı oluşturalım.
           <!-- <tr>
                <td><img src="" class="img-fluid img-thumbnail"></td>
                <td></td>
                <td></td>
                <td><a href="#" id = "delete-film" class = "btn btn-danger">Filmi Sil</a></td>
            </tr> --> 
        */
        const filmList = document.getElementById("films"); // tbody'nin içerisine (yani innerHTML'ine) tr'ler şeklinde eklemelerimizi yapacağız.
        filmList.innerHTML +=`
            <tr>
                <td><img = src="${newFilm.url}" class = "img-fluid img-thumbnail"></td>
                <td>${newFilm.title}</td>
                <td>${newFilm.director}</td>
                <td> <a = href = "#" id ="delete-film" class = "btn btn-danger">Filmi Sil</a></td>
                </tr>
        `
        // burada += ile ekleme yaptık çünkü eski eklenenler'in üzerine yazılmasın, eskiler de yeni eklenenler ile birlikte gözükmesini amaçlıyoruz.
    }
    
    static clearInputs (i1,i2,i3){
        i1.value = "";
        i2.value = "";
        i3.value = "";
    }
    
    static displayInfoMessages (message,messageType){
        /*
        //Bu Yapıyı oluşturalım.
        <div class="alert alert-danger" role="alert">
            Hata Mesajı!
        </div>
        //Bu şekilde bir div yapısını html dosyamızda, form'un altındak, hr elementinin'nin altına child olarak eklemeliyiz.
        */
        const cardBody = document.querySelectorAll(".card-body")[0]; // ilk cardBody'i seçiyoruz.
        
        //Alert Div yapısını oluşturalım
        const div = document.createElement("div");
        div.className = `alert alert-${messageType}`;
        div.textContent = message;
    
        cardBody.appendChild(div);
    
        //belli bir süre sonra ui'dan bu bilgi mesajının silinmesi için;
        setTimeout(function(){
            div.remove(); // 2sn sonra div elementimizi sayfamızdan temizliyoruz.
        },2000);
    }
    
    static loadAllFilms (films){
        const filmList = document.getElementById("films"); //tbody'i id'sine göre seçiyoruz.
        
        films.forEach(function(film){ // films arrayinde gezinerek filmleri tek tek arayüze aktarıyoruz.
            filmList.innerHTML += `<tr>
            <td><img = src="${film.url}" class = "img-fluid img-thumbnail"></td>
            <td>${film.title}</td>
            <td>${film.director}</td>
            <td> <a = href = "#" id ="delete-film" class = "btn btn-danger">Filmi Sil</a></td>
            </tr>
            `
            //yine üzerine ekleme yapması adına += kullandık.
        });
    }
    
    static deleteFilmFromUI (element){
        element.parentElement.parentElement.remove(); //a elementinden parentElement ile önce td'ye daha sonra tr'ye eriştik ve bu erişitğimiz tr'yi kaldırıyoruz.
    }
    
    static clearAllFilmsFromUI (){
        const filmList = document.getElementById("films"); //tbdoy'i seçiyoruz.
    
        // filmList.innerHTML = ""; //1. Yöntem (Yavaş Çalışan Yöntem)
    
        while(filmList.firstElementChild !== null){ // child olduğu sürece
            filmList.firstElementChild.remove();
        }
    }
}

