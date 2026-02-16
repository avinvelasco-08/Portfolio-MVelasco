 // JavaScript Document

var tl,
    count = 1,
    loop = 2,
    isEndframe = false;

function $(e)
{
	return document.querySelector(e)
}

function adVisibilityHandler()
{
	// clickthrough
	$('#bg_clickthrough').addEventListener('click', hit);
	// roll over/out
	$('#bg_clickthrough').addEventListener('mouseover', over);
	$('#bg_clickthrough').addEventListener('mouseout', out);

	// initial values
	$('#container').style.display = 'block';
    gsap.set('#bg1,#bg2,#bg3', { scale:1.2, transformOrigin:'50% 50%'});
   


	// animation
	beginAnimation();
}


// ANIMATION
function beginAnimation()
{
	tl = new TimelineLite();
			
	tl
// frame1
    .add(panImg1,"init")
    
// frame2
    .add("f2","+=2.9")
    .from('#bg2', { duration:0.5, opacity:0, rotationZ:0.001, ease:"power2.out", onStart:panImg2}, "f2")

// frame3
    .add("f3","+=2.9")
    .from('#bg3', { duration:0.5, opacity:0, rotationZ:0.001, ease:"power2.out", onStart:panImg3}, "f3")

// frame4
    .add("f4","+=2")
	.from('#bg4', { duration:0.5, y:250, rotationZ:0.001, ease:"power2.out"}, "f4")
    .from('#text', { duration:0.5, opacity:0, y:5, ease:"power2.out"}, "f4+=0.5")
    
    .add("f5","+=1.5")
	.to('#text', { duration:0.5, opacity:0, rotationZ:0.001, ease:"power2.out"}, "f5")
    .from('#cta', { duration:0.5, opacity:0, y:10, rotationZ:0.001, ease:"power2.out"}, "f5+=0.5")
    
    tl.eventCallback("onComplete", restartAnimation);
    
    console.log( "Total Animation Time is: "+ tl.duration() );
}

function restartAnimation()
{	
	if (count < loop) {
		count++;
		setTimeout(function()
		{
			gsap.set('#bg1,#bg2,#bg3', { scale:1.1, transformOrigin:'50% 50%'});
			tl.restart();
		}, 3000);
	}
}

function panImg1()
{
	gsap.fromTo('#bg1',3.5, {scale:1.1}, {scale:1, rotationZ:0.001, ease:"circ.out"});
}

function panImg2()
{
	gsap.fromTo('#bg2', 3.5, {scale:1.1}, {scale:1, rotationZ:0.001, ease:"circ.out"});
}

function panImg3()
{
	gsap.fromTo('#bg3', 3.5, {scale:1.1}, {scale:1, rotationZ:0.001, ease:"circ.out"});
}


// CLICKTHROUGH
function hit(e)
{
	switch (e.target.id)
	{		
		case 'bg_clickthrough':
            console.log("bg click");
			window.open(clickTag, '_blank');
		break;
	}
}

function over(e)
{
	switch (e.target.id)
	{		
		case 'bg_clickthrough' :
           gsap.to($('#cta_out'), {duration:0.3, opacity:0, ease:"power1.out"});
           gsap.to($('#cta_over'), {duration:0.3, opacity:1, ease:"power1.out"});
		break;
	}
}

function out(e)
{
	switch (e.target.id)
	{		
		case 'bg_clickthrough' :
           gsap.to($('#cta_out'), {duration:0.3, opacity:1, ease:"power1.out"});
           gsap.to($('#cta_over'), {duration:0.3, opacity:0, ease:"power1.out"});
		break;
	}
}



///////////////////////
window.onload = adVisibilityHandler;