// ------ Showing the width and height of a window ----------
const widthElement = document.getElementById("width");
const heightElement = document.getElementById("height");

function updateWidthAndHeight() {
  widthElement.innerText = `width: ${document.documentElement.clientWidth}px`;
  heightElement.innerText = `height: ${document.documentElement.clientHeight}px`;
}
updateWidthAndHeight();

const throttle = (callback, delay) => {
  let throttleTimeout = null;
  let storedEvent = null;

  const throttledEventHandler = (event) => {
    storedEvent = event;

    const shouldHandleEvent = !throttleTimeout;

    if (shouldHandleEvent) {
      callback(storedEvent);

      storedEvent = null;

      throttleTimeout = setTimeout(() => {
        throttleTimeout = null;

        if (storedEvent) {
          throttledEventHandler(storedEvent);
        }
      }, delay);
    }
  };

  return throttledEventHandler;
};
let throttleStarter = throttle(updateWidthAndHeight, 1000);
window.addEventListener("resize", throttleStarter);

// -------- Searching by word in text ---------
const textArea = document.getElementById("textarea");
const inputText = document.getElementById("type-word");
const viewTypedText = document.getElementById("display");

const typeToParagraph = (e) => {
  viewTypedText.innerText = e.target.value;
};

const findWord = (e) => {
  viewTypedText.innerHTML = viewTypedText.innerText.replace(
    new RegExp(e.target.value, "gi"),
    `<b>${e.target.value}</b>`
  );
};

textArea.addEventListener("input", typeToParagraph);
inputText.addEventListener("input", findWord);

// ----------  Images slider  -----------
const addImgBtn = document.getElementById("add");
const imageDisplay = document.getElementById("image");
const imageUrl = document.getElementById("images-url");
const timer = document.getElementById("timer");
const btnRight = document.querySelector(".arrow-button__right");
const btnLeft = document.querySelector(".arrow-button__left");

let imgArray = [
  "https://www.w3schools.com/W3CSS/img_snowtops.jpg",
  "https://www.abc.net.au/news/image/10855580-3x2-940x627.jpg",
];

let index = 0;
let interval;
let delay = 3;
timer.value = delay;
imageDisplay.src = imgArray[0];

timer.addEventListener("input", () => {
  if (timer.value) {
    delay = timer.value;
    bindIndex(index, interval);
  }
});

addImgBtn.addEventListener("click", () => {
  const newImgUrl = imageUrl.value;
  if (
    newImgUrl &&
    !imgArray.includes(newImgUrl) &&
    newImgUrl.includes("https")
  ) {
    if (imgArray.length === 0) {
      index = 0;
      bindIndex(index, interval);
    }
    imgArray.push(newImgUrl);
    imageDisplay.src = newImgUrl;
  }
  imageUrl.value = "";
});
const switchImage = () =>
  (interval = setInterval(() => {
    if (index === imgArray.length - 1) {
      index = 0;
    } else {
      index++;
    }
    bindIndex(index);
  }, delay * 1000));

switchImage();

btnRight.addEventListener("click", () => {
  if (index === imgArray.length - 1) {
    index = 0;
  } else {
    index++;
  }
  bindIndex(index, interval);
});

btnLeft.addEventListener("click", () => {
  if (index === 0) {
    index = imgArray.length - 1;
  } else {
    index--;
  }
  bindIndex(index, interval);
});

function bindIndex(index, interval = null) {
  imageDisplay.src = imgArray[index];
  if (interval) {
    clearInterval(interval);
    switchImage();
  }
}

imageDisplay.addEventListener("dblclick", deleteImg);

function deleteImg(e) {
  const answer = confirm("Are you sure you want to delete this image?");
  if (answer) {
    imgArray = imgArray.filter((img) => img !== e.target.src);
    if (imgArray.length === 1 || index >= imgArray.length - 1) {
      index = 0;
    }
    bindIndex(index, interval);
  }
}

// -------------- Table rows ---------------
const addRowBtn = document.querySelector(".add-row");
const tableBody = document.getElementById("tbody");

let rowIdsGenerator = 0;
let inputIdsGenerator = 0;
let fieldInEdit = false;
const editedFieldValue = {
  element: null,
  value: "",
};

function editInput(tdElement) {
  if (fieldInEdit) {
    return alert("Complete opened input");
  }
  fieldInEdit = true;
  const defaultValue = tdElement.innerText;
  editedFieldValue.element = tdElement;
  editedFieldValue.value = defaultValue;
  ++inputIdsGenerator;
  tdElement.innerHTML = `<input id="input-${inputIdsGenerator}"
     type="text"
     value="${defaultValue}"
     oninput="assignValue(this)" />
    `;

  document.getElementById(`input-${inputIdsGenerator}`).focus();
}

function assignValue(input) {
  editedFieldValue.value = input.value;
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && fieldInEdit) {
    fieldInEdit = false;
    editedFieldValue.element.innerHTML = editedFieldValue.value;
    editedFieldValue.value = "";
  }
});

const createRow = () => {
  const tr = document.createElement("tr");
  ++rowIdsGenerator;
  tr.id = `row-${rowIdsGenerator}`;
  tr.innerHTML = `
            <td id="name-${rowIdsGenerator}" ondblclick="editInput(this)">Name ${rowIdsGenerator}</td>
            <td id="surname-${rowIdsGenerator}" ondblclick="editInput(this)">Surname ${rowIdsGenerator}</td>
            <td class="icon-wrapper">
              <img
               id="delete-${rowIdsGenerator}"
               class="delete-icon"
               src="./images/delete.png" 
               alt="delete" 
               onclick="deleteRow(this.id)"/>
            </td>
          `;
  return tr;
};

const deleteRow = (btnId) => {
  const id = btnId.split("-")[1];
  document.getElementById(`row-${id}`).remove();
};

function appendNewTr() {
  tableBody.append(createRow());
}

appendNewTr();

addRowBtn.addEventListener("click", appendNewTr);
