# Cristian Martínez — Portfolio 3D

Portafolio profesional 3D interactivo desarrollado con **React, TypeScript, Three.js y Vite**.

El proyecto combina desarrollo frontend, arquitectura de software, testing automatizado, containerización, integración continua, versionado de imágenes Docker y deployment.

Además de funcionar como portfolio profesional, este proyecto representa una etapa de expansión de mi stack técnico hacia tecnologías como **React, TypeScript, Three.js, Docker y prácticas DevOps/CI/CD**.

El objetivo es evolucionar progresivamente este portfolio desde una aplicación frontend interactiva hacia una **plataforma Full Stack profesional**, incorporando backend, base de datos, autenticación, administración de contenido, integración con IA, infraestructura y múltiples estrategias de CI/CD.

---

## 🌐 Demo

### Portfolio online

👉 https://felipe18MS.github.io/cristian-martinez-portafolio/

### Repositorio

👉 https://github.com/felipe18MS/cristian-martinez-portafolio

---

# 👨‍💻 Sobre mí

Soy **Cristian Felipe Martínez Sánchez**, Desarrollador Web Full Stack con experiencia profesional en el desarrollo de aplicaciones web empresariales.

Mi experiencia profesional se ha centrado principalmente en el desarrollo **frontend y backend**, trabajando con arquitecturas por capas, APIs REST, bases de datos, integración de servicios y procesos empresariales.

Mi stack profesional principal está basado en:

- Vue 3
- JavaScript
- Quasar Framework
- C#
- .NET Framework
- ASP.NET Web API
- Dapper
- SQL Server
- APIs RESTful
- Arquitectura por capas
- Git
- Azure DevOps
- Agile / Scrum

También he trabajado con procesos relacionados con:

- Facturación electrónica
- Nómina electrónica
- Generación y procesamiento de XML
- Integración con servicios de la DIAN
- Creación y utilización de DLLs en C#
- Integración de servicios empresariales

Este portfolio representa además una etapa de expansión de mis conocimientos hacia:

- React
- TypeScript
- Three.js
- Vite
- Vitest
- Testing Library
- Playwright
- Docker
- Docker Compose
- GitHub Actions
- GitHub Container Registry
- GitHub Pages

---

# 💼 Experiencia profesional

## ONEZIP S.A.S.

**Full Stack Web Developer**

**Enero 2024 – Julio 2026**

Desarrollo y mantenimiento de aplicaciones web empresariales utilizando tecnologías frontend y backend.

### Frontend

Experiencia profesional trabajando con:

- Vue 3
- JavaScript
- Quasar Framework
- HTML5
- CSS3
- Componentización de interfaces
- Consumo de APIs REST
- Integración frontend/backend
- Desarrollo de interfaces empresariales
- Manejo de lógica de presentación

### Backend

Experiencia profesional trabajando con:

- C#
- .NET Framework
- ASP.NET Web API
- APIs RESTful
- Arquitectura por capas
- Controladores
- Lógica de negocio
- Servicios backend
- Integración entre frontend y backend

### Acceso a datos

Experiencia trabajando con:

- SQL Server
- Dapper
- Consultas SQL
- Acceso a datos desde C#
- Separación de responsabilidades mediante arquitectura por capas

### Integraciones empresariales

Experiencia relacionada con:

- Facturación electrónica
- Nómina electrónica
- Generación de XML
- Procesamiento de XML
- Integración con servicios de la DIAN
- Consumo de servicios y APIs
- Procesamiento de información empresarial

### XML y DLL

Experiencia en la creación y utilización de **DLLs en C#** para encapsular funcionalidades específicas relacionadas con procesos de generación y procesamiento de XML utilizados en integraciones con servicios de la DIAN.

Arquitectura conceptual:

```text
Aplicación empresarial
        │
        ▼
    C# / .NET
        │
        ▼
       DLL
        │
        ▼
Generación / procesamiento XML
        │
        ▼
Servicios DIAN
```

---

# 🏗️ Arquitectura profesional

Una arquitectura conceptual utilizada durante mi experiencia profesional:

