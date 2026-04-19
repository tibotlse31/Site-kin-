(function(){
  window.APP = {
    channelButtons(containerId, selectedId, onSelect){
      const root = document.getElementById(containerId);
      if(!root) return;
      const channels = Object.values(window.COURSE_DATA.channels);
      root.innerHTML = '';
      channels.forEach(channel => {
        const btn = document.createElement('button');
        btn.className = `btn ${channel.id === selectedId ? 'active' : ''}`;
        btn.innerHTML = `${channel.icon} ${channel.name}`;
        btn.addEventListener('click', () => onSelect(channel.id));
        root.appendChild(btn);
      });
    },
    renderList(items){
      return `<ul class="plain-list">${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
    },
    pageNav(current){
      const pages = [
        ['vestibulaire.html','Accueil'],
        ['diagnostic.html','Diagnostic'],
        ['traitements.html','Traitements'],
        ['cas-cliniques.html','Cas cliniques'],
        ['checklists.html','Checklists'],
        ['pieges.html','Pièges'],
        ['visualiseur.html','Visualiseur']
      ];
      const row = document.getElementById('pageNav');
      if(!row) return;
      row.innerHTML = pages.map(([href,label]) => {
        const cls = href === current ? 'nav-chip active-chip' : 'nav-chip';
        return `<a class="${cls}" href="${href}">${label}</a>`;
      }).join('');
    }
  };
})();
