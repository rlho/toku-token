self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// Receive push notification from server
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {
    title: "Toku Token",
    body: "tokuを積もう",
    url: "/record",
  };

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/icon-192.png",
      badge: "/icon-192.png",
      tag: "toku-daily",
      data: { url: data.url },
    })
  );
});

// Handle notification click
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/record";

  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then((clients) => {
      if (clients.length > 0) {
        clients[0].focus();
        clients[0].navigate(url);
      } else {
        self.clients.openWindow(url);
      }
    })
  );
});
