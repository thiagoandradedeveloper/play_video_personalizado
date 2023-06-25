window.onload = function(){

    var fileInput = document.getElementById('fileInput');
    let video     = document.getElementById('myVideo');
    let play      = document.getElementById('play');
    let pause     = document.getElementById('pause');
    let reload    = document.getElementById('reload');
    let line      = document.getElementById('line'); //input type="range"
    let mud       = document.getElementById('mud');
    let time      = document.getElementById('timeCurrent');
    let volume    = document.getElementById('volume');
    let vm        = document.getElementById('volume+');
    let vmm       = document.getElementById('volume++');
    let vs        = document.getElementById('volume-');
    let vss       = document.getElementById('volume--');
    let tempoTotal= document.getElementById('tempoTotal');
    let full      = document.getElementById('full');
    let titulo    = document.getElementById('titulo');
    line.max      = video.duration;
    video.volume  = 0.5;
    tempoTotal.innerText = ajustarTime(Math.floor(video.duration));

    // Aumentar a velocidade de reprodução
    video.playbackRate = 2.0;

    // Diminuir a velocidade de reprodução
    video.playbackRate = 0.5;

    // Diminuir a velocidade de reprodução
    video.playbackRate = 1.0;

    console.log('Largura do quadro de vídeo: ' + video.videoWidth 
                + ' pixels');
    console.log('Altura do quadro de vídeo: '  + video.videoHeight 
                + ' pixels');
    console.log('Taxa de quadros do vídeo: ' + video.videoPlaybackRate 
                + ' fps');

    fileInput.addEventListener('change', function(event) {
        var file = event.target.files[0];
        console.log(file.size)
        console.log(file.name)
        console.log(file.type)
        var videoURL = URL.createObjectURL(file);
        video.src = videoURL;
        video.addEventListener('loadeddata',()=>{
            line.max = video.duration;
            titulo.innerText = file.name;
            tempoTotal.innerText = ajustarTime(Math.floor(video.duration));
            proporcao = video.videoHeight / video.videoWidth
            let w = video.videoWidth;
            let h = video.videoHeight;
            if(w >= 850){
                w = 850;
                h = Math.floor(850 * proporcao)
            }
            video.style.width  = (w-1)  + 'px';
            video.style.height = h + 'px';
            video.style.top = '10px';
            video.play();
        })
    });
    function fullScreen(){
        //fullscreen documento
        /*if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { // Firefox
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, Opera
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
            document.documentElement.msRequestFullscreen();
        }*/
        //fullscreen video
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) { // Firefox
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) { // Chrome, Safari, Opera
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) { // IE/Edge
            video.msRequestFullscreen();
        }
    }
    full.addEventListener('click',()=>fullScreen())
    video.addEventListener('dblclick',()=>fullScreen())

    let playCondicao = false;
    video.addEventListener('click',()=>{
        if(playCondicao){ 
            video.pause();
            playCondicao = false;
        } else { 
            video.play() 
            playCondicao = true;
        }
    })
    play.addEventListener('click',()=>{
        video.play();
        playCondicao = true;
    })
    pause.addEventListener('click',()=>{
        video.pause()
        playCondicao = false;
    })
    mud.addEventListener('click',()=>{
        if(video.muted){
            video.muted = false;
            volume.innerText = (video.volume*100).toString()
        } else {
            video.muted = true;
            volume.innerText = '0';
        }
    })
    reload.addEventListener('click',()=>{
        video.play();
        video.currentTime = 0;
    })
    mudar = true
    video.addEventListener('timeupdate',()=>{
        if(mudar){
            line.value = video.currentTime;
            time.innerText = ajustarTime(Math.floor(video.currentTime)+'');
        }
    })
    line.addEventListener('change',()=>{
        mudar = true;
        video.currentTime = line.value;
    })
    //terrope quando o usuario estiver arrastando
    line.addEventListener('input', function() {
        mudar = false;
    });
    line.addEventListener('click',()=>{
        video.currentTime = line.value;
    })
    video.addEventListener('volumechange',()=>{
        if(video.muted == true){
            volume.innerText = '0';
        } else {
            volume.innerText = Math.floor(video.volume*100);
        }
    })
    vm.addEventListener('click',()=>{
        video.volume += 0.01;
        if(video.muted == true) video.muted = false;
    })
    vmm.addEventListener('click',()=>{
        if(video.volume < 1){
            if(video.volume >= 0.9)
                video.volume = 1;
            else
                video.volume += 0.1;
        }
        if(video.muted == true) video.muted = false;
    })        
    vs.addEventListener('click',()=>{        
        video.volume -= 0.01;        
        if(video.volume <= 0 || video.volume < 0.01)
            video.volume = 0;       
        if(video.muted == true) video.muted = false;
    })
    vss.addEventListener('click',()=>{
        if(video.muted == true) video.muted = false;
        if(video.volume <= 0.1)
            video.volume = 0;
        else
            video.volume -= 0.1;
    })
    function ajustarTime(tempo){
        
        if(tempo >= 60){

            let hora   = Math.floor(tempo/60);
            let minuto = tempo % 60;

            if(minuto < 10) minuto = '0' + minuto;
            tempo = "" + hora + ":" + minuto;
        } else {
            if(tempo > 9) 
                tempo = "0:" + tempo;
            else
                tempo = "0:0" + tempo;
        }
        return tempo;
    }
}
/*

Existem vários eventos relacionados a vídeos que podem ser usados em 
JavaScript para controlar e interagir com elementos de vídeo HTML5. 
Aqui estão alguns dos principais eventos de vídeo:

play: Acionado quando o vídeo começa a ser reproduzido.
pause: Acionado quando a reprodução do vídeo é pausada.
ended: Acionado quando a reprodução do vídeo é concluída.
timeupdate: Acionado continuamente enquanto o vídeo está sendo 
    reproduzido, indicando que o tempo atual do vídeo foi atualizado.
seeked: Acionado após o usuário concluir uma busca (salto) para uma 
    nova posição no vídeo.
volumechange: Acionado quando o volume do vídeo é alterado.
loadedmetadata: Acionado quando os metadados do vídeo, como duração e 
    dimensões, são carregados.
canplay: Acionado quando o navegador pode começar a reproduzir o vídeo.
canplaythrough: Acionado quando o navegador determina que pode reproduzir 
    o vídeo até o fim sem precisar parar para carregar mais dados.

*/