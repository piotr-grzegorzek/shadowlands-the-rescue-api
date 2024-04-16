@echo off
set default_user=default_user
set default_password=default_password
set default_db=default_db
set default_secret=default_secret

IF "%~1"=="-y" (
    SET user=%default_user%
    SET pass=%default_password%
    SET db=%default_db%
    SET secret=%default_secret%
) ELSE (
    set /p user="Enter POSTGRES_USER (default: %default_user%): "
    IF "%user%"=="" SET user=%default_user%

    set /p pass="Enter POSTGRES_PASSWORD (default: %default_password%): "
    IF "%pass%"=="" SET pass=%default_password%

    set /p db="Enter POSTGRES_DB (default: %default_db%): "
    IF "%db%"=="" SET db=%default_db%

    set /p secret="Enter SECRET (default: %default_secret%): "
    IF "%secret%"=="" SET secret=%default_secret%
)

docker build -t local -f Dockerfile.dev .
docker run --name local -p 3000:3000 -e POSTGRES_USER=%user% -e POSTGRES_PASSWORD=%pass% -e POSTGRES_DB=%db% -e DB_URL=postgres://%user%:%pass%@localhost:5432/%db% -e SECRET=%secret% -e PORT=3000 -v %cd%:/shooter_api -d local
docker exec -it local bash