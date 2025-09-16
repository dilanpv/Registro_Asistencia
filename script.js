// Lista de profesores (puedes ampliarla)
const people = [
  "Alvarez Carlos","Benitez Lucia","Caicedo Andres","Diaz Maria","Estrada Pedro",
  "Fernandez Sofia","Garcia Luis","Hernandez Ana","Ibarra Jorge","Juarez Mateo",
  "Lopez Martina","Martinez Juan","Nunez Camila","Ortiz Diego","Perez Laura",
  "Quintero Julian","Ramos Natalia","Sanchez Andres","Torres Valentina","Ulloa David",
  "Vargas Daniela","Wilches Fabian","Ximenez Carla","Yanez Raul","Zapata Lucia",
  "Acevedo Pilar","Bermudez Samuel","Cortes Lucia","Duarte Sergio","Esteban Nora",
  "Castro Julian","Moreno Sara","Osorio Camilo","Rojas Diana","Suarez Felipe"
].map(name => {
  const [last, first] = name.split(" ");
  return { last, first, full: name };
});

let activeLetter = null;

const gridEl = document.getElementById('grid');
const alphabetEl = document.getElementById('alphabet');
const backBtn = document.getElementById('backBtn');

function renderCard(p){
  const el = document.createElement('article');
  el.className = 'card';
  el.innerHTML = `
    <div class="avatar-row">
      <div class="avatar">${p.first ? p.first[0] : "?"}</div>
      <div>
        <div class="name">${p.last}</div>
        <div class="sub">${p.first || ''}</div>
      </div>
    </div>
    <div class="buttons">
      <button class="btn enter" data-name="${p.full}">Entrada</button>
      <button class="btn exit" data-name="${p.full}">Salida</button>
    </div>
  `;
  return el;
}

function buildAlphabet(){
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
  alphabetEl.innerHTML = '';
  letters.forEach(l => {
    const b = document.createElement('div');
    b.className = 'letter';
    b.textContent = l;
    b.addEventListener('click', () => {
      activeLetter = (activeLetter === l) ? null : l;
      updateActiveLetters();
      render();
    });
    alphabetEl.appendChild(b);
  });
  updateActiveLetters();
}

function updateActiveLetters(){
  document.querySelectorAll('.letter').forEach(el => {
    el.classList.toggle('active', el.textContent === activeLetter);
  });
}

function filtered(){
  return people.filter(p => {
    if(activeLetter && p.last[0].toUpperCase() !== activeLetter) return false;
    return true;
  });
}

function render(){
  const data = filtered();
  gridEl.innerHTML = '';
  if(data.length === 0){
    gridEl.innerHTML = '<div style="padding:18px;grid-column:1/-1">No se encontraron resultados.</div>';
  } else {
    data.forEach(p => gridEl.appendChild(renderCard(p)));
  }
}

// Entrada/Salida → se bloquean al usarse
document.body.addEventListener('click', ev => {
  const btn = ev.target.closest('.btn');
  if(!btn) return;
  btn.textContent = btn.textContent + " ✓";
  btn.disabled = true;
});

// Botón Regresar → quita el filtro y muestra todos
backBtn.addEventListener('click', () => {
  activeLetter = null;
  updateActiveLetters();
  render();
});

// Init
buildAlphabet();
render();
