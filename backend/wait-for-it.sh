#!/bin/sh
# Desc: Espera hasta que un puerto esté disponible

host="$1"
port="$2"
shift 2
cmd="$@"

until nc -z "$host" "$port"; do
  echo "Esperando a $host:$port..."
  sleep 2
done

exec $cmd