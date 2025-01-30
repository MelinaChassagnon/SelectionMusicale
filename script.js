console.log(datas);

// création d'une variable permettant de savoir si la div de chaque musique est pair ou impaire
var pair = 0;

//fonction se répétant pour chaque valeur du tableau "data"
datas.forEach(function (afficher, index) {
    console.log("Musiques: " + afficher);

    //aide de l'IA pour la création d'un compteur qui s'incrémente à chaque répétition de la boucle
    const audioId = `audio${index + 1}`;
    const buttonClass = `button${index + 1}`;
    const spriteId = `sprite_animation${index + 1}`;

    //si la div de la musique est impair (soit que pair/2 à pour reste 0)
    if (pair % 2 == 0) {

        //on ajoute l'html dans la class "liste-musiques"
        document.querySelector('.liste-musiques').innerHTML +=
            `<div class='container'>
                <section class='groupe1'>
                    <h1>${afficher.musique}</h1>
                    <p>${afficher.artiste}<p>
                </section>
                <div class='box1'>
                    <div class='audio1'>
                        <div class='sprite_animation' id='${spriteId}'></div>
                        <audio src='${afficher.nom_audio}' id='${audioId}'></audio>
                        <img src='img/play_btn.png' alt="bouton_play/pause" class='${buttonClass} play-btn' data-audio='${audioId}'>
                        <a href='${afficher.lien_spotify}' ><img src='img/spotify.png' alt="Spotify" class='lien1'></a>
                        <a href='${afficher.lien_youtube}' ><img src='img/youtube.png' alt="Youtube" class='lien2'></a>
                        <a href='${afficher.lien_deezer}' ><img src='img/deezer.png' alt="Deezer" class='lien3'></a>
                    </div>
                    <div class='description1'>
                        <h2>Description</h2>
                        <p class='description-text1'>${afficher.description_text}</p>
                        <div class='image1'>
                            <img src='${afficher.img}' alt="image_description" class='img'>
                        </div>
                    </div>
                </div>
            </div>`;

    //si la div de la musique n'est pas impair alors:
    } else {
        document.querySelector('.liste-musiques').innerHTML +=
            `<div class='container'>
                <section class='groupe2'>
                    <h1>${afficher.musique}</h1>
                    <p>${afficher.artiste}<p>
                </section>
                <div class='box2'>
                    <div class='description2'>
                        <div class='image2'>
                            <img src='${afficher.img}' alt="image_description" class='img'>
                        </div>
                        <p class='description-text2'>${afficher.description_text}</p>
                        <h2>Description</h2>
                    </div>
                    <div class='audio2'>
                            <div class='sprite_animation' id='${spriteId}'></div>
                            <audio src='${afficher.nom_audio}' id='${audioId}'></audio>
                            <img src='img/play_btn.png' alt="bouton_play/pause" class='${buttonClass} play-btn' data-audio='${audioId}'>
                            <a href='${afficher.lien_spotify}' ><img src='img/spotify.png' alt="Spotify" class='lien1'></a>
                            <a href='${afficher.lien_youtube}' ><img src='img/youtube.png' alt="Youtube" class='lien2'></a>
                            <a href='${afficher.lien_deezer}' ><img src='img/deezer.png' alt="Deezer" class='lien3'></a>
                    </div>
                </div>
            </div>`;
    }

    //on incrémente la variable "pair"
    pair++;
});

