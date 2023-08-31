const category = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  const categoryField = document.getElementById("categoryField");
  data.data.forEach((element) => {
    const newButton = document.createElement("div");
    newButton.innerHTML = `
    <button class="btn bg-lal text-white">${element.category}</button>
    `;
    categoryField.appendChild(newButton);
    console.log(element.category);
  });
};
category();
// console.log('JS is connected')
