document.addEventListener("DOMContentLoaded", () => {
  initSmoothScroll();
  initCalculator();
});

/**
 * Gerencia a rolagem suave ao clicar nos links de navegação.
 * Fecha o fluxo padrão do navegador e cria uma transição limpa até a seção.
 */
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('.main-nav a, .btn-main');

  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      
      // Verifica se o link aponta para uma seção interna da página
      if (targetId && targetId.startsWith("#")) {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          // Ajusta a rolagem levando em consideração o topo fixo (sticky header)
          const headerOffset = document.querySelector(".main-header").offsetHeight;
          const elementPosition = targetSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }
    });
  });
}

/**
 * Controla a Calculadora de Impacto Ambiental.
 * Consome as variáveis de cores nativas do seu CSS para renderizar os alertas.
 */
function initCalculator() {
  const btnCalculate = document.querySelector(".btn-submit");
  const inputWater = document.getElementById("agua");
  const resultContainer = document.querySelector(".calc-result");
  const resultText = document.querySelector(".calc-result p");

  if (!btnCalculate || !inputWater || !resultText || !resultContainer) return;

  btnCalculate.addEventListener("click", () => {
    const waterValue = parseFloat(inputWater.value);

    // Validação de erro: Aplica a cor vermelha (--alert-color) do seu CSS
    if (isNaN(waterValue) || waterValue <= 0) {
      resultText.innerHTML = "⚠️ Por favor, insira um valor válido de litros de água.";
      resultContainer.style.borderColor = "var(--alert-color)";
      resultText.style.color = "var(--alert-color)";
      return;
    }

    // Reseta as bordas para a cor verde claro do seu CSS caso o dado seja válido
    resultContainer.style.borderColor = "var(--primary-light)";
    resultText.style.color = "var(--text-color)";

    let feedbackMessage = "";

    // Classificação dinâmica baseada nas faixas de consumo de água
    if (waterValue < 1000) {
      feedbackMessage = `🌱 <strong style="color: var(--primary-color)">Consumo Baixo (${waterValue}L):</strong> Ótimo uso dos recursos! Continue aplicando técnicas de preservação no campo.`;
    } else if (waterValue >= 1000 && waterValue <= 5000) {
      feedbackMessage = `💧 <strong style="color: var(--accent-color)">Consumo Moderado (${waterValue}L):</strong> Seu impacto está dentro da média. Considere instalar sensores de gotejamento para otimizar a lavoura.`;
    } else {
      feedbackMessage = `⚠️ <strong style="color: var(--alert-color)">Consumo Alto (${waterValue}L):</strong> Alerta de alto impacto. Recomendamos o uso urgente de sistemas de irrigação inteligente para evitar desperdícios.`;
    }

    resultText.innerHTML = feedbackMessage;
  });
}
