//Programation is my egg

//VOLTAR PARA O TOPO
function voltarParaTopo() {
  // Vá para o topo da página
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

//REMOVER O BOTÃO VOLTAR PARA O TOPO QUANDO ESTIVER NO TOPO
window.addEventListener("scroll", function() {
  var btnTopo = document.getElementById("btnTopo");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    btnTopo.style.display = "block";
  } else {
    btnTopo.style.display = "none";
  }
});

//CONVERTER DOLAR EM 10 MOEDAS PRINCIPAIS
function convert() {
  const apiKey = '0d32b5f9fc80368860f79054'; // Substitua pela sua chave de API válida
  const amount = document.getElementById('amount').value;
  const currency = document.getElementById('currency').value;

  fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`)
    .then(response => response.json())
    .then(data => {
      if (data.result === 'success') {
        const rates = data.conversion_rates;

        if (rates[currency]) {
          const convertedAmount = amount * rates[currency];

          let resultHTML = '';
          if (currency) {
            resultHTML += `<strong><p style='text-align: center;'>${currency} <br> <p style='text-align: center; color: green;'>  ${convertedAmount.toFixed(2).replace('.', ',')}<br><hr>`
            var resultadocor = document.getElementById('result')
            resultadocor.style = 'color: orange; font-family: arial; font:bold; font-size: larger; letter-spacing: 2px; line-height: 2;'

            resultadocor.addEventListener("mouseover", function() {
              resultadocor.style.color = "green";
            })

            resultadocor.addEventListener("mouseout", function() {
              resultadocor.style.color = "orange";
            });
          } else {
            resultHTML += `<p style='text-align: center;'>${currency} <br> <p style='text-align: center;line-height: 1;color: green;'>${currency}  ${convertedAmount.toFixed(2).replace('.', ',')}<br><hr>`
          }

          document.getElementById('result').innerHTML = resultHTML;
        } else {
          document.getElementById('result').innerHTML = 'Não foi possível obter a taxa de câmbio para a moeda selecionada.';
        }
      } else {
        document.getElementById('result').innerHTML = 'Ocorreu um erro ao obter as taxas de câmbio.';
      }
    })
    .catch(error => {
      console.log(error);
      document.getElementById('result').innerHTML = 'Ocorreu um erro ao processar a solicitação.';
    });
}


//MUDANÇA DE TEMA
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




  //GRÁFICO DOLAR 30 DIAS
// Chave de acesso à API Alpha Vantage
const apiKey = 'J3SKYNIRYG2SIP8I';

// Função para buscar os valores do dólar nos últimos 30 dias
async function getDollarValues() {
const response = await fetch(`https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=USD&to_symbol=BRL&apikey=${apiKey}`);
const data = await response.json();

// Extrair os valores dos últimos 30 dias
const timeSeries = data['Time Series FX (Daily)'];
const dates = Object.keys(timeSeries).slice(0, 30).reverse();
const values = dates.map(date => parseFloat(timeSeries[date]['4. close']));

return { dates, values };
}

// Função para criar o gráfico
async function createChart() {
const { dates, values } = await getDollarValues();

const ctx = document.getElementById('myChart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
    labels: dates,
    datasets: [{
        label: 'Valor do Dólar (BRL)',
        data: values,
        backgroundColor: 'black',
        borderColor: 'rgb(147, 42, 173)',
        borderWidth: 2
    }]
    },
    options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
        beginAtZero: false
        }
    },
    plugins: {
      legend: {
          display: true,
          position: 'top',
      },
      },
      layout: {
          padding: {
              top: 10,
              bottom: 10
          }
      },
      plugins: {
          title: {
              display: true,
              text: 'Valor do Dólar Últimos 30 Dias'
          }
      },
      aspectRatio: 3
    }
});
}

// Chamar a função para criar o gráfico
createChart();


/*
// Função para fazer a requisição à API do GNews e exibir as notícias
function showNews() {
  const apiKey = 'c8c3c2fb493df80146283287b01c1cc2';
  const topic = 'economy';
  const query = 'dollar';

  fetch(`https://gnews.io/api/v4/search?q=${query}&topic=${topic}&token=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const newsContainer = document.getElementById('news-container');
      newsContainer.innerHTML = '';

      // Limita o número de notícias a serem exibidas para 4
      const articlesToShow = data.articles.slice(0, 4);

      articlesToShow.forEach(article => {
        const newsElement = document.createElement('div');
        newsElement.innerHTML = `
          <h2 style='color: orange;'>${article.title}</h2>
          <p style=''>${article.description}</p>
          <p style='color: rgb(110, 0, 138);'>Fonte: ${article.source.name}</p>
          <p style='color: rgb(110, 0, 138);'>Publicado em: ${article.publishedAt}</p>
          <a href="${article.url}" target="_blank" style='color: green;' id='link-noticia'>Leia na íntegra</a>
          <hr>
        `;
        newsContainer.appendChild(newsElement);
      });
    })
    .catch(error => {
      console.error('Ocorreu um erro ao buscar as notícias:', error);
      const newsElement = document.createElement('div');
        newsElement.innerHTML = `
          <h2 style='color: orange;'>Ocorreu um erro ao buscar as notícias.</h2>
          <p style=''>O servidor está offline</p>
        `;
        newsContainer.appendChild(newsElement);
    });
}

