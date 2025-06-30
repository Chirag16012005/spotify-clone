let currentsong=new Audio();
let songs;
let currfolder;

async function getsongs(folder)
{
    currfolder=folder;
    let a=await fetch(`http://127.0.0.1:5500/${currfolder}/`);

    let response=await a.text();
    let div=document.createElement("div");
    div.innerHTML=response;
    let as=div.getElementsByTagName("a");
     songs=[];
    for(let i=0;i<as.length;i++)
    {
        const element=as[i];

        if(element.href.endsWith(".mp3"))
        {
            songs.push(element.href.split(`/${currfolder}/`)[1]);
        }
    }

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
    

    return songs;
}

const playmusic =(track, pause=false)=>{
    currentsong.src=`/${currfolder}/`+track;   
    if(!pause)
        {
currentsong.play();
play.src="pause.svg";
        }
document.querySelector(".songinfo").innerHTML=decodeURIComponent(track.split("/").pop());;
document.querySelector(".songtime").innerHTML="00/00";

}
async function displayalbums()
{
 let a=await fetch(`http://127.0.0.1:5500/songs/${currfolder}/`);

    let response=await a.text();
    let div=document.createElement("div");
    div.innerHTML=response;
    let anchors=div.getElementsByTagName("a");   
    let cardcontainer=document.querySelector(".cardcontainer");
    let array = Array.from(anchors);
    for(let index=0;index<array.length;index++){
        const e=array[index];
         if (e.href.includes("/songs") && !e.href.includes(".htaccess")){
   
        let folder=e.href.split("/").slice(-2)[0];

        let a=await fetch(`http://127.0.0.1:5500/songs/${folder}/info.json`);

    let response=await a.json();
    cardcontainer.innerHTML+=`<div data-folder="${folder}" class="card">
                        <div  class="play">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                                color="#000000" fill="none">
                                <path
                                    d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z"
                                    stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <img class="imgContImg w-100"
                            src="https://www.citypng.com/public/uploads/preview/square-black-green-spotify-app-icon-png-701751694969849j7wtxvnrgo.png "
                            alt="Square Black &amp;
                    Green Spotify App Icon PNG">
                       <h2>${response.title}</h2>
                        <p>${response.description}</p>
                    </div>`
         }}
    
    Array.from(document.getElementsByClassName("card")).forEach((e) => {
    e.addEventListener("click",  async (element) => {
        console.log("Loading songs from folder:");
        songs = await getsongs(`songs/${element.currentTarget.dataset.folder}`);
        playmusic(songs[0], true);
    });
});
}
async function main(){

 
    //get the list of all songs from the API
    await getsongs("songs/ncs");
    console.log(songs);
    playmusic(songs[0], true);

    //display all albums on the page


    await displayalbums();

    
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
     });

document.querySelector(".seekbar").addEventListener("click", (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentsong.currentTime = ((currentsong.duration) * percent) / 100
});
document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left ="5px";
});
document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-120%";
});

previous.addEventListener("click", () => {
    console.log("Previous song");
    const currentFile = decodeURIComponent(currentsong.src.split("/").pop());

    const index = songs.findIndex(song => {
        return decodeURIComponent(song.split("/").pop()) === currentFile;
    });
    if(index - 1 >= 0)
        {
        playmusic(songs[index - 1]);    
        }   
        else 
        {  
        playmusic(songs[songs.length - 1]);
        }
   
});
next.addEventListener("click", () => {
    console.log("Next song");
    currentsong.pause();
    const currentFile = decodeURIComponent(currentsong.src.split("/").pop());

    const index = songs.findIndex(song => {
        return decodeURIComponent(song.split("/").pop()) === currentFile;
    });

    // Play next song if it exists
    if (index + 1 < songs.length)
        {
        playmusic(songs[index + 1]);
        }
        else
        { 
        playmusic(songs[0]);
        } 
});

document.querySelector(".range").getElementsByTagName("input")[0].
            addEventListener("change", (e) => {
currentsong.volume = e.target.value / 100;
console.log("Volume changed to:", currentsong.volume);
});

//load the playlist whenever the card is clicked



main();