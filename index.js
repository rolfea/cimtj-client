window.onload = () => {
  // local dev
  // const server = 'http://localhost:8000';
  const server = 'https://cimtj-server.onrender.com';

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
    const jokeText = getJokeText();
    const result = await getToxicity(jokeText);

    displayResult(result, jokeText);
  };

  const getJokeText = () => document.querySelector('#joke-text').value;

  const getToxicity = async (jokeText) =>
    await (await fetch(`${server}?jokeText=${jokeText}`)).json();

  const displayResult = (result, jokeText) => {
    const newResult = document.createElement('p');
    newResult.innerText = `JOKE: ${jokeText} | Sketchy-Score: ${Math.round(
      result.attributeScores.TOXICITY.summaryScore.value * 100
    )} /
    100`;

    const resultList = document.querySelector('.results');
    resultList.append(newResult);
  };

  // I'm cheap, so my Render instance is going to be asleep on first page visit.
  // Send a request to wake it up!
  getToxicity('Wake up');
};
