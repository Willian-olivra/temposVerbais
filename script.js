let alreadySubmitted = false;

function checkAnswers() {
  if (alreadySubmitted) {
    alert("Você já respondeu o quiz. Recarregue a página para refazer.");
    return;
  }

  const correctAnswers = {
    q1: "scalability",
    q2: "data loss",
    q3: "collaboration tools",
    q4: "pay-as-you-go",
    q5: "backup servers",
    q6: "was",
    q7: "were",
    q8: "wasn't",
    q9: "have",
    q10: "have been"
  };

  let resultHTML = "<h2>Results:</h2>";
  let totalCorrect = 0;
  const totalQuestions = Object.keys(correctAnswers).length;

  for (let q in correctAnswers) {
    const selected = document.querySelector(`input[name="${q}"]:checked`);
    const feedbackElement = document.querySelector(`#${q} .feedback`);
    if (!selected) {
      resultHTML += `<p class="incorrect">Question ${q.slice(1)}: No answer selected.</p>`;
      feedbackElement.textContent = "Você não selecionou uma resposta.";
      feedbackElement.classList.add("incorrect");
      continue;
    }
    const userAnswer = selected.value;
    if (userAnswer === correctAnswers[q]) {
      resultHTML += `<p class="feedback">Question ${q.slice(1)}: Correct!</p>`;
      totalCorrect++;
      feedbackElement.textContent = "Resposta correta!";
      feedbackElement.classList.add("feedback");
    } else {
      resultHTML += `<p class="incorrect">Question ${q.slice(1)}: Incorrect. Correct answer: "${correctAnswers[q]}"</p>`;
      feedbackElement.textContent = `Resposta incorreta. A resposta correta é: "${correctAnswers[q]}"`;
      feedbackElement.classList.add("incorrect");
    }
  }

  const progress = Math.round((totalCorrect / totalQuestions) * 100);
  document.getElementById("progressBar").style.width = progress + "%";
  document.getElementById("progressBar").textContent = progress + "%";

  let feedbackMsg = "";
  if (progress >= 80) {
    feedbackMsg = "🟢 Excelente! Você entende bem o conteúdo.";
  } else if (progress >= 50) {
    feedbackMsg = "🟡 Bom trabalho! Mas ainda há espaço para melhorar.";
  } else {
    feedbackMsg = "🔴 Você pode melhorar! Reveja o conteúdo e tente novamente.";
  }

  document.getElementById("score").innerHTML = `
    Pontuação final: ${totalCorrect} de ${totalQuestions} (${progress}%)<br>
    <strong>${feedbackMsg}</strong>
  `;

 
  document.getElementById("retryBtn").style.display = "inline-block";

  alreadySubmitted = true;
}
