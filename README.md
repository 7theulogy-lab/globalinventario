# Inventario

Aplicación web instalable para registrar inventarios, códigos y cantidades desde una PDA o un computador.

## Desarrollo

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Antes de publicar cambios:

```bash
pnpm test
pnpm build
```

## Cómo funciona

- Todos los datos se guardan únicamente en el navegador del dispositivo.
- Cada PDA mantiene sus inventarios de forma independiente: no hay cuentas, servidor ni base de datos.
- Cada inventario mantiene sus propios códigos. Al ingresar un código existente, la cantidad se suma.
- Si se corrige un código y pasa a coincidir con otro, ambas cantidades se fusionan en una sola fila.
- «Copiar para Excel» copia una tabla tabulada para pegarla en Excel.
- HOME permite renombrar y borrar inventarios. En la pantalla de códigos se puede borrar una fila o todas, con confirmación.
- La PWA funciona sin conexión después de haber sido instalada y cargada por primera vez.

> Importante: borrar los datos de Chrome o desinstalar la aplicación puede eliminar los inventarios guardados en esa PDA.

## Instalación en la PDA

1. Abrir la dirección publicada en Chrome.
2. Usar **Instalar aplicación** o **Agregar a pantalla principal**.
3. Abrir **Inventario** desde el icono creado.

La dirección publicada entrega la aplicación, pero los registros nunca se comparten ni se envían a una base de datos.
