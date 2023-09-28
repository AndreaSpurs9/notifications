self.addEventListener("notificationclick", function(event) {
  event.waitUntil(
    clients
      .matchAll({
        type: "window",
      })
      .then(() => {
        if (clients.openWindow) {
          console.log(clients)
          return clients.openWindow("/" + event.notification.data.FCM_MSG.data.url);
        }
      }),
  );
});

importScripts("https://www.gstatic.com/firebasejs/10.3.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.3.1/firebase-messaging-compat.js");
firebase.initializeApp({
  apiKey: "", // add here your apiKey
    authDomain: "", // add here your authDomain
    projectId: "", // add here your projectId
    storageBucket: "", // add here your storageBucket
    messagingSenderId: "", // add here your messagingSenderId
    appId: "", // add here your appId
    vapidKey: "" // add here your vapidKey
});
messaging = firebase.messaging();
