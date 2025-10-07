# Portafolio Web - Camilo Anthony

Portafolio profesional con tema oscuro, animaciones de partículas y diseño responsive.

## 🚀 Despliegue en Vercel

### Opción 1: Desde la interfaz web
1. Sube este proyecto a GitHub
2. Ve a [vercel.com](https://vercel.com) y haz login
3. Click en "Import Project"
4. Selecciona tu repositorio
5. Framework Preset: **"Other"**
6. Output Directory: **dejar vacío** (raíz del proyecto)
7. Click "Deploy"

### Opción 2: Vercel CLI
```bash
# Instalar Vercel CLI
npm i -g vercel

# En la carpeta del proyecto
vercel

# Para producción
vercel --prod
```

## 📁 Estructura del proyecto
```
Portafolio/
├── index.html              # Página principal
├── assets/
│   ├── css/styles.css      # Estilos principales
│   ├── js/main.js          # JavaScript y animaciones
│   ├── favicon.svg         # Favicon
│   ├── og-image.svg        # Imagen para redes sociales
│   └── CV_Camilo_Anthony.pdf # CV (reemplazar con el real)
├── robots.txt              # Para SEO
├── sitemap.xml             # Mapa del sitio
├── vercel.json             # Configuración de Vercel
└── README.md               # Este archivo
```

## ⚙️ Configuración post-despliegue

### 1. Actualizar URLs
En `index.html`, cambiar:
- `https://camiloanthony.dev/` → tu dominio de Vercel
- `tu-correo@example.com` → tu email real
- Enlaces de GitHub y LinkedIn

### 2. Configurar formulario
En `index.html` línea 227:
```html
<form action="https://formsubmit.co/TU_EMAIL_REAL" method="post">
```

### 3. Subir CV real
Reemplazar `assets/CV_Camilo_Anthony.pdf` con tu CV en PDF.

## 🎨 Personalización

### Colores
- Verde neón: `#00ff88`
- Azul cibernético: `#00d5ff`
- Cambiar en `assets/css/styles.css` línea 6-7

### Animación de partículas
- Densidad: `assets/js/main.js` línea 116
- Velocidad: línea 120-121
- Distancia de líneas: línea 149

### Contenido
- Editar secciones en `index.html`
- Añadir proyectos en la sección `#proyectos`
- Actualizar habilidades en `#habilidades`

## 🔧 Desarrollo local

### Servidor simple
```bash
# Python
python -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

### Verificar animación
1. Abrir consola del navegador (F12)
2. Buscar mensaje: "Canvas encontrado, iniciando animación..."
3. Deberías ver puntos verdes con líneas azules

## 📱 Características

- ✅ Diseño responsive
- ✅ Animación de partículas en canvas
- ✅ Tema oscuro con acentos neón
- ✅ Scrollspy en navegación
- ✅ Formulario de contacto funcional
- ✅ SEO optimizado
- ✅ Accesibilidad básica
- ✅ Optimización de rendimiento

## 🛠️ Tecnologías

- HTML5 semántico
- CSS3 con variables personalizadas
- JavaScript vanilla
- Canvas API para animaciones
- FormSubmit para formularios
- Vercel para hosting

---

**Desarrollado por Camilo Anthony**  
*Diseño × Código × Seguridad*
