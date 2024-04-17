#!/bin/bash

default_user=default_user
default_password=default_password
default_db=default_db
default_secret=default_secret
default_port=5000

if [ "$1" == "-y" ]; then
    user=$default_user
    pass=$default_password
    db=$default_db
    secret=$default_secret
    port=$default_port
else
    read -p "Enter POSTGRES_USER (default: $default_user): " user
    user=${user:-$default_user}

    read -p "Enter POSTGRES_PASSWORD (default: $default_password): " pass
    pass=${pass:-$default_password}

    read -p "Enter POSTGRES_DB (default: $default_db): " db
    db=${db:-$default_db}

    read -p "Enter SECRET (default: $default_secret): " secret
    secret=${secret:-$default_secret}

    read -p "Enter PORT (default: $default_port): " port
    port=${port:-$default_port}
fi

docker build -t local -f Dockerfile.dev .
docker run --name local -p $port:$port -e POSTGRES_USER=$user -e POSTGRES_PASSWORD=$pass -e POSTGRES_DB=$db -e DB_URL=postgres://$user:$pass@localhost:5432/$db -e SECRET=$secret -e PORT=$port -v $(pwd)/src:/shooter_api/src -d local
docker exec -it local bash