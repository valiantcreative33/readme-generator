const inquirer = require("inquirer");

// array of questions for user
const questions = [

    {
        type: 'input',
        name: 'name',
        message: 'Please provide a project name.  (Required)',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please provide a project name!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Provide a description of your application.  (Required)',
        validate: descInput => {
            if (descInput) {
                return true;
            } else {
                console.log('Please enter a description!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'link',
        message: 'Please provide a link to your deployed application.  (Required)',
        validate: linkInput => {
            if (linkInput) {
                return true;
            } else {
                console.log('Please provide a link!');
                return false;
            }
        }
    },
    {
        type: 'confirm', 
        name: 'confirmInstall',
        message: 'Would you like to include an Installation section?',
        default: true
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Please provide installation instructions.',
        when: ({ confirmInstall }) => {
            if (confirmInstall) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Please provide information for using your application. (Required)',
        validate: usageInput => {
            if (usageInput) {
                return true;
            } else {
                console.log('Please include usage information!');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmScreenshot',
        message: 'Include screenshots in your Usage section? (If yes, you will be prompted for more info later.)',
        default: true
    },
    { 
        type: 'confirm',
        name: 'confirmLicense',
        message: 'Would you like to include a License section?',
        default: true
    }, 
    {
        type: 'input',
        name: 'usage',
        message: 'Please provide license information.',
        when: ({ confirmLicense }) => {
            if (confirmLicense) {
                return true;
            } else {
                return false;
            }
        }
    }, 
    {
        type: 'confirm',
        name: 'confirmContributing',
        message: 'Would you like to include a Contributions section?',
        default: true
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Please enter your guidelines for contributing.',
        when: ({ confirmContributing }) => {
            if (confirmContributing) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmTests',
        message: 'Would you like to include a Tests section?',
        default: true
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Please enter tests for your application.',
        when: ({ confirmTests }) => {
            if (confirmTests) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmQuestions',
        message: 'Would you like to include a Questions section?',
        default: true
    },
    {
        type: 'input',
        name: 'questions',
        message: 'Please enter your questions.',
        when: ({ confirmQuestions }) => {
            if (confirmQuestions) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmCredits',
        message: 'Would you like to include a Credits section?',
        default: true
    }
];

addScreenshots = readmeData => {

    if (!readmeData.screenshots) {
        readmeData.screenshots = [];
    }

    console.log(`
==================
Add New Screenshot
==================
    `);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'screenshotLink',
            message: 'Please provide a link for your screenshot. (Required)',
            validate: screenshotLinkInput => {
                if (screenshotLinkInput) {
                    return true;
                } else {
                    console.log('Please provide a link for your screenshot!')
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'screenshotAlt',
            message: 'Please provide alt text for your screenshot. (Required)',
            validate: screenshotAltInput => {
                if (screenshotAltInput) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'screenshotDesc',
            message: 'Please provide a description of your screenshot.'
        },
        {
            type: 'confirm',
            name: 'confirmAddScreenshot',
            message: 'Would you like to add another screenshot?',
            default: false
        }
    ])
    .then(screenshotData => {
        readmeData.screenshots.push(screenshotData);

        if (screenshotData.confirmAddScreenshot) {
            return addScreenshots(readmeData);
        } else {
            return readmeData;
        };
    });
};

addCredits = readmeInfo => {

    if (!readmeInfo.credits) {
        readmeInfo.credits = [];
    }

    console.log(`
==============
Add New Credit
==============
    `);

    return inquirer.prompt([
        {
            type: 'input',
            name: 'creditName',
            message: 'Please enter the name for the credit. (Required)',
            validate: creditName => {
                if (creditName) {
                    return true;
                } else {
                    console.log('Please enter a name for the credit!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'creditLink',
            message: 'Please enter a link for the credit.  (Required)',
            validate: creditLink => {
                if (creditLink) {
                    return true;
                } else {
                    console.log('Please enter a link for the credit!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAddCredit',
            message: 'Would you like to add another credit?',
            default: false
        }
    ])
    .then(creditData => {
        readmeInfo.credits.push(creditData);

        if (creditData.confirmAddCredit) {
            return addCredit(readmeInfo);
        } else {
            return readmeInfo;
        }
    })
}

// function to write README file
function writeToFile(fileName, data) {
}

// function to initialize program
function init() {

    return inquirer.prompt(questions);
}

// function call to initialize program
init()
    .then(userResponse => { 
        if (userResponse.confirmScreenshot) {
            addScreenshots(userResponse);
        }
    })
    .then(response => {
        console.log(response)
        // if (response.confirmCredits) {
        //     addCredits(response);
        // }
    })
    .catch(err => {
        console.log(err);
});

// Write a conditional for filling out Table of Contents (after description)!!

// WHEN I enter my project title

// THEN this is displayed as the title of the README

// WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions

// THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests

// WHEN I choose a license for my application from a list of options

// THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under

// WHEN I enter my GitHub username

// THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile

// WHEN I enter my email address

// THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions

// WHEN I click on the links in the Table of Contents

// THEN I am taken to the corresponding section of the README
