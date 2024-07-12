document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    await loginUser();
  });
});

////////// Send data to remote server //////////
async function postUsers(init) {
  const response = await fetch("http://localhost:5678/api/users/login", init);
  return await response.json();
}

////////// User verification and server response //////////
async function loginUser() {
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const errorMessage = document.querySelector(".error-message");

  const userEmail = email.value;
  const userPassword = password.value;

  ///// Single user /////
  if (userEmail !== "sophie.bluel@test.tld" || userPassword !== "S0phie") {
    errorMessage.textContent = "Mot de passe et email invalides.";
    console.error("Erreur : Identifiants incorrects");
    return;
  }

  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: userEmail,
      password: userPassword,
    }),
    mode: "cors",
    credentials: "same-origin",
  };

  try {
    const response = await postUsers(init);

    if (response.token && response.userId) {
      ///// Injection response into session storage /////
      sessionStorage.setItem("token", response.token);
      sessionStorage.setItem("userId", response.userId);

      console.log("Utilisateur connecté:", response);

      ///// Redirection to home page /////
      window.location.href = "index.html";
    } else {
      console.error("Réponse invalide:", response);
      errorMessage.textContent =
        "Erreur de connexion. Veuillez vérifier vos identifiants.";
    }
  } catch (error) {
    console.error("Erreur:", error);
    errorMessage.textContent =
      "Erreur de connexion. Veuillez vérifier vos identifiants.";
  }
}
