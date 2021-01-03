// helper function to capitalize first letter of each word
capFirstLetters = (string) => {
    return string
        .toLowerCase()
        .split(" ")
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ");
};
// creates license badge if license is chosen
addLicenseBadge = (license) => {
    if (license) {
        return `![${license} License](https://img.shields.io/badge/license-${license
        .split(" ")
        .join("%20")}-brightgreen)
`;
    } else {
        return "";
    }
};
// creates description section
createDescription = (title, description, link) => {
    if (link) {
        return `${description}
            
View the deployed page at [${capFirstLetters(title)}](${link}).`;
    } else {
        return `${description}`;
    }
};
// creates table of contents
createTableOfContents = (contentsArr) => {
    // removes 'Deployed Application' from table of contents
    const indexOfDeployedApp = contentsArr.indexOf("Deployed Application");
    if (indexOfDeployedApp > -1) {
        contentsArr.splice(indexOfDeployedApp, 1);
    }
    // creates contents list items based on user selection
    let contentsList = "";
    contentsArr.forEach((item) => {
        // indents 'Screenshots' list item
        if (item === "Screenshots") {
        contentsList += `   * [${item}](#${item})
`;
        } else {
        contentsList += `* [${item}](#${item})
`;
        }
    });
    return contentsList;
};
// creates screenshot section
createScreenshots = (screenshotItem) => {
    let allScreenshots = "";
    if (screenshotItem) {
        screenshotItem.forEach((shot) => {
        allScreenshots += `![${shot.screenshotAlt}](${shot.screenshotLink})
${shot.screenshotDesc}
`;
    });
    return `
    
### Screenshots
${allScreenshots}`;
    } else {
        return '';
    }
};
// creates usage section
createUsage = (usage, screenshots) => {
    if (usage) {
        return `${usage} ${createScreenshots(screenshots)}`
    } else {
        return '';
    }
}
// creates license section
createLicense = (license) => {
    if (license) {
        return `This application is licensed under the ${license} license.`;
    } else {
        return '';
    }
};
// creates questions section
createQuestions = (email, github, repo) => {
    if (email) {
        return `If you have any questions about the repo, please [open an issue](https://github.com/${github}/${repo}/issues) or contact me via ${email}. You can find more of my work on my GitHub, [${github}](https://github.com/${github}/).`
    } else {
        return '';
    }
}
// creates credits section
createCredits = creditItem => {
    let allCredits = "";
    if (creditItem) {
        creditItem.forEach((credit) => {
        allCredits += `* [${credit.creditName}](${credit.creditLink})
`;
        });
        return `${allCredits}`;
    } else {
        return "";
    }
};
// function to generate markdown for README
function generateMarkdown(data) {
    let readmeContents = "";
    const sectionArr = [
        {
            h2: "Description",
            content: createDescription(data.title, data.description, data.link)
        },
        {
            h2: "Contents",
            content: createTableOfContents(data.contents)
        },
        {
            h2: "Installation",
            content: data.installation
        },
        {
            h2: "Usage",
            content: createUsage(data.usage, data.screenshot)
        },
        {
            h2: "License",
            content: createLicense(data.license)
        },
        {
            h2: "Contributing", 
            content: data.contributing 
        },
        {
            h2: "Tests",
            content: data.tests
        },
        {
            h2: "Questions",
            content: createQuestions(data.questions, data.github, data.repo)
        },
        {
            h2: "Credits",
            content: createCredits(data.credits)
        },
    ];

    // adds each README section if contents for the section exists
    sectionArr.forEach((sectionItem) => {
        if (sectionItem.content) {
        readmeContents += `## ${sectionItem.h2}
${sectionItem.content}
    
`;
        }
    });
    return `# ${capFirstLetters(data.title)}
[![Issues](https://img.shields.io/github/issues/${data.github}/${
    data.repo
  })](https://github.com/${data.github}/${
    data.repo
  }/issues) [![Issues](https://img.shields.io/github/contributors/${
    data.github
  }/${data.repo})](https://github.com/${data.github}/${
    data.repo
  }/graphs/contributors) ${addLicenseBadge(data.license)}
  
${readmeContents}`;
}

module.exports = generateMarkdown;
