#!/bin/sh
# Espera a que PostgreSQL esté listo

host="$1"
port="$2"
user="$3"
db="$4"
shift 4

until PGPASSWORD=$DB_PASSWORD psql -h "$host" -p "$port" -U "$user" -d "$db" -c '\q'; do
  echo "PostgreSQL no está disponible - esperando..."
  sleep 2
done

echo "PostgreSQL está listo - ejecutando comando"
exec "$@"