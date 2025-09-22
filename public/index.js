// const generateTrans = document.getElementById('translate')
const text1 = document.getElementById('text1')
const text2 = document.getElementById('text2')
const area2 = document.getElementById('area2')
const footer_text = document.getElementById('footer-text')
const query = document.getElementById('query').value


document.getElementById("translate").addEventListener("click", async () => {
  const text = document.getElementById("query").value.trim();
  const language = document.querySelector('input[name="language"]:checked').value;

  if (!text) return alert("Please enter some text");

  try {
    const response = await fetch("/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, language })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error);

    text1.innerHTML = 'Original Text 👇'
    text2.innerHTML = 'Your Translation 👇'
    area2.innerHTML = `
        <textarea>${data.translation}</textarea>
    `
    // need to change it with the translated text
    footer_text.innerHTML = `<button class="translate" id="Startover">Start Over</button>`} catch (err) {
    console.error(err);
    alert("Error: " + err.message);
  }
});

document.getElementById("footer-text").addEventListener("click", () => {
  if (event.target.id === "Startover") {
    location.reload();
  }
}); 