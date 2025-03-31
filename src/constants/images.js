// src/constants/images.js

// Import local images from public folder in src
import logoImage from '../public/logo.jpg';

// Plant images
// Monstera Deliciosa
import monsteraMain from '../public/m1.jpg';
import monstera2 from '../public/m2.jpg';
import monstera3 from '../public/m3.jpg';

// Lavanda
import lavandaMain from '../public/l1.jpg';
import lavanda2 from '../public/l2.jpg';
import lavanda3 from '../public/l3.jpg';

// Jardín Tropical
import jardinTropicalMain from '../public/jt.jpg';
import jardinTropical2 from '../public/jt2.jpeg';
import jardinTropical3 from '../public/jt3.jpg';

// Orquídeas
import orquideaMain from '../public/o.jpg';
import orquidea1 from '../public/o1.jpeg';
import orquidea2 from '../public/o2.jpg';
import orquidea3 from '../public/o3.jpg';

// Cactus
import cactusMain from '../public/c.jpg';
import cactus1 from '../public/c1.jpg';
import cactus2 from '../public/c2.jpg';

// Cactus Estrella
import cactusEstrellaMain from '../public/ce.jpeg';
import cactusEstrella1 from '../public/ce1.jpg';

// Suculentas
import suculentaMain from '../public/s.jpg';
import suculenta1 from '../public/s1.jpg';
import suculenta2 from '../public/s2.jpg';

// Nenúfar
import nunefarMain from '../public/n.jpg';
import nunefar1 from '../public/n1.jpg';
import nunefar2 from '../public/n2.jpeg';

// Pothos
import pothosMain from '../public/p.jpg';
import pothos1 from '../public/p1.jpg';

// Imagen de respaldo para cuando no se encuentre una imagen
const fallbackImage = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 24 24" fill="none" stroke="%23666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>';

// Categorías
const categories = {
  interior: '../public/flower1.png',
  exterior: '../public/flower2.png',
  cactus: '../public/flower3.png',
  aromaticas: '../public/flower4.jpg',
  acuaticas: '../public/flower5.png'
};

// Colecciones de imágenes por planta
const plantCollections = {
  monstera: [monsteraMain, monstera2, monstera3],
  lavanda: [lavandaMain, lavanda2, lavanda3],
  jardinTropical: [jardinTropicalMain, jardinTropical2, jardinTropical3],
  orquideas: [orquideaMain, orquidea1, orquidea2, orquidea3],
  cactus: [cactusMain, cactus1, cactus2],
  cactusEstrella: [cactusEstrellaMain, cactusEstrella1],
  suculentas: [suculentaMain, suculenta1, suculenta2],
  nenufar: [nunefarMain, nunefar1, nunefar2],
  pothos: [pothosMain, pothos1]
};

// Exportar objeto con todas las imágenes
const IMAGES = {
  LOGO: logoImage,
  CATEGORIES: categories,
  PLANTS: plantCollections,
  FALLBACK: fallbackImage
};

export default IMAGES;