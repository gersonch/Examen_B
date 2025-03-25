# Examen B - Aplicación Web React

## Descripción

Esta es una aplicación web desarrollada con React y Vite, que utiliza Supabase como backend.

## Tecnologías Principales

- React 19
- Vite 6
- Supabase
- Bootstrap 5
- React Router DOM 6

## Estructura del Proyecto

```
├── src/
│   ├── assets/        # Recursos estáticos
│   ├── components/    # Componentes reutilizables
│   ├── utils/         # Utilidades y funciones auxiliares
│   ├── views/         # Vistas/páginas de la aplicación
│   ├── App.jsx        # Componente principal
│   ├── main.jsx       # Punto de entrada
│   └── index.css      # Estilos globales
├── public/            # Archivos públicos
├── .env.local         # Variables de entorno locales
└── package.json       # Dependencias y scripts
```

## Requisitos Previos

- Node.js (versión recomendada: 18 o superior)
- npm o yarn

## Instalación

1. Clonar el repositorio

```bash
git clone [URL_DEL_REPOSITORIO]
```

2. Instalar dependencias

```bash
npm install
```

3. Configurar variables de entorno
   Crear un archivo `.env.local` con las siguientes variables:

```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
```

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo

## Contribución

1. Hacer fork del repositorio
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request
