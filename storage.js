// Local Storage İşlemleri için

class Sotrage { // ES6 Standartlarında Storage Classı

    static addFilmToStorage(newFilm){
        let films = this.getFilmsFromStorage(); //storage'dan arrayi alıyoruz.
    
        films.push(newFilm);
        /*[
            {title:"asdasd",director:"sdkf",url:"dasdasd"} // gibi bir yapıda (obje eklemesi) yapacağız.
          ]*/
        localStorage.setItem("films",JSON.stringify(films)); // local Storage'a films arrayini ekliyoruz.
    }
    
    static getFilmsFromStorage() {
        let films;
    
        if(localStorage.getItem("films") === null){ //films key'i local Storage'da var mı kontrolü
            films = [];
        }else{
            films = JSON.parse(localStorage.getItem("films")); // filmleri string'den array haline getiriyoruz.
        }
        return films;
    }
    
    static deleteFilmFromStorage(title){
        let films = this.getFilmsFromStorage();
    
        films.forEach(function(film,index){ // obje ve o objenin index bilgisi
            if(film.title === title){
                //arrayden sil (splice)
                films.splice(index,1);
            }
        });
    
        localStorage.setItem("films",JSON.stringify(films)); // silme işleminden sonra yeni array'i tekrar localStorage'a ekliyoruz.
    }
    
    static clearAllFilmsFromStorage(){
        localStorage.removeItem("films"); // localStorage'dan films key'ine sahip value'u silersek direkt olarak hepsini silmiş oluruz.
    }
}