```text
┌──────────────────────────────┐
│          Frontend            │
│      Vue 3 / Quasar          │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│       API / Controllers      │
│       ASP.NET Web API        │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│       Business Logic         │
│         C# / .NET            │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│        Data Access           │
│        Dapper / SQL          │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│          SQL Server          │
└──────────────────────────────┘
```

Esta separación permite mantener responsabilidades diferenciadas entre presentación, API, lógica de negocio y acceso a datos.

---

# 🧩 Concepto del portfolio

La escena 3D no es únicamente decorativa.

El diseño representa visualmente una arquitectura de software por capas:

```text
                 ┌───────────────────┐
                 │     INTERFAZ      │
                 │    Frontend/UI    │
                 └─────────┬─────────┘
                           │
                           ▼
                 ┌───────────────────┐
                 │      LÓGICA       │
                 │  Business Logic   │
                 └─────────┬─────────┘
                           │
                           ▼
                 ┌───────────────────┐
                 │       DATOS       │
                 │ Database / APIs   │
                 └─────────┬─────────┘
                           │
                           ▼
                 ┌───────────────────┐
                 │    FUNDACIÓN      │
                 │ Infrastructure    │
                 └───────────────────┘
```

Durante la navegación por el portfolio, la cámara desciende a través de estas capas para representar visualmente cómo diferentes componentes de una aplicación se relacionan entre sí.

La intención es combinar **experiencia visual, arquitectura de software y demostración técnica** dentro de un mismo proyecto.

---

# 🚀 Tecnologías utilizadas en este portfolio

Este proyecto fue desarrollado específicamente para ampliar mi experiencia técnica y explorar nuevas herramientas.

## Frontend

- React
- TypeScript
- Vite
- Three.js
- HTML5
- CSS3

## Testing

- Vitest
- Testing Library
- Playwright
- Chromium
- Firefox
- WebKit

## DevOps / CI/CD

- Git
- GitHub
- GitHub Actions
- Docker
- Docker Compose
- GitHub Container Registry
- GitHub Pages

---

# 🧪 Testing automatizado

El proyecto incorpora diferentes niveles de testing para validar tanto componentes como comportamiento de usuario.

## Unit / Component Testing

Se utiliza **Vitest** junto con Testing Library para validar componentes y funcionalidades de la aplicación.

Resultado actual:

```text
16 test files
84 tests passed
```

## End-to-End Testing

Se utiliza **Playwright** para validar el comportamiento de la aplicación desde la perspectiva del usuario.

Los tests se ejecutan sobre:

- Chromium
- Firefox
- WebKit

Resultado actual:

```text
27 / 27 tests passed
```

El objetivo es mantener una base de pruebas que permita realizar cambios sobre el portfolio reduciendo el riesgo de regresiones.

---

# 🔄 CI — Integración continua

El proyecto utiliza **GitHub Actions** para automatizar las validaciones realizadas sobre el código.

Flujo actual:

```text
Push / Pull Request
        │
        ▼
Checkout repository
        │
        ▼
Setup Node.js
        │
        ▼
npm ci
        │
        ▼
Vitest
        │
        ▼
Playwright
        │
        ▼
Build
        │
        ▼
Docker Build
        │
        ▼
GHCR
```

Las validaciones incluyen:

1. Instalación limpia de dependencias mediante `npm ci`.
2. Ejecución de tests unitarios.
3. Instalación de navegadores de Playwright.
4. Ejecución de pruebas End-to-End.
5. Generación del build de producción.
6. Construcción de la imagen Docker.
7. Publicación de la imagen en GHCR cuando se crea un tag de versión.

---

# 📦 GitHub Container Registry

Las imágenes Docker del proyecto se publican en:

```text
ghcr.io/felipe18ms/cristian-portfolio
```

El proyecto utiliza versionado mediante tags:

```text
v1.0.0
v1.1.0
latest
```

Ejemplo:

```bash
docker pull ghcr.io/felipe18ms/cristian-portfolio:v1.1.0
```

La etiqueta `latest` representa la versión estable más reciente publicada.

---

# 🏷️ Versionado

Las versiones del proyecto se gestionan mediante Git tags.

Ejemplo:

```bash
git tag v1.1.0
git push origin v1.1.0
```

Cuando se publica un tag con formato:

```text
v*
```

GitHub Actions ejecuta automáticamente el proceso de construcción y publicación de la imagen Docker.

