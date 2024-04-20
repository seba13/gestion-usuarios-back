## Instalación de base de datos local en mysql 'sistema'

## crear usuario de ambiente de desarrollo root y contraseña root

## Creción de variable de entorno .env en raiz de proyecto backend

SI NODE_ENV = 'development'
ejecuta base de datos en local

// esta configuración está en src/config/keys.ts

base de datos debe llamarse 'sistema'
usuario root y contraseña root
puerto 3306
host localhost

// .env
NODE_ENV = 'development'
PORT = 80

SI NODE_ENV='production'
ejecuta base de datos en servidor en la nube

//.env

DB_HOST='mysql-reportserviceapp.alwaysdata.net'
DB_PORT=3306
DB_NAME='reportserviceapp_db'
DB_USER='353537'
DB_PASSWORD='aiep2024'
PORT = 80
NODE_ENV = 'production'

## Instalación de paquetes npm

npm i

## ejecutar servidor backend express

npm run dev
