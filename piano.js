const piano=document.querySelector(".piano")

function addOctaveHTML(octave){
    piano.innerHTML+=`
<div class="section">                
    <div class="white-key" onclick="playnote('C',${octave})" > C${octave} </div>
    <div class="white-key" onclick="playnote('D',${octave})" > D${octave} </div>
    <div class="white-key" onclick="playnote('E',${octave})" > E${octave} </div>

    <div style="min-width:20%; left:20%;"class="black-key" onclick="playnote('C#',${octave})" > C#${octave} </div>
    <div style="min-width:20%; right:20%;"class="black-key" onclick="playnote( 'D#',${octave})" > D#${octave} </div>
</div>
<div class="section"> 
    <div class="white-key" onclick="playnote('F',${octave})"> F${octave} </div>
    <div class="white-key" onclick="playnote('G',${octave})" > G${octave} </div>
    <div class="white-key" onclick="playnote('A',${octave})" "> A${octave} </div>
    <div class="white-key" onclick="playnote('B',${octave})" "> B${octave} </div>

    <div style="left:14.2%; min-width: 14.2%;"class="black-key" onclick="playnote('F#',${octave})"> F#${octave} </div>
    <div style="right:42.6%; min-width: 14.2%;"class="black-key" onclick="playnote('G#',${octave})"> G#${octave} </div>
    <div style="right:14.2%; min-width: 14.2%;"class="black-key" onclick="playnote('A#',${octave})"> A#${octave} </div>
</div>`

}

addOctaveHTML(5);
addOctaveHTML(6);
addOctaveHTML(7);

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