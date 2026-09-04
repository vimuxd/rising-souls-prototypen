(() => {
  const avatar = (initials, className = '') => `<span class="avatar sec-avatar ${className}" aria-hidden="true">${initials}</span>`;
  const heading = (overline, title, detail = '') => `<header class="sec-heading"><p class="eyebrow">${overline}</p><h2>${title}</h2>${detail ? `<p class="sec-intro muted">${detail}</p>` : ''}</header>`;
  const label = (title, button, action) => `<div class="sec-section-head"><h2 class="section-label">${title}</h2>${button ? `<button class="sec-text-button" ${action}>${button}</button>` : ''}</div>`;
  const progress = (percent, labelText) => `<div class="sec-progress" role="progressbar" aria-label="${labelText}" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100"><span style="width:${percent}%"></span></div>`;
  const chevron = icon => `<span class="sec-chevron">${icon('chevron')}</span>`;

  function weg({ icon, state }) {
    const earnedPoints = state.completed ? 40 : 0;
    const goalProgress = Math.min(5, Math.max(0, Number.isInteger(state.goalProgress) ? state.goalProgress : 3));
    return `<section class="sec-page sec-weg">
      ${heading('Dein persönlicher Fortschritt', 'Mein Weg')}
      <div class="panel sec-journey-feature">
        <div class="sec-section-head"><span class="eyebrow">Deine nächste Stufe</span><span class="pill">Stufe 4</span></div>
        <div class="sec-journey-main"><div><h2>Gestalterin.</h2><p class="muted">Du machst den Unterschied.</p></div><span class="sec-orbit" aria-hidden="true">${icon('star')}<i></i></span></div>
        ${progress((380 + earnedPoints) / 5, 'Fortschritt bis zur nächsten Stufe')}
        <div class="sec-progress-copy"><span>Noch <strong>${120 - earnedPoints} Punkte</strong> bis Netzwerkerin</span><button class="sec-text-button" data-modal="achievements" aria-label="Stufenweg ansehen">${icon('arrow')}</button></div>
        <div class="sec-feature-stats"><div><strong class="num">12<span>${icon('flame')}</span></strong><span>Tage in Folge</span></div><div><strong class="num">${380 + earnedPoints}</strong><span>Punkte im September</span></div></div>
      </div>
      <button class="sec-mentor" data-nav="academy"><span class="sec-mentor-line"></span><span><small class="eyebrow">Dein Wochenfokus</small><strong>Drei echte Gespräche.</strong><span class="muted">Eine Empfehlung von Tamara</span></span>${chevron(icon)}</button>
      ${label('Deine Woche', 'Alle Termine', 'data-modal="event"')}
      <div class="sec-week" aria-label="Kalenderwoche 36"><span>Mo<b>31</b></span><span>Di<b>1</b></span><span>Mi<b>2</b></span><span class="is-today" aria-current="date">Do<b>3</b><i></i></span><span>Fr<b>4</b></span><span>Sa<b>5</b></span><span>So<b>6</b></span></div>
      <button class="panel sec-event" data-modal="event"><span class="sec-event-date"><b class="num">19:00</b><small>HEUTE</small></span><span class="sec-grow"><strong>Team-Call mit Tamara</strong><span class="muted">Gemeinsam in den September</span></span>${chevron(icon)}</button>
      ${label('Deine Ziele', '+ Ziel', 'data-modal="goal"')}
      <div class="panel sec-goal"><div class="sec-goal-title"><div><strong>5 neue Kundinnen</strong><p class="muted">September · ${goalProgress} von 5</p></div><button class="icon-button sec-plus" data-action="goal-progress" aria-label="${goalProgress === 5 ? 'Ziel erreicht: 5 neue Kundinnen' : 'Fortschritt für neue Kundinnen erhöhen'}" ${goalProgress === 5 ? 'disabled' : ''}>${icon(goalProgress === 5 ? 'check' : 'plus')}</button></div>${progress(goalProgress * 20, 'Neue Kundinnen im September')}</div>
      <button class="sec-list-row" data-modal="course"><span class="sec-small-icon">${icon('book')}</span><span class="sec-grow"><strong>Modul 4 abschließen</strong><span class="muted">3 von 7 Lektionen</span></span>${chevron(icon)}</button>
    </section>`;
  }

  function community({ icon, state }) {
    const success = state.communityFilter !== 'forum';
    const forum = state.communityFilter !== 'success';
    return `<section class="sec-page sec-community">
      ${heading('1.612 Menschen. Ein Team.', 'Zusammen mehr.')}
      <button class="panel sec-community-feature" data-modal="groups"><span class="sec-community-feature-top"><span class="sec-avatar-stack">${avatar('AK', 'sec-avatar-peach')}${avatar('JW', 'sec-avatar-olive')}${avatar('MS', 'sec-avatar-lilac')}<span class="sec-avatar-count">+12</span></span><span class="sec-live"><i></i>Heute aktiv</span></span><span class="sec-community-feature-bottom"><span><strong>Dein Team ist da.</strong><span class="muted">Austauschen. Fragen. Gemeinsam wachsen.</span></span>${icon('arrow')}</span></button>
      <button class="sec-compose" data-modal="compose">${avatar('LB')}<span>Was möchtest du teilen, Lena?</span><span class="sec-small-icon">${icon('plus')}</span></button>
      <div class="sec-filters" aria-label="Beiträge filtern">${[['all', 'Für dich'], ['success', 'Erfolge'], ['forum', 'Forum']].map(([value, text]) => `<button data-filter="${value}" class="${state.communityFilter === value ? 'is-active' : ''}" aria-pressed="${state.communityFilter === value}">${text}</button>`).join('')}</div>
      <div class="sec-feed">
        ${success ? `<article class="panel sec-post"><div class="sec-post-author">${avatar('AK', 'sec-avatar-peach')}<div class="sec-grow"><strong>Ayşe Kaya</strong><span class="muted">Burghausen · vor 2 Stunden</span></div><span class="sec-post-badge">${icon('star')}Erfolg</span></div><h2>Die erste Bestellung. 🥹</h2><p>Drei Wochen lang Storys geteilt. Heute hat meine erste Kundin über Instagram bestellt!</p><div class="sec-post-actions"><button class="sec-celebrate ${state.celebrated ? 'is-celebrated' : ''}" data-action="celebrate" aria-pressed="${state.celebrated}">${icon('heart')}<span>${state.celebrated ? 'Gefeiert' : 'Mitfeiern'}</span><b>${24 + (state.celebrated ? 1 : 0)}</b></button><button class="sec-text-button" data-modal="message">${icon('chat')}3</button></div></article>` : ''}
        ${forum ? `<article class="panel sec-post sec-question"><div class="sec-post-author">${avatar('MS', 'sec-avatar-lilac')}<div class="sec-grow"><strong>Mira Sommer</strong><span class="muted">Fragen & Hilfe · vor 4 Stunden</span></div>${icon('chat')}</div><h2>Wie geht ihr mit der Preisfrage um?</h2><p>Ich möchte den Wert erklären, ohne zu viel zu reden. Was funktioniert bei euch?</p><button class="sec-answer-row" data-modal="message"><span class="sec-avatar-stack sec-stack-small">${avatar('TB')}${avatar('JW', 'sec-avatar-olive')}${avatar('AK', 'sec-avatar-peach')}</span><span><strong>14 Antworten</strong><small class="muted">Das Team hilft weiter</small></span>${chevron(icon)}</button></article>` : ''}
        ${success ? `<button class="sec-list-row" data-modal="event"><span class="sec-small-icon">${icon('calendar')}</span><span class="sec-grow"><strong>Herbst-Kickoff in München</strong><span class="muted">12. September · 28 aus deinem Team</span></span>${chevron(icon)}</button>` : ''}
      </div>
    </section>`;
  }

  function academy({ icon }) {
    return `<section class="sec-page sec-academy">
      ${heading('Lernen, das dich weiterbringt', 'Dein nächster Schritt.')}
      <div class="sec-learning-summary"><span>${icon('play')}<strong>12</strong> Videos</span><span>${icon('check')}<strong>4</strong> Checks</span><span>${icon('trophy')}<strong>1</strong> Kurs</span></div>
      <button class="panel sec-course-feature" data-modal="course"><span class="sec-course-art" aria-hidden="true"><span class="sec-course-orbit sec-course-orbit-one"></span><span class="sec-course-orbit sec-course-orbit-two"></span><span class="sec-course-orbit sec-course-orbit-three"></span><span class="sec-course-number num">04</span><span class="sec-course-play">${icon('play')}</span></span><span class="sec-course-content"><span class="eyebrow">Hier geht’s weiter</span><strong>Einwände verstehen.</strong><span class="muted">Modul 4 · Lektion 4 von 7</span>${progress(43, 'Kursfortschritt')}<span class="sec-course-footer"><span>Weiterlernen</span><span class="muted">8 Min.</span>${icon('arrow')}</span></span></button>
      ${label('Als Nächstes', 'Alle Kurse', 'data-modal="course"')}
      <button class="sec-list-row" data-modal="course"><span class="sec-module num">05</span><span class="sec-grow"><strong>Storys, die verbinden</strong><span class="muted">6 Lektionen · Für dich freigeschaltet</span></span>${chevron(icon)}</button>
      <button class="sec-list-row" data-modal="course"><span class="sec-module num">06</span><span class="sec-grow"><strong>Dein Team aufbauen</strong><span class="muted">5 Lektionen · Ab Level 4</span></span>${chevron(icon)}</button>
      ${label('Deine Wissensbibliothek', '', '')}
      <div class="sec-library-grid"><button class="panel sec-library-tile" data-modal="course">${icon('chat')}<strong>Chatführung<br>& Beratung</strong><span class="muted">Worte, die helfen</span>${icon('arrow')}</button><button class="panel sec-library-tile" data-modal="course">${icon('leaf')}<strong>Produktwissen</strong><span class="muted">Sicher empfehlen</span>${icon('arrow')}</button></div>
      <button class="sec-list-row" data-modal="course"><span class="sec-small-icon">${icon('play')}</span><span class="sec-grow"><strong>Team-Call vom 28. August</strong><span class="muted">Aufzeichnung · 52 Minuten</span></span>${chevron(icon)}</button>
      <button class="sec-list-row" data-modal="course"><span class="sec-small-icon">${icon('download')}</span><span class="sec-grow"><strong>Einwand-Skript: Preis</strong><span class="muted">PDF · 1,2 MB</span></span>${chevron(icon)}</button>
    </section>`;
  }

  function chat({ icon, state }) {
    const conversations = [
      { initials: 'T', name: 'Tamara', role: 'Deine Mentorin', time: '18:40', message: 'Super, dass du dabei warst! Schau dir Lektion 4 an.', unread: 2, tint: 'sec-avatar-peach', mentor: true },
      { initials: 'RS', name: 'Team Rising Souls', role: 'Dein Team · 1.612 Mitglieder', time: '17:12', message: 'Jonas: Wer bringt Samstag Proben mit?', unread: 1, tint: 'sec-avatar-olive' },
      { initials: 'BU', name: 'Region Burghausen', role: 'Deine Region · 48 Mitglieder', time: '15:05', message: 'Ayşe: Erstgespräch heute gut gelaufen.', unread: 0, tint: 'sec-avatar-lilac' },
      { initials: 'AK', name: 'Ayşe Kaya', time: 'Gestern', message: 'Danke für den Tipp mit der Story! 🤍', unread: 0, tint: 'sec-avatar-peach' },
      { initials: 'JW', name: 'Jonas Weber', time: 'Di', message: 'Bis Samstag!', unread: 0, tint: 'sec-avatar-olive' },
      { initials: 'MS', name: 'Mira Sommer', time: 'Mo', message: 'Hast du das Einwand-Skript?', unread: 0, tint: 'sec-avatar-lilac' },
    ].filter(item => state.chatFilter !== 'unread' || item.unread);
    return `<section class="sec-page sec-chat">
      <div class="sec-title-row">${heading('Du bist nicht allein', 'Nachrichten')}<button class="icon-button" data-modal="message" aria-label="Neue Nachricht">${icon('edit')}</button></div>
      <button class="sec-search" data-modal="message">${icon('search')}<span>Personen oder Gruppen suchen</span></button>
      <div class="sec-filters" aria-label="Nachrichten filtern">${[['all', 'Alle Nachrichten'], ['unread', 'Ungelesen <span class="sec-filter-count">3</span>']].map(([value, text]) => `<button data-chat-filter="${value}" class="${state.chatFilter === value ? 'is-active' : ''}" aria-pressed="${state.chatFilter === value}">${text}</button>`).join('')}</div>
      <div class="sec-conversation-list">${conversations.map(item => `<button class="sec-conversation ${item.unread ? 'is-unread' : ''} ${item.mentor ? 'is-mentor' : ''}" data-modal="message" data-person="${item.name}" aria-label="Chat mit ${item.name}${item.unread ? `, ${item.unread} ungelesene Nachrichten` : ''}">${avatar(item.initials, item.tint)}<span class="sec-grow"><span class="sec-conversation-heading"><strong>${item.name}</strong><small>${item.time}</small></span>${item.role ? `<span class="sec-conversation-role">${item.role}</span>` : ''}<span class="sec-conversation-bottom"><span class="sec-conversation-preview">${item.message}</span>${item.unread ? `<b class="sec-unread">${item.unread}</b>` : ''}</span></span></button>`).join('')}</div>
      <div class="sec-chat-note">${icon('heart')}<span>Ein kurzes „Wie läuft’s?“ kann viel bewegen.</span></div>
      <button class="button sec-wide-button" data-modal="message">${icon('plus')}Neue Nachricht</button>
    </section>`;
  }

  function profil({ icon, state }) {
    const earnedPoints = state.completed ? 40 : 0;
    return `<section class="sec-page sec-profile">
      <div class="sec-title-row"><p class="eyebrow">Dein Profil</p><button class="icon-button" data-modal="settings" aria-label="Einstellungen">${icon('settings')}</button></div>
      <div class="sec-profile-hero"><span class="sec-profile-avatar">LB<span>${icon('check')}</span></span><h2>Lena Berger</h2><p class="muted">@lena_b · Burghausen</p><p class="sec-profile-bio">Schritt für Schritt, mit Herz.</p><button class="button secondary" data-modal="profile">${icon('edit')}Profil bearbeiten</button></div>
      <div class="panel sec-profile-stats"><div><strong class="num">${(1240 + earnedPoints).toLocaleString('de-DE')}</strong><span>Punkte</span></div><div><strong class="num">12</strong><span>Tage Serie</span></div><div><strong class="num">9</strong><span>Erfolge</span></div></div>
      <button class="sec-level-card" data-modal="achievements"><span class="sec-level-icon">${icon('star')}</span><span class="sec-grow"><small class="eyebrow">Deine Stufe</small><strong>Gestalterin</strong><span class="muted">Stufe 4 · Noch ${120 - earnedPoints} Punkte bis Stufe 5</span></span>${chevron(icon)}</button>
      ${label('Das hast du geschafft', 'Alle Erfolge', 'data-modal="achievements"')}
      <div class="sec-achievements"><button data-modal="achievements"><span class="sec-achievement-icon">${icon('flame')}</span><strong>Drangeblieben</strong><small class="muted">12 Tage in Folge</small></button><button data-modal="achievements"><span class="sec-achievement-icon">${icon('check')}</span><strong>Macherin</strong><small class="muted">${37 + (state.completed ? 1 : 0)} Aufgaben</small></button><button data-modal="achievements"><span class="sec-achievement-icon">${icon('book')}</span><strong>Wissensdurst</strong><small class="muted">12 Videos</small></button></div>
      <div class="panel sec-ringana"><div class="sec-section-head"><span class="eyebrow">Dein Ringana-Weg</span>${icon('leaf')}</div><div class="sec-ringana-levels"><strong>Level 3</strong><span>${icon('arrow')}</span><strong>Level 4</strong></div><div class="sec-ringana-meta"><span class="muted">Aktuell</span><span class="muted">Dein Ziel</span></div><div class="sec-ringana-mentor">${avatar('TB', 'sec-avatar-peach')}<span>Tamara begleitet dich als Mentorin.</span></div></div>
      <button class="sec-list-row" data-modal="groups"><span class="sec-small-icon">${icon('people')}</span><strong class="sec-grow">Meine Kontakte</strong>${chevron(icon)}</button>
      <button class="sec-list-row" data-modal="settings"><span class="sec-small-icon">${icon('settings')}</span><strong class="sec-grow">Einstellungen</strong>${chevron(icon)}</button>
    </section>`;
  }

  window.secondaryPages = { weg, community, academy, chat, profil };
})();
