# Inherit current image from MySQL image (for latest versions use mysql):
FROM mysql:8.0

# Copy vacation.sql into /docker-entrypoint-initdb.d special folder which executes any script (.sql/.sh/.js/...) only once:
COPY ./project03.sql /docker-entrypoint-initdb.d