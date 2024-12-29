import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, fetchSignInMethodsForEmail } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCnqv2AeYLPBfQFY5mAfzjScYZS5PelSGo",
  authDomain: "login-a40f5.firebaseapp.com",
  projectId: "login-a40f5",
  storageBucket: "login-a40f5.appspot.com",
  messagingSenderId: "536112548677",
  appId: "1:536112548677:web:3b08eb32b7ebf5e4954c2c",
  measurementId: "G-9YQXL44490"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const signUpForm = document.getElementById('signup-form'); const signInForm = document.getElementById('signin-form');
const googleSignUpBtn = document.getElementById('google-signup-btn'); const loginBtn = document.getElementById('google-login-btn');
const logoutBtn = document.getElementById('logout-btn'); const userInfo = document.getElementById('user-info');
const errorMessage = document.getElementById('error-message');

signUpForm.onsubmit = (e) => { e.preventDefault();
const email = signUpForm.email.value;
const password = signUpForm.password.value;

fetchSignInMethodsForEmail(auth, email)
.then((signInMethods) => {
if (signInMethods.length > 0) {
errorMessage.innerHTML = "Email is already in use. Please sign in.";
} else {
createUserWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
userInfo.innerHTML = `Hello, ${userCredential.user.email}`; errorMessage.innerHTML = '';
signUpForm.reset();
})
.catch((error) => {
errorMessage.innerHTML = error.message;
});
}
})
.catch((error) => {
errorMessage.innerHTML = error.message;
});
};

signInForm.onsubmit = (e) => { e.preventDefault();
const email = signInForm.email.value;

const password = signInForm.password.value;

signInWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
userInfo.innerHTML = `Hello, ${userCredential.user.email}`; errorMessage.innerHTML = '';
signInForm.reset();
})
.catch((error) => {
errorMessage.innerHTML = error.message;
});
};

const handleGoogleAuth = () => {
const provider = new GoogleAuthProvider(); signInWithPopup(auth, provider)
.then((result) => {
const user = result.user;
userInfo.innerHTML = `Hello, ${user.displayName}`; errorMessage.innerHTML = '';
})
.catch((error) => {
errorMessage.innerHTML = error.message;
});
};

googleSignUpBtn.onclick = handleGoogleAuth; loginBtn.onclick = handleGoogleAuth;

logoutBtn.onclick = () => { signOut(auth)
.then(() => { userInfo.innerHTML = ''; errorMessage.innerHTML = '';
})
.catch((error) => {
errorMessage.innerHTML = error.message;
});
};

onAuthStateChanged(auth, (user) => { if (user) {
userInfo.innerHTML = `Hello, ${user.email}`;
} else {
userInfo.innerHTML = '';
}
});


