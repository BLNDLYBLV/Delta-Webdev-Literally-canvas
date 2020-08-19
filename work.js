var canvas=document.getElementsByTagName('canvas')[0];
var c=canvas.getContext('2d');

canvas.width=canvas.offsetWidth;
canvas.height=canvas.offsetHeight;
c.imageSmoothingEnabled=true;

var currentcolor=document.getElementById('currentcolor');
var inputcolor=document.getElementById('inputcolor');
var widthselect=document.getElementsByTagName('select')[0];

var mode='pencil';

var mouse ={
    x: 0,
    y: 0
}

// console.log(inputcolor.value);
inputcolor.value='#000000';

var rect = canvas.getBoundingClientRect();

c.strokeStyle= currentcolor.style.backgroundColor;
c.lineWidth=Number(widthselect.value);


window.addEventListener('scroll',()=>{
    rect = canvas.getBoundingClientRect();
})


canvas.addEventListener('mousemove',(e)=>{
    mouse.x = e.x-rect.left;
    mouse.y = e.y-rect.top;
    // console.log(mouse);
});

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
    mode='pencil';
}

function changetoeraser(){
    c.strokeStyle= '#fff';
    mode='eraser';
    // console.log(2*Number(widthselect.value));
    c.lineWidth=12*Number(widthselect.value);
    console.log(c.lineWidth);
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
    c.lineTo(mouse.x,mouse.y);
    c.stroke();
    console.log('stroking',mouse);
}

canvas.addEventListener('mousedown',(e)=>{
    c.beginPath();
    c.moveTo(mouse.x,mouse.y);
    console.log('mouse down');
    canvas.addEventListener('mousemove',freedraw,false);
},false);
canvas.addEventListener('mouseup',(e)=>{
    console.log('mouseup');
    c.closePath();
    canvas.removeEventListener('mousemove',freedraw,false); 
});
