/* Category Button */
const category = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  const categoryField = document.getElementById("categoryField");
  data.data.forEach((element) => {
    const newButton = document.createElement("div");
    newButton.innerHTML = `
    <button onclick="Videos(${element.category_id})"e class="btn bg-lal text-white">${element.category}</button>
    `;
    categoryField.appendChild(newButton);
  });
};
/* Showing Video */
const Videos = async (value) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${value}`
  );
  //   console.log(value);
  const data = await res.json();
  //   console.log(data.data);
  const Video = document.getElementById("videoContain");
  Video.textContent = "";
  Video.classList.add("grid");
  const id = data.data;
  if (value === 1005) {
    const err = document.createElement("div");
    Video.classList.remove("grid");
    err.classList.add("flex", "flex-col", "text-center");
    err.innerHTML = `
    <div class="mx-auto mt-20">
          <img src="./resources/Icon.png" alt="" />
        </div>
        <p class="text-5xl">Oops!! Sorry, There is no <br />content here</p>
    `;
    Video.appendChild(err);
  } else {
    id.forEach((element) => {
      const newVid = document.createElement("div");
      newVid.classList.add("card", "bg-base-100");
      element.authors.forEach((element2) => {
        newVid.innerHTML = `
        <div class="rounded-lg flex flex-col">
                <figure>
                  <img
                    class=" w-full lg:w-auto h-72"
                    src="${element.thumbnail}"
                    alt="Image not loaded"
                  />
                  </figure>
                  <p class="bg-black text-white text-end w-50 absolute top-60 left-44" >${toHoursAndMinutes(
                    element.others.posted_date
                  )}</p>
              </div>
              <div class="card-normal p-0 flex flex-row mb-2 my-5">
                <div class="avatar w-10 h-10 mr-3">
                  <img class="rounded-full" src="${
                    element2?.profile_picture
                  }" />
                </div>
                <div>
                  <h2 class="card font-bold text-xl">${element?.title}</h2>
                  <p>${element2?.profile_name}<span class="ml-2" >${Verify(
          element2.verified
        )}</span></p>
                  <p>${element?.others.views}</p>
                </div>
              </div>
        `;
        Video.appendChild(newVid);
      });
    });
  }
};

// function to check verified
const Verify = (isverify) => {
  if (isverify === true) {
    return '<i class="fa-solid fa-square-check" style="color: #005eff;"></i>';
  } else {
    return "";
  }
};
Videos(1000);
category();
function toHoursAndMinutes(totalSeconds) {
  if (totalSeconds === "") {
    return "";
  } else {
    const totalMinutes = Math.floor(totalSeconds / 60);

    const seconds = totalSeconds % 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const total =
      hours + " hrs " + minutes + " min " + seconds + " sec " + "ago";
    return total;
  }
}

// console.log();
