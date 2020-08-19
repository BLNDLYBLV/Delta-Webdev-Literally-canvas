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

var mode='pencil';

var text='';

var mouse ={
    x: 0,
    y: 0
}

var textclick ={
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
}

function changetotext(){
    var selectrem=document.getElementById(mode);
    selectrem.classList.remove('selectedtool');
    mode='text';
    var selectadd=document.getElementById(mode);
    selectadd.classList.add('selectedtool');
    textshow.style.display='block';
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
canvas.addEventListener('mousedown',(ev)=>{
    if(mode=='text'){
        console.log('focused');
        textclick.x = ev.x-rect.left;
        textclick.y = ev.y-rect.top;
        if(textinp.value!=''){
            c.fillStyle=currentcolor.style.backgroundColor;
            c.fillText(textinp.value,textclick.x,textclick.y);
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