# Angular2026

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.4.

That’s the win we needed\! Now that the "pipes" are connected, we can finally turn your Angular app into a professional Docker image.

Since your project is named `angular-2026`, here are the commands to build and launch it.

### 1\. Build the Image

Run this in your project root (where the `Dockerfile` and `nginx.conf` are). We'll tag it as `angular-2026`:

```bash
docker build -t angular-2026 .
```

- **What's happening?** Docker is using Node 24 to compile your code, then moving the production files into a tiny Nginx server.

---

### 2\. Run the Container

Now, let's start the container and map it to a port on your Mac so you can see it:

```bash
docker run -d -p 8080:80 --name van-fleet-2026 angular-2026
```

- `-d`: Runs in "Detached" mode (in the background).
- `-p 8080:80`: Maps **Port 8080** on your Mac to **Port 80** inside the container.
- `--name`: Gives your running container a friendly name.

---

### 3\. Verify it's Running

Open your browser and go to:
**[http://localhost:8080](https://www.google.com/search?q=http://localhost:8080)**

You should see your login screen. Try logging in\! Your **MSW (Mock Service Worker)** will work perfectly inside the container because it runs in the user's browser, not on the server.

---

### 💡 Pro-Tip: Useful Commands for Later

| Task                       | Command                         |
| :------------------------- | :------------------------------ |
| **See running containers** | `docker ps`                     |
| **Stop the app**           | `docker stop van-fleet-2026`    |
| **Start it again**         | `docker start van-fleet-2026`   |
| **See the Nginx logs**     | `docker logs -f van-fleet-2026` |
| **Remove it (to rebuild)** | `docker rm -f van-fleet-2026`   |

**How did the build go?** If you see "Successfully tagged angular-2026", you are officially running a containerized enterprise-ready frontend\! 🐳🚀