Este enfoque permite mantener versiones reproducibles de la aplicación.

---

# ↩️ Rollback

Una de las ventajas de utilizar imágenes versionadas es poder regresar a una versión anterior.

Por ejemplo:

```bash
docker pull ghcr.io/felipe18ms/cristian-portfolio:v1.0.0
```

Y ejecutar esa versión:

```bash
docker run -d \
  --name cristian-portfolio-v1 \
  -p 8080:80 \
  ghcr.io/felipe18ms/cristian-portfolio:v1.0.0
```

Esto permite realizar un rollback utilizando una versión específica de la aplicación sin depender de `latest`.

---

# 🐳 Docker

El proyecto utiliza un **Dockerfile multi-stage**.

## Etapa 1 — Build

Se utiliza Node.js para instalar dependencias y generar la aplicación:

```text
Node.js
   │
   ├── npm ci
   │
   ├── copiar código
   │
   └── npm run build
```

## Etapa 2 — Production

La aplicación compilada se sirve utilizando Nginx:

```text
React / Vite
     │
     ▼
    dist
     │
     ▼
   Nginx
     │
     ▼
  Puerto 80
```

El uso de multi-stage builds permite mantener separadas las herramientas necesarias para construir la aplicación del entorno final utilizado para servirla.

---

# 🐳 Docker Compose

El proyecto también incluye configuración para ejecutarlo mediante Docker Compose.

Levantar la aplicación:

```bash
docker compose up -d
```

La aplicación queda disponible localmente en:

```text
http://localhost:8080
```

Para detener los servicios:

```bash
docker compose down
```

---

# 🏗️ Arquitectura actual del proyecto

La estructura principal del proyecto sigue una organización por componentes:

```text
portfolio-project/
│
├── .github/
│   └── workflows/
│       ├── CI workflow
│       └── Deploy Pages workflow
│
├── public/
│
├── src/
│   ├── components/
│   ├── sections/
│   ├── test/
│   └── ...
│
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

La aplicación separa componentes visuales, lógica de interacción, escena 3D y pruebas automatizadas.

---

# 🌐 Deployment

El portfolio está desplegado públicamente mediante **GitHub Pages**.

El deployment se ejecuta automáticamente mediante GitHub Actions.

Flujo:

```text
Git Push
   │
   ▼
GitHub Actions
   │
   ▼
npm ci
   │
   ▼
npm run build
   │
   ▼
dist/
   │
   ▼
GitHub Pages
   │
   ▼
Portfolio online
```

Portfolio:

https://felipe18MS.github.io/cristian-martinez-portafolio/

---

# 🔁 Flujo CI/CD actual

Actualmente existen dos procesos automatizados principales.

## CI

Responsable de validar el código:

```text
Git Push / Pull Request
        │
        ├── Vitest
        ├── Playwright
        ├── Build
        └── Docker Build
```

Para versiones:

```text
Git Tag
   │
   ▼
Docker Build
   │
   ▼
GitHub Container Registry
   ├── v1.x.x
   └── latest
```

## CD / Deployment

GitHub Pages utiliza un workflow independiente:

```text
Push to main
      │
      ▼
GitHub Actions
      │
      ▼
npm ci
      │
      ▼
npm run build
      │
      ▼
dist/
      │
      ▼
GitHub Pages
```

---

# 💻 Instalación local

Clonar el repositorio:

```bash
git clone https://github.com/felipe18MS/cristian-martinez-portafolio.git
```

Entrar al proyecto:

```bash
cd cristian-martinez-portafolio
```

Instalar dependencias:

```bash
npm install
```

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

---

# 🧪 Ejecutar tests

## Vitest

```bash
npm run test:run
```

## Playwright

Instalar navegadores:

```bash
npx playwright install
```

Ejecutar pruebas:

```bash
npx playwright test
```

Abrir el reporte:

```bash
npx playwright show-report
```

---

# 🏗️ Build

Generar build de producción:

```bash
npm run build
```

Previsualizar el build:

```bash
npm run preview
```

---

# 🐳 Ejecutar con Docker

Construir la imagen:

```bash
docker build -t cristian-portfolio .
```

Ejecutar el contenedor:

```bash
docker run -d \
  --name cristian-portfolio \
  -p 8080:80 \
  cristian-portfolio
