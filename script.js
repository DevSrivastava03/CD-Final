'use strict';

const GENRE_COLORS = {
  'Sci-Fi':    { hex: 0x4fd8f0, css: '#4fd8f0' },
  'Thriller':  { hex: 0xf04f72, css: '#f04f72' },
  'Horror':    { hex: 0xb04fff, css: '#b04fff' },
  'Drama':     { hex: 0xf0c04f, css: '#f0c04f' },
  'Action':    { hex: 0x4ff0a8, css: '#4ff0a8' },
  'Animation': { hex: 0xf07a4f, css: '#f07a4f' },
};

const GENRE_CLUSTERS = {
  'Sci-Fi':    { x:   0,  z:   0 },
  'Thriller':  { x:  65,  z: -35 },
  'Horror':    { x: -65,  z: -45 },
  'Drama':     { x: -55,  z:  55 },
  'Action':    { x:  58,  z:  55 },
  'Animation': { x:  12,  z:  85 },
};

const MOVIES = [
  { id:'inception',      title:'Inception',                          genre:'Sci-Fi',    year:2010, rating:8.8, cast:['Leonardo DiCaprio','Joseph Gordon-Levitt','Tom Hardy','Ellen Page'],       description:'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.' },
  { id:'interstellar',   title:'Interstellar',                       genre:'Sci-Fi',    year:2014, rating:8.6, cast:['Matthew McConaughey','Anne Hathaway','Jessica Chastain','Michael Caine'],  description:'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.' },
  { id:'arrival',        title:'Arrival',                            genre:'Sci-Fi',    year:2016, rating:7.9, cast:['Amy Adams','Jeremy Renner','Forest Whitaker'],                              description:'A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.' },
  { id:'matrix',         title:'The Matrix',                         genre:'Sci-Fi',    year:1999, rating:8.7, cast:['Keanu Reeves','Laurence Fishburne','Carrie-Anne Moss','Hugo Weaving'],     description:'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.' },
  { id:'darkknight',     title:'The Dark Knight',                    genre:'Thriller',  year:2008, rating:9.0, cast:['Christian Bale','Heath Ledger','Aaron Eckhart','Michael Caine'],           description:'When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.' },
  { id:'parasite',       title:'Parasite',                           genre:'Thriller',  year:2019, rating:8.5, cast:['Song Kang-ho','Lee Sun-kyun','Cho Yeo-jeong','Choi Woo-shik'],            description:'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.' },
  { id:'zodiac',         title:'Zodiac',                             genre:'Thriller',  year:2007, rating:7.7, cast:['Jake Gyllenhaal','Mark Ruffalo','Robert Downey Jr.'],                      description:'In the late 1960s a San Francisco cartoonist becomes an amateur detective obsessed with tracking down the Zodiac Killer, a serial murderer who taunts police.' },
  { id:'gone_girl',      title:'Gone Girl',                          genre:'Thriller',  year:2014, rating:8.1, cast:['Ben Affleck','Rosamund Pike','Neil Patrick Harris','Tyler Perry'],         description:'With his wife\'s disappearance having become the focus of an intense media circus, a man struggles under mounting pressure from police, the public, and his own guilt.' },
  { id:'get_out',        title:'Get Out',                            genre:'Horror',    year:2017, rating:7.7, cast:['Daniel Kaluuya','Allison Williams','Bradley Whitford','Catherine Keener'], description:'A young African-American visits his white girlfriend\'s parents for the weekend, where his simmering unease about their reception of him eventually reaches a boiling point.' },
  { id:'hereditary',     title:'Hereditary',                         genre:'Horror',    year:2018, rating:7.3, cast:['Toni Collette','Alex Wolff','Milly Shapiro','Gabriel Byrne'],              description:'A grieving family is haunted by tragic and disturbing occurrences after the death of their secretive grandmother.' },
  { id:'midsommar',      title:'Midsommar',                          genre:'Horror',    year:2019, rating:7.1, cast:['Florence Pugh','Jack Reynor','William Jackson Harper'],                    description:'A couple travels to Sweden to visit a rural hometown\'s midsummer festival. What begins as an idyllic retreat quickly devolves into a violent and bizarre competition.' },
  { id:'shawshank',      title:'The Shawshank Redemption',           genre:'Drama',     year:1994, rating:9.3, cast:['Tim Robbins','Morgan Freeman','Bob Gunton','William Sadler'],              description:'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.' },
  { id:'moonlight',      title:'Moonlight',                          genre:'Drama',     year:2016, rating:7.4, cast:['Mahershala Ali','Naomie Harris','André Holland','Janelle Monáe'],          description:'A young African-American man grapples with his identity and sexuality while experiencing the struggles of childhood, adolescence, and burgeoning adulthood.' },
  { id:'godfather',      title:'The Godfather',                      genre:'Drama',     year:1972, rating:9.2, cast:['Marlon Brando','Al Pacino','James Caan','Robert Duvall'],                  description:'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.' },
  { id:'mad_max',        title:'Mad Max: Fury Road',                 genre:'Action',    year:2015, rating:8.1, cast:['Tom Hardy','Charlize Theron','Nicholas Hoult','Hugh Keays-Byrne'],         description:'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners and a drifter.' },
  { id:'john_wick',      title:'John Wick',                          genre:'Action',    year:2014, rating:7.4, cast:['Keanu Reeves','Michael Nyqvist','Alfie Allen','Willem Dafoe'],             description:'An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took everything from him.' },
  { id:'dunkirk',        title:'Dunkirk',                            genre:'Action',    year:2017, rating:7.9, cast:['Fionn Whitehead','Tom Hardy','Mark Rylance','Barry Keoghan'],              description:'Allied soldiers from Belgium, the British Commonwealth and Empire, and France are surrounded by the German Army and evacuated during a famous WWII battle.' },
  { id:'spirited_away',  title:'Spirited Away',                      genre:'Animation', year:2001, rating:8.6, cast:['Daveigh Chase','Suzanne Pleshette','Miyu Irino','Rumi Hiiragi'],           description:'During her family\'s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits — and must find a way to free her parents.' },
  { id:'spider_verse',   title:'Spider-Man: Into the Spider-Verse',  genre:'Animation', year:2018, rating:8.4, cast:['Shameik Moore','Jake Johnson','Hailee Steinfeld','Mahershala Ali'],        description:'Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat to all realities.' },
  { id:'waltz_bashir',   title:'Waltz with Bashir',                  genre:'Animation', year:2008, rating:8.0, cast:['Ari Folman','Ori Sivan','Ronny Dayag'],                                   description:'An Israeli film director interviews fellow veterans of the 1982 invasion of Lebanon to reconstruct his own lost memories of his term of service in war.' },
];

