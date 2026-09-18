# Fraccionamiento Universidad - Landing Page & Tour Virtual 360°

Sitio web oficial de comercialización inmobiliaria para el **Fraccionamiento Universidad**, desarrollado y comercializado por **7 Veces 7 Bienes Raíces** (propiedad de Santos).

Este sitio web está optimizado para alojarse de forma 100% gratuita en **GitHub Pages**.

---

## 🌟 Características Principales

1. **Tour Virtual 360° Interactivo con Puntos de Interés (Hotspots)**:
   - Visor esférico 3D WebGL con panorama aéreo de alta resolución tomado con dron.
   - Enfoque directo inicial hacia el trazo de vialidades niveladas y las 4 manzanas residenciales.
   - Hotspots interactivos con animación de radar pulsante y fotografía de detalle:
     - 🛣️ **1. Calles y Manzanas Residenciales** (Vialidades niveladas de 8m y manzanas de 120m²)
     - 🚪 **2. Acceso Principal al Desarrollo** (Entronque carretera pavimentada y camino de acceso)
     - 🎓 **3. Campus Universitario UAEM / Vía Rápida** (Ciudad del Conocimiento y autopista)
     - 🏘️ **4. Santo Domingo Aztacameca** (Centro cívico, comercios y servicios)
     - ⚽ **5. Preparatoria, Secundaria y Campo Deportivo** (Canchas empastadas y auditorio)
     - 🛣️ **6. Acceso Principal al Pueblo y al Desarrollo** (Corredor vial principal del valle)
   - Tarjeta informativa flotante al hacer clic en cualquier punto, con fotografía de detalle interactiva ampliable en Lightbox y botón directo a WhatsApp.
   - Controles de auto-giro, zoom y pantalla completa.

2. **Cotizador Dinámico de Financiamiento**:
   - Modalidad financiada ($120,000 MXN) con slider dinámico de enganche (desde $5,000 MXN), mensualidades fijas de $2,000 MXN y cálculo automático de saldo y plazos.
   - Modalidad de contado ($100,000 MXN) destacando $20,000 MXN de ahorro directo.
   - Botón directo para apartar lote por WhatsApp con los datos calculados.

3. **Ubicación Estratégica con Mapa Leaflet**:
   - Coordenadas oficiales: `19.771468, -98.770131` (Santo Domingo Aztacameca, Municipio de Axapusco, Edo. Méx.).
   - Marcador interactivo y botón para abrir en Google Maps / Waze.

4. **Galería Multimedia**:
   - Fotografía esférica panorámica aérea real de dron y renders conceptuales de proyectos de vivienda.
   - Visor Lightbox para ampliación de fotos en alta resolución.

5. **Formulario de Contacto y Agendado de Visitas**:
   - Generación instantánea de mensaje a WhatsApp para apartar lote o agendar visita presencial.

---

## 🚀 Cómo Publicar en GitHub Pages (Guía Rápida)

Consulta el archivo [INSTRUCCIONES_GITHUB.md](INSTRUCCIONES_GITHUB.md) para ver la guía detallada paso a paso con capturas y opciones.

### Resumen en 3 pasos:
1. Crea un repositorio en tu cuenta de [GitHub](https://github.com/new) (ejemplo: `fraccionamiento-universidad`).
2. Sube todos los archivos descomprimidos (`index.html`, `style.css`, `script.js` y la carpeta `img/`).
3. En tu repositorio, entra a **Settings** -> **Pages** -> en *Branch* selecciona **`main`** y haz clic en **Save**.

En 1 o 2 minutos tu página web estará en línea en:
`https://TU_USUARIO.github.io/fraccionamiento-universidad/`

---

## 💻 Cómo Abrir el Tour 360° en tu Computadora (Local)

Debido a las políticas de seguridad de los navegadores para WebGL y texturas esféricas, se requiere un servidor HTTP local para ver el Tour 360 sin errores de CORS.

Para abrirlo de inmediato:
1. Haz **doble clic en el archivo `ABRIR_TOUR_LOCAL.bat`**.
2. Automáticamente se iniciará el servidor local y se abrirá tu navegador en:
   `http://localhost:8085`
3. ¡Listo! Podrás interactuar con el visor esférico 360°, hotspots interactivos, cotizador y mapas.

---

## 📁 Estructura de Archivos del Proyecto

```text
├── ABRIR_TOUR_LOCAL.bat        # Script para iniciar y abrir el tour local en 1 clic
├── server.js                   # Servidor HTTP local nativo (sin dependencias externas)
├── index.html                  # Página web principal (HTML5 semántico)
├── style.css                   # Hoja de estilos (CSS3 responsivo y moderno)
├── script.js                   # Lógica interactiva (Tour 360, Cotizador, Mapa)
├── img/                        # Recursos multimedia web
│   ├── tour_puntos/            # Fotografías de detalle para cada punto de interés del tour
│   │   ├── punto1_calles_manzanas.jpg
│   │   ├── punto2_acceso_principal.jpg
│   │   ├── punto3_campus_universitario.jpg
│   │   ├── punto4_santo_domingo.jpg
│   │   ├── punto5_deportivo_escuelas.jpg
│   │   └── punto6_acceso_pueblo_desarrollo.jpg
│   ├── dron_ortofoto_trazo.jpg # Toma cenital de trazo y nivelación
│   ├── dron_vista_poblado.jpg  # Perspectiva aérea hacia el poblado
│   ├── dron_panoramica_valle.jpg # Panorámica aérea regional y vías
│   ├── panorama_360.jpg        # Panorama equirrectangular 360° optimizado
│   ├── render_casa.jpg         # Proyección arquitectónica de casa tipo
│   ├── render_familia.jpg      # Render de estilo de vida familiar
│   └── render_interior.jpg     # Render de interior residencial
├── README.md                   # Descripción general del repositorio
├── INSTRUCCIONES_GITHUB.md     # Guía detallada para activar GitHub Pages
├── DATOS_PROYECTO.md           # Ficha técnica y cuadro de áreas
└── datos_proyecto.json         # Base de datos estructurada en JSON
```

---

## 📞 Contacto Comercial
- **Desarrollo**: Fraccionamiento Universidad (Parcela 114 P1/1, Axapusco, Edo. Méx.)
- **Comercializa**: 7 Veces 7 Bienes Raíces
- **Propietario / Representante**: Santos
