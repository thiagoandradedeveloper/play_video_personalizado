window.onload = function(){

    let video  = document.getElementById('myVideo');
    let play   = document.getElementById('play');
    let pause  = document.getElementById('pause');
    let reload = document.getElementById('reload');
    let line   = document.getElementById('line');
    let mud    = document.getElementById('mud');
    let time   = document.getElementById('timeCurrent');
    let volume = document.getElementById('volume');
    let vm = document.getElementById('volume+');
    let vmm = document.getElementById('volume++');
    let vs = document.getElementById('volume-');
    let vss = document.getElementById('volume--');
    let controles = document.getElementById('controles');
    line.max   = video.duration;
    video.volume = 0.5;
    
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
        video.pause()
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
    vm .addEventListener('click',()=>{
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
    vs .addEventListener('click',()=>{
        video.volume -= 0.01;
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

Existem vários eventos relacionados a vídeos que podem ser usados em JavaScript para controlar e interagir com elementos de vídeo HTML5. Aqui estão alguns dos principais eventos de vídeo:

play: Acionado quando o vídeo começa a ser reproduzido.
pause: Acionado quando a reprodução do vídeo é pausada.
ended: Acionado quando a reprodução do vídeo é concluída.
timeupdate: Acionado continuamente enquanto o vídeo está sendo reproduzido, indicando que o tempo atual do vídeo foi atualizado.
seeked: Acionado após o usuário concluir uma busca (salto) para uma nova posição no vídeo.
volumechange: Acionado quando o volume do vídeo é alterado.
loadedmetadata: Acionado quando os metadados do vídeo, como duração e dimensões, são carregados.
canplay: Acionado quando o navegador pode começar a reproduzir o vídeo.
canplaythrough: Acionado quando o navegador determina que pode reproduzir o vídeo até o fim sem precisar parar para carregar mais dados.

*/