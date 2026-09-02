const button=document.querySelector('.menu'),nav=document.querySelector('#nav-links');button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')==='true';button.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');button.setAttribute('aria-expanded','false')}));

const coverflow=document.querySelector('[data-coverflow]');
if(coverflow){
  const cards=[...coverflow.querySelectorAll('.coverflow-card')],dots=coverflow.querySelector('[data-coverflow-dots]'),previous=coverflow.querySelector('[data-coverflow-prev]'),next=coverflow.querySelector('[data-coverflow-next]');
  let activeIndex=Math.min(1,cards.length-1);
  const render=()=>{
    cards.forEach((card,index)=>{
      const offset=index-activeIndex,absoluteOffset=Math.abs(offset),past=index<activeIndex;
      card.style.transform=`translateX(calc(-50% + ${offset*104}px)) rotateY(${offset===0?0:past?38:-38}deg) translateZ(${offset===0?50:-absoluteOffset*50}px) scale(${offset===0?1.08:Math.max(.78,1-absoluteOffset*.08)})`;
      card.style.opacity=absoluteOffset>2?'0':String(1-absoluteOffset*.25);
      card.style.zIndex=String(100-absoluteOffset);
      card.setAttribute('aria-current',String(index===activeIndex));
    });
    [...dots.children].forEach((dot,index)=>dot.setAttribute('aria-current',String(index===activeIndex)));
    previous.disabled=activeIndex===0;next.disabled=activeIndex===cards.length-1;
  };
  const setActive=index=>{activeIndex=Math.max(0,Math.min(cards.length-1,index));render()};
  cards.forEach((card,index)=>{card.addEventListener('click',event=>{if(event.target.closest('a'))return;setActive(index)});card.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();setActive(index)}});const dot=document.createElement('button');dot.type='button';dot.className='coverflow-dot';dot.setAttribute('aria-label',`Show research ${index+1}`);dot.addEventListener('click',()=>setActive(index));dots.append(dot)});
  previous.addEventListener('click',()=>setActive(activeIndex-1));next.addEventListener('click',()=>setActive(activeIndex+1));
  coverflow.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();setActive(activeIndex-1)}if(event.key==='ArrowRight'){event.preventDefault();setActive(activeIndex+1)}});
  render();
}

