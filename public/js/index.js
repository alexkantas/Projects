const loader = document.getElementById('loader');
fetch(projectsURL).then(r => r.json()).then(loadProjects)
    .catch(r => {
        loader.setAttribute('class', 'errorMessage');
        loader.innerHTML = '<h2>Cannot load projects list...</h2><h3>Please try again!</h3>'
    });
let app;
function loadProjects(projects) {
    loader.removeAttribute('class');

    projects = projects.map(p => { p.listVisible = false; return p });
    let tagsSet = new Set(["CSS", "JavaScript"]);
    let tags = [];

    app = new Vue({
        el: 'main',
        data: { projects, tags },
        methods: {
            toggleList(project) {
                project.listVisible = !project.listVisible;
            }
        }
    })

    // projects.forEach(project => {
    //     project.order = Math.round(Math.random()*10);
    // });

    // setInterval(a=>{
    //     projects = projects.sort((a, b) => a.order - b.order);
    //     console.log(projects);
    //     projects.forEach(project => {
    //         project.order = Math.round(Math.random()*10);
    //     });
    // },10000);

    tagsSet.add("CSS").add("PHP").add("SQL").add("JAVA").add("FlexBox").add("CSS Grid");
    tagArray = Array.from(tagsSet).map(t => { return { name: t, selected: false } })
    Vue.set(app, 'tags', tagArray);
    console.log(tags);
}

// Vue.component('apithano',{
//     template:"<li>This is awesome <slot></slot>!!!!</li>"
// })

// new Vue({
//     el: '.coollist'
//   })