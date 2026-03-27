---
title: "Eleva tu Proyecto: Cómo Integrar Husky, CommitLint, Lint-Staged y ESLint"
description: "Configuración paso a paso de Husky, CommitLint, Lint-Staged y ESLint para mantener la calidad del código y un historial de commits limpio en proyectos Next.js + TypeScript."
date: 2024-03-08
tags: ["Next.js", "Git", "ESLint", "TypeScript", "Conventional Commits"]
readingTime: 6
lang: "es"
originalUrl: "https://medium.com/@nburgueno.dev/eleva-tu-proyecto-c%C3%B3mo-integrar-husky-commitlint-lint-staged-y-eslint-8725cd90e343"
draft: false
---

¿Cuántas veces te has sumado a un nuevo proyecto y enfrentado a la tediosa tarea de ajustar cada detalle, desde las convenciones de commits hasta las reglas de estilo del código?

Si alguna vez te has sentido abrumado por este proceso, ¡no estás solo!

En este blog, vamos a configurar de manera sencilla, paso a paso, estas cuatro herramientas, haciéndolo accesible incluso para aquellos que se sienten intimidados por la configuración del proyecto.

El proyecto de ejemplo lo vamos hacer con **Next.js** y **TypeScript**.

---

## Conceptos

### Husky: El Guardián de los Hooks

Configura ganchos (hooks) como el `pre-commit` o `pre-push` para asegurarse de que nuestro código cumple con ciertos estándares antes de ser subido.

### CommitLint: El Maestro de la Armonía de los Commits

CommitLint establece reglas para que todos estemos en la misma página, comunicando de manera efectiva y manteniendo un historial de cambios comprensible.

### Lint-Staged: Verificador de Archivos Modificados

Solo se ejecuta en archivos que han sido modificados en una confirmación específica, en lugar de ejecutarse en todo el proyecto como lo haría el linter normalmente.

### ESLint: Supervisor Riguroso de Código

ESLint asegura que tu código sea legible y siga las mejores prácticas, desde la sangría hasta la declaración de variables.

---

## Configuración Paso a Paso

### 1. Inicializar Proyecto Next.js

```shell
npx create-next-app@latest
```

Selecciones recomendadas durante el setup:
- **TypeScript:** Yes
- **ESLint:** Yes
- **App Router:** Yes

### 2. Configurar ESLint

```shell
npx eslint --init
```

Selecciones recomendadas:
- To check syntax and find problems
- JavaScript modules
- React framework
- TypeScript: Yes
- Browser environment
- JSON configuration format

### 3. Instalar Husky y Lint-Staged

```shell
npm i -D husky lint-staged
npx husky init
```

Modificar `.husky/pre-commit` para que ejecute lint-staged antes de cada commit.

Crear `.lintstagedrc`:

```json
{
  "**//*.{ts,tsx}": ["eslint"]
}
```

### 4. Configurar CommitLint

```shell
npm i -D @commitlint/cli @commitlint/config-conventional
```

Crear `.husky/commit-msg`:

```shell
npx --no -- commitlint --edit $1
```

Crear `commitlint.config.js`:

```javascript
module.exports = {
  extends: ["@commitlint/config-conventional"],
};
```

---

## Flujo en Acción

Con esta configuración en lugar, cualquier error de sintaxis (como una variable sin usar) se detecta automáticamente durante el `pre-commit`, impidiendo que se suba código defectuoso.

Al corregir el error y usar la estructura de **Conventional Commits**, el commit se aprueba correctamente.

---

## Conclusión

¡Agradezco que hayas llegado hasta el final de esta guía! Espero sinceramente que te haya sido de gran utilidad.

Si querés ver más contenido como este, seguime en [Medium](https://medium.com/@nburgueno.dev).

¡Hasta la próxima! 🚀
