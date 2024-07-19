const CACHE_NAME = "version3";
const cache_array = [];
const fetchFirstList = ["/static/js/bundle.js"];

this.addEventListener("install", (event) => {
  //console.log("installing");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(cache_array);
    })
  );
});

this.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (fetchFirstList.includes(url.pathname)) {
    fetchFirst(event);
  } else {
    cacheFirst(event);
  }
});

this.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

function fetchFirst(event) {
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return fetch(event.request)
        .then((response) => {
          if (response) {
            cache.put(event.request, response.clone());
            //console.log("---from network", event.request.url);
            return response;
          }
        })
        .catch((err) => {
          //console.log("from cache", event.request.url);
          return caches.match(event.request);
        });
    })
  );
}

const cacheFirst = (event) => {
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((response) => {
        if (response) {
          //console.log("from cache", event.request.url);
          return response;
        }

        //console.log("---from network", event.request.url);
        return fetch(event.request)
          .then((response) => {
            cache.put(event.request, response.clone());
            return response;
          })
          .catch((err) => {
            return console.log(err);
          });
      });
    })
  );
};
