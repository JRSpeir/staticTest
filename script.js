function processXML() {
  //   var xml = jQuery.parseXML(document.getElementById("xmlInput").value),
  //     xmlDoc = $.parseXML(xml),
  //     $xml = $(xmlDoc),
  //     $title = $xml.find("title");
  // var xml =
  //   '<?xml version="1.0" encoding="UTF-8"?><catalog><cd><title>Empire Burlesque</title><artist>Bob Dylan</artist><country>USA</country><company>Columbia</company><price>10.90</price><year>1985</year></cd><cd><title>Hide your heart</title><artist>Bonnie Tyler</artist><country>UK</country><company>CBS Records</company><price>9.90</price><year>1988</year></cd></catalog>';
  // var xsl =
  //   '<?xml version="1.0" encoding="UTF-8"?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"><xsl:template match="/"><html><body><h2>My CD Collection</h2><table border="1"><tr bgcolor="#9acd32"><th>Title</th><th>Artist</th></tr><xsl:for-each select="catalog/cd"><tr><td>.</td><td>.</td></tr></xsl:for-each></table></body></html></xsl:template></xsl:stylesheet>';
  // let fragxml = document.createRange().createContextualFragment(xml);
  // let fragxsl = document.createRange().createContextualFragment(xsl);
  // xsltProcesser = new XSLTProcessor();
  // xsltProcesser.importStylesheet(fragxsl);
  // result = xsltProcesser.transformToFragment(fragxml, document);
  // document.getElementById("log").appendChild(result);

  const url =
    "https://tranquil-reef-45632.herokuapp.com/api/v1/xslttransform/encoded";
  const data = {
    xml: {
      details:
        "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48Y2F0YWxvZz48Y2Q+PHRpdGxlPkVtcGlyZSBCdXJsZXNxdWU8L3RpdGxlPjxhcnRpc3Q+Qm9iIER5bGFuPC9hcnRpc3Q+PGNvdW50cnk+VVNBPC9jb3VudHJ5Pjxjb21wYW55PkNvbHVtYmlhPC9jb21wYW55PjxwcmljZT4xMC45MDwvcHJpY2U+PHllYXI+MTk4NTwveWVhcj48L2NkPjxjZD48dGl0bGU+SGlkZSB5b3VyIGhlYXJ0PC90aXRsZT48YXJ0aXN0PkJvbm5pZSBUeWxlcjwvYXJ0aXN0Pjxjb3VudHJ5PlVLPC9jb3VudHJ5Pjxjb21wYW55PkNCUyBSZWNvcmRzPC9jb21wYW55PjxwcmljZT45LjkwPC9wcmljZT48eWVhcj4xOTg4PC95ZWFyPjwvY2Q+PC9jYXRhbG9nPg==",
      encoding: "base64",
    },
    xslt: {
      details:
        "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48eHNsOnN0eWxlc2hlZXQgdmVyc2lvbj0iMS4wIiB4bWxuczp4c2w9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvWFNML1RyYW5zZm9ybSI+PHhzbDp0ZW1wbGF0ZSBtYXRjaD0iLyI+PGh0bWw+PGJvZHk+PGgyPk15IENEIENvbGxlY3Rpb248L2gyPjx0YWJsZSBib3JkZXI9IjEiPjx0ciBiZ2NvbG9yPSIjOWFjZDMyIj48dGg+VGl0bGU8L3RoPjx0aD5BcnRpc3Q8L3RoPjwvdHI+PHhzbDpmb3ItZWFjaCBzZWxlY3Q9ImNhdGFsb2cvY2QiPjx0cj48dGQ+LjwvdGQ+PHRkPi48L3RkPjwvdHI+PC94c2w6Zm9yLWVhY2g+PC90YWJsZT48L2JvZHk+PC9odG1sPjwveHNsOnRlbXBsYXRlPjwveHNsOnN0eWxlc2hlZXQ+",
      encoding: "base64",
    },
  };

  const fetchParam = {
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
    method: "POST",
  };

  fetch(url, fetchParam)
    .then((data) => {
      return data.json();
    })
    .then((res) => {
      document.getElementById("log").innerHTML = vkbeautify.xml(res.result, 5);
    })
    .catch((error) => console.log(error));
}

processXML();