```

Abrir:

```text
http://localhost:8080
```

---

# 📋 Comandos principales

| Comando | Descripción |
|---|---|
| `npm install` | Instalar dependencias |
| `npm run dev` | Iniciar servidor de desarrollo |
| `npm run test:run` | Ejecutar tests Vitest |
| `npx playwright test` | Ejecutar tests E2E |
| `npm run build` | Generar build de producción |
| `npm run preview` | Previsualizar build |
| `docker build -t cristian-portfolio .` | Construir imagen Docker |
| `docker compose up -d` | Levantar aplicación con Compose |
| `docker compose down` | Detener Compose |

---

# 📊 Experiencia profesional vs tecnologías del portfolio

Es importante diferenciar mi experiencia profesional de las tecnologías utilizadas específicamente durante la construcción y evolución de este portfolio.

## Experiencia profesional

```text
Vue 3
JavaScript
Quasar Framework
C#
.NET Framework
ASP.NET Web API
Dapper
SQL Server
REST APIs
Arquitectura por capas
Git
Azure DevOps
DIAN
XML
DLL
Facturación electrónica
Nómina electrónica
```

## Tecnologías aplicadas / exploradas en este portfolio

```text
React
TypeScript
Vite
Three.js
Vitest
Testing Library
Playwright
Docker
Docker Compose
GitHub Actions
GitHub Container Registry
GitHub Pages
```

Esta separación permite mostrar tanto mi experiencia profesional como mi capacidad para aprender y aplicar nuevas tecnologías en proyectos reales.

---

# 🚧 Evolución hacia una plataforma Full Stack

Una de las próximas etapas del proyecto consiste en evolucionar el portfolio desde una aplicación frontend hacia una arquitectura Full Stack.

Arquitectura objetivo:

```text
                    Portfolio
                        │
                        ▼
                React + TypeScript
                        │
                        ▼
                 REST API / HTTP
                        │
                        ▼
                ASP.NET Web API
                        │
                ┌───────┴───────┐
                │               │
          Business Logic    Authentication
                │
                ▼
              Dapper
                │
                ▼
            SQL Server
```

La información actualmente integrada de forma estática podrá evolucionar hacia información almacenada y administrada mediante una base de datos.

---

# 🗄️ Backend y base de datos — Próxima etapa

Se plantea incorporar un backend desarrollado con:

- C#
- ASP.NET Web API
- Arquitectura por capas
- Dapper
- SQL Server

El backend podrá administrar información como:

```text
Perfil
Experiencia
Educación
Skills
Proyectos
Certificaciones
Contactos
CV
```

Endpoints previstos:

```text
GET    /api/profile
GET    /api/experience
GET    /api/education
GET    /api/skills
GET    /api/projects
GET    /api/certifications

POST   /api/projects
PUT    /api/projects/{id}
DELETE /api/projects/{id}

POST   /api/contact
```

Estos endpoints son parte de la arquitectura planificada y serán implementados progresivamente.

---

# 🔐 Panel administrativo

Una futura versión del proyecto incorporará un panel administrativo para gestionar el contenido del portfolio sin modificar directamente el código fuente.

Conceptualmente:

```text
                  /admin
                     │
                     ▼
              Authentication
                     │
                     ▼
              Admin Dashboard
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
    Projects    Experience     Skills
        │            │            │
        └────────────┼────────────┘
                     │
                     ▼
                 REST API
                     │
                     ▼
                SQL Server
```

Funciones previstas:

- Login
- Autenticación
- Autorización
- JWT
- CRUD de proyectos
- CRUD de experiencia
- CRUD de habilidades
- Gestión de formación
- Gestión de certificaciones
- Gestión del contenido profesional

---

# 📬 Formulario de contacto Full Stack

El formulario de contacto evolucionará para utilizar el backend.

Arquitectura prevista:

```text
Visitor
   │
   ▼
Contact Form
   │
   ▼
React
   │
   ▼
ASP.NET Web API
   │
   ├── Validation
   ├── Logging
   └── Persistence
           │
           ▼
       SQL Server
