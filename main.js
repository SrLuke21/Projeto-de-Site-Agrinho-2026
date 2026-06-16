document.addEventListener("DOMContentLoaded", () => {
  initSmoothScroll();
  initCalculator();
});

/**
 * Ativa a rolagem suave ao clicar nos links do menu
 */
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('.main-nav a, .btn-main');

  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
}

/**
 * Lógica de funcionamento da Calculadora de Impacto Ambiental
 */
function initCalculator() {
  const btnCalculate = document.querySelector(".btn-submit");
  const inputWater = document.getElementById("agua");
  const resultDisplay = document.querySelector(".calc-result p");

  if (!btnCalculate || !inputWater || !resultDisplay) return;

  btnCalculate.addEventListener("click", () => {
    const waterValue = parseFloat(inputWater.value);

    if (isNaN(waterValue) || waterValue <= 0) {
      resultDisplay.innerHTML = "⚠️ Por favor, insira um valor válido de litros de água.";
      resultDisplay.style.color = "#ff4d4d";
      return;
    }

    let feedbackMessage = "";
    resultDisplay.style.color = "inherit"; 

    // Classificação baseada no consumo digitado
    if (waterValue < 1000) {
      feedbackMessage = `🌱 <strong>Consumo Baixo (${waterValue}L):</strong> Ótimo uso dos recursos! Continue aplicando técnicas de preservação.`;
    } else if (waterValue >= 1000 && waterValue <= 5000) {
      feedbackMessage = `💧 <strong>Consumo Moderado (${waterValue}L):</strong> Seu impacto está dentro da média. Considere instalar sensores de gotejamento para otimizar.`;
    } else {
      feedbackMessage = `⚠️ <strong>Consumo Alto (${waterValue}L):</strong> Alerta de alto impacto. Recomendamos o uso de sistemas de irrigação inteligente para evitar desperdícios.`;
    }

    resultDisplay.innerHTML = feedbackMessage;
  });
}
