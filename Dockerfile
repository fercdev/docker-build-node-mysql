FROM mysql:8.0

# variables de entorno
ENV MYSQL_ROOT_PASSWORD=root_pass
ENV MYSQL_DATABASE=demo_db
ENV MYSQL_USER=demo_user
ENV MYSQL_PASSWORD=demo_pass

# copiar scripts de inicializacion
COPY init/ /docker-entrypoint-initdb.d/

EXPOSE 3306