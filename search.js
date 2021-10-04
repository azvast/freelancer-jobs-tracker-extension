const delay = (duration) => new Promise(resolve => setTimeout(resolve, duration));

const REMAINING_TIME = 10000;
const REFRESH_TIME = 2000;
const MAIN_SKILLS = ['PHP', 'HTML', 'JavaScript', 'Python', 'SEO', 'C# Programming', 'Node.js', 'React.js', 'Laravel', 'Web Scraping', 'AngularJS', 'Blockchain', 'Django', 'Ethereum', 'Full Stack Development', 'ASP.NET', 'Vue.js', 'Express JS', 'React.js Framework', 'Google Firebase', 'Typescript', 'Bitcoin', 'MongoDB', 'Solidity', 'Angular', 'AJAX', 'Frontend Development', 'RESTful API', '.NET Core', 'RESTful', 'Redux.js', 'Vue.js Framework', 'Angular Material', 'Three.js', 'ASP.NET MVC', 'ASP', 'WPF', 'Socket IO', 'Dthreejs', 'XAML', 'RxJS'];
const MAIN_SCORE = 4.5;

function filterSkills(skills = []) {
    for ( skill of skills ) {
        if ( MAIN_SKILLS.includes(skill) ) { 
            return true;
        }
    }
    return false;
}

window.onload = async function() { 
    var refreshButton, projects, title, budget, date, skills, score, url, numBudget, isFirst = true;
    
    var visited = localStorage.getItem('free');
    if (!visited) visited = [];
    else visited = JSON.parse(visited);

    first: while(1) {

        if (!isFirst) {
            refreshButton = document.querySelector('fl-floating-action') || document.querySelector('fl-card-header-title fl-link button');
            if (refreshButton) {
                refreshButton.click();
                await delay(REFRESH_TIME);
            } else {
                await delay(REMAINING_TIME);
                continue first;
            }
        }

        projects = document.querySelectorAll('fl-list-item.ng-star-inserted');

        for(project of projects) {
            title = project.querySelector('.Project-title')?.innerText;
            if (!title) {
                await delay(REFRESH_TIME);
                continue first; 
            }

            if (visited.includes(title)) { continue first; }

            budget = project.querySelector('.Project-budget').innerText;
            date = project.querySelector('.Project-date').innerText;
            skills = project.querySelector('.Project-details .Skills').innerText.split('\n');
            score = project.querySelector('.ValueBlock').innerText;
            url = project.querySelector('a').href;

            if (parseFloat(score) <= MAIN_SCORE) { continue; }
            if (!filterSkills(skills)) { continue; }
            if (budget.includes('INR')) { continue; }
            visited.push(title);

            // budget
            numBudget = parseInt( budget.split('–')[0].slice(1) );
            if (numBudget < 30 && !budget.includes('per hour')) { continue; }

            chrome.runtime.sendMessage({ action: "newPage", url: url });
        }

        localStorage.setItem('free', JSON.stringify(visited));

        isFirst = false;
        await delay(REMAINING_TIME);
    }
}