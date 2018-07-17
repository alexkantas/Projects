var btn1 = $('.technologiesBtn');
var tch = $('.s187');
var icon = $('.technologiesBtn > i');

btn1.click(e=>{
    icon.toggleClass('rotated');
    tch.toggle();
})