```

Esto permitirá demostrar integración entre frontend, backend, validación, persistencia y servicios externos.

---

# 🤖 Integración de Inteligencia Artificial

Una de las funcionalidades diferenciales previstas para el portfolio es un **generador de CV personalizado mediante IA**.

La idea es que el portfolio pueda utilizar información estructurada del perfil profesional para generar diferentes versiones del CV según el tipo de posición.

Ejemplo:

```text
                    Perfil profesional
                            │
                            ▼
                           IA
                            │
             ┌──────────────┼──────────────┐
             │              │              │
             ▼              ▼              ▼
        Frontend         Full Stack       .NET
          CV                CV             CV
             │              │              │
             └──────────────┼──────────────┘
                            ▼
                       Exportación
                            │
                            ▼
                           PDF
```

Posibles perfiles:

- Frontend Developer
- Full Stack Developer
- Vue Developer
- React Developer
- .NET Developer
- Software Developer

La IA utilizará únicamente información profesional previamente definida y estructurada para evitar generar experiencia, tecnologías o información que no corresponda con el perfil real.

---

# 🚀 Proyectos reales como módulos

Otra etapa importante será integrar proyectos reales dentro del portfolio como módulos demostrativos.

Cada proyecto podrá mostrar:

```text
Proyecto
   │
   ├── Descripción
   ├── Problema
   ├── Solución
   ├── Arquitectura
   ├── Tecnologías
   ├── Capturas
   ├── GitHub
   └── Demo
```

Para proyectos que dispongan de una implementación funcional, se podrá mostrar también su arquitectura:

```text
Frontend
    │
    ▼
REST API
    │
    ▼
Business Logic
    │
    ▼
Data Access
    │
    ▼
SQL Server
```

Esto permitirá que el portfolio no solo muestre información sobre los proyectos, sino que pueda convertirse progresivamente en una **demostración funcional de diferentes arquitecturas y soluciones**.

---

# 🐳 Arquitectura Full Stack con Docker

Cuando el backend y la base de datos sean incorporados, la arquitectura Docker prevista será:

```text
                       Docker Compose
                              │
             ┌────────────────┼────────────────┐
             │                │                │
             ▼                ▼                ▼
         Frontend           API             Database
          React           ASP.NET           SQL Server
             │                │                │
             └────────────────┼────────────────┘
                              │
                            Nginx
```

La finalidad será poder levantar el entorno completo mediante:

```bash
docker compose up -d
```

---

# 🌍 Deployment en VPS

Una futura etapa consiste en desplegar la aplicación en un **VPS**.

Arquitectura prevista:

```text
                    Internet
                       │
                       ▼
                     HTTPS
                       │
                       ▼
                     Nginx
                       │
              ┌────────┴────────┐
              │                 │
              ▼                 ▼
          Frontend              API
           React              ASP.NET
                                │
                                ▼
                            SQL Server
```

El VPS permitirá demostrar un flujo de deployment más cercano a un entorno real de producción.

Tecnologías previstas:

- VPS
- Linux
- Docker
- Docker Compose
- Nginx
- HTTPS
- Certificados SSL
- Variables de entorno
- Backups

---

# 🔒 Seguridad

A medida que se incorpore backend, se aplicarán prácticas básicas de seguridad:

- Variables de entorno
- Protección de secretos
- Autenticación
- Autorización
- JWT
- Validación de entradas
- Protección de endpoints
- HTTPS
- Separación entre configuración y código
- No almacenar credenciales en el repositorio

---

# 🔄 Azure DevOps Pipelines

Como parte de la expansión de conocimientos DevOps, se incorporará una implementación del pipeline utilizando **Azure DevOps Pipelines**.

Flujo previsto:

```text
Git Repository
      │
      ▼
Azure DevOps
      │
      ▼
Pipeline
      │
      ├── Restore
      ├── Build
      ├── Tests
      ├── Docker Build
      ├── Push
      └── Deploy
```

El objetivo será demostrar que los conceptos de CI/CD pueden implementarse utilizando diferentes plataformas.

---

# 🦊 GitLab CI/CD

También se incorporará **GitLab CI/CD** como alternativa para automatización.

Arquitectura conceptual:

```text
GitLab Repository
       │
       ▼
GitLab CI/CD
       │
       ├── Test
       ├── Build
       ├── Docker
       ├── Registry
       └── Deploy
