// Datos de ejemplo
const people = [
  "Alvarez Carlos","Benitez Lucia","Caicedo Andres","Diaz Maria","Estrada Pedro",
  "Fernandez Sofia","Garcia Luis","Hernandez Ana","Ibarra Jorge","Juarez Mateo",
  "Lopez Martina","Martinez Juan","Nunez Camila","Ortiz Diego","Perez Laura",
  "Quintero Julian","Ramos Natalia","Sanchez Andres","Torres Valentina","Ulloa David",
  "Vargas Daniela","Wilches Fabian","Ximenez Carla","Yanez Raul","Zapata Lucia"
].map(name => {
  const [last, first] = name.split(" ");
  return { last, first, full: name };
});

// Variables
const pageSize = 9;
let currentPage = 0;
let activeLetter = null;

const gridEl = document.getElementById('grid');
const alphabetEl = document.getElementById('alphabet');

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
      currentPage = 0;
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
  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
  if(currentPage >= totalPages) currentPage = totalPages - 1;
  const start = currentPage * pageSize;
  const pageItems = data.slice(start, start + pageSize);

  gridEl.innerHTML = '';
  if(pageItems.length === 0){
    gridEl.innerHTML = '<div style="padding:18px;grid-column:1/-1">No se encontraron resultados.</div>';
  } else {
    pageItems.forEach(p => gridEl.appendChild(renderCard(p)));
  }

  document.getElementById('prev').disabled = currentPage === 0;
  document.getElementById('next').disabled = currentPage >= totalPages-1;
}

// Controles
document.getElementById('prev').addEventListener('click', () => { if(currentPage>0){ currentPage--; render(); } });
document.getElementById('next').addEventListener('click', () => { currentPage++; render(); });

// Botones Entrada/Salida → se bloquean al usarse
document.body.addEventListener('click', ev => {
  const btn = ev.target.closest('.btn');
  if(!btn) return;
  btn.textContent = btn.textContent + " ✓";
  btn.disabled = true;
});

const backBtn = document.getElementById('backBtn');
backBtn.addEventListener('click', () => {
  activeLetter = null;   // limpia el filtro
  updateActiveLetters(); // quita la marca activa en el paginador
  render();              // vuelve a mostrar todos los profesores
});

// Init
buildAlphabet();
render();
