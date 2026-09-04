const menu = document.querySelector('.menu');
const navigation = document.querySelector('#navigation');
function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Menü öffnen');navigation.classList.remove('is-open');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Menü schließen':'Menü öffnen');navigation.classList.toggle('is-open',open);});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
const tabs=[...document.querySelectorAll('[data-view]')];
function selectView(tab){tabs.forEach(button=>{const selected=button===tab;button.setAttribute('aria-selected',String(selected));button.tabIndex=selected?0:-1;document.getElementById(button.getAttribute('aria-controls')).hidden=!selected;});document.querySelectorAll('[data-side]').forEach(side=>side.classList.toggle('selected',side.dataset.side===tab.dataset.view));}
tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>selectView(tab));tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(index+1)%tabs.length;if(event.key==='ArrowLeft')next=(index-1+tabs.length)%tabs.length;if(event.key==='Home')next=0;if(event.key==='End')next=tabs.length-1;if(next!==undefined){event.preventDefault();selectView(tabs[next]);tabs[next].focus();}});});
const tasks=[...document.querySelectorAll('.tasks input')];
tasks.forEach(task=>task.addEventListener('change',()=>{document.querySelector('#task-counter').textContent=`${tasks.filter(input=>input.checked).length} von 3 erledigt`;}));
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('.section-heading,.app-window,.team-grid,.possibilities-grid,.closing .wrap').forEach(element=>{element.classList.add('reveal-ready');observer.observe(element);});}
