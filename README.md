# Calendar APP

## Pasos para configurar proyecto

1. Clona los proyectos de backend y frontend

- Back-end
```bash
git clone https://github.com/racsorazaclasobol/calendario-backend.git
```

- Front-end
```bash
git clone https://github.com/racsorazaclasobol/calendario-frontend.git
```

2. Instala dependencias

    - Ingresa en la raiz del Back-end y ejecuta
    ```bash
    npm install
    ```

    - Ingresa en la raiz del Front-end y ejecuta
    ```bash
    yarn
    ```

3. En el Frontend nombrar el archivo .env.template por .env

4. Hacer las configuraciones respectivas en las variables de entorno.

```
VITE_MODE = << dev, prod, test, qa >>
VITE_API_URL = << RUTA DE API DEL BACKEND >>
```