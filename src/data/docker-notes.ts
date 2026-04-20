import type { DockerCategory, DockerTip } from "./types";

export const dockerCategories: DockerCategory[] = [
  {
    id: "images",
    label: "Images",
    description: "Build, tag, transfer, and remove images.",
    groups: [
      {
        title: "Build",
        commands: [
          {
            caption: "Build from Dockerfile in current dir",
            command: "docker build -t myapp:1.0 .",
          },
          {
            caption: "Custom Dockerfile path",
            command: "docker build -f docker/Dockerfile -t myapp:1.0 .",
          },
          {
            caption: "Skip layer cache",
            command: "docker build --no-cache -t myapp:1.0 .",
          },
          {
            caption: "Stop at an intermediate stage",
            command: "docker build --target builder -t myapp:builder .",
          },
          {
            caption: "Pass build args",
            command: "docker build --build-arg VERSION=1.0.3 -t myapp .",
          },
          {
            caption: "Multi-platform build + push (buildx)",
            command:
              "docker buildx build --platform linux/amd64,linux/arm64 --push -t registry.example.com/myapp:1.0 .",
          },
        ],
      },
      {
        title: "Registry",
        commands: [
          { caption: "Login", command: "docker login registry.example.com" },
          { caption: "Pull", command: "docker pull nginx:1.25-alpine" },
          {
            caption: "Re-tag for a registry",
            command: "docker tag myapp:1.0 registry.example.com/myapp:1.0",
          },
          {
            caption: "Push",
            command: "docker push registry.example.com/myapp:1.0",
          },
        ],
      },
      {
        title: "Save / Load",
        intro:
          "Transfer full images (layers, history, ENV, CMD, ENTRYPOINT) — ideal for air-gapped environments.",
        commands: [
          {
            caption: "Save image to tar",
            command: "docker save -o myapp.tar myapp:1.0",
          },
          {
            caption: "Save + compress",
            command: "docker save myapp:1.0 | gzip > myapp.tar.gz",
          },
          { caption: "Load from tar", command: "docker load -i myapp.tar" },
          {
            caption: "Load from compressed tar",
            command: "gunzip -c myapp.tar.gz | docker load",
          },
        ],
      },
      {
        title: "Export / Import",
        intro:
          "Flattens a container's filesystem into a single-layer image — loses history and metadata (ENV, CMD, ENTRYPOINT). Use save/load instead when you need a faithful copy.",
        commands: [
          {
            caption: "Export container filesystem",
            command: "docker export <container> -o fs.tar",
          },
          {
            caption: "Import as image",
            command: "docker import fs.tar myapp:flat",
          },
        ],
      },
      {
        title: "Inspect & Remove",
        commands: [
          { caption: "List images", command: "docker image ls" },
          {
            caption: "Build history / layer sizes",
            command: "docker history myapp:1.0",
          },
          {
            caption: "Full metadata",
            command: "docker image inspect myapp:1.0",
          },
          { caption: "Remove image", command: "docker rmi myapp:1.0" },
          { caption: "Prune dangling images", command: "docker image prune" },
          {
            caption: "Prune ALL unused images",
            command: "docker image prune -a",
          },
        ],
      },
    ],
  },
  {
    id: "containers",
    label: "Containers",
    description: "Run, inspect, and manage container lifecycles.",
    groups: [
      {
        title: "Run",
        commands: [
          {
            caption: "Detached, named, port-mapped",
            command: "docker run -d --name web -p 8080:80 nginx",
          },
          {
            caption: "Interactive shell, auto-remove on exit",
            command: "docker run -it --rm ubuntu bash",
          },
          {
            caption: "Bind-mount current dir as workdir",
            command: 'docker run -v "$(pwd):/app" -w /app node:20 npm test',
          },
          {
            caption: "Load env from file",
            command: "docker run --env-file .env -d myapp",
          },
          {
            caption: "Auto-restart unless manually stopped",
            command: "docker run --restart unless-stopped -d myapp",
          },
          {
            caption: "Resource limits",
            command: "docker run --memory 512m --cpus 1.5 myapp",
          },
          {
            caption: "Attach to a specific network",
            command: "docker run --network my-net --name api myapp",
          },
          {
            caption: "Run as non-root user",
            command: "docker run --user 1000:1000 myapp",
          },
        ],
      },
      {
        title: "Lifecycle",
        commands: [
          {
            caption: "Start / stop / restart",
            command: "docker start|stop|restart <id>",
          },
          { caption: "Force-kill (SIGKILL)", command: "docker kill <id>" },
          {
            caption: "Pause / unpause (freeze processes)",
            command: "docker pause <id>  #  docker unpause <id>",
          },
          { caption: "Rename", command: "docker rename old-name new-name" },
          {
            caption: "Snapshot container to image",
            command: "docker commit <id> myapp:snapshot",
          },
          { caption: "Remove stopped container", command: "docker rm <id>" },
          {
            caption: "Force-remove running container",
            command: "docker rm -f <id>",
          },
          {
            caption: "Prune stopped containers",
            command: "docker container prune",
          },
        ],
      },
      {
        title: "Inspect & Observe",
        commands: [
          { caption: "Running containers", command: "docker ps" },
          { caption: "All (including stopped)", command: "docker ps -a" },
          {
            caption: "Filter by status + name",
            command:
              'docker ps -a --filter "status=exited" --filter "name=web"',
          },
          {
            caption: "Follow logs, last 100 lines",
            command: "docker logs -f --tail 100 <id>",
          },
          { caption: "Full inspect (JSON)", command: "docker inspect <id>" },
          {
            caption: "Single field via Go template",
            command: "docker inspect --format '{{.State.Status}}' <id>",
          },
          { caption: "Live resource usage", command: "docker stats" },
          { caption: "Processes inside container", command: "docker top <id>" },
          {
            caption: "Daemon event stream",
            command: "docker events --since 10m",
          },
        ],
      },
      {
        title: "Exec & Copy",
        commands: [
          {
            caption: "Shell into a running container",
            command: "docker exec -it <id> sh",
          },
          { caption: "Shell as root", command: "docker exec -u 0 -it <id> sh" },
          {
            caption: "Run one-off command",
            command: "docker exec <id> printenv",
          },
          {
            caption: "Copy file INTO container",
            command: "docker cp ./file.conf <id>:/etc/app/file.conf",
          },
          {
            caption: "Copy file OUT of container",
            command: "docker cp <id>:/var/log/app.log ./app.log",
          },
        ],
      },
    ],
  },
  {
    id: "volumes",
    label: "Volumes & Mounts",
    description: "Persistent storage for containers.",
    groups: [
      {
        title: "Named volumes",
        commands: [
          { caption: "Create", command: "docker volume create mydata" },
          { caption: "List", command: "docker volume ls" },
          {
            caption: "Inspect (see mountpoint on host)",
            command: "docker volume inspect mydata",
          },
          { caption: "Remove", command: "docker volume rm mydata" },
          { caption: "Prune unused", command: "docker volume prune" },
        ],
      },
      {
        title: "Mount syntax",
        intro:
          'In -v, a leading "/" means bind-mount (host path); no leading "/" means named volume.',
        commands: [
          {
            caption: "Named volume",
            command: "docker run -v mydata:/data myapp",
          },
          {
            caption: "Bind mount (absolute path required)",
            command: 'docker run -v "$(pwd):/app" myapp',
          },
          {
            caption: "Read-only bind mount",
            command: 'docker run -v "$(pwd):/app:ro" myapp',
          },
          {
            caption: "In-memory tmpfs",
            command: "docker run --tmpfs /tmp:size=64m myapp",
          },
          {
            caption: "Verbose --mount form",
            command:
              'docker run --mount type=bind,source="$(pwd)",target=/app,readonly myapp',
          },
        ],
      },
    ],
  },
  {
    id: "networks",
    label: "Networks",
    description: "Isolate and connect containers.",
    groups: [
      {
        title: "CRUD",
        commands: [
          { caption: "List", command: "docker network ls" },
          {
            caption: "Create bridge network",
            command: "docker network create --driver bridge my-net",
          },
          {
            caption: "Custom subnet",
            command: "docker network create --subnet 172.20.0.0/16 my-net",
          },
          {
            caption: "Inspect (shows attached containers)",
            command: "docker network inspect my-net",
          },
          { caption: "Remove", command: "docker network rm my-net" },
          { caption: "Prune unused", command: "docker network prune" },
        ],
      },
      {
        title: "Attach / Detach",
        commands: [
          {
            caption: "Connect a running container",
            command: "docker network connect my-net web",
          },
          {
            caption: "Disconnect",
            command: "docker network disconnect my-net web",
          },
        ],
      },
      {
        title: "Drivers",
        intro:
          "bridge (default, isolated virtual L2), host (share host stack, no port mapping), none (no networking), overlay (multi-host, requires swarm). Containers on the same user-defined bridge can resolve each other by name via embedded DNS.",
        commands: [],
      },
    ],
  },
  {
    id: "compose",
    label: "Compose",
    description:
      "Multi-container stacks via docker-compose.yml (Compose V2 syntax).",
    groups: [
      {
        title: "Lifecycle",
        commands: [
          { caption: "Start in background", command: "docker compose up -d" },
          {
            caption: "Rebuild images first",
            command: "docker compose up -d --build",
          },
          {
            caption: "Stop + remove containers & networks",
            command: "docker compose down",
          },
          {
            caption: "Also remove named volumes",
            command: "docker compose down -v",
          },
          { caption: "Stop without removing", command: "docker compose stop" },
          {
            caption: "Restart a single service",
            command: "docker compose restart web",
          },
        ],
      },
      {
        title: "Scale & Profiles",
        commands: [
          {
            caption: "Scale a service",
            command: "docker compose up -d --scale worker=3",
          },
          {
            caption: "Gate services behind a profile",
            command: "docker compose --profile dev up -d",
          },
        ],
      },
      {
        title: "Observe & Exec",
        commands: [
          { caption: "Status", command: "docker compose ps" },
          {
            caption: "Follow logs for one service",
            command: "docker compose logs -f web",
          },
          {
            caption: "Shell into running service",
            command: "docker compose exec web sh",
          },
          {
            caption: "One-off disposable container",
            command: "docker compose run --rm web npm test",
          },
        ],
      },
      {
        title: "Build & Config",
        commands: [
          { caption: "Build all services", command: "docker compose build" },
          {
            caption: "Build without cache",
            command: "docker compose build --no-cache",
          },
          { caption: "Pull latest images", command: "docker compose pull" },
          {
            caption: "Validate + print merged config",
            command: "docker compose config",
          },
          {
            caption: "Layer compose files (override base)",
            command: "docker compose -f compose.yml -f compose.prod.yml up -d",
          },
          {
            caption: "Custom env file",
            command: "docker compose --env-file .env.prod up -d",
          },
        ],
      },
    ],
  },
  {
    id: "system",
    label: "System & Cleanup",
    description: "Inspect the daemon and reclaim disk.",
    groups: [
      {
        title: "Info",
        commands: [
          { caption: "Daemon info", command: "docker info" },
          { caption: "Disk usage breakdown", command: "docker system df" },
          {
            caption: "Verbose disk usage (per-image)",
            command: "docker system df -v",
          },
          { caption: "Live daemon events", command: "docker system events" },
        ],
      },
      {
        title: "Safe prune",
        intro:
          "Removes stopped containers, unused networks, and dangling images. Does NOT remove volumes.",
        commands: [
          { caption: "Default prune", command: "docker system prune" },
          {
            caption: "Include volumes",
            command: "docker system prune --volumes",
          },
        ],
      },
      {
        title: "Aggressive prune",
        intro: "Full reset of unused Docker resources — verify first.",
        commands: [
          {
            caption:
              "All unused images + stopped containers + networks + volumes",
            command: "docker system prune -a --volumes",
          },
        ],
      },
      {
        title: "Targeted prune",
        commands: [
          { caption: "Stopped containers", command: "docker container prune" },
          { caption: "Dangling images", command: "docker image prune" },
          { caption: "All unused images", command: "docker image prune -a" },
          { caption: "Unused volumes", command: "docker volume prune" },
          { caption: "Unused networks", command: "docker network prune" },
        ],
      },
      {
        title: "Inspect before deleting",
        commands: [
          { command: "docker ps -a" },
          { command: "docker volume ls" },
          { command: "docker image ls" },
          { command: "docker system df -v" },
        ],
      },
    ],
  },
];

