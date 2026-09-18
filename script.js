/* ==========================================================================
   Fraccionamiento Universidad - 7 Veces 7 Bienes Raíces (Santos)
   Lógica Interactiva: Tour 360° con Puntos de Interés, Cotizador, Mapa, Galería
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTour360();
  initCalculator();
  initMap();
  initGallery();
  initNavigation();
});

/* ==========================================================================
   1. TOUR VIRTUAL 360° INTERACTIVO CON PUNTOS DE INTERÉS (PANNELLUM)
   ========================================================================== */
let viewer360 = null;
let isAutoRotating = true;

// Datos Oficiales de los 6 Puntos de Interés Clave del Desarrollo
const HOTSPOTS_DATA = {
  calles_manzanas: {
    pitch: -74.5,
    yaw: -86.2,
    hfov: 80,
    icon: '🛣️',
    category: 'Fraccionamiento Universidad',
    title: '1. Calles y Manzanas Residenciales',
    text: 'Trazo perimetral y apertura de vialidades de 8.00 metros de ancho niveladas con motoniveladora. Delimitación de manzanas con lotes tipo de 120 m² (8m frente × 15m fondo) con posesión inmediata.',
    specs: ['✅ Calles de 8.00m', '✅ Lotes tipo 120 m²', '✅ Posesión Inmediata', '✅ Sin Buró de Crédito'],
    image: 'img/tour_puntos/punto1_calles_manzanas.jpg',
    lightboxTitle: '1. Calles y Manzanas: Fraccionamiento Universidad',
    lightboxDesc: 'Vista aérea cenital del trazo urbanístico, apertura de calles de 8 metros de ancho y distribución regular de manzanas y lotes.',
    waMsg: 'Hola Santos, me interesa conocer los lotes en las calles y manzanas trazadas del Fraccionamiento Universidad.'
  },
  acceso_principal: {
    pitch: -44.4,
    yaw: -137.5,
    hfov: 75,
    icon: '🚪',
    category: 'Conectividad y Vías',
    title: '2. Acceso Principal al Desarrollo',
    text: 'Entronque vehicular directo desde la carretera pavimentada hacia el camino de terracería nivelado que ingresa directamente a las calles del fraccionamiento.',
    specs: ['✅ Conexión con Carretera', '✅ Camino nivelado', '✅ Tránsito todo el año'],
    image: 'img/tour_puntos/punto2_acceso_principal.jpg',
    lightboxTitle: '2. Acceso Principal al Desarrollo (Entronque Carretera y Terracería)',
    lightboxDesc: 'Punto de incorporación desde la vía pavimentada hacia el camino de terracería que conduce de forma directa al fraccionamiento.',
    waMsg: 'Hola Santos, quiero información sobre el acceso vehicular y cómo llegar al Fraccionamiento Universidad.'
  },
  universidad: {
    pitch: -21.5,
    yaw: -111.4,
    hfov: 80,
    icon: '🎓',
    category: 'Educación y Plusvalía',
    title: '3. Campus Universitario UAEM / Vía Rápida',
    text: 'Orientación hacia la Ciudad del Conocimiento, campus universitario UAEM / UAEH, Hospital General y la vía rápida con conexión directa hacia Pachuca y la Ciudad de México.',
    specs: ['✅ Alta plusvalía', '✅ Centros universitarios cercanos', '✅ Conexión carretera rápida'],
    image: 'img/tour_puntos/punto3_campus_universitario.jpg',
    lightboxTitle: '3. Campus Universitario UAEM y Vía Rápida Regional',
    lightboxDesc: 'Perspectiva aérea panorámica hacia el corredor educativo de la Ciudad del Conocimiento y la conexión carretera regional.',
    waMsg: 'Hola Santos, me interesa invertir en un lote cerca del Campus Universitario UAEM / Ciudad del Conocimiento.'
  },
  poblado: {
    pitch: -14.9,
    yaw: -15.0,
    hfov: 80,
    icon: '🏘️',
    category: 'Poblado y Servicios',
    title: '4. Santo Domingo Aztacameca',
    text: 'Poblado y cabecera local en el Municipio de Axapusco, ubicado a escasos minutos del desarrollo. Cuenta con comercios, farmacias, transporte público, iglesia y ambiente campestre seguro.',
    specs: ['✅ Servicios básicos cercanos', '✅ Transporte colectivo', '✅ Ambiente familiar'],
    image: 'img/tour_puntos/punto4_santo_domingo.jpg',
    lightboxTitle: '4. Santo Domingo Aztacameca (Comunidad y Servicios)',
    lightboxDesc: 'Vista del poblado de Santo Domingo Aztacameca con su infraestructura urbana, comercios y cercanía al desarrollo.',
    waMsg: 'Hola Santos, quiero conocer más sobre los servicios y la cercanía con Santo Domingo Aztacameca.'
  },
  deportivo_escuelas: {
    pitch: -24.0,
    yaw: -24.0,
    hfov: 75,
    icon: '⚽',
    category: 'Equipamiento Educativo y Deportivo',
    title: '5. Preparatoria, Secundaria y Campo Deportivo',
    text: 'Complejo de equipamiento público para toda la familia: canchas de fútbol profesional empastadas, auditorio cívico con domo techado, preparatoria oficial y secundaria a minutos de tu terreno.',
    specs: ['✅ Canchas con pasto sintético', '✅ Auditorio techado', '✅ Preparatoria y Secundaria cercanas'],
    image: 'img/tour_puntos/punto5_deportivo_escuelas.jpg',
    lightboxTitle: '5. Preparatoria, Secundaria y Campos Deportivos de Aztacameca',
    lightboxDesc: 'Vista aérea del centro deportivo y educativo con canchas de fútbol, auditorio cívico con domo y planteles escolares.',
    waMsg: 'Hola Santos, me interesa saber sobre la cercanía a las escuelas (preparatoria, secundaria) y el deportivo.'
  },
  acceso_pueblo_desarrollo: {
    pitch: -13.6,
    yaw: 104.7,
    hfov: 80,
    icon: '🛣️',
    category: 'Corredor Vial Principal',
    title: '6. Acceso Principal al Pueblo y al Desarrollo',
    text: 'Carretera y arteria vehicular primaria que articula el valle, permitiendo un desplazamiento ágil y seguro entre la carretera estatal, Santo Domingo Aztacameca y el Fraccionamiento Universidad.',
    specs: ['✅ Carretera asfaltada', '✅ Conectividad continua', '✅ Topografía plana y despejada'],
    image: 'img/tour_puntos/punto6_acceso_pueblo_desarrollo.jpg',
    lightboxTitle: '6. Acceso Principal al Pueblo y al Desarrollo',
    lightboxDesc: 'Panorámica del corredor vial principal que comunica la autopista y poblados vecinos con el Fraccionamiento Universidad.',
    waMsg: 'Hola Santos, quiero consultar las rutas de acceso y el trayecto hacia el Fraccionamiento Universidad.'
  }
};

