(() => {
  'use strict';
  const variants = {
    nocturne: { name:'Nocturne', tag:'B weitergedacht', note:'Ein großer Ruhepol in der Mitte. Feine Lichtlinien, dunkle Flächen und die klare Typografie von D.' },
    ember: { name:'Ember', tag:'Mehr Wärme, mehr Nähe', note:'Kupferlicht trifft auf dunkles Glas. Der kompakte Fortschritt schafft mehr Raum für deinen nächsten Schritt.' },
    halo: { name:'Halo', tag:'Licht, das Raum lässt', note:'Ein schwebender Ring, weiche Konturen und durchscheinende Karten. Champagnerlicht auf tiefem Graphit.' },
    studio: { name:'Studio', tag:'Klarheit in Espresso und Creme', note:'Eine ruhige, geordnete Komposition. Die helle Aufgabenkarte lenkt den Blick auf das, was jetzt zählt.' }
  };
  const pages = [['home','Home','home'],['weg','Mein Weg','compass'],['community','Community','people'],['academy','Academy','academy'],['chat','Chat','chat'],['profil','Profil','people']];
  const paths = {
    home:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4 19 5"/>',
    compass:'<circle cx="12" cy="12" r="9"/><path d="m16 8-2.5 5.5L8 16l2.5-5.5z"/>',
    people:'<circle cx="9" cy="8" r="3"/><path d="M2 21v-2a7 7 0 0 1 14 0v2M16 5a3 3 0 0 1 0 6m2 3a6 6 0 0 1 4 5v2"/>',
    academy:'<path d="m2 9 10-5 10 5-10 5zM6 11v6q6 5 12 0v-6m4-2v7"/>',
    chat:'<path d="M21 11.5a8.5 8.5 0 0 1-12 7.8L3 21l1.7-6A8.5 8.5 0 1 1 21 11.5Z"/>',
    arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>', chevron:'<path d="m9 5 7 7-7 7"/>',
    check:'<path d="m5 12 4 4L19 6"/>', plus:'<path d="M12 5v14M5 12h14"/>',
    flame:'<path d="M13 3c0 6 6 6 6 12a7 7 0 0 1-14 0c0-3 2-5 3-6 0 3 2 4 3 4 2-4-1-6 2-10Z"/>',
    star:'<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z"/>',
    calendar:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 10h18m-14 4h3m4 0h3m-10 3h3"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', play:'<path d="m9 5 10 7-10 7z"/>',
    search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
    bell:'<path d="M6 16v-5a6 6 0 0 1 12 0v5l2 3H4zM10 22h4"/>', close:'<path d="m6 6 12 12M6 18 18 6"/>',
    settings:'<path d="m9 3-1 3-3 1-2 3 2 2-1 3 2 3 3-1 2 3h3l1-3 3-1 2-3-2-2 1-3-2-3-3 1-2-3z"/><circle cx="11.5" cy="11.5" r="3"/>',
    edit:'<path d="m15 4 5 5M4 20l5-1L21 7l-4-4L5 15z"/>', send:'<path d="m3 3 19 9-19 9 4-9zM7 12h15"/>',
    trophy:'<path d="M8 3h8v8a4 4 0 0 1-8 0zM8 5H4v4a4 4 0 0 0 4 4m8-8h4v4a4 4 0 0 1-4 4m-4 2v5m-4 1h8"/>',
    leaf:'<path d="M20 3C9 3 3 7 5 14s15 6 15-11Z M4 21l11-12"/>', book:'<path d="M12 5c-3-2-7-2-10-1v15c3-1 7-1 10 1m0-15c3-2 7-2 10-1v15c-3-1-7-1-10 1z"/>',
    download:'<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
    heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.9-8.6a5.5 5.5 0 0 0-.1-7.8Z"/>',
    arrowleft:'<path d="M20 12H4m6-6-6 6 6 6"/>', more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>'
  };
  const icon = name => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.star}</svg>`;
  const escape = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const storeKey = 'rs_bd_mixes_v1';
  const state = { variant:'nocturne', page:'home', completed:false, celebrated:false, goalProgress:3, communityFilter:'all', chatFilter:'all' };
  try {
    const saved = JSON.parse(localStorage.getItem(storeKey));
    if (saved && variants[saved.variant]) state.variant = saved.variant;
    if (saved && pages.some(p => p[0] === saved.page)) state.page = saved.page;
    if (saved) { state.completed = saved.completed === true; state.celebrated = saved.celebrated === true; state.goalProgress = Math.min(5, Math.max(0, Number(saved.goalProgress) || 3)); }
  } catch (_) { /* Storage can be unavailable in private browsers. */ }
  const params = new URLSearchParams(location.hash.slice(1));
  if (variants[params.get('v')]) state.variant = params.get('v');
  if (pages.some(p => p[0] === params.get('p'))) state.page = params.get('p');
  const screen = document.getElementById('screen');
  const scroller = document.getElementById('app-scroll');
  const dialog = document.querySelector('.app-dialog');
  const toast = document.querySelector('.toast');
  let toastTimer;
  let returnFocus;

  function dial() {
    const ticks = Array.from({length:31},(_,i) => {
      const a = (135 + i * 9) * Math.PI / 180;
      const inner = i % 5 === 0 ? 94 : 98;
      return `<line x1="${120+inner*Math.cos(a)}" y1="${120+inner*Math.sin(a)}" x2="${120+102*Math.cos(a)}" y2="${120+102*Math.sin(a)}"/>`;
    }).join('');
    return `<div class="dial" role="img" aria-label="12 Tage Serie, Ziel 30 Tage"><svg viewBox="0 0 240 240" aria-hidden="true"><circle class="dial-glow" cx="120" cy="120" r="81"/><circle class="dial-inner" cx="120" cy="120" r="82"/><circle class="dial-track" cx="120" cy="120" r="110"/><circle class="dial-progress" cx="120" cy="120" r="110"/><g class="dial-ticks">${ticks}</g></svg><div class="dial-center">${icon('flame')}<strong class="num streak-number">12</strong><span class="eyebrow streak-label">Tage in Folge</span></div><div class="dial-foot"><span>Tag 1</span><span>Tag 30</span></div></div>`;
  }
  function home() {
    return `<section class="home-page"><header class="home-heading"><p class="eyebrow">Donnerstag · 3. September</p><h2>Guten Morgen,<br class="home-break"> <span>Lena.</span></h2></header><div class="hero-progress">${dial()}<div class="progress-copy"><h3>Du bleibst dran.</h3><p>${state.completed ? 'Dein nächster Schritt ist geschafft.' : 'Ein kleiner Schritt. Jeden Tag.'}</p></div><div class="week-mini" aria-label="Deine Woche">${['M','D','M','D','F','S','S'].map((day,i)=>`<span class="week-day ${i<3?'done':''} ${i===3?'today':''}"><span>${day}</span><i>${i<3?icon('check'):i===3?'3':'·'}</i></span>`).join('')}</div></div><div class="panel home-task ${state.completed?'completed':''}"><div class="task-overline"><span class="eyebrow">${state.completed?'Schritt geschafft':'Dein nächster Schritt'}</span><span class="task-count">${state.completed?'2':'1'} / 3</span></div><h3 class="task-title">Story mit Produktfokus posten</h3><p class="task-meta">${icon('clock')} 5 Minuten <span>·</span> +40 Punkte</p><div class="task-actions"><button class="button" type="button" data-action="task" aria-pressed="${state.completed}">${icon(state.completed?'check':'plus')}${state.completed?'Erledigt':'Als erledigt markieren'}</button><button class="later-button" type="button" data-action="later">${state.completed?'Rückgängig':'Später'}</button></div></div><div class="home-meta"><button type="button" data-nav="weg">${icon('star')}Stufe 4 · Gestalterin</button><span class="meta-divider"></span><button type="button" data-nav="profil">${icon('trophy')}${state.completed?420:380} Punkte</button></div><button class="home-event" type="button" data-modal="event"><span class="event-date"><b>03</b><span>SEP</span></span><span><strong>Heute Abend sehen wir uns.</strong><small>Team-Call mit Tamara · 19:00</small></span>${icon('arrow')}</button></section>`;
  }
  function render({resetScroll = false} = {}) {
    const y = resetScroll ? 0 : scroller.scrollTop;
    const variant = variants[state.variant];
    document.querySelector('.device').dataset.variant = state.variant;
    screen.dataset.page = state.page;
    screen.innerHTML = state.page === 'home' ? home() : window.secondaryPages[state.page]({icon,state});
    document.querySelector('.page-switcher').innerHTML = pages.map(([id,label])=>`<button type="button" data-nav="${id}" ${state.page===id?'aria-current="page"':''}>${label}</button>`).join('');
    document.querySelector('.app-dock').innerHTML = pages.slice(0,5).map(([id,label,symbol])=>`<button class="dock-button" type="button" data-nav="${id}" ${state.page===id?'aria-current="page"':''}><span class="dock-icon">${icon(symbol)}</span><span>${label}</span>${id==='chat'?'<i class="unread-dot" aria-label="3 ungelesene Nachrichten"></i>':''}</button>`).join('');
    document.querySelectorAll('[data-variant-choice]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.variantChoice===state.variant)));
    document.getElementById('variant-tag').textContent = variant.tag;
    document.getElementById('variant-note').textContent = variant.note;
    document.getElementById('preview-label').textContent = `0${Object.keys(variants).indexOf(state.variant)+1} / ${variant.name}`;
    document.querySelector('.notification-button').innerHTML = icon('bell');
    scroller.scrollTop = y;
    try { localStorage.setItem(storeKey,JSON.stringify(state)); } catch (_) {}
    history.replaceState(null,'',`#v=${state.variant}&p=${state.page}`);
  }
  function notify(message) {
    clearTimeout(toastTimer); toast.textContent = message; toast.classList.add('visible');
    toastTimer = setTimeout(()=>toast.classList.remove('visible'),3000);
  }
  function go(page) {
    if (!pages.some(p=>p[0]===page)) return;
    state.page = page; render({resetScroll:true});
  }
  const list = rows => `<div class="modal-list">${rows.map(([title,detail])=>`<div class="panel"><strong>${title}</strong><small>${detail}</small></div>`).join('')}</div>`;
  function showModal(type, trigger) {
    const person = trigger?.dataset.person || 'Tamara';
    const content = {
      notifications:['Neu für dich',list([['Tamara hat dir geschrieben','„Schön, dass du beim Call dabei warst!“ · vor 10 Min.'],['Heute: Team-Call','19:00 Uhr · Gemeinsam in den September']])],
      event:['Team-Call mit Tamara','<p>Donnerstag, 3. September · 19:00 bis 20:00</p>'+list([['Gemeinsam in den September','Dein Monatsfokus, Erfahrungen aus dem Team und Zeit für deine Fragen.'],['Das erwartet dich','10 Min. Ankommen · 20 Min. Impuls · 30 Min. Austausch']])+'<button class="button" data-demo="reminder">'+icon('bell')+'An Termin erinnern</button>'],
      achievements:['Dein Stufenweg',`<div class="modal-stat">${state.completed?'1.280':'1.240'}</div><p>Punkte gesammelt. Noch ${state.completed?'80':'120'} bis zu deiner nächsten Stufe.</p>`+list([['Stufe 4 · Gestalterin','Deine aktuelle Stufe'],['Stufe 5 · Netzwerkerin','Verbindungen schaffen und dein Wissen teilen.'],['12 Tage in Folge','Deine Serie wächst mit jedem Tag.']])],
      groups:['Deine Menschen',list([['Team Rising Souls','1.612 Mitglieder · Tamara ist deine Mentorin'],['Story-Starter','12 Mitglieder · Dein Fokus für September'],['Region Burghausen','48 Mitglieder · Austausch vor Ort']])+'<button class="button" data-dialog-nav="chat">'+icon('chat')+'Nachrichten öffnen</button>'],
      goal:['Dein nächstes Ziel','<form data-form="goal"><label>Was möchtest du erreichen?<input name="goal" required maxlength="100" placeholder="Zum Beispiel: 5 neue Kundinnen"></label><label>Bis wann?<input name="date" type="date" value="2026-09-30" required></label><button class="button" type="submit">'+icon('plus')+'Ziel vormerken</button></form>'],
      compose:['Deinen Moment teilen','<form data-form="compose"><label>Was ist dir heute gelungen?<textarea name="post" rows="4" required maxlength="600" placeholder="Erzähl deinem Team davon …"></textarea></label><button class="button" type="submit">'+icon('send')+'Beitrag in der Vorschau teilen</button></form>'],
      message:[`Nachricht an ${escape(person)}`,`<p class="eyebrow">${escape(person)} · Beispielunterhaltung</p><p class="demo-message">Schön, dass du da bist! Wie läuft deine Woche?</p><div class="sent-messages"></div><form data-form="message"><label>Deine Nachricht<textarea name="message" rows="3" required maxlength="500" placeholder="Nachricht schreiben …"></textarea></label><button class="button" type="submit">${icon('send')}In der Vorschau senden</button></form>`],
      course:['Einwände verstehen',`<p>Modul 4 · Lektion 4 von 7 · 8 Minuten</p><div class="video-placeholder">${icon('play')}</div><p>Erst zuhören, dann fragen. In dieser Lektion übst du, das eigentliche Bedürfnis hinter einer Preisfrage zu erkennen.</p>${list([['1. Raum geben','„Was ist dir bei deiner Entscheidung besonders wichtig?“'],['2. Konkret werden','Beantworte die Frage mit einem passenden Beispiel.']])}<button class="button" data-demo="lesson">${icon('check')}Lektion als gesehen markieren</button>`],
      profile:['Dein Profil bearbeiten','<form data-form="profile"><label>Name<input name="name" value="Lena Berger" required maxlength="50"></label><label>Über dich<textarea name="bio" rows="2" maxlength="160">Schritt für Schritt, mit Herz.</textarea></label><button class="button" type="submit">Änderungen ansehen</button></form>'],
      settings:['Deine Einstellungen','<p>So fühlt sich die App für dich richtig an.</p>'+list([['Sprache','Deutsch'],['Darstellung','Die gewählte Variante gilt für alle sechs Seiten.'],['Benachrichtigungen','Nachrichten und Termine']])+'<button class="button secondary" data-demo="reset">Vorschau zurücksetzen</button>']
    };
    const [title,body] = content[type] || content.groups;
    returnFocus = trigger || document.activeElement;
    document.querySelector('.dialog-content').innerHTML = `<div class="dialog-top"><div><span class="eyebrow">Rising Souls</span><h2 id="dialog-title">${title}</h2></div><button class="icon-button" type="button" data-close aria-label="Schließen">${icon('close')}</button></div>${body}<p class="dialog-footnote">Interaktive Vorschau. Es werden keine Daten versendet.</p>`;
    // Non-modal positioning stays inside the device; inert + focus loop provide modal behavior.
    dialog.show(); document.querySelector('.phone').classList.add('dialog-open');
    document.querySelectorAll('.phone > :not(dialog), .design-panel, .workbench-header, .page-switcher').forEach(el => el.inert = true);
    dialog.setAttribute('aria-modal','true');
    dialog.querySelector('input,textarea,button')?.focus();
  }
  function closeModal() {
    dialog.close(); document.querySelector('.phone').classList.remove('dialog-open');
    document.querySelectorAll('[inert]').forEach(el => el.inert = false);
    if(returnFocus?.isConnected) returnFocus.focus();
  }
  document.addEventListener('click', event => {
    const target = event.target.closest('button'); if (!target) return;
    if (target.dataset.variantChoice && variants[target.dataset.variantChoice]) { state.variant=target.dataset.variantChoice; render({resetScroll:true}); return; }
    if (target.hasAttribute('data-close')) { closeModal(); return; }
    if (target.dataset.dialogNav) { closeModal(); go(target.dataset.dialogNav); return; }
    if (target.dataset.nav) { go(target.dataset.nav); return; }
    if (target.dataset.modal) { showModal(target.dataset.modal,target); return; }
    if (target.dataset.filter) { state.communityFilter=target.dataset.filter; render(); return; }
    if (target.dataset.chatFilter) { state.chatFilter=target.dataset.chatFilter; render(); return; }
    if (target.dataset.action==='task' || (target.dataset.action==='later' && state.completed)) { state.completed=!state.completed; render(); notify(state.completed?'Schritt geschafft. +40 Punkte für dich.':'Die Aufgabe ist wieder offen.'); return; }
    if (target.dataset.action==='later') { notify('Passt. Dein Schritt wartet hier auf dich.'); return; }
    if (target.dataset.action==='goal-progress') { state.goalProgress=state.goalProgress>=5?3:state.goalProgress+1; render(); notify(state.goalProgress===5?'Ziel erreicht. 5 neue Kundinnen!':`Dein Ziel: ${state.goalProgress} von 5 Kundinnen.`); return; }
    if (target.dataset.action==='celebrate') { state.celebrated=!state.celebrated; render(); if(state.celebrated) notify('Du feierst Ayşes erste Bestellung mit.'); return; }
    if (target.dataset.demo) {
      const action=target.dataset.demo;
      closeModal();
      if(action==='reset') { state.completed=false;state.celebrated=false;state.goalProgress=3;render(); }
      notify({reminder:'Erinnerung in der Vorschau aktiviert.',lesson:'Lektion in der Vorschau als gesehen markiert.',reset:'Vorschau zurückgesetzt.'}[action] || 'Gespeichert.');
    }
  });
  document.addEventListener('submit', event => {
    const form=event.target.closest('[data-form]'); if(!form) return; event.preventDefault();
    const values=new FormData(form);
    if(form.dataset.form==='message') {
      const text=String(values.get('message')||'').trim(); if(!text) return;
      const bubble=document.createElement('p');bubble.className='demo-message';bubble.textContent=text;
      dialog.querySelector('.sent-messages').append(bubble);form.reset();return;
    }
    if(form.dataset.form==='profile') {
      const name=escape(String(values.get('name')||'Lena Berger'));
      const bio=escape(String(values.get('bio')||''));
      dialog.querySelector('.dialog-content').innerHTML=`<div class="dialog-top"><h2 id="dialog-title">So sieht dein Profil aus</h2><button class="icon-button" data-close aria-label="Schließen">${icon('close')}</button></div><div class="panel"><h3>${name}</h3><p>${bio}</p></div><p class="dialog-footnote">Nur eine Vorschau. Dein Beispielprofil bleibt Lena Berger.</p>`;dialog.querySelector('button').focus();return;
    }
    closeModal();notify(form.dataset.form==='compose'?'Dein Beitrag wurde in der Vorschau geteilt.':'Dein Ziel wurde in der Vorschau vorgemerkt.');
  });
  document.addEventListener('keydown', event => {
    if(dialog.open) {
      if(event.key==='Escape') { event.preventDefault();closeModal(); }
      if(event.key==='Tab') {
        const items=[...dialog.querySelectorAll('button,input,textarea,[tabindex="0"]')];
        if(event.shiftKey && document.activeElement===items[0]){event.preventDefault();items.at(-1)?.focus();}
        else if(!event.shiftKey && document.activeElement===items.at(-1)){event.preventDefault();items[0]?.focus();}
      }
      return;
    }
    if(event.metaKey||event.ctrlKey||event.altKey||event.target.closest('input,textarea,select,[contenteditable]')) return;
    if(event.key==='ArrowRight'||event.key==='ArrowLeft') {event.preventDefault();const keys=Object.keys(variants);const delta=event.key==='ArrowRight'?1:-1;state.variant=keys[(keys.indexOf(state.variant)+delta+4)%4];render({resetScroll:true});}
    else if(/^[1-6]$/.test(event.key)){event.preventDefault();go(pages[Number(event.key)-1][0]);}
  });
  function fitPreview() {
    const scale = window.innerWidth > 760 ? Math.max(.6, Math.min(1, (window.innerHeight - 181) / 820)) : 1;
    document.documentElement.style.setProperty('--device-scale', scale);
  }
  window.addEventListener('resize',fitPreview);
  fitPreview();
  render();
})();