// procedural film grain overlay
(function initGrain() {
  const canvas = document.getElementById('grain');
  const W = 256, H = 256;
  canvas.width = W; canvas.height = H;
  canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:999;opacity:0.045;mix-blend-mode:screen;';
  const ctx = canvas.getContext('2d');

  function drawGrain() {
    const img = ctx.createImageData(W, H);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const v = (Math.random() * 255) | 0;
      d[i] = d[i+1] = d[i+2] = v;
      d[i+3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    requestAnimationFrame(drawGrain);
  }
  drawGrain();
})();

// 2D star field on the splash
(function initSplashStars() {
  const canvas = document.getElementById('splash-stars');
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2,
      a: Math.random(),
      speed: Math.random() * 0.4 + 0.1,
      phase: Math.random() * Math.PI * 2,
    }));
  }
  resize();
  window.addEventListener('resize', resize);

  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    t += 0.012;
    stars.forEach(s => {
      const alpha = 0.3 + 0.5 * Math.sin(t * s.speed + s.phase);
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(220,210,240,${alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

const splash = document.getElementById('splash');
document.getElementById('splash-enter').addEventListener('click', () => {
  splash.classList.add('fade-out');
  setTimeout(() => splash.remove(), 1000);
});

// Canvas texture for a planet: radial base + a few horizontal bands + specular highlight.
function makePlanetTexture(hexColor, size = 256) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const color = new THREE.Color(hexColor);

  const bg = ctx.createRadialGradient(size*0.38, size*0.32, 0, size/2, size/2, size/2);
  bg.addColorStop(0, `rgba(${(color.r*255+120)|0},${(color.g*255+120)|0},${(color.b*255+120)|0},1)`);
  bg.addColorStop(0.5, `rgba(${(color.r*200)|0},${(color.g*200)|0},${(color.b*200)|0},1)`);
  bg.addColorStop(1, `rgba(${(color.r*40)|0},${(color.g*40)|0},${(color.b*40)|0},1)`);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, size, size);

  for (let i = 0; i < 6; i++) {
    const y = (size / 6) * i + Math.random() * 20;
    const thickness = 4 + Math.random() * 18;
    const grad = ctx.createLinearGradient(0, y, size, y + thickness);
    grad.addColorStop(0, `rgba(255,255,255,0)`);
    grad.addColorStop(0.4, `rgba(255,255,255,${0.04 + Math.random()*0.06})`);
    grad.addColorStop(1, `rgba(255,255,255,0)`);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(size/2, y + thickness/2, size/2 + Math.random()*30, thickness, Math.random()*0.3, 0, Math.PI*2);
    ctx.fill();
  }

  const spec = ctx.createRadialGradient(size*0.3, size*0.25, 0, size*0.35, size*0.3, size*0.28);
  spec.addColorStop(0, 'rgba(255,255,255,0.22)');
  spec.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = spec;
  ctx.fillRect(0, 0, size, size);

  return new THREE.CanvasTexture(canvas);
}

// Soft additive sprite used for halos around planets and clusters.
function makeGlowSprite(hexColor, opacity = 0.7) {
  const s = 256;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = s;
  const ctx = canvas.getContext('2d');
  const color = new THREE.Color(hexColor);
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);

  const grad = ctx.createRadialGradient(s/2, s/2, 0, s/2, s/2, s/2);
  grad.addColorStop(0,   `rgba(${r},${g},${b},${opacity})`);
  grad.addColorStop(0.2, `rgba(${r},${g},${b},${opacity*0.6})`);
  grad.addColorStop(0.5, `rgba(${r},${g},${b},${opacity*0.18})`);
  grad.addColorStop(1,   `rgba(${r},${g},${b},0)`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, s, s);

  const tex = new THREE.CanvasTexture(canvas);
  const mat = new THREE.SpriteMaterial({
    map: tex, transparent: true,
    blending: THREE.AdditiveBlending, depthWrite: false,
  });
  return new THREE.Sprite(mat);
}

// Pair up films: shared cast wins; otherwise same-genre.
function buildEdges(movies) {
  const edges = [];
  for (let i = 0; i < movies.length; i++) {
    for (let j = i + 1; j < movies.length; j++) {
      const a = movies[i], b = movies[j];
      const shared = a.cast.filter(x => b.cast.includes(x));
      if (shared.length) { edges.push({ i, j, type: 'cast' }); continue; }
      if (a.genre === b.genre) edges.push({ i, j, type: 'genre' });
    }
  }
  return edges;
}

const container = document.getElementById('canvas-container');
const scene     = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 6000);
camera.position.set(0, 70, 195);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setClearColor(0x050408, 1);
renderer.shadowMap.enabled = false;
container.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping   = true;
controls.dampingFactor   = 0.055;
controls.minDistance     = 18;
controls.maxDistance     = 520;
controls.autoRotate      = true;
controls.autoRotateSpeed = 0.14;
controls.enablePan       = true;

