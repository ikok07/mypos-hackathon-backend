FROM denoland/deno:2.2.2

WORKDIR /app

COPY . .

CMD ["deno", "task", "docker-run"]


