//On submit button grab data from form

async function postFormDataAsJson({ url, formData }) {
  const plainFormData = Object.fromEntries(formData.entries());

  //Take plainFormDataAndEncrypt
  const xmlInput = plainFormData.xml;
  const xslInput = plainFormData.xslt;

  data =
    "--540af153-f51d-4c96-a16b-d44bf0dd7925\nContent-Type: text/xml; charset=UTF-8\nContent-Transfer-Encoding: binary\nContent-Id: <request>\n\n<soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>\n  <soap:Body>\n     <test:XSLTTest\n       xmlns:test='http://www.datapower.com/xslt-test'>\n      <Stylesheet href='cid:testxsl.xsl'/>\n      <XMLData href='cid:testxml.xml'/>\n    </test:XSLTTest>\n  </soap:Body>\n</soap:Envelope>\n--540af153-f51d-4c96-a16b-d44bf0dd7925\nContent-ID: <testxsl.xsl>\nContent-Type: text/xml\nContent-Transfer-Encoding: binary\n\n";

  data += xslInput;
  // data +=
  //   "<?xml version='1.0' encoding='UTF-8'?><xsl:stylesheet version='1.0' xmlns:xsl='http://www.w3.org/1999/XSL/Transform' xmlns:dp='http://www.datapower.com/extensions' extension-element-prefixes='dp'><xsl:template match='/'><dp:set-variable name='&quot;var://context/test/pad&quot;' value='1'/><test><xsl:value-of select='dp:variable(&quot;var://context/test/pad&quot;)'/></test><html><body><h2>My CD Collection</h2><table border='1'><tr bgcolor='#9acd32'><th>Title</th><th>Artist</th></tr><xsl:for-each select='catalog/cd'><tr><td>.</td><td>.</td></tr></xsl:for-each></table></body></html></xsl:template></xsl:stylesheet>";
  data += "\n";

  data +=
    "--540af153-f51d-4c96-a16b-d44bf0dd7925\nContent-ID: <testxml.xml>\nContent-Type: text/xml\nContent-Transfer-Encoding: binary\n\n";

  data += xmlInput;
  // data +=
  //   "<catalog><cd><title>Empire Burlesque</title><artist>Bob Dylan</artist><country>USA</country><company>Columbia</company><price>10.90</price><year>1985</year></cd><cd><title>Hide your heart</title><artist>Bonnie Tyler</artist><country>UK</country><company>CBS Records</company><price>9.90</price><year>1988</year></cd></catalog>";
  data += "\n--540af153-f51d-4c96-a16b-d44bf0dd7925--";

  console.log(`DATA:\n`, data);

  const fetchOptions = {
    method: "POST",
    body: data,
  };

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  return response.text();
}

async function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const url = form.action;

  try {
    const formData = new FormData(form);
    const responseData = await postFormDataAsJson({ url, formData });

    console.log(responseData);
    document.getElementById("log").innerHTML = vkbeautify.xml(responseData, 5);
  } catch (error) {
    console.error(error);
  }
}
const form = document.getElementById("form");
form.addEventListener("submit", handleFormSubmit);

// async function testReq() {
//   console.log("hello");
//   data =
//     "--540af153-f51d-4c96-a16b-d44bf0dd7925\nContent-Type: text/xml; charset=UTF-8\nContent-Transfer-Encoding: binary\nContent-Id: <request>\n\n<soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>\n  <soap:Body>\n     <test:XSLTTest\n       xmlns:test='http://www.datapower.com/xslt-test'>\n      <Stylesheet href='cid:testxsl.xsl'/>\n      <XMLData href='cid:testxml.xml'/>\n    </test:XSLTTest>\n  </soap:Body>\n</soap:Envelope>\n--540af153-f51d-4c96-a16b-d44bf0dd7925\nContent-ID: <testxsl.xsl>\nContent-Type: text/xml\nContent-Transfer-Encoding: binary\n\n";

//   data +=
//     "<?xml version='1.0' encoding='UTF-8'?><xsl:stylesheet version='1.0' xmlns:xsl='http://www.w3.org/1999/XSL/Transform' xmlns:dp='http://www.datapower.com/extensions'\nextension-element-prefixes='dp'><xsl:template match='/'><dp:set-variable name='&quot;var://context/test/pad&quot;' value='1'/><test><xsl:value-of select='dp:variable(&quot;var://context/test/pad&quot;)'/></test><html><body><h2>My CD Collection</h2><table border='1'><tr bgcolor='#9acd32'><th>Title</th><th>Artist</th></tr><xsl:for-each select='catalog/cd'><tr><td>.</td><td>.</td></tr></xsl:for-each></table></body></html></xsl:template></xsl:stylesheet>\n";

//   data +=
//     "--540af153-f51d-4c96-a16b-d44bf0dd7925\nContent-ID: <testxml.xml>\nContent-Type: text/xml\nContent-Transfer-Encoding: binary\n\n";

//   data +=
//     "<catalog><cd><title>Empire Burlesque</title><artist>Bob Dylan</artist><country>USA</country><company>Columbia</company><price>10.90</price><year>1985</year></cd><cd><title>Hide your heart</title><artist>Bonnie Tyler</artist><country>UK</country><company>CBS Records</company><price>9.90</price><year>1988</year></cd></catalog>\n--540af153-f51d-4c96-a16b-d44bf0dd7925--";

//   console.log(data);

//   const fetchOptions = {
//     method: "POST",
//     headers: {
//       "Content-Type":
//         'multipart/related; type="text/xml"; boundary="540af153-f51d-4c96-a16b-d44bf0dd7925"',
//       Accept: "application/json",
//     },
//     body: data,
//   };

//   url = "http://localhost:8080/127.0.0.1:8000";
//   const response = await fetch(url, fetchOptions).then((response) =>
//     response.text()
//   );

//   console.log(response);
// }
// testReq();

// // processXML();

// // function preProcessXML() {
// //   const xmlInput = form.xmlInput.value;
// //   const xslInput = form.xslInput.value;

// //   const xmlInputEncoded = btoa(xmlInput);
// //   const xslInputEncoded = btoa(xslInput);

// //   const url =
// //     "https://tranquil-reef-45632.herokuapp.com/api/v1/xslttransform/encoded";

// //   const data = {
// //     xml: {
// //       details: xmlInputEncoded,
// //       encoding: "base64",
// //     },
// //     xslt: {
// //       details: xslInputEncoded,
// //       encoding: "base64",
// //     },
// //   };

// //   const fetchParam = {
// //     headers: {
// //       "content-type": "application/json",
// //     },
// //     body: JSON.stringify(data),
// //     method: "POST",
// //   };

// //   fetch(url, fetchParam)
// //     .then((data) => {
// //       return data.json();
// //     })
// //     .then((res) => {
// //       document.getElementById("log").innerHTML = vkbeautify.xml(res.result, 5);
// //     })
// //     .catch((error) => console.log(error));
// // }
