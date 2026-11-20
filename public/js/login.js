// Login page logic.
// Uses the same Firebase project as the rest of the site (public/js/config/firebase-config.js).
// Email, Google, GitHub and Facebook sign-in must be turned on in the Firebase console
// (Authentication > Sign-in method). Add bhimmajhi.github.io to Authorized domains too.
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { firebaseConfig } from "./config/firebase-config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const card = document.querySelector("[data-home]");
const homeUrl = card?.dataset.home || "/";

const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const rememberInput = document.getElementById("remember");
const toggleBtn = document.getElementById("togglePassword");
const submitBtn = document.getElementById("submitBtn");
const forgotBtn = document.getElementById("forgotBtn");
const signupLink = document.getElementById("signupLink");
const socialButtons = document.querySelectorAll(".social");
const msg = document.getElementById("formMsg");

const providers = {
  google: () => new GoogleAuthProvider(),
  github: () => new GithubAuthProvider(),
  facebook: () => new FacebookAuthProvider(),
};

const ERROR_TEXT = {
  "auth/invalid-email": "That email address doesn't look right.",
  "auth/invalid-credential": "Email or password is incorrect.",
  "auth/user-not-found": "Email or password is incorrect.",
  "auth/wrong-password": "Email or password is incorrect.",
  "auth/too-many-requests": "Too many attempts. Please wait a few minutes and try again.",
  "auth/network-request-failed": "Network error. Check your connection and try again.",
  "auth/popup-blocked": "Your browser blocked the sign-in window. Allow pop-ups and try again.",
  "auth/popup-closed-by-user": "The sign-in window was closed before finishing.",
  "auth/account-exists-with-different-credential": "An account already exists with this email. Try another sign-in method.",
  "auth/operation-not-allowed": "This sign-in method is not turned on yet.",
  "auth/unauthorized-domain": "This website is not authorized for sign-in yet.",
};

function showMessage(text, type = "error") {
  msg.textContent = text;
  msg.className = `form-msg is-${type}`;
}

function friendlyError(error) {
  return ERROR_TEXT[error?.code] || "Something went wrong. Please try again.";
}

function setBusy(isBusy) {
  submitBtn.disabled = isBusy;
  socialButtons.forEach((button) => (button.disabled = isBusy));
}

async function applyPersistence() {
  // "Remember me" on = stay signed in after the tab closes. Off = only this session.
  await setPersistence(
    auth,
    rememberInput.checked ? browserLocalPersistence : browserSessionPersistence
  );
}

function goHome() {
  showMessage("Signed in. Redirecting…", "success");
  window.location.href = homeUrl;
}

// Show / hide password
toggleBtn.addEventListener("click", () => {
  const isShowing = passwordInput.type === "text";
  passwordInput.type = isShowing ? "password" : "text";
  toggleBtn.setAttribute("aria-label", isShowing ? "Show password" : "Hide password");
  toggleBtn.querySelector("i").className = isShowing ? "fas fa-eye" : "fas fa-eye-slash";
});

// Email + password sign-in
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email) {
    showMessage("Please enter your email address.");
    emailInput.focus();
    return;
  }

  if (password.length < 6) {
    showMessage("Password must be at least 6 characters.");
    passwordInput.focus();
    return;
  }

  setBusy(true);
  showMessage("");

  try {
    await applyPersistence();
    await signInWithEmailAndPassword(auth, email, password);
    goHome();
  } catch (error) {
    showMessage(friendlyError(error));
  } finally {
    setBusy(false);
  }
});

// Google / GitHub / Facebook sign-in (popup)
socialButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const makeProvider = providers[button.dataset.provider];
    if (!makeProvider) return;

    setBusy(true);
    showMessage("");

    try {
      await applyPersistence();
      await signInWithPopup(auth, makeProvider());
      goHome();
    } catch (error) {
      if (error?.code !== "auth/cancelled-popup-request") {
        showMessage(friendlyError(error));
      }
    } finally {
      setBusy(false);
    }
  });
});

// Forgot password: sends a reset link to the email typed above
forgotBtn.addEventListener("click", async () => {
  const email = emailInput.value.trim();

  if (!email) {
    showMessage("Enter your email above, then click Forgot password again.", "info");
    emailInput.focus();
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    showMessage(`Password reset link sent to ${email}.`, "success");
  } catch (error) {
    showMessage(friendlyError(error));
  }
});

// Sign up is not built yet
signupLink.addEventListener("click", (event) => {
  event.preventDefault();
  showMessage("Sign up is not open yet. Please check back later.", "info");
});