```

GitHub Actions, Azure DevOps y GitLab CI/CD serán estudiados como diferentes implementaciones del mismo ciclo de integración y deployment.

---

# ☸️ Kubernetes

Una etapa posterior será migrar la arquitectura containerizada hacia Kubernetes.

Arquitectura objetivo:

```text
                         Kubernetes
                              │
              ┌───────────────┼───────────────┐
              │               │               │
              ▼               ▼               ▼
          Frontend            API          Database
           Pod(s)           Pod(s)          Pod
              │               │
              ▼               ▼
          Service          Service
              │               │
              └───────┬───────┘
                      ▼
                   Ingress
                      │
                      ▼
                   HTTPS
```

Conceptos previstos:

- Kubernetes Deployment
- Pods
- Services
- ConfigMaps
- Secrets
- Ingress
- Rolling updates
- Health checks
- Replicas
- Container orchestration

---

# 📊 Observabilidad

Como etapa posterior también se plantea incorporar observabilidad.

El objetivo será poder conocer el estado de la aplicación y detectar problemas.

Arquitectura conceptual:

```text
Application
     │
     ├── Logs
     │
     ├── Metrics
     │
     ├── Health Checks
     │
     └── Monitoring
```

Ejemplo de endpoint previsto:

```text
GET /health
```

Respuesta conceptual:

```json
{
  "status": "healthy",
  "version": "1.0.0",
  "database": "connected"
}
```

---

# 📈 Roadmap

El proyecto se desarrolla progresivamente desde un portfolio frontend hacia una plataforma Full Stack con infraestructura y procesos DevOps.

## ✅ Completado

- [x] React
- [x] TypeScript
- [x] Vite
- [x] Three.js
- [x] Vitest
- [x] Testing Library
- [x] Playwright
- [x] Docker
- [x] Docker Compose
- [x] GitHub Actions
- [x] GitHub Container Registry
- [x] GitHub Pages
- [x] Versionado mediante Git Tags
- [x] Publicación de imágenes Docker
- [x] Rollback mediante versiones Docker

## 🚧 Próxima etapa — Full Stack

- [ ] ASP.NET Web API
- [ ] Arquitectura por capas
- [ ] Dapper
- [ ] SQL Server
- [ ] API REST para el portfolio
- [ ] Persistencia de proyectos
- [ ] Persistencia de experiencia
- [ ] Persistencia de skills
- [ ] Persistencia de educación
- [ ] Formulario de contacto
- [ ] Health checks

## 🔐 Administración

- [ ] Autenticación
- [ ] JWT
- [ ] Autorización
- [ ] Panel administrativo
- [ ] CRUD de proyectos
- [ ] CRUD de experiencia
- [ ] CRUD de skills
- [ ] Gestión de educación
- [ ] Gestión de certificaciones

## 🤖 Inteligencia Artificial

- [ ] Generador de CV mediante IA
- [ ] CV orientado a diferentes posiciones
- [ ] Generación desde información estructurada
- [ ] Exportación a PDF
- [ ] Integración con API de IA

## 🚀 Infraestructura

- [ ] VPS
- [ ] Linux
- [ ] Nginx
- [ ] Reverse proxy
- [ ] HTTPS
- [ ] SSL
- [ ] Docker Compose en servidor
- [ ] Variables de entorno
- [ ] Backups

## 🔄 CI/CD

- [x] GitHub Actions
- [ ] Azure DevOps Pipelines
- [ ] GitLab CI/CD
- [ ] Pipeline hacia VPS
- [ ] Deployment automatizado
- [ ] Rollback automatizado

## ☸️ Cloud Native

- [ ] Kubernetes
- [ ] Kubernetes Deployment
- [ ] Kubernetes Service
- [ ] ConfigMaps
- [ ] Secrets
- [ ] Ingress
- [ ] Rolling updates
- [ ] Health checks

## 📊 Observabilidad

- [ ] Logging estructurado
- [ ] Métricas
- [ ] Monitoring
- [ ] Alertas
- [ ] Dashboard de infraestructura

---

# 📈 Objetivos de aprendizaje

Este proyecto forma parte de un proceso de aprendizaje progresivo relacionado con desarrollo moderno, arquitectura de software y DevOps.

Ruta técnica:

```text
Git / GitHub
      ↓
