let app = new Vue({
    el: '#main',
    data: {
        projects:[],
        loader:true,
        msg:'Loading Projects...'
    },
    created(){
        fetch(projectsURL).then(r => r.json()).then(projects=>{
            this.projects = projects.map(p => { p.listVisible = false; return p });
            this.loader = false;
        })
        .catch(r => {
            this.msg='Cannot load projects list...Please try again!';
            this.loader = true;
        });
    },
    mounted(){
    },
    methods: {
        toggleList(project) {
            project.listVisible = !project.listVisible;
        }
    }
});
