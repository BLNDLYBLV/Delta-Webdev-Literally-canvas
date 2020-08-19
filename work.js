var canvas=document.getElementsByTagName('canvas')[0];
var c=canvas.getContext('2d');

canvas.width=canvas.offsetWidth;
canvas.height=canvas.offsetHeight;
c.imageSmoothingEnabled=true;

var currentcolor=document.getElementById('currentcolor');
var inputcolor=document.getElementById('inputcolor');
var widthselect=document.getElementById('linewidth');
var textinp=document.getElementById('textinp');
var textsize=document.getElementById('textsize');
var textshow=document.getElementById('textshow');
var regularshapesshow=document.getElementById('regularshapesshow');
var lineshow=document.getElementById('lineshow');
var circleshow=document.getElementById('circleshow');


var mode='pencil';

var text='';

var mouse ={
    x: 0,
    y: 0
}

var click ={
    x: 0,
    y: 0
}

var p1 ={
    x: 0,
    y: 0
}

var p2 ={
    x: 0,
    y: 0
}

// console.log(inputcolor.value);
inputcolor.value='#000000';

var rect = canvas.getBoundingClientRect();

c.strokeStyle= currentcolor.style.backgroundColor;
c.lineWidth=Number(widthselect.value);
c.font=12+9*(Number(textsize.value)-1)+'px Arial';


window.addEventListener('scroll',()=>{
    rect = canvas.getBoundingClientRect();
})


canvas.addEventListener('mousemove',(e)=>{
    mouse.x = e.x-rect.left;
    mouse.y = e.y-rect.top;
    // console.log(mouse);
});

function changefontsize(){
    c.font=12+9*(Number(textsize.value)-1)+'px Arial';
}


function changecolfrominput(id){
    var newcolor=document.getElementById(id);
    console.log(newcolor.value);
    currentcolor.style.backgroundColor=newcolor.value;
    c.strokeStyle= currentcolor.style.backgroundColor;
}

function changecol(id){
    var nowcolor=document.getElementById(id);
    currentcolor.style.backgroundColor=nowcolor.style.backgroundColor;
    c.strokeStyle= currentcolor.style.backgroundColor;
}

function changetopencil(){
    c.strokeStyle= currentcolor.style.backgroundColor;
    c.lineWidth=Number(widthselect.value);
    var selectrem=document.getElementById(mode);
    selectrem.classList.remove('selectedtool');
    mode='pencil';
    var selectadd=document.getElementById(mode);
    selectadd.classList.add('selectedtool');
    textshow.style.display='none';
    regularshapesshow.style.display='none';
    lineshow.style.display='none';
    circleshow.style.display='none';
}

function changetotext(){
    var selectrem=document.getElementById(mode);
    selectrem.classList.remove('selectedtool');
    mode='text';
    var selectadd=document.getElementById(mode);
    selectadd.classList.add('selectedtool');
    textshow.style.display='block';
    regularshapesshow.style.display='none';
    lineshow.style.display='none';
    circleshow.style.display='none';
}

function changetoeraser(){
    c.strokeStyle= '#fff';
    var selectrem=document.getElementById(mode);
    selectrem.classList.remove('selectedtool');
    mode='eraser';
    var selectadd=document.getElementById(mode);
    selectadd.classList.add('selectedtool');
    // console.log(2*Number(widthselect.value));
    c.lineWidth=12*Number(widthselect.value);
    console.log(c.lineWidth);
    textshow.style.display='none';
    regularshapesshow.style.display='none';
    lineshow.style.display='none';
    circleshow.style.display='none';
}

function changetoshapes(){
    var selectrem=document.getElementById(mode);
    selectrem.classList.remove('selectedtool');
    mode='shapes';
    var selectadd=document.getElementById(mode);
    selectadd.classList.add('selectedtool');
    regularshapesshow.style.display='block';
    textshow.style.display='none';
    lineshow.style.display='none';
    circleshow.style.display='none';
}

function changetoline(){
    var selectrem=document.getElementById(mode);
    selectrem.classList.remove('selectedtool');
    mode='line';
    var selectadd=document.getElementById(mode);
    selectadd.classList.add('selectedtool');
    lineshow.style.display='block';
    circleshow.style.display='none';
    textshow.style.display='none';
    regularshapesshow.style.display='none';
}

function changetocircle(){
    var selectrem=document.getElementById(mode);
    selectrem.classList.remove('selectedtool');
    mode='circle';
    var selectadd=document.getElementById(mode);
    selectadd.classList.add('selectedtool');
    circleshow.style.display='block';
    textshow.style.display='none';
    regularshapesshow.style.display='none';
    lineshow.style.display='none';
}