let currentTourPointKey = 'calles_manzanas';

function showTourInfo(pointKey) {
  const data = HOTSPOTS_DATA[pointKey];
  if (!data) return;
  currentTourPointKey = pointKey;

  const card = document.getElementById('tourInfoCard');
  const cat = document.getElementById('tourInfoCategory');
  const title = document.getElementById('tourInfoTitle');
  const text = document.getElementById('tourInfoText');
  const specs = document.getElementById('tourInfoSpecs');
  const waBtn = document.getElementById('tourInfoWaBtn');
  const imgBox = document.getElementById('tourInfoImageBox');
  const imgElem = document.getElementById('tourInfoImg');

  if (!card) return;

  if (cat) cat.textContent = `${data.icon} ${data.category}`;
  if (title) title.textContent = data.title;
  if (text) text.textContent = data.text;

  if (specs && data.specs) {
    specs.innerHTML = data.specs.map(s => `<span>${s}</span>`).join('');
  }

  // Cargar imagen de detalle interactiva
  if (imgBox && imgElem && data.image) {
    imgElem.src = data.image;
    imgElem.alt = data.title;
    imgBox.style.display = 'block';
  } else if (imgBox) {
    imgBox.style.display = 'none';
  }

  if (waBtn) {
    waBtn.href = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(data.waMsg)}`;
  }

  card.style.display = 'block';
}

function openCurrentTourInfoLightbox() {
  const key = currentTourPointKey || 'calles_manzanas';
  const data = HOTSPOTS_DATA[key];
  if (!data || !data.image) return;
  openLightbox(data.image, data.lightboxTitle || data.title, data.lightboxDesc || data.text);
}
window.openCurrentTourInfoLightbox = openCurrentTourInfoLightbox;

function initTour360() {
  const container = document.getElementById('panorama-container');
  const loader = document.getElementById('tourLoader');
  const btnRotate = document.getElementById('btnRotateToggle');
  const textRotate = document.getElementById('textAutoRotate');
  const btnZoomIn = document.getElementById('btnZoomIn');
  const btnZoomOut = document.getElementById('btnZoomOut');
  const btnFs = document.getElementById('btnFullscreen');
  const tourWrapper = document.getElementById('tourWrapper');
  const hint = document.getElementById('tourInteractionHint');
  const btnInfoClose = document.getElementById('btnTourInfoClose');
  const infoCard = document.getElementById('tourInfoCard');

  if (!container) return;

  const isLocalFile = window.location.protocol === 'file:';
  const panoramaPath = isLocalFile ? 'img/panorama_360.jpg' : 'img/panorama_360.jpg?v=20260917';

  if (typeof pannellum === 'undefined') {
    if (loader) {
      loader.innerHTML = `
        <p style="color:#f87171;">El motor 360 se inicializará al cargar la red.</p>
        <p><a href="img/panorama_360.jpg" target="_blank" class="btn btn-sm btn-primary">Abrir Imagen 360</a></p>
      `;
    }
    return;
  }

  try {
    viewer360 = pannellum.viewer('panorama-container', {
      type: 'equirectangular',
      panorama: panoramaPath,
      autoLoad: true,
      autoRotate: -0.6, // Giro sutil y panorámico
      autoRotateInactivityDelay: 4000,
      pitch: -74.5, // Enfoque directo hacia el trazo y calles del fraccionamiento
      yaw: -170.2,   // Centrado sobre las vialidades y manzanas de 120m2
      hfov: 90,     // Zoom óptico natural (sin deformación de ojo de pez)
      minHfov: 40,
      maxHfov: 100,
      minPitch: -85,
      maxPitch: 85,
      compass: false,
      showZoomCtrl: false,
      showFullscreenCtrl: false,
      strings: {
        loadingLabel: 'Cargando Recorrido 360°...',
        loadButtonLabel: 'Haz clic para iniciar el Tour 360°'
      },
      hotSpots: [
        {
          pitch: -74.5,
          yaw: -86.2,
          type: 'info',
          text: '🛣️ 1. Calles y Manzanas Residenciales (8.00m)',
          cssClass: 'custom-hotspot',
          clickHandlerFunc: (hotSpotDiv, args) => {
            showTourInfo('calles_manzanas');
            updateActiveAngleBtn('calles_manzanas');
          }
        },
        {
          pitch: -44.4,
          yaw: -137.5,
          type: 'info',
          text: '🚪 2. Acceso Principal al Desarrollo (Entronque)',
          cssClass: 'custom-hotspot',
          clickHandlerFunc: (hotSpotDiv, args) => {
            showTourInfo('acceso_principal');
            updateActiveAngleBtn('acceso_principal');
          }
        },
        {
          pitch: -21.5,
          yaw: -111.4,
          type: 'info',
          text: '🎓 3. Campus Universitario UAEM / Vía Rápida',
          cssClass: 'custom-hotspot',
          clickHandlerFunc: (hotSpotDiv, args) => {
            showTourInfo('universidad');
            updateActiveAngleBtn('universidad');
          }
        },
        {
          pitch: -14.9,
          yaw: -15.0,
          type: 'info',
          text: '🏘️ 4. Santo Domingo Aztacameca (Poblado)',
          cssClass: 'custom-hotspot',
          clickHandlerFunc: (hotSpotDiv, args) => {
            showTourInfo('poblado');
            updateActiveAngleBtn('poblado');
          }
        },
        {
          pitch: -24.0,
          yaw: -24.0,
          type: 'info',
          text: '⚽ 5. Preparatoria, Secundaria y Campo Deportivo',
          cssClass: 'custom-hotspot',
          clickHandlerFunc: (hotSpotDiv, args) => {
            showTourInfo('deportivo_escuelas');
            updateActiveAngleBtn('deportivo_escuelas');
          }
        },
        {
          pitch: -13.6,
          yaw: 104.7,
          type: 'info',
          text: '🛣️ 6. Acceso Principal al Pueblo y al Desarrollo',
          cssClass: 'custom-hotspot',
          clickHandlerFunc: (hotSpotDiv, args) => {
            showTourInfo('acceso_pueblo_desarrollo');
            updateActiveAngleBtn('acceso_pueblo_desarrollo');
          }
        }
      ]
    });

    // Ocultar loader cuando esté cargado
    viewer360.on('load', () => {
      if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => { loader.style.display = 'none'; }, 450);
      }
    });

    // Manejo de errores por protocolo local (file://)
    viewer360.on('error', (err) => {
      console.warn('Pannellum error:', err);
      if (loader) {
        loader.style.display = 'flex';
        loader.style.opacity = '1';
        loader.innerHTML = `
          <div style="background: rgba(15, 23, 42, 0.94); border: 1px solid rgba(255,255,255,0.15); border-radius: 16px; padding: 24px; max-width: 520px; text-align: center; color: white; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
            <div style="font-size: 32px; margin-bottom: 8px;">🌐</div>
            <h3 style="margin-bottom: 8px; font-size: 18px; color: #38bdf8;">Tour Virtual 360°</h3>
            <p style="font-size: 13px; color: #cbd5e1; line-height: 1.5; margin-bottom: 16px;">
              ${isLocalFile
            ? 'Para ver el Tour 360 en tu computadora, haz doble clic en <strong>ABRIR_TOUR_LOCAL.bat</strong> o abre el servidor local (los navegadores requieren un servidor para WebGL local). En GitHub Pages funciona automáticamente.'
            : 'Explora el recorrido 360° o abre la imagen panorámica:'}
            </p>
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
              <a href="http://localhost:8085" target="_blank" class="btn btn-primary btn-sm" style="display: inline-flex; align-items: center; gap: 6px;">
                <span>🚀 Abrir Servidor Local (8085)</span>
              </a>
              <a href="img/panorama_360.jpg" target="_blank" class="btn btn-outline btn-sm" style="display: inline-flex; align-items: center; gap: 6px;">
                <span>🖼️ Ver Imagen Panorámica</span>
              </a>
            </div>
          </div>
        `;
      }
    });

    // Desvanecer hint de interacción al interactuar
    container.addEventListener('mousedown', () => {
      if (hint) hint.style.opacity = '0';
    }, { once: true });
    container.addEventListener('touchstart', () => {
      if (hint) hint.style.opacity = '0';
    }, { once: true });

    // Cerrar tarjeta de información
    if (btnInfoClose && infoCard) {
      btnInfoClose.addEventListener('click', (e) => {
        e.stopPropagation();
        infoCard.style.display = 'none';
      });
    }

    // Abrir Lightbox al hacer clic en la fotografía de detalle de la tarjeta
    const tourImageBox = document.getElementById('tourInfoImageBox');
    if (tourImageBox) {
      tourImageBox.addEventListener('click', (e) => {
        e.stopPropagation();
        openCurrentTourInfoLightbox();
      });
      tourImageBox.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openCurrentTourInfoLightbox();
        }
      });
    }

    // Botón de alternar rotación automática
    if (btnRotate) {
      btnRotate.addEventListener('click', () => {
        if (!viewer360) return;
        if (isAutoRotating) {
          viewer360.stopAutoRotate();
          btnRotate.classList.remove('active');
          btnRotate.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            <span>Iniciar Giro</span>
          `;
          isAutoRotating = false;
        } else {
          viewer360.startAutoRotate(-0.8);
          btnRotate.classList.add('active');
          btnRotate.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
            <span>Pausar Giro</span>
          `;
          isAutoRotating = true;
        }
      });
    }

    // Botones de Zoom
    if (btnZoomIn) {
      btnZoomIn.addEventListener('click', () => {
        if (!viewer360) return;
        const currentHfov = viewer360.getHfov();
        viewer360.setHfov(Math.max(40, currentHfov - 15), 400);
      });
    }

    if (btnZoomOut) {
      btnZoomOut.addEventListener('click', () => {
        if (!viewer360) return;
        const currentHfov = viewer360.getHfov();
        viewer360.setHfov(Math.min(115, currentHfov + 15), 400);
      });
    }

    // Botón de Pantalla Completa
    if (btnFs) {
      btnFs.addEventListener('click', () => {
        if (!viewer360) return;
        viewer360.toggleFullscreen();
      });
    }

    // Botones de Navegación Rápida a Puntos de Interés
    const angleBtns = document.querySelectorAll('.angle-btn');
    angleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        angleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const pointKey = btn.getAttribute('data-point');
        const pitch = parseFloat(btn.getAttribute('data-pitch'));
        const yaw = parseFloat(btn.getAttribute('data-yaw'));
        const hfov = parseFloat(btn.getAttribute('data-hfov'));

        if (viewer360 && typeof viewer360.lookAt === 'function') {
          viewer360.lookAt(pitch, yaw, hfov, 1200);
        }

        if (pointKey) {
          showTourInfo(pointKey);
        }
      });
    });

    function updateActiveAngleBtn(pointKey) {
      angleBtns.forEach(btn => {
        if (btn.getAttribute('data-point') === pointKey) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }

  } catch (err) {
    console.error('Error inicializando Pannellum:', err);
    if (loader) {
      loader.innerHTML = '<p>Haz clic para interactuar con el Tour 360°</p>';
    }
  }
}

/* ==========================================================================
   2. COTIZADOR INTERACTIVO DE FINANCIAMIENTO
   ========================================================================== */
const WHATSAPP_NUMERO = '525500000000'; // Reemplazar por el WhatsApp de Santos / 7 Veces 7

let modoActual = 'financiado'; // 'financiado' o 'contado'
const PRECIO_CONTADO = 100000;
const PRECIO_FINANCIADO = 120000;
const MENSUALIDAD_FIJA = 2000;

function initCalculator() {
  const btnFinanciado = document.getElementById('btnModeFinanciado');
  const btnContado = document.getElementById('btnModeContado');
  const sliderEnganche = document.getElementById('sliderEnganche');

  if (!btnFinanciado || !btnContado || !sliderEnganche) return;

  btnFinanciado.addEventListener('click', () => {
    modoActual = 'financiado';
    btnFinanciado.classList.add('active');
    btnContado.classList.remove('active');
    document.getElementById('groupEnganche').style.display = 'block';
    document.getElementById('rowEnganche').style.display = 'flex';
    document.getElementById('rowSaldo').style.display = 'flex';
    document.getElementById('rowMensualidad').style.display = 'flex';
    document.getElementById('rowPlazo').style.display = 'flex';
    document.getElementById('boxAhorro').style.display = 'none';
    actualizarCotizacion();
  });

  btnContado.addEventListener('click', () => {
    modoActual = 'contado';
    btnContado.classList.add('active');
    btnFinanciado.classList.remove('active');
    document.getElementById('groupEnganche').style.display = 'none';
    document.getElementById('rowSaldo').style.display = 'none';
    document.getElementById('rowMensualidad').style.display = 'none';
    document.getElementById('rowPlazo').style.display = 'none';
    document.getElementById('boxAhorro').style.display = 'block';
    actualizarCotizacion();
  });

  sliderEnganche.addEventListener('input', () => {
    actualizarCotizacion();
  });

  actualizarCotizacion();
}

function formatearMoneda(monto) {
  return '$' + Number(monto).toLocaleString('es-MX', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' MXN';
}

function actualizarCotizacion() {
  const sliderEnganche = document.getElementById('sliderEnganche');
  const valEngancheDisplay = document.getElementById('valEngancheDisplay');
  const resPrecioTotal = document.getElementById('resPrecioTotal');
  const resPrecioM2 = document.getElementById('resPrecioM2');
  const resEnganche = document.getElementById('resEnganche');
  const resSaldo = document.getElementById('resSaldo');
  const resMensualidad = document.getElementById('resMensualidad');
  const resPlazo = document.getElementById('resPlazo');
  const btnWhatsapp = document.getElementById('btnCotizarWhatsapp');

  let enganche = Number(sliderEnganche.value);

  if (modoActual === 'financiado') {
    valEngancheDisplay.textContent = formatearMoneda(enganche);
    resPrecioTotal.textContent = formatearMoneda(PRECIO_FINANCIADO);
    resPrecioM2.textContent = '$1,000.00 MXN/m²';
    resEnganche.textContent = formatearMoneda(enganche);

    let saldo = PRECIO_FINANCIADO - enganche;
    resSaldo.textContent = formatearMoneda(saldo);
    resMensualidad.textContent = formatearMoneda(MENSUALIDAD_FIJA);

    let meses = Math.ceil(saldo / MENSUALIDAD_FIJA);
    let anios = (meses / 12).toFixed(1);
    resPlazo.textContent = `${meses} meses (~${anios} años)`;

    // Enlace de WhatsApp
    const mensaje = encodeURIComponent(
      `Hola Santos / 7 Veces 7 Bienes Raíces, me interesa apartar un lote tipo de 120 m² en el Fraccionamiento Universidad con la modalidad FINANCIADA:\n` +
      `• Precio total: $120,000 MXN\n` +
      `• Enganche propuesto: ${formatearMoneda(enganche)}\n` +
      `• Mensualidades fijas: $2,000 MXN\n` +
      `• Plazo aproximado: ${meses} meses\n` +
      `¿Me podrías confirmar la disponibilidad de manzanas y agendar una visita al predio?`
    );
    btnWhatsapp.href = `https://wa.me/${WHATSAPP_NUMERO}?text=${mensaje}`;
    btnWhatsapp.querySelector('span').textContent = `Apartar con Enganche de ${formatearMoneda(enganche)}`;

  } else {
    // Modo Contado
    resPrecioTotal.textContent = formatearMoneda(PRECIO_CONTADO);
    resPrecioM2.textContent = '$833.33 MXN/m²';
    resEnganche.textContent = formatearMoneda(PRECIO_CONTADO) + ' (Pago Único)';

    const mensaje = encodeURIComponent(
      `Hola Santos / 7 Veces 7 Bienes Raíces, me interesa aprovechar la modalidad de CONTADO para un lote de 120 m² en el Fraccionamiento Universidad:\n` +
      `• Precio de contado: $100,000 MXN ($833.33/m²)\n` +
      `• Ahorro directo: $20,000 MXN\n` +
      `¿Podemos coordinar la firma y la toma de posesión inmediata?`
    );
    btnWhatsapp.href = `https://wa.me/${WHATSAPP_NUMERO}?text=${mensaje}`;
    btnWhatsapp.querySelector('span').textContent = 'Apartar con Precio de Contado ($100,000 MXN)';
  }
}

