#Paso 1: Compilación y build de código base angular

# Usamos imagen oficial de node como base
FROM node:latest as build

#Creación carpeta /app
RUN mkdir -p /app

#Seteamos la carpeta creada como directorio de trabajo
WORKDIR /app

#Copiamos las dependencias 
COPY package.json /app

#Instalamos las dependencias
RUN npm install

#Copiamos todo lo de la ruta actual a nuestro working directory
COPY . /app

#Hacemos build de los archivos de producción
RUN npm run build --prod

#Paso 2: Nginx server 

#Usamos la imagen oficial de nginx
FROM nginx:latest

#Copiamos el build a contenido nginix
COPY --from=build /app/dist/mastergym /usr/share/nginx/html