scene.fog = new THREE.FogExp2(0x050408, 0.0008);

scene.add(new THREE.AmbientLight(0x111122, 2.4));
const rimLight = new THREE.PointLight(0x4fd8f0, 2, 600);
rimLight.position.set(-100, 120, -80);
scene.add(rimLight);
const warmLight = new THREE.PointLight(0xf0c04f, 1.2, 400);
warmLight.position.set(80, -40, 100);
scene.add(warmLight);

// 8k stars scattered on a thick spherical shell, four-color palette.
function buildStarfield() {
  const COUNT  = 8000;
  const pos    = new Float32Array(COUNT * 3);
  const col    = new Float32Array(COUNT * 3);
  const sizes  = new Float32Array(COUNT);

  const palette = [
    [1.0, 1.0, 1.0],
    [0.72, 0.82, 1.0],
    [1.0, 0.88, 0.68],
    [0.85, 0.72, 1.0],
  ];

  for (let i = 0; i < COUNT; i++) {
    const R = 900 + Math.random() * 1800;
    const θ = Math.random() * Math.PI * 2;
    const φ = Math.acos(2 * Math.random() - 1);
    pos[i*3]   = R * Math.sin(φ) * Math.cos(θ);
    pos[i*3+1] = R * Math.sin(φ) * Math.sin(θ);
    pos[i*3+2] = R * Math.cos(φ);
    sizes[i] = 0.4 + Math.random() * 2.2;
    const c = palette[(Math.random() * palette.length) | 0];
    col[i*3]   = c[0]; col[i*3+1] = c[1]; col[i*3+2] = c[2];
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
  geo.setAttribute('size',     new THREE.BufferAttribute(sizes, 1));

  const mat = new THREE.PointsMaterial({
    size: 1.4,
    vertexColors: true,
    transparent: true,
    opacity: 0.88,
    sizeAttenuation: true,
    depthWrite: false,
  });
  return new THREE.Points(geo, mat);
}
scene.add(buildStarfield());

// Faint Milky Way arc — narrow band of points around the equator.
(function buildMilkyWay() {
  const COUNT = 3000;
  const pos = new Float32Array(COUNT * 3);
  const col = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    const θ = (Math.random() - 0.5) * Math.PI * 0.35;
    const φ = Math.random() * Math.PI * 2;
    const R = 700 + Math.random() * 400;
    const spread = 60;
    pos[i*3]   = R * Math.cos(φ) * Math.cos(θ) + (Math.random()-0.5)*spread;
    pos[i*3+1] = R * Math.sin(θ) + (Math.random()-0.5)*spread*0.3;
    pos[i*3+2] = R * Math.sin(φ) * Math.cos(θ) + (Math.random()-0.5)*spread;
    const v = 0.5 + Math.random() * 0.5;
    col[i*3] = v*0.7; col[i*3+1] = v*0.75; col[i*3+2] = v;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
  const mat = new THREE.PointsMaterial({ size: 0.8, vertexColors: true, transparent: true, opacity: 0.35, depthWrite: false });
  scene.add(new THREE.Points(geo, mat));
})();

// Distant nebula volumes — large transparent backside spheres for color depth.
[
  { color: 0x0a0030, r: 180 }, { color: 0x002244, r: 140 },
  { color: 0x1a0020, r: 200 }, { color: 0x001a10, r: 160 },
].forEach(n => {
  const geo = new THREE.SphereGeometry(n.r, 7, 7);
  const mat = new THREE.MeshBasicMaterial({
    color: n.color, transparent: true, opacity: 0.055,
    side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(
    (Math.random()-0.5)*350, (Math.random()-0.5)*80, (Math.random()-0.5)*350
  );
  scene.add(mesh);
});

// Big soft halo at each genre cluster center.
Object.entries(GENRE_CLUSTERS).forEach(([genre, pos]) => {
  const glow = makeGlowSprite(GENRE_COLORS[genre].hex, 0.12);
  glow.scale.setScalar(160);
  glow.position.set(pos.x, 0, pos.z);
  scene.add(glow);
});

// Each entry: { mesh, outerGlow, innerGlow, movie, idx, baseR, baseY, hexColor, cssColor }
const planetData = [];

function jitter(v, s) { return v + (Math.random()-0.5)*s; }

MOVIES.forEach((movie, idx) => {
  const { hex, css } = GENRE_COLORS[movie.genre];
  const cluster      = GENRE_CLUSTERS[movie.genre];

  const px = jitter(cluster.x, 42);
  const py = jitter(0, 16);
  const pz = jitter(cluster.z, 42);

  // Radius scales with rating, anchored at 7.0.
  const baseR = 2.6 + (movie.rating - 7) * 1.0;

  const geo = new THREE.SphereGeometry(baseR, 40, 40);
  const tex = makePlanetTexture(hex);
  const mat = new THREE.MeshPhongMaterial({
    map: tex,
    emissive: new THREE.Color(hex),
    emissiveIntensity: 0.35,
    shininess: 60,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(px, py, pz);

  // Atmosphere shell — backside additive sphere just above the surface.
  const atmGeo = new THREE.SphereGeometry(baseR * 1.08, 32, 32);
  const atmMat = new THREE.MeshBasicMaterial({
    color: hex, transparent: true, opacity: 0.06,
    side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false,
  });
  mesh.add(new THREE.Mesh(atmGeo, atmMat));

  // Some Sci-Fi/Action planets get a Saturn-style ring.
  if (['Sci-Fi','Action'].includes(movie.genre) && Math.random() > 0.45) {
    const ringGeo = new THREE.TorusGeometry(baseR * 1.85, 0.14, 6, 80);
    const ringMat = new THREE.MeshBasicMaterial({
      color: hex, transparent: true, opacity: 0.28,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.4 + (Math.random()-0.5)*0.3;
    mesh.add(ring);
  }

  scene.add(mesh);

  const innerGlow = makeGlowSprite(hex, 0.85);
  innerGlow.scale.setScalar(baseR * 4.5);
  innerGlow.position.copy(mesh.position);
  scene.add(innerGlow);

  const outerGlow = makeGlowSprite(hex, 0.28);
  outerGlow.scale.setScalar(baseR * 9);
  outerGlow.position.copy(mesh.position);
  scene.add(outerGlow);

  planetData.push({ mesh, outerGlow, innerGlow, movie, idx, baseR, baseY: py, hexColor: hex, cssColor: css });
});

const edges       = buildEdges(MOVIES);
const edgeObjects = [];

edges.forEach(edge => {
  const a = planetData[edge.i].mesh.position;
  const b = planetData[edge.j].mesh.position;

  if (edge.type === 'cast') {
    // Fake a dashed line by skipping every third segment along the path.
    const pts  = [];
    const segs = 30;
    for (let s = 0; s <= segs; s++) {
      const t = s / segs;
      if (s % 3 === 2) continue;
      pts.push(new THREE.Vector3().lerpVectors(a, b, t));
      const t2 = (s + 0.7) / segs;
      if (t2 > 1) break;
      pts.push(new THREE.Vector3().lerpVectors(a, b, t2));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({
      color: 0xe8c97a, transparent: true, opacity: 0.55,
      blending: THREE.AdditiveBlending, depthWrite: false,
      linewidth: 1,
    });
    const line = new THREE.LineSegments(geo, mat);
    scene.add(line);
    edgeObjects.push({ line, mat, type: 'cast', base: 0.55 });
  } else {
    const geo = new THREE.BufferGeometry().setFromPoints([a.clone(), b.clone()]);
    const mat = new THREE.LineBasicMaterial({
      color: 0x3a3560, transparent: true, opacity: 0.18,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const line = new THREE.Line(geo, mat);
    scene.add(line);
    edgeObjects.push({ line, mat, type: 'genre', base: 0.18 });
  }
});

const legendEl = document.getElementById('legend-items');
Object.entries(GENRE_COLORS).forEach(([genre, { css }]) => {
  const item = document.createElement('div');
  item.className = 'legend-item';

  const orb = document.createElement('div');
  orb.className = 'legend-orb';
  orb.style.background = css;
  orb.style.boxShadow  = `0 0 6px ${css}`;
  orb.style.color      = css;

  const label = document.createElement('span');
  label.textContent = genre;

  item.appendChild(orb);
  item.appendChild(label);
  legendEl.appendChild(item);
});

// Per-film visit counter, persisted across page loads.
const VISITED_KEY = 'cineverse:visited';

function getVisited() {
  try { return JSON.parse(localStorage.getItem(VISITED_KEY) || '{}'); }
  catch { return {}; }
}
function markVisited(id) {
  const v = getVisited();
  v[id] = (v[id] || 0) + 1;
  localStorage.setItem(VISITED_KEY, JSON.stringify(v));
}

function applyVisitedGlow() {
  const v = getVisited();
  planetData.forEach(p => {
    if (v[p.movie.id]) {
      p.mesh.scale.setScalar(1.18);
      p.innerGlow.scale.setScalar(p.baseR * 6.5);
      p.outerGlow.scale.setScalar(p.baseR * 13);
      p.mesh.material.emissiveIntensity = 0.7;
    }
  });
  document.getElementById('hud-explored').textContent = Object.keys(v).length;
}
applyVisitedGlow();

// "You drift toward X" — surfaces once a genre crosses 2 visits.
function updateInsight() {
  const v = getVisited();
  const counts = {};
  Object.keys(v).forEach(id => {
    const m = MOVIES.find(x => x.id === id);
    if (m) counts[m.genre] = (counts[m.genre] || 0) + v[id];
  });
  const top = Object.entries(counts).sort((a,b) => b[1]-a[1])[0];
  const chip = document.getElementById('insight-chip');
  const text = document.getElementById('insight-text');
  if (top && top[1] >= 2) {
    text.textContent = `You drift toward ${top[0]}`;
    chip.classList.remove('hidden');
  } else {
    chip.classList.add('hidden');
  }
}

const panel = document.getElementById('info-panel');

function openPanel(planet) {
  const { movie, idx, cssColor } = planet;

  panel.style.setProperty('--panel-color', cssColor);
  document.getElementById('panel-stripe').style.background     = cssColor;
  document.getElementById('panel-stripe').style.boxShadow      = `0 0 22px ${cssColor}`;
  document.getElementById('panel-index').textContent           = `WORLD ${String(idx+1).padStart(2,'0')} / 20`;
  document.getElementById('panel-genre-tag').textContent       = movie.genre;
  document.getElementById('panel-genre-tag').style.color       = cssColor;
  document.getElementById('panel-genre-tag').style.borderColor = cssColor;
  document.getElementById('info-title').textContent            = movie.title;
  document.getElementById('info-year').textContent             = movie.year;
  document.getElementById('info-rating').textContent           = movie.rating.toFixed(1);
  document.getElementById('info-desc').textContent             = movie.description;

  // Animate the rating bar from 0 to its target width.
  const fill = document.getElementById('rating-fill');
  fill.style.width = '0%';
  fill.style.background = cssColor;
  fill.style.boxShadow  = `0 0 8px ${cssColor}`;
  setTimeout(() => { fill.style.width = `${(movie.rating / 10) * 100}%`; }, 60);

  const castEl = document.getElementById('info-cast');
  castEl.innerHTML = '';
  movie.cast.forEach(actor => {
    const tag = document.createElement('span');
    tag.className   = 'cast-tag';
    tag.textContent = actor;
    castEl.appendChild(tag);
  });

  document.getElementById('info-visited').classList.toggle('hidden', !getVisited()[movie.id]);

  panel.classList.remove('hidden');
  panel.style.animation = 'none';
  void panel.offsetWidth;
  panel.style.animation = '';
}

function closePanel() { panel.classList.add('hidden'); }
document.getElementById('info-close').addEventListener('click', closePanel);

const tooltip = document.getElementById('tooltip');
const ttTitle = document.getElementById('tt-title');
const ttMeta  = document.getElementById('tt-meta');

function showTooltip(planet, x, y) {
  ttTitle.textContent = planet.movie.title;
  ttMeta.textContent  = `${planet.movie.genre}  ·  ${planet.movie.year}`;
  ttTitle.style.borderColor = planet.cssColor;
  tooltip.style.left = `${x}px`;
  tooltip.style.top  = `${y}px`;
  tooltip.classList.remove('hidden');
}
function hideTooltip() { tooltip.classList.add('hidden'); }

const raycaster = new THREE.Raycaster();
const mouse     = new THREE.Vector2(-9999, -9999);
let hovered     = null;

function getNDC(e) {
  const r = renderer.domElement.getBoundingClientRect();
  mouse.x =  ((e.clientX - r.left) / r.width)  * 2 - 1;
  mouse.y = -((e.clientY - r.top)  / r.height) * 2 + 1;
}

renderer.domElement.addEventListener('mousemove', e => {
  getNDC(e);
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(planetData.map(p => p.mesh));

  if (hits.length) {
    const planet = planetData.find(p => p.mesh === hits[0].object);
    if (planet !== hovered) {
      if (hovered) resetGlow(hovered);
      hovered = planet;
      boostGlow(planet);
      renderer.domElement.style.cursor = 'pointer';
    }
    showTooltip(planet, e.clientX, e.clientY);
  } else {
    if (hovered) { resetGlow(hovered); hovered = null; }
    renderer.domElement.style.cursor = 'grab';
    hideTooltip();
  }
});

renderer.domElement.addEventListener('click', e => {
  getNDC(e);
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(planetData.map(p => p.mesh));
  if (hits.length) {
    const planet = planetData.find(p => p.mesh === hits[0].object);
    if (planet) {
      markVisited(planet.movie.id);
      applyVisitedGlow();
      updateInsight();
      openPanel(planet);
      zoomTo(planet);
      hideTooltip();
    }
  }
});

function boostGlow(p) {
  p.mesh.material.emissiveIntensity = 1.2;
  p.innerGlow.scale.setScalar(p.baseR * 7.5);
  p.outerGlow.scale.setScalar(p.baseR * 15);
  p.mesh.scale.setScalar(1.1);
}
function resetGlow(p) {
  const visited = getVisited()[p.movie.id];
  p.mesh.material.emissiveIntensity = visited ? 0.7 : 0.35;
  p.innerGlow.scale.setScalar(visited ? p.baseR * 6.5  : p.baseR * 4.5);
  p.outerGlow.scale.setScalar(visited ? p.baseR * 13   : p.baseR * 9);
  p.mesh.scale.setScalar(visited ? 1.18 : 1.0);
}

let tween = null;

function easeOutExpo(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }

function zoomTo(planet) {
  const target = planet.mesh.position.clone();
  const dist   = planet.baseR * 6.5 + 16;
  const dir    = camera.position.clone().sub(target).normalize();
  const dest   = target.clone().add(dir.multiplyScalar(dist));

  tween = {
    sPos: camera.position.clone(),
    dPos: dest,
    sTgt: controls.target.clone(),
    dTgt: target,
    dur:  1400, elapsed: 0,
  };
  controls.autoRotate = false;
}

function resetView() {
  tween = {
    sPos: camera.position.clone(),
    dPos: new THREE.Vector3(0, 70, 195),
    sTgt: controls.target.clone(),
    dTgt: new THREE.Vector3(0, 0, 0),
    dur: 1100, elapsed: 0,
    onDone: () => { controls.autoRotate = true; },
  };
  closePanel();
}

document.getElementById('btn-reset').addEventListener('click', resetView);

window.addEventListener('resize', () => {
  const W = container.clientWidth, H = container.clientHeight;
  camera.aspect = W / H;
  camera.updateProjectionMatrix();
  renderer.setSize(W, H);
});

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const dt = clock.getDelta();
  const t  = clock.getElapsedTime();

  // Spin each planet and gently bob it on the y-axis.
  planetData.forEach((p, i) => {
    p.mesh.rotation.y += dt * (0.06 + i * 0.004);
    p.mesh.position.y = p.baseY + Math.sin(t * 0.35 + i * 1.15) * 0.7;
    p.innerGlow.position.copy(p.mesh.position);
    p.outerGlow.position.copy(p.mesh.position);
  });

  // Pulse cast edges so they feel alive.
  edgeObjects.forEach((e, i) => {
    if (e.type === 'cast') {
      e.mat.opacity = e.base * (0.55 + 0.45 * Math.sin(t * 0.9 + i * 0.7));
    }
  });

  rimLight.position.x = -100 + Math.sin(t * 0.12) * 60;
  rimLight.position.z = -80 + Math.cos(t * 0.08) * 60;

  if (tween) {
    tween.elapsed += dt * 1000;
    const progress = Math.min(tween.elapsed / tween.dur, 1);
    const ease     = easeOutExpo(progress);
    camera.position.lerpVectors(tween.sPos, tween.dPos, ease);
    controls.target.lerpVectors(tween.sTgt, tween.dTgt, ease);
    if (progress >= 1) {
      tween.onDone && tween.onDone();
      tween = null;
    }
  }

  controls.update();
  renderer.render(scene, camera);
}

updateInsight();
animate();
