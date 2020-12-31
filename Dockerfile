FROM hayd/deno:alpine-1.6.2
WORKDIR /app
COPY . .
USER deno
CMD ["run", "--allow-net", "--allow-read", "mod.ts"]
EXPOSE 8000