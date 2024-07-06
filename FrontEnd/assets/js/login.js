const form = document.querySelector("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const errorMessage = document.querySelector(".error-message");

async function postUsers(init) {
  const response = await fetch("http://localhost:5678/api/users/login", init);
  return await response.json();
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userEmail = email.value;
  const userPassword = password.value;

  if (userEmail !== "sophie.bluel@test.tld" || userPassword !== "S0phie") {
    errorMessage.textContent = "Mot de passe et email invalides.";
    console.error("Erreur : Identifiants incorrects");
    return;
  }

  const init = {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({
      email: userEmail,
      password: userPassword,
    }),
    mode: "cors",
    credential: "same-origin",
  };

  try {
    const response = await postUsers(init);

    // Vérifiez si la réponse contient le token et le userId
    if (response.token && response.userId) {
      // Stocker le token et le userId dans le localStorage
      sessionStorage.setItem("token", response.token);
      sessionStorage.setItem("userId", response.userId);

      console.log("Utilisateur connecté:", response);

      // Traitez les étapes suivantes après la connexion
      errorMessage.textContent = "Bonjour Sophie !";
    } else {
      console.error("Réponse invalide:", response);
      errorMessage.textContent =
        "Erreur de connexion. Veuillez vérifier vos identifiants.";
    }
  } catch (error) {
    console.log("Erreur: ", error);
    errorMessage.textContent =
      "Erreur de connexion. Veuillez vérifier vos identifiants.";
  }
});