//Gestion des boutons de lecture
document.querySelector('.liste-musiques').addEventListener('click', (event) => {
    //si l'utilisateur clique sur les images comportant la classe "play-btn"
    if (event.target.tagName === 'IMG' && event.target.classList.contains('play-btn')) {
        const img = event.target;
        const audioId = img.dataset.audio;
        const audio = document.getElementById(audioId);
        const sprite = audio.closest('.audio1, .audio2').querySelector('.sprite_animation');    //aide de l'IA pour la constante "sprite"

        // Arrête tous les autres audios et vinyles
        document.querySelectorAll('audio').forEach((otherAudio) => {
            if (!otherAudio.paused && otherAudio !== audio) {
                otherAudio.pause();
                const otherImg = document.querySelector(`img[data-audio='${otherAudio.id}']`);
                if (otherImg) {
                    otherImg.src = 'img/play_btn.png'; //Remettre le bouton de lecture
                }
                
                const autreSprite = otherAudio.closest('.audio1, .audio2').querySelector('.sprite_animation');
                if (autreSprite){
                    autreSprite.style.animationPlayState = "Paused";
                }
            }
        });

        //Lecture ou pause de l'audio sélectionné et de son vinyle
        if (audio.paused) {
            audio.play();
            img.src = 'img/pause_btn.png'; //Change l'image en bouton pause
            sprite.style.animationPlayState = "running";
            
        } else {
            audio.pause();
            img.src = 'img/play_btn.png'; //Change l'image en bouton lecture
                sprite.style.animationPlayState = "paused";
            
        }

        // si l'audio est terminé
        audio.addEventListener('ended', () => {
            img.src = 'img/play_btn.png'; 
            sprite.style.animationPlayState = "paused";
        });
    }
});

const audioInput = document.getElementById("audio");

//réglages des inputs du formulaire
document.getElementById('submit').addEventListener('click', function (u){
    
    //récupération des réponses de l'utilisateur et des messages d'erreurs dans l'html    
    const musiqueInput = document.getElementById("musique");
    const musiqueError = document.getElementById("musiqueError");

    const artisteInput = document.getElementById("artiste");
    const artisteError = document.getElementById("artisteError");

    const descriptionInput = document.getElementById("description");
    const descriptionError = document.getElementById("descriptionError");

    
    const audioError = document.getElementById("audioError");
    const audioError2 = document.getElementById("audioError2");  //si un url est demandé dans le formulaire

    const imageInput = document.getElementById("image");
    const imageError = document.getElementById("imageError");
    const imageError2 = document.getElementById("imageError2");


    if (musiqueInput.validity.valid) {  //si la réponse est valide:
        musiqueError.style.display = "none";   //le message d'erreur ne s'affiche pas 
        musiqueInput.style.borderBottom = "";   //l'input garde son apparence
      } else {  //si la réponse est invalide
        musiqueError.style.display = "block";   //le message d'erreur est affiché
        musiqueInput.style.borderBottom = "5px solid #ff365e";  //la bordure basse de l'input devient rouge
        u.preventDefault();     // Empêche la soumission du formulaire
      }

      if (artisteInput.validity.valid) {  //si la réponse est valide:
        artisteError.style.display = "none";   //le message d'erreur ne s'affiche pas 
        artisteInput.style.borderBottom = "";   //l'input garde son apparence
      } else {  //si la réponse est invalide
        artisteError.style.display = "block";   //le message d'erreur est affiché
        artisteInput.style.borderBottom = "5px solid #ff365e";  //la bordure basse de l'input devient rouge
        u.preventDefault();     // Empêche la soumission du formulaire
      }

    //même chose qu'avec le nom de la musique
    if (descriptionInput.validity.valid) {
        descriptionError.style.display = "none";
        descriptionInput.style.border = "";
      } else {
        descriptionError.style.display = "block";
        descriptionInput.style.border = "3px solid #ff365e";
        descriptionInput.style.borderBottom = "5px solid #ff365e";
        u.preventDefault();
      }

    if (audioInput.value.trim() === "") {   //si l'input de l'audio est vide
           audioError.style.display = "block";
            audioInput.style.borderBottom = "5px solid #ff365e";  //si un url est demandé dans le formulaire
        u.preventDefault(); 
    } 

    //si un url est demandé dans le formulaire
    else if (!audioInput.validity.valid) {    //si la réponse est invalide
        audioError2.style.display = "block";
        audioInput.style.borderBottom = "5px solid #ff365e";
        u.preventDefault(); 
        if(!audioInput.value.trim()==""){   //si l'input est vide
            audioError.style.display="none";
            audioInput.style.borderBottom = "5px solid #ff365e";
        }
    }
    else {  //si la réponse est valide
        audioError.style.display="none";
        audioError2.style.display="none";
        audioInput.style.borderBottom = "";
    }

    //même chose qu'avec l'audio
    if (imageInput.value.trim() === "") {
        imageError.style.display = "block";
        imageInput.style.borderBottom = "5px solid #ff365e";
        u.preventDefault(); // Empêche la soumission du formulaire
    } else if (!imageInput.validity.valid) {
        imageError2.style.display = "block";
        imageInput.style.borderBottom = "5px solid #ff365e";
        u.preventDefault(); // Empêche la soumission du formulaire
        if(!imageInput.value.trim()==""){
            imageError.style.display="none";
        }
    }
    else {
        imageError.style.display="none";
        imageError2.style.display="none";
        imageInput.style.borderBottom = "";
    }

});


