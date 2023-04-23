import { initializeApp, getApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
	apiKey: "AIzaSyDgb2bkywF98Yfd4m6Bj0I5tkCdpB76xL8",
	authDomain: "kanban-18e33.firebaseapp.com",
	databaseURL:
		"https://kanban-18e33-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "kanban-18e33",
	storageBucket: "kanban-18e33.appspot.com",
	messagingSenderId: "804618608721",
	appId: "1:804618608721:web:23c6848d34bfe324801870",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getDatabase(app);
export default app;
