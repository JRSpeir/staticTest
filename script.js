//On submit button grab data from form

async function postFormDataAsJson({ url, formData }) {
  const plainFormData = Object.fromEntries(formData.entries());

  //Take plainFormDataAndEncrypt
  const xmlInput = plainFormData.xml;
  const xslInput = plainFormData.xslt;

  const xmlInputEncoded = btoa(xmlInput);
  const xslInputEncoded = btoa(xslInput);
  const data = {
    xml: {
      details: xmlInputEncoded,
      encoding: "base64",
    },
    xslt: {
      details: xslInputEncoded,
      encoding: "base64",
    },
  };

  const formDataJsonString = JSON.stringify(data);
  console.log(data);

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: formDataJsonString,
  };

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  return response.json();
}

async function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const url = form.action;

  try {
    const formData = new FormData(form);
    const responseData = await postFormDataAsJson({ url, formData });

    console.log(responseData.result);
    document.getElementById("log").innerHTML = vkbeautify.xml(
      responseData.result,
      5
    );
  } catch (error) {
    console.error(error);
  }
}
const form = document.getElementById("form");
form.addEventListener("submit", handleFormSubmit);

// processXML();

// function preProcessXML() {
//   const xmlInput = form.xmlInput.value;
//   const xslInput = form.xslInput.value;

//   const xmlInputEncoded = btoa(xmlInput);
//   const xslInputEncoded = btoa(xslInput);

//   const url =
//     "https://tranquil-reef-45632.herokuapp.com/api/v1/xslttransform/encoded";

//   const data = {
//     xml: {
//       details: xmlInputEncoded,
//       encoding: "base64",
//     },
//     xslt: {
//       details: xslInputEncoded,
//       encoding: "base64",
//     },
//   };

//   const fetchParam = {
//     headers: {
//       "content-type": "application/json",
//     },
//     body: JSON.stringify(data),
//     method: "POST",
//   };

//   fetch(url, fetchParam)
//     .then((data) => {
//       return data.json();
//     })
//     .then((res) => {
//       document.getElementById("log").innerHTML = vkbeautify.xml(res.result, 5);
//     })
//     .catch((error) => console.log(error));
// }
