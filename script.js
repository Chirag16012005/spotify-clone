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
async function main(){
    //get the list of all songs from the API
    let songs=await getsongs();
    console.log(songs);

    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    songUL.innerHTML = ""
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li><img class="invert" width="34" src="img/music.svg" alt="">
                            <div class="info">
                                <div> ${song.replaceAll("%20", " ")}</div>
                                <div>Chirag</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img class="invert" src="img/play.svg" alt="">
                            </div> </li>`;
    }
    }
    //play the songs or do something with them
    var audio = new Audio(songs[0]);
    audio.play(); 



main();