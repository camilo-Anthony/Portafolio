# Diseño: Bento Grid & Experiencia Atmosférica

## Visión General
Transformar el portafolio de un diseño lineal estándar a una experiencia inmersiva basada en una cuadrícula modular (Bento) y elementos reactivos que generen una atmósfera premium y "fuera de lo común".

## Arquitectura de Diseño

### 1. Sistema Bento Grid
- **Contenedor:** Grid de 4 columnas (escritorio), 2 columnas (tablet), 1 columna (móvil).
- **Tarjetas (Bento Cards):**
  - Efecto Glassmorphism (fondo translúcido con desenfoque).
  - Borde reactivo (Border Beam) que se ilumina al interactuar.
  - Efecto Tilt 3D sutil que sigue al ratón.

### 2. Elementos Atmosféricos
- **Fondo Reactivo:** Implementar `AtmosphereBackground` usando Canvas o SVG avanzado. Partículas lentas que cambian de color sutilmente.
- **Micro-interacciones Sonoras:**
  - Sonido "mechanical click" (volumen 10%) al interactuar con elementos clave.
  - Sonido "hover whoosh" muy leve.
- **Cursor Personalizado:** Cursor que se expande o cambia de forma al pasar por "objetos de interés".

## Componentes a Desarrollar

### Core
- `BentoGrid.tsx`: Contenedor padre con lógica de layout.
- `BentoCard.tsx`: Envoltorio de tarjeta con animaciones de entrada y hover.
- `Atmosphere.tsx`: Fondo animado global.

### Widgets (Contenido de cajas)
- `FeaturedProjectCard`: Visualización dinámica de proyecto.
- `TechSphere`: Nube de tags reactiva.
- `StatusWidget`: Indicador de disponibilidad y zona horaria.

## Flujo de Datos y Estado
- Uso de `SectionContext` para coordinar colores de la atmósfera con la sección activa.
- Framer Motion para la orquestación de animaciones.

## Verificación y Calidad
- **Rendimiento:** FPS estables (>60) incluso con el fondo animado.
- **Accesibilidad:** Soporte para usuarios que prefieren "reducción de movimiento".
