if (localStorage.getItem("cobalt-token") == null && localStorage.getItem("cobalt-username") == null) {
    console.log(localStorage.getItem("cobalt-token"))
    console.log(localStorage.getItem("cobalt-username"))
    window.location.href = "/login";
} 
fetch("http://127.0.0.1:8081/check", {
    method: "POST",
    body: JSON.stringify({ username: localStorage.getItem("cobalt-username"), token: localStorage.getItem("cobalt-token") }),
    headers: {
        "Content-Type": "application/json"
    }
}).then(res => res.json()).then(n => {
    console.log("exists? ", n.exists);
    if (!n.exists) {
        window.location.href = "/login";
    }
});


function loadFeed() {
    
}

window.onload = loadFeed;

function logout() {
    localStorage.clear();
    window.location.href = "/login";
}