window.addEventListener('load', showNews);


function copyEmail() {
  var email = "viniciusazevedopel@gmail.com"; // E-mail para copiar
  var messageElement = document.getElementById("message");

  var tempInput = document.createElement("input");
  tempInput.setAttribute("value", email);
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);

  messageElement.innerHTML = "E-mail copiado para a área de transferência!";
  messageElement.style = `background-color: rgba(255, 255, 255, 0.377); color: black; margin: auto; border-radius: 15px; font-size: small; width: 300px;`

  var btncopy = document.getElementById(`copy-button`)
  btncopy.style = `background-color: green; transition: .4s;`

  setTimeout(function() {
      messageElement.innerHTML = "";
      btncopy.style = "background-color: white; transition: .4s";
  }, 10000); // Redefinir a mensagem após 10 segundos
}




/* eslint-disable esversion: 8 */
//api token =  c8c3c2fb493df80146283287b01c1cc2


/*
// Função para buscar notícias de economia sobre o dólar
async function getDollarEconomyNews() {
  const apiKey = 'c8c3c2fb493df80146283287b01c1cc2'; // Substitua pelo seu token de API válido
  const url = `https://gnews.io/api/v4/search?q=dólar%20economia&lang=pt&token=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.articles && data.articles.length > 0) {
      const articles = data.articles.slice(0, 4);
      let newsHTML = '';

      articles.forEach(article => {
        const title = article.title;
        const description = article.description;
        const url = article.url;

        newsHTML += `<h2 style='font-size: 30px; text-align: left;'>${title}</h2>`;
        newsHTML += `<p style='color: green; font-size: 20px;'>${description}</p>`;
        newsHTML += `<a href="${url}" target="_blank" id='link-noticia'>Leia a notícia na íntegra</a>`;
        newsHTML += '<hr>';
      });

      const newsContainer = document.getElementById('news-container');
      newsContainer.innerHTML = newsHTML;
    } else {
      const newsContainer = document.getElementById('news-container');
      newsContainer.textContent = 'Nenhuma notícia encontrada.';
    }
  } catch (error) {
    console.log(error);
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = 'Desculpe! Parce que ocorreu um erro ao obter as notícias.';
  }
}

// Chamar a função para obter as notícias de economia sobre o dólar inicialmente
getDollarEconomyNews();

// Atualizar as notícias a cada 5 minutos (300000 milissegundos)
setInterval(getDollarEconomyNews, 300000);
*/
