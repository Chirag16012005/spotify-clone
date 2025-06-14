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

    let songul=document.querySelector(".songlist").getElementsByTagName("ul")[0];

    for(const song of songs)
    {
       songul.innerHTML+=` <img class="invert" src="music.svg" alt="">
                            <div class="info">
                                <div>${song.replaceAll("%20", " ")}</div>
                                <div class="artist">Harry</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img class="invert" src="play.svg" alt="">
                            </div>

                            </li>`;
    }
    //play the songs or do something with them
    var audio = new Audio(songs[0]);
    audio.play(); 


}
main();