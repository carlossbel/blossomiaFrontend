// src/constants/images.js

// Importar imágenes locales para categorías
import categoryInterior from '../public/flower1.png';
import categoryExterior from '../public/flower2.png';
import categoryCactus from '../public/flower3.png';
import categoryAromaticas from '../public/flower4.jpg';
import categoryAcuaticas from '../public/flower5.png';
import logoImage from '../public/logo.jpg';

// Imagen de respaldo para cuando no se encuentre una imagen
const fallbackImage = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 24 24" fill="none" stroke="%23666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>';

// Exportar objeto con todas las imágenes
const IMAGES = {
  LOGO: logoImage,
  CATEGORY_INTERIOR: categoryInterior,
  CATEGORY_EXTERIOR: categoryExterior,
  CATEGORY_CACTUS: categoryCactus,
  CATEGORY_AROMATICAS: categoryAromaticas,
  CATEGORY_ACUATICAS: categoryAcuaticas,
  FALLBACK: fallbackImage
};

export default IMAGES;