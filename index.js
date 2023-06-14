window.onload = () => {
  const submitJokeBtn = document.querySelector('#submit-joke');
  const jokeTextInput = document.querySelector('#joke-text');

  jokeTextInput.addEventListener('input', (event) => handleEnable());
  submitJokeBtn.addEventListener('click', async (event) => submitJoke());

  const handleEnable = () => {
    const currentInput = document.querySelector('#joke-text').value;
    if (currentInput.length > 3) {
      submitJokeBtn.disabled = false;
    } else {
      submitJokeBtn.disabled = true;
    }
  };

  const submitJoke = async () => {
    const jokeText = document.querySelector('#joke-text').value;
    const result = await (
      await fetch(`http://localhost:8000?jokeText=${jokeText}`)
    ).json();

    displayResult(result, jokeText);
  };

  const displayResult = (result, jokeText) => {
    const newResult = document.createElement('p');
    newResult.innerText = `JOKE: ${jokeText} | Sketchy-Score: ${Math.round(
      result.attributeScores.TOXICITY.summaryScore.value * 100
    )} /
    100`;

    const resultList = document.querySelector('.results');
    resultList.append(newResult);
  };
};
