const button=document.querySelector('.menu'),nav=document.querySelector('#nav-links');button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')==='true';button.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');button.setAttribute('aria-expanded','false')}));

const coverflow=document.querySelector('[data-coverflow]');
if(coverflow){
  const cards=[...coverflow.querySelectorAll('.coverflow-card')];
  const center=(cards.length-1)/2;
  const updateArc=()=>{
    const gap=Math.min(70,window.innerWidth<650?52:70);
    cards.forEach((card,index)=>{
      const distance=index-center;
      const ratio=center?distance/center:0;
      const outer=Math.abs(distance)===center;
      card.style.setProperty('--arc-x',`${ratio*gap}px`);
      card.style.setProperty('--arc-rotate',`${ratio*30}deg`);
      card.style.setProperty('--arc-y',`${outer?10:-2}px`);
      card.style.setProperty('--arc-scale',distance===0?'1.05':'1');
      card.style.zIndex=String(3-Math.abs(distance));
    });
  };
  const expand=()=>coverflow.classList.add('is-expanded');
  const collapse=()=>coverflow.classList.remove('is-expanded');
  coverflow.addEventListener('pointerenter',expand);
  coverflow.addEventListener('pointerleave',collapse);
  coverflow.addEventListener('focusin',expand);
  coverflow.addEventListener('focusout',event=>{if(!coverflow.contains(event.relatedTarget))collapse()});
  window.addEventListener('resize',updateArc);
  updateArc();
}
