import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyByLDyGVAmwuAE2URlnUu5fdKSfQetMq8g",
    authDomain: "demoday-db-419519.firebaseapp.com",
    projectId: "demoday-db-419519",
    storageBucket: "demoday-db-419519.appspot.com",
    messagingSenderId: "792474312480",
    appId: "1:792474312480:web:d1dafa1c3cadb5fc3d4145",
    measurementId: "G-VK1TECL5F1"
};

const app = initializeApp(firebaseConfig);

export default app;