// Fenêtre modale créée à l'aide du tutoriel: https://youtu.be/3MUmRP9013I?si=YwbTpVAXSfA02JZg
// Ajout d'une nouvelle musique via le formulaire
document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();     //la page ne se met pas à jour

    //création de constantes récupérant les réponses de l'utilisateur
    const form_musique = document.getElementById('musique').value;
    const form_artiste = document.getElementById('artiste').value;
    const form_description = document.getElementById('description').value;
    const form_image = document.getElementById('image').value;
    const form_audio = document.getElementById('audio').value;

    const form_lien1 = document.getElementById('lien1').value;
    const form_lien2 = document.getElementById('lien2').value;
    const form_lien3 = document.getElementById('lien3').value;
    
    const newAudioId = `audio${document.querySelectorAll('audio').length + 1}`;
    const newButtonClass = `button${document.querySelectorAll('audio').length + 1}`;
    const newSpriteId = `sprite_animation${document.querySelectorAll('audio').length + 1}`;

    //affichage de la preview
    if ((pair+1)%2==0) {    //si la prochaine div de musique est pair
        document.querySelector('.preview_container').innerHTML =    //intégration de la preview dans la class "preview_container"
            "<section class='preview_groupe1'>"+
                "<h1 id='preview_musique'></h1><p id='preview_artiste'></p></section>"+
            "<div class='preview_box1'>"+
                "<div class='preview_audio1'>"+
                    "<div class='preview_sprite_animation'></div>"+
                    "<img src='img/play_btn.png' alt='bouton_play/pause' class='preview_play-btn' data-audio=''>"+
                        "<a href='' ><img src='img/spotify.png' alt='Spotify' class='preview_lien1'></a>"+
                        "<a href='' ><img src='img/youtube.png' alt='Youtube' class='preview_lien2'></a>"+
                        "<a href='' ><img src='img/deezer.png' alt='Deezer' class='preview_lien3'></a>"+
                "</div>"+
                "<div class='preview_description1'>"+
                    "<h2>Description</h2>"+
                    "<p class='preview_description-text1' id='preview_description-text'> "+
                    "</p>"+
                    "<div class='preview_image1' id='preview_image'><img src='' alt='image_description' id='preview_img'></div>"+
                "</div>"+
            "</div>";
    } else {    //si la prochaine div de musique est impaire
        document.querySelector('.preview_container').innerHTML =
        "<section class='preview_groupe2'>"+
            "<h1 id='preview_musique'></h1><p id='preview_artiste'></p></section>"+
        "<div class='preview_box2'>"+
            "<div class='preview_description2'>"+
                "<div class='preview_image2' id='preview_image'><img src='' alt='image_description' id='preview_img'></div>"+
                "<p class='preview_description-text2' id='preview_description-text'> "+
                "</p>"+
                "<h2>Description</h2>"+
            "</div>"+
            "<div class='preview_audio2'>"+
                "<div class='preview_sprite_animation'></div>"+
                "<img src='img/play_btn.png' alt='bouton_play/pause' class='preview_play-btn' data-audio=''>"+
                            "<a href='' ><img src='img/spotify.png' alt='Spotify' class='preview_lien1'></a>"+
                            "<a href='' ><img src='img/youtube.png' alt='Youtube' class='preview_lien2'></a>"+
                            "<a href='' ><img src='img/deezer.png' alt='Deezer' class='preview_lien3'></a>"+
        "</div>";
    }

    //création d'une nouvelle div musique en récupérant les réponses du formulaire
    if(pair%2==0){  //si la div musique est pair
        document.querySelector('.liste-musiques').innerHTML +=
            `<div class='container'>
                <section class='groupe1'>
                    <h1 class='h1_1'>${form_musique}</h1>
                    <p>${form_artiste}</p>
                </section>
                <div class='box1'>
                    <div class='audio1'>
                        <div class='sprite_animation' id='${newSpriteId}'></div>`+
                        //`<audio src='${audioUrl}' id='${newAudioId}'></audio>+`+
                        `<audio src='${form_audio}' id='${newAudioId}'></audio>`+   //si un url est demandé dans le formulaire
                        `<img src='img/play_btn.png' alt='bouton_play/pause' class='${newButtonClass} play-btn' data-audio='${newAudioId}'>
                            <a href='${form_lien1}' ><img src='img/spotify.png' alt='Spotify' class='lien1'></a>
                            <a href='${form_lien2}' ><img src='img/youtube.png' alt='Youtube' class='lien2'></a>
                            <a href='${form_lien3}' ><img src='img/deezer.png' alt='Deezer' class='lien3'></a>
                    </div>
                    <div class='description1'>
                        <h2>Description</h2>
                        <p class='description-text1'>${form_description}</p>
                        <div class='image1'><img src='${form_image}' alt='image_description' class='img'></div>
                    </div>
                </div>
            </div>`;

        
    } else {    //si la div musique est impair
        document.querySelector('.liste-musiques').innerHTML +=
            `<div class='container'>
                <section class='groupe2'>
                    <h1 class='h1_2'>${form_musique}</h1>
                    <p>${form_artiste}</p>
                </section>
                <div class='box2'>
                    <div class='description2'>
                        <div class='image2'><img src='${form_image}' alt='image_description' class='img'></div>
                        <p class='description-text2'>${form_description}</p>
                        <h2>Description</h2>
                    </div>
                    <div class='audio2'>
                        <div class='sprite_animation' id='${newSpriteId}'></div>`+
                        //`<audio src='${audioUrl}' id='${newAudioId}'></audio>`+
                        `<audio src='${form_audio}' id='${newAudioId}'></audio>`+   //si un url est demandé dans le formulaire
                        `<img src='img/play_btn.png' alt='bouton_play/pause' class='${newButtonClass} play-btn' data-audio='${newAudioId}'>
                            <a href='${form_lien1}' ><img src='img/spotify.png' alt='Spotify' class='lien1'></a>
                            <a href='${form_lien2}' ><img src='img/youtube.png' alt='Youtube' class='lien2'></a>
                            <a href='${form_lien3}' ><img src='img/deezer.png' alt='Deezer' class='lien3'></a>
                    </div>
                </div>
            </div>`;

            
    }
    pair+=1;    //incrémentation de "pair"

    var inputs = document.querySelectorAll('input');    //création d'une variable "inputs"

    inputs.forEach(function(input) {    //boucle se répétant pour chaque input
        input.style.borderBottom = "";  //Applique la bordure à chaque champ input

        
    });

    //effacement de l'ancienne réponse utilisateur
    document.getElementById('musique').value = '';
    document.getElementById('artiste').value = '';
    document.getElementById('description').value = '';
    document.getElementById('audio').value = '';
    document.getElementById('image').value = '';
    document.getElementById('lien1').value = '';
    document.getElementById('lien2').value = '';
    document.getElementById('lien3').value = '';

});