function changewidth(value){
    console.log(value);
    if(mode=='pencil'){
        c.lineWidth=Number(value);
    }
    if(mode=='eraser'){
        c.lineWidth=12*Number(value);
    }
}

var freedraw=()=>{
    if(mode=='pencil' || mode=='eraser'){
        c.lineTo(mouse.x,mouse.y);
        c.stroke();
        console.log('stroking',mouse);
    }
}
canvas.addEventListener('click',(ev)=>{
    click.x = ev.x-rect.left;
    click.y = ev.y-rect.top;
    if(mode=='text'){
        console.log('focused');
        if(textinp.value!=''){
            c.fillStyle=currentcolor.style.backgroundColor;
            c.fillText(textinp.value,click.x,click.y);
            textinp.value='';
            changetopencil();
        }
        // window.addEventListener('keydown',(e)=>{
        //     if(mode='text'){
        //         if(e.key!='Enter'){
        //             if(e.key=='Backspace'){
        //                 text=text.substr(0,text.length-1);
        //             }
        //             else{
        //                 console.log('enters');
        //                 // text.push(e.key);
        //                 text=text+e.key;
        //             }
                    
        //         }
        //         // console.log(e.key);
        //         // console.log(textinp.value);
        //     }
        // }); 

    }
    if(mode=='circle'){
        var radiusinp=document.getElementById('radiusinp');
        var circlefill=document.getElementById('radiuscheck');
        if(radiusinp.value!=''){
            if(circlefill.checked==true){
                c.fillStyle=currentcolor.style.backgroundColor;
                c.beginPath();
                c.arc(click.x,click.y,Number(radiusinp.value)*37.79,0,2*Math.PI);
                c.fill();
                c.closePath();
            }
            else{
                c.beginPath();
                c.arc(click.x,click.y,Number(radiusinp.value)*37.79,0,2*Math.PI);
                c.stroke();
                c.closePath();
            }
        }
    }
    if(mode=='shapes'){
        var sidelength=Number(document.getElementById('sidelengthinp').value)*37.79;
        var noofsides=document.getElementById('noofsidesinp').value;
        var ang;
        if(Number(noofsides)%2==0 && Number(noofsides)%4==0){
            ang=(Number(document.getElementById('anginp').value)-180/Number(noofsides))*Math.PI/180;
        }
        else if(Number(noofsides)%2==0){
            ang=(Number(document.getElementById('anginp').value))*Math.PI/180;
        }
        else{
            ang=(Number(document.getElementById('anginp').value)-90)*Math.PI/180;
        }
        
        var a=2*Math.PI/Number(noofsides);
        var radius=sidelength/(2*Math.sin(a/2));
        var shapescheck=document.getElementById('shapescheck');
        console.log(radius);
        console.log(Number(noofsides));
        console.log(a*180/Math.PI);
        c.beginPath();
        // c.translate(click.x,click.y);
        // ang=0;
        console.log(ang);
        c.moveTo(click.x+radius*Math.cos(ang),click.y+radius*Math.sin(ang));

        for(var i=0;i<Number(noofsides);i++){
            c.lineTo(click.x+radius*Math.cos(ang-a*(i+1)),click.y+radius*Math.sin(ang-a*(i+1)));            
            // console.log(radius*Math.cos(ang-a*(i+1)),radius*Math.sin(ang-a*(i+1)));            
            // c.stroke
        }
        if(shapescheck.checked==true){
            c.fillStyle=currentcolor.style.backgroundColor;
            c.fill();
        }
        else{
            c.stroke();
        }
        c.closePath();

    }
});

canvas.addEventListener('mousedown',(ev)=>{
    if(mode=='line'){
        p1.x = ev.x-rect.left;
        p1.y = ev.y-rect.top;
        canvas.addEventListener('mouseup',(e)=>{
            if(mode=='line'){
                p2.x = e.x-rect.left;
                p2.y = e.y-rect.top;
                c.beginPath();
                c.moveTo(p1.x,p1.y);
                c.lineTo(p2.x,p2.y);
                c.stroke();
                c.closePath();
            }
        });
    }
});


canvas.addEventListener('mousedown',(e)=>{
    if(mode=='pencil' || mode=='eraser'){
        c.beginPath();
        c.moveTo(mouse.x,mouse.y);
        console.log('mouse down');
        canvas.addEventListener('mousemove',freedraw,false);
    }    
},false);
canvas.addEventListener('mouseup',(e)=>{
    if(mode=='pencil' || mode=='eraser')
    {
        console.log('mouseup');
        c.closePath();
        canvas.removeEventListener('mousemove',freedraw,false); 
    }
});