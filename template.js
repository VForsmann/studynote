function getHeading(node, name) {
  const entries = node.getAttributes().attribute_entries;
  if(!entries) return;
  const entrie = entries.find(e => e.name === name);
  if(!entrie) {
    return;
  }
  return entrie.value;
}

function renderHeading(ebene, wert) {
  return wert ? `<div class=${ebene}>${wert}</div>` : ``;
}

function renderHeadings(node) {
  const ebene1 = getHeading(node, "ebene1");
  const ebene2 = getHeading(node, "ebene2");
  const ebene3 = getHeading(node, "ebene3");
  return `
  <div class="headings">
    ${renderHeading("ebene1", ebene1)}
    ${renderHeading("ebene2", ebene2)}
    ${renderHeading("ebene3", ebene3)}
  </div>
  `
}



module.exports = {
  paragraph: (node) => `<p class="paragraph">${node.getContent()}</p>`,
  page_break: (node) => console.log(node),
  section: (node) => {
    console.log(node)
    if(node.level === 1) {
      return `
        <section class="chapter">
        <div class="section_outer_header">
          <div class="section_header">
            ${renderHeadings(node)}
          </div>
          <img class="section_logo" src="${node.parent.getAttribute("hochschul_logo")}"></img>
          </div>
          <div class="inner_content">
          ${node.getContent()}
          </div>

        </section>`
    } else if(node.level === 2) {
      return `
      <div class="themenblock">
      <h3>${node.getTitle()}</h3>
      <div class="inner_themenblock">${node.getContent()}</div>
      </div>`
    } else {
      console.log("unclear section")
    }
    
  },

  document: (node) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <link href="./studynote/studynote.css" rel="stylesheet">
  </head>
  <body>
    <div id="cover">
      <img class="cover_logo" src="${node.getAttribute("hochschul_logo")}"></img>
      <hr>
      <h1>${node.getDocumentTitle()}</h1>
      <h2>von <a href="${node.getAttribute("github")}">${node.getDocument().getAuthor()}</a></h2>
      <h2>${node.getAttribute("studiengang")}</h2>
      <h2>${node.getAttribute("hochschule")}</h2>
      <h2>Semester ${node.getAttribute("semester")}</h2>
    </div>
  <div class="content">
    ${node.getContent()}
  </div>
  </body>`,
  image: (node) => `<img class="image ${node.getRoles().join(' ')}" src="${node.getImageUri(node.getAttribute('target'))}"/>`
}
