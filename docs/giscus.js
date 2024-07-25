window.$docsify.plugins = [].concat(window.$docsify.plugins, plugin);

function plugin(hook, vm) {
    const userOptions = vm.config.giscus;
    let path;

    hook.doneEach(() => {
        path = vm.route.path === "/" ? "/index" : vm.route.path;
        path = decodeURI(path.substr(1));
        const giscus = document.createElement("script");
        giscus.setAttribute("src", "https://giscus.app/client.js");
        giscus.setAttribute("data-repo", userOptions.repo);
        giscus.setAttribute("data-repo-id", userOptions.repoId);
        giscus.setAttribute("data-category", userOptions.category);
        giscus.setAttribute("data-category-id", userOptions.categoryId);
        giscus.setAttribute("data-mapping", "specific");
        giscus.setAttribute("data-term", path);
        giscus.setAttribute("data-reactions-enabled", userOptions.reactionsEnabled);
        giscus.setAttribute("data-emit-metadata", "0");
        giscus.setAttribute("data-input-position", userOptions.inputPosition);
        giscus.setAttribute("data-theme", userOptions.theme);
        giscus.setAttribute("data-lang", userOptions.lang);
        if (userOptions.loading) {
            giscus.setAttribute("data-loading", "lazy");
        }
        giscus.setAttribute("crossorigin", "anonymous");
        giscus.async = true;

        document.getElementById("main").appendChild(giscus);
        console.log(decodeURI(vm.route.path));
        setBackLink(decodeURI(vm.route.path));
    });

    function setBackLink(path) {
        const meta = document.createElement("meta");
        meta.name = "giscus:backlink";
        meta.content = location.origin + location.pathname + "#" + path; // TODO: Using the hash routerMode causes an issue.
        console.log(meta.content);
        document.getElementsByTagName("head")[0].appendChild(meta);
    }
}