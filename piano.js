const piano=document.querySelector(".piano")

function addOctaveHTML(octave){
    piano.innerHTML+=`
<div class="section">                
    <div class="white-key keys" onclick="playnote('C',${octave})" > <p> C${octave} </p> </div>
    <div class="white-key keys" onclick="playnote('D',${octave})" > <p> D${octave} </p></div>
    <div class="white-key keys" onclick="playnote('E',${octave})" > <p> E${octave} </p></div>

    <div style="min-width:calc( var(--key-width) *.8); left:calc( var(--key-width) *.6);" class="black-key keys" onclick="playnote('C#',${octave})" > C#${octave} </div>
    <div style="min-width:calc( var(--key-width) *.8); right:calc( var(--key-width) *.6);"class="black-key keys" onclick="playnote( 'D#',${octave})" > D#${octave} </div>
</div>
<div class="section"> 
    <div class="white-key keys" onclick="playnote('F',${octave})"> <p> F${octave} </p></div>
    <div class="white-key keys" onclick="playnote('G',${octave})" > <p> G${octave} </p></div>
    <div class="white-key keys" onclick="playnote('A',${octave})" "> <p> A${octave} </p></div>
    <div class="white-key keys" onclick="playnote('B',${octave})" "> <p> B${octave} </p></div>

    <div style="min-width:calc( var(--key-width) *.8); left:calc( var(--key-width) *.6);" class="black-key keys" onclick="playnote('F#',${octave})"> F#${octave} </div>
    <div style="min-width:calc( var(--key-width) *.8); left:calc( var(--key-width) *2);" class="black-key keys" onclick="playnote('G#',${octave})"> G#${octave} </div>
    <div style="min-width:calc( var(--key-width) *.8); right:calc( var(--key-width) *.6);" class="black-key keys" onclick="playnote('A#',${octave})"> A#${octave} </div>
</div>`

}

var octave=4;
var oct_disp=3  ;

function rebuildBoard(){
    piano.innerHTML='';
    for (let i=octave; i<octave+oct_disp; i++){
        addOctaveHTML(i);
    }
    piano.innerHTML+=`<div class="section"> <div class="white-key" onclick="playnote('C',${octave+oct_disp})" > <p> C${octave+oct_disp} </p> </div></div>`
    updateEventListeners();
}
var context=new AudioContext();
var o=null;
var g=null;
function Play(frequency, type) {
    o = context.createOscillator();
      g = context.createGain();
      o.type = type;
      o.connect(g);
      o.frequency.value = frequency;
      g.connect(context.destination);
      o.start(0);
      g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 1);
}
function playnote(note,octave){
    let t;
    switch (note) {
        case "C":
            t=-9;
            break;
        case "C#":
            t=-8;
            break;
        case "D":
            t=-7;
            break;
        case "D#":
            t=-6;
            break;
        case "E":
            t=-5;
            break;
        case "F":
            t=-4;
            break;
        case "F#":
            t=-3;
            break;
        case "G":
            t=-2;
            break;
        case "G#":
            t=-1;
            break;
        case "A":
            t=0;
            break;
        case "A#":
            t=1;
            break;
        case "B":
            t=2;
            break;
        default:
            break;
    }

    let frequency=440*Math.pow(2,(octave-4)+(t/12))
    console.log(`playing ${note}${octave} of frequencey ${frequency}`)

    Play(frequency,"sine")
}

function resize(){
    if(innerWidth<550){
            oct_disp=1;
            document.documentElement.style.setProperty("--key-width","8vw")
            rebuildBoard()
    }else if(innerWidth<850){
        if(oct_disp!=1){
            oct_disp=1;
            document.documentElement.style.setProperty("--key-width","7vw")
            rebuildBoard()
        }
    }else if(innerWidth<1300){
        if(oct_disp!=2){
            oct_disp=2;
            document.documentElement.style.setProperty("--key-width","4vw")
            rebuildBoard()
        }

    }else{
        if(oct_disp!=3){
            oct_disp=3;
            document.documentElement.style.setProperty("--key-width","3vw")
            rebuildBoard()
        }
    }
}
addEventListener("resize",resize)

resize()
rebuildBoard();

function updateEventListeners(){
    const keys=document.querySelectorAll(".keys")
    keys.forEach((key)=>{
        key.addEventListener("mousedown", (e)=>{
            e.target.style.transform="scale(0.9, 0.97)"
        })
    })

    keys.forEach((key)=>{
        key.addEventListener("mouseup", (e)=>{
            e.target.style.transform=""
        })
    })
}