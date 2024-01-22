const p = document.querySelector("p");
const part2ul = document.querySelector(".part2ul");
const part3ul = document.querySelector(".part3ul");

async function part1(num) {
  try {
    let { data } = await axios.get(`http://numbersapi.com/${num}`);
    p.innerText = data;
  } catch {
    (e) => console.log("Error!", e);
  }
}

part1(7);

async function part2(numsArr) {
  try {
    let { data } = await axios.get(
      `http://numbersapi.com/${numsArr.toString()}`
    );
    for (let num in data) {
      let li = document.createElement("li");
      li.innerText = data[num];
      part2ul.append(li);
    }
  } catch {
    (e) => console.log("Error!", e);
  }
}

const data = part2([3, 4, 8, 14]);

async function part3(favNum) {
  try {
    const data = await Promise.all([
      axios.get(`http://numbersapi.com/${favNum}`),
      axios.get(`http://numbersapi.com/${favNum}`),
      axios.get(`http://numbersapi.com/${favNum}`),
      axios.get(`http://numbersapi.com/${favNum}`),
    ]);
    for (let i = 0; i < data.length; i++) {
      li = document.createElement("li");
      li.innerText = data[i].data;
      part3ul.append(li);
    }
  } catch {
    (e) => console.log("error!", e);
  }
}

part3(7);
