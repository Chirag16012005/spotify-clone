let currentsong=new Audio();
async function getsongs()
{
    let a=await fetch("http://127.0.0.1:5500/songs/");

    let response=await a.text();
    let div=document.createElement("div");
    div.innerHTML=response;
    let as=div.getElementsByTagName("a");
    let songs=[];
    for(let i=0;i<as.length;i++)
    {
        const element=as[i];

        if(element.href.endsWith(".mp3"))
        {
            songs.push(element.href);
        }
    }
    return songs;

    
}

const playmusic =(track, pause=false)=>{
    currentsong.src=track;   
    if(!pause)
        {
currentsong.play();
play.src="pause.svg";
        }
document.querySelector(".songinfo").innerHTML=decodeURIComponent(track.split("/").pop());;
document.querySelector(".songtime").innerHTML="00/00";

}
async function main(){

 
    //get the list of all songs from the API
    let songs=await getsongs();
    console.log(songs);
    playmusic(songs[0], true);

    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    songUL.innerHTML = "";
    let html = "";
   for (const song of songs) {
     html += `<li>
        <img class="invert" width="34" src="music.svg" alt="">
        <div class="info">
           <div class="track" data-src="${song}">${decodeURIComponent(song.split("/").pop())}</div>

            <div>Chirag</div>
        </div>
        <div class="playnow">
            <span>Play Now</span>
            <img class="invert" src="play.svg" alt="">
        </div>
    </li>`;
}

songUL.innerHTML = html;
    //attach an event listener to each song
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach((e) => {
       e.addEventListener("click", element => {
    const trackDiv = e.querySelector(".track");
    const songURL = trackDiv.dataset.src;
    console.log("Playing:", songURL);
    playmusic(songURL);
    });
    })
    
  play.addEventListener("click", () => {
    if(currentsong.paused) {
        currentsong.play();
        play.src="pause.svg";
    }
    else {
        currentsong.pause();
        play.src="play.svg";
    }
});
}
currentsong.addEventListener("timeupdate", () => {
    let currentTime = currentsong.currentTime;
    let duration = currentsong.duration;
    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    let durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    
    document.querySelector(".songtime").innerHTML =
     `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}/${durationMinutes}:${durationSeconds < 10 ? '0' + durationSeconds : 
        durationSeconds}`;
        document.querySelector(".circle").style.left= (currentsong.currentTime/currentsong.duration) * 100 + "%";
     }
);
document.querySelector(".seekbar").addEventListener("click", (e) => {
console.log(e);
});


main();