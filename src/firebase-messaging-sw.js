// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfUsLLz837uCcoilVuAH8cAzrA6BX3QQg",
  authDomain: "fleet-remote-push.firebaseapp.com",
  projectId: "fleet-remote-push",
  storageBucket: "fleet-remote-push.appspot.com",
  messagingSenderId: "1017798880559",
  appId: "1:1017798880559:web:0e021965180cfd87da85da",
  measurementId: "G-6WX3RF4EC5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

async function requestPermission() {
  console.log("권한 요청 중...");

  const permission = await Notification.requestPermission();
  if (permission === "denied") {
    console.log("알림 권한 허용 안됨");
    return;
  }

  console.log("알림 권한이 허용됨");

  const token = await getToken(messaging, {
    vapidKey: process.env.REACT_APP_VAPID_KEY,
  });

  if (token) console.log("token: ", token);
  else console.log("Can not get Token");

  onMessage(messaging, (payload) => {
    console.log("메시지가 도착했습니다.", payload);
    // ...
  });
}

requestPermission();