//création de deux constantes pour la fenêtre modale
const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

//si l'utilisateur clique sur le bouton de la fenêtre modale
//appel de la fonction toggleModal
modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

function toggleModal(){
    modalContainer.classList.toggle("active")   //active la fenêtre modale

    //affiche la preview selon si la div musique doit être paire ou impaire
    if ((pair)%2==0){
        document.querySelector('.preview_container').innerHTML =
            "<section class='preview_groupe1'>"+
            "<h1 id='preview_musique'></h1>"+
            "<p id='preview_artiste'></p></section>"+
        "<div class='preview_box1'>"+
            "<div class='preview_description1'>"+
                "<h2>Description</h2>"+
                "<div class='preview_image1' id='preview_image'><img src='' alt='image_description' id='preview_img'></div>"+
                "<p class='preview_description-text2' id='preview_description-text'> "+
                "</p>"+
            "</div>"+
            "<div class='preview_audio1'>"+
                "<div class='preview_sprite_animation'></div>"+
                "<img src='img/play_btn.png' alt='bouton_play/pause' class='preview_play-btn' data-audio=''>"+
                "<a href='' ><img src='img/spotify.png' alt='Spotify' class='preview_lien1'></a>"+
                "<a href='' ><img src='img/youtube.png' alt='Youtube' class='preview_lien2'></a>"+
                "<a href='' ><img src='img/deezer.png' alt='Deezer' class='preview_lien3'></a>"+
        "</div>";
    }else{
        document.querySelector('.preview_container').innerHTML =
            "<section class='preview_groupe2'>"+
                "<h1 id='preview_musique'></h1><p id='preview_artiste'></p></section>"+
            "<div class='preview_box2'>"+
                "<div class='preview_description2'>"+
                    "<div class='preview_image2' id='preview_image'><img src='' alt='image_description' id='preview_img'></div>"+
                    "<p class='preview_description-text2' id='preview_description-text'> "+
                    "</p>"+
                    "<h2>Description</h2>"+
                "</div>"+
                "<div class='preview_audio2'>"+
                    "<div class='preview_sprite_animation'></div>"+
                    "<img src='img/play_btn.png' alt='bouon_play/pause' class='preview_play-btn' data-audio=''>"+
                    "<a href='' ><img src='img/spotify.png' alt='Spotify' class='preview_lien1'></a>"+
                    "<a href='' ><img src='img/youtube.png' alt='Youtube' class='preview_lien2'></a>"+
                    "<a href='' ><img src='img/deezer.png' alt='Deezer' class='preview_lien3'></a>"+
            "</div>";
    }
}