/* ==========================================================================
   3. MAPA INTERACTIVO (LEAFLET / OPENSTREETMAP)
   ========================================================================== */
function initMap() {
  const mapElement = document.getElementById('interactiveMap');
  if (!mapElement || typeof L === 'undefined') return;

  const coords = [19.771468, -98.770131];

  const map = L.map('interactiveMap', {
    center: coords,
    zoom: 14,
    scrollWheelZoom: false
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18
  }).addTo(map);

  // Marcador Principal del Fraccionamiento
  const pinIcon = L.divIcon({
    className: 'custom-map-pin',
    html: `<div style="
      background: #059669;
      color: white;
      padding: 6px 12px;
      border-radius: 20px;
      font-weight: 800;
      font-size: 11px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      border: 2px solid white;
      white-space: nowrap;
      text-align: center;
    ">📍 Fraccionamiento Universidad</div>`,
    iconSize: [160, 30],
    iconAnchor: [80, 15]
  });

  const marker = L.marker(coords, { icon: pinIcon }).addTo(map);
  marker.bindPopup(`
    <div style="font-family: sans-serif; padding: 4px;">
      <h4 style="margin: 0 0 6px 0; color: #0f172a; font-size: 14px;">Fraccionamiento Universidad</h4>
      <p style="margin: 0 0 8px 0; font-size: 12px; color: #475569;">
        Predio Parcela 114 P1/1, Santo Domingo Aztacameca, Axapusco, Edo. Méx.<br>
        <strong>147 Lotes • Posesión Inmediata</strong>
      </p>
      <a href="https://maps.google.com/?q=19.771468,-98.770131" target="_blank" style="
        display: inline-block;
        background: #059669;
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        text-decoration: none;
        font-size: 11px;
        font-weight: bold;
      ">Ver en Google Maps ↗</a>
    </div>
  `).openPopup();

  // Círculo de referencia del predio
  L.circle(coords, {
    color: '#10b981',
    fillColor: '#34d399',
    fillOpacity: 0.25,
    radius: 120
  }).addTo(map);
}

