function checkSSL() {
    var domain = document.getElementById("domainInput").value;
    if (domain.trim() === "") {
        alert("Please enter a domain.");
        return;
    }
    
    fetchSSLInfo(domain)
        .then(function(result) {
            if (result.hasOwnProperty("Error")) {
                document.getElementById("sslInfo").innerHTML = "Error: " + result.Error;
            } else {
                var sslInfoHTML = "<h2>SSL Certificate Information for " + domain + "</h2>";
                sslInfoHTML += "<p><strong>Common Name:</strong> " + result["Common Name"] + "</p>";
                sslInfoHTML += "<p><strong>Issuer:</strong> " + result["Issuer"] + "</p>";
                sslInfoHTML += "<p><strong>Issued On:</strong> " + result["Issued On"] + "</p>";
                sslInfoHTML += "<p><strong>Expires On:</strong> " + result["Expires On"] + "</p>";
                sslInfoHTML += "<p><strong>Days Until Expiry:</strong> " + result["Days Until Expiry"] + "</p>";
                document.getElementById("sslInfo").innerHTML = sslInfoHTML;
            }
        });
}

async function fetchSSLInfo(domain) {
    const response = await fetch("/ssl_info?domain=" + encodeURIComponent(domain));
    return await response.json();
}
