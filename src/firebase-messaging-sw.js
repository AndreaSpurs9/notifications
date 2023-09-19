self.addEventListener("notificationclick", function(event) {
  event.waitUntil(
    clients
      .matchAll({
        type: "window",
      })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === "/" && "focus" in client) return client.focus();
        }
        if (clients.openWindow) {
          console.log(event.notification.data.FCM_MSG.data.url)
          return clients.openWindow("/" + event.notification.data.FCM_MSG.data.url);
        }
      }),
  );
});

importScripts("https://www.gstatic.com/firebasejs/10.3.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.3.1/firebase-messaging-compat.js");
firebase.initializeApp({
  apiKey: "AIzaSyCNY5_vtV0FDWzFZGobsArUlFkwbfCYyBU",
  authDomain: "notifications-e6fb5.firebaseapp.com",
  projectId: "notifications-e6fb5",
  storageBucket: "notifications-e6fb5.appspot.com",
  messagingSenderId: "825453260881",
  appId: "1:825453260881:web:d2afbeed133f6f39ac4870",
  vapidKey: "BPl072mG_S3ekr80-hnjf3f4yCj8TEdylWGOTZnR-F5ifKqH71DhPpjZmVRJTb6QOThLZgoZ69KKssM49GfWm7c"
});
messaging = firebase.messaging();