/* ==========================================================================
   4. GALERÍA MULTIMEDIA Y LIGHTBOX
   ========================================================================== */
function initGallery() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Cerrar lightbox con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('lightboxModal');
      if (modal && modal.classList.contains('active')) {
        modal.classList.remove('active');
      }
    }
  });
}

function openLightbox(imgSrc, title, desc) {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const titleEl = document.getElementById('lightboxTitle');
  const descEl = document.getElementById('lightboxDesc');

  if (!modal || !img) return;

  img.src = imgSrc;
  titleEl.textContent = title || '';
  descEl.textContent = desc || '';
  modal.classList.add('active');
}

function closeLightbox(event) {
  // Solo cerrar si se hizo clic en el fondo o en el botón de cierre
  if (event.target.id === 'lightboxModal' || event.target.classList.contains('lightbox-close')) {
    const modal = document.getElementById('lightboxModal');
    if (modal) modal.classList.remove('active');
  }
}

/* ==========================================================================
   5. FORMULARIO DE CONTACTO / AGENDA DE VISITA
   ========================================================================== */
function handleFormSubmit(event) {
  event.preventDefault();

  const nombre = document.getElementById('formNombre').value.trim();
  const telefono = document.getElementById('formTelefono').value.trim();
  const modalidad = document.getElementById('formModalidad').value;
  const dia = document.getElementById('formDia').value;
  const mensajeExtra = document.getElementById('formMensaje').value.trim();

  let textoWhatsApp =
    `Hola Santos / 7 Veces 7 Bienes Raíces, solicito información y agenda de visita al Fraccionamiento Universidad:\n` +
    `• Nombre: ${nombre}\n` +
    `• Teléfono de contacto: ${telefono}\n` +
    `• Modalidad de interés: ${modalidad}\n`;

  if (dia) {
    textoWhatsApp += `• Fecha propuesta de visita: ${dia}\n`;
  }

  if (mensajeExtra) {
    textoWhatsApp += `• Comentarios: ${mensajeExtra}\n`;
  }

  const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(textoWhatsApp)}`;
  window.open(url, '_blank');

  alert(`¡Gracias ${nombre}! Se ha abierto WhatsApp con tu solicitud lista para enviar a Santos.`);
}

/* ==========================================================================
   6. NAVEGACIÓN MÓVIL Y SCROLL
   ========================================================================== */
function initNavigation() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }
}
