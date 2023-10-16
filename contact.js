function enviarEmail() {
    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var mensagem = document.getElementById("mensagem").value;

    // Validação básica dos campos
    if (nome === "" || email === "" || mensagem === "") {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Montar o link de envio de e-mail
    var link = "mailto:viniciusazevedopel@gmail.com" +
               "?subject=" + encodeURIComponent("Contato via Dolar Convert") +
               "&body=" + encodeURIComponent("Nome: " + nome + "\n\nE-mail: " + email + "\n\nMensagem: " + mensagem);

    // Abrir o cliente de e-mail padrão com o link de envio de e-mail
    window.location.href = link;
}

window.addEventListener('DOMContentLoaded', () => {
  const themeButton = document.getElementById('themeButton');
  const body = document.body;

  // Verifica se o usuário já escolheu o tema claro anteriormente
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
  }

  // Adiciona um ouvinte de eventos ao botão de tema
  themeButton.addEventListener('click', () => {
    // Alterna a classe 'dark-theme' no elemento body
    body.classList.toggle('dark-theme');

    // Armazena a escolha do tema no armazenamento local
    if (body.classList.contains('dark-theme')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });
});