//ajoute le texte de la réponse utilisateur dans la preview
function form_musique(musique){
    document.getElementById('preview_musique').innerText = musique.value;
}

function form_artiste(artiste){
    document.getElementById('preview_artiste').innerText = artiste.value;
}

//ajoute le texte de la réponse utilisateur dans la preview
function form_description(description){
    document.getElementById('preview_description-text').innerText = description.value;
}

//ajoute l'image de la réponse utilisateur dans la preview
function form_image(image){
    document.getElementById('preview_image').innerHTML = "<img src='"+image.value+"' alt='' class='preview_img2'>";
}


//création de variables pour le compteur du formulaire
var counter = document.getElementById("counter");
var counter1 = document.getElementById("counter1");
var counter2 = document.getElementById("counter2");
var limit1 = 21;
var limit = 700;
var almostLimit1 = 16;
var almostLimit = 690;

//Affiche le compteur de caractères
counter1.textContent = 0 + "/" + limit1;
counter2.textContent = 0 + "/" + limit1;
counter.textContent = 0 + "/" + limit;


musique.addEventListener("input", function () {
    var musiqueLength = musique.value.length;//Compte le nombre de caractères tapés
    counter1.textContent = musiqueLength + "/" + limit1; //Met à jour le compteur de caractères

    if (musiqueLength > almostLimit1) {
        counter1.style.color = "#c95d42";
    }


    if (musiqueLength > 21) {
        counter1.style.color = "#ff365e";
    }

 
    if (musiqueLength < almostLimit1) {
        counter1.style.color = "gray";
    }


});

artiste.addEventListener("input", function () {
    var artisteLength = artiste.value.length;//Compte le nombre de caractères tapés
    counter2.textContent = artisteLength + "/" + limit1; //Met à jour le compteur de caractères

    if (artisteLength > almostLimit1) {
        counter2.style.color = "#c95d42";
    }


    if (artisteLength > 21) {
        counter2.style.color = "#ff365e";
    }

 
    if (artisteLength < almostLimit1) {
        counter2.style.color = "gray";
    }


});

//Quand on écrit dans "description", le compteur de caractere se met à jour
description.addEventListener("input", function () {
    var descriptionLength = description.value.length;//Compte le nombre de caractères tapés
    counter.textContent = descriptionLength + "/" + limit; //Met à jour le compteur de caractères

    if (descriptionLength > almostLimit) {
        counter.style.color = "#c95d42";
    }


    if (descriptionLength > 699) {
        counter.style.color = "#ff365e";
    }

 
    if (descriptionLength < almostLimit) {
        counter.style.color = "gray";
    }


});