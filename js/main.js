document.addEventListener('DOMContentLoaded', () => {
  fetch('/data/profiles.json')
    .then(response => response.json())
    .then(profiles => {
      const list = document.getElementById('profiles-list');
      if (list) {
        profiles.forEach(p => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = p.url;
          a.textContent = p.name;
          a.target = '_blank';
          li.appendChild(a);
          list.appendChild(li);
        });
      }
    })
    .catch(err => console.error('Failed to load profiles', err));

  fetch('/data/projects.json')
    .then(response => response.json())
    .then(projects => {
      const list = document.getElementById('projects-list');
      if (list) {
        projects.forEach(p => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = p.url;
          a.textContent = p.name;
          a.target = '_blank';
          li.appendChild(a);
          if (p.description) {
            const span = document.createElement('span');
            span.textContent = ' - ' + p.description;
            li.appendChild(span);
          }
          list.appendChild(li);
        });
      }
    })
    .catch(err => console.error('Failed to load projects', err));
});