export const dockerTips: DockerTip[] = [
  {
    title: "Volumes hold persistent data",
    body: "Databases, uploads, and caches live in volumes. `docker system prune --volumes` is destructive — verify with `docker volume ls` first.",
  },
  {
    title: "Can't delete? It's attached",
    body: "If a volume, network, or image refuses to remove, something still references it. Trace with `docker ps -a --filter volume=<name>` or `docker inspect`.",
  },
  {
    title: "Layer cache order matters",
    body: "Copy lockfiles before source: `COPY package*.json ./` → `RUN npm ci` → `COPY . .`. Source edits then reuse the cached deps layer.",
  },
  {
    title: "Multi-stage builds shrink images",
    body: "`FROM node:20 AS build` → compile → `FROM nginx:alpine` → `COPY --from=build /app/dist /usr/share/nginx/html`. Toolchain stays out of the runtime image.",
  },
  {
    title: "Use a .dockerignore",
    body: "Keeps `.git`, `node_modules`, `.env`, and tests out of the build context — faster builds and no accidental secrets in images.",
  },
  {
    title: "Non-root + pinned tags",
    body: "`USER app` in the Dockerfile and pin tags (`node:20.11.1-alpine`, not `:latest`) for reproducibility and defense in depth.",
  },
  {
    title: "ARG vs ENV",
    body: "ARG is build-time only and does not persist. ENV persists in the final image — never put secrets there. Use BuildKit `--secret` or runtime `--env-file`.",
  },
  {
    title: "HEALTHCHECK for orchestrators",
    body: "`HEALTHCHECK CMD curl -fsS http://localhost:8080/health || exit 1` lets Swarm/Kubernetes/Compose detect unhealthy containers.",
  },
  {
    title: "Bound log driver",
    body: "Default json-file driver grows unbounded. Cap per-container: `--log-opt max-size=10m --log-opt max-file=3`, or set defaults in `/etc/docker/daemon.json`.",
  },
  {
    title: "save/load ≠ export/import",
    body: "`save`/`load` transfer full images (layers + history + metadata). `export`/`import` flatten the filesystem into one layer and drop ENV/CMD/ENTRYPOINT — not a faithful copy.",
  },
];
