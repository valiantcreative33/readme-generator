// creates table of contents
populateContents = contentsArr => {

  let contentsList = ''

  contentsArr.forEach(item => {
      contentsList += `* [${item}](#${item.toLowerCase().split(' ').join('-')})
`
  })

  return contentsList;
}


// function to generate markdown for README
function generateMarkdown(data) {

  return `# ${data.title}
## Description
${data.description}
## Contents
${populateContents(data.contents)}
`;
}

module.exports = generateMarkdown;