GitHub Actions
      ↓
Testing automatizado
      ↓
Docker
      ↓
Docker Compose
      ↓
GitHub Container Registry
      ↓
Versionado de imágenes
      ↓
Rollback
      ↓
Deployment
      ↓
ASP.NET Web API
      ↓
Dapper
      ↓
SQL Server
      ↓
VPS
      ↓
Azure DevOps
      ↓
GitLab CI/CD
      ↓
Kubernetes
      ↓
Observabilidad
```

---

# 🎯 Objetivos del proyecto

Este portafolio busca demostrar:

- Desarrollo frontend moderno.
- Uso de React y TypeScript.
- Integración de una escena 3D interactiva.
- Componentización en React.
- Testing automatizado.
- Pruebas End-to-End.
- Construcción reproducible.
- Containerización con Docker.
- Uso de Docker Compose.
- Automatización mediante GitHub Actions.
- Publicación de imágenes Docker en GHCR.
- Versionado de aplicaciones.
- Estrategias de rollback.
- Deployment automatizado.
- Arquitectura Full Stack.
- Desarrollo de APIs REST.
- Persistencia mediante SQL Server.
- Acceso a datos mediante Dapper.
- Autenticación y autorización.
- Integración de Inteligencia Artificial.
- Deployment en VPS.
- Automatización mediante diferentes plataformas CI/CD.
- Introducción progresiva a Kubernetes.
- Aplicación de prácticas de observabilidad.

---

# 🧠 ¿Qué diferencia este portfolio?

El objetivo no es crear únicamente una página personal con información profesional.

La intención es convertir progresivamente el portfolio en un **proyecto técnico demostrable** que integre:

```text
                    PORTFOLIO
                        │
        ┌───────────────┼────────────────┐
        │               │                │
        ▼               ▼                ▼
     Frontend         Backend             IA
        │               │                │
 React / TS       ASP.NET Web API     CV Generator
 Three.js              │
        │            Dapper
        │               │
        │          SQL Server
        │               │
        └───────────────┼────────────────┘
                        │
                     Docker
                        │
                ┌───────┴────────┐
                │                │
               VPS             CI/CD
                │                │
              Nginx       GitHub / Azure /
                │              GitLab
                │
                ▼
             Kubernetes
```

De esta manera, el proyecto puede evolucionar desde un portfolio visual hacia una aplicación que demuestre conocimientos de **frontend, backend, bases de datos, arquitectura, testing, IA, containerización, CI/CD, infraestructura y cloud native**.

---

# 📚 Formación

## SENA

**Tecnólogo en Análisis y Desarrollo de Software**

Centro Tecnológico de la Amazonia

**2022 – 2024**

---

## CUN — Corporación Unificada Nacional de Educación Superior

**Ingeniería de Sistemas — Homologación**

**2024 – 2025**

10 semestres cursados.

---

# 📫 Contacto

**Cristian Felipe Martínez Sánchez**

**Desarrollador Web Full Stack**

📍 Colombia

### GitHub

https://github.com/felipe18MS

### Portfolio

https://felipe18MS.github.io/cristian-martinez-portafolio/

---

# ⭐ Sobre este proyecto

Este proyecto continúa evolucionando como un espacio para experimentar con nuevas tecnologías, mejorar mis prácticas de ingeniería de software y demostrar de manera práctica mis conocimientos en frontend, backend, testing, containerización, CI/CD e infraestructura.

El objetivo no es únicamente mostrar una interfaz visual, sino demostrar progresivamente el ciclo completo:

```text
Desarrollo
    ↓
Arquitectura
    ↓
Testing
    ↓
Build
    ↓
Containerización
    ↓
Versionado
    ↓
Registry
    ↓
Deployment
    ↓
Backend
    ↓
Database
    ↓
CI/CD
    ↓
VPS
    ↓
Kubernetes
    ↓
Observabilidad
```

---

# 👨‍💻 Cristian Martínez

**Full Stack Web Developer**

**Vue 3 | JavaScript | Quasar | C# | .NET | ASP.NET Web API | Dapper | SQL Server | React | TypeScript | Three.js | Docker | CI/CD**