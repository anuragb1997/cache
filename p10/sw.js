self.addEventListener("install", (e) => {
    console.log("installed");
    // creating a cache storage and adding all the files required for the web page to run even when it’s offline
    caches.open("stock").then((cache) => {
    cache.add("/");
    cache.add("./assets/logo.ico");
    cache.add("./assets/logo.png");
    cache.add("./data.json");
    cache.add("./index.html");
    cache.add("./manifest.json");
    cache.add("./sw.js");
    })
    .catch((err) => {
    console.log(err);
    });
    })
    self.addEventListener("activate", (e) => {
    console.log("activated");
    })
    self.addEventListener("fetch", (e) => {
    console.log("fetched");
    // intercepting every fetch request and responding from the cache whenit’s offline
    e.respondWith(
    // checking if requested data is present in the cache
    caches.match(e.request) .then((res) => {
    // respond from cache when fetch function doesn’t return any response(i.e, the system is offline)
    return res || fetch(e.request);
    })
    .catch((err) => {
    console.log(err);
    })
    );
    })