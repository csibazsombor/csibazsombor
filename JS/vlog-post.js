    // Vlog posts data
    const vlogs = [
      {
        title: "example title",
        date: "example date",
        description: "example description",
        image: "example image",
        link: "example link"
      },

      // ➕ Add more vlog objects here
    ];

    // Insert posts dynamically
    const container = document.getElementById("vlog-container");

    // If we have vlogs, clear fallback and render them
    if (vlogs.length > 0) {
      container.innerHTML = "";

      vlogs.forEach(vlog => {
        const article = document.createElement("article");
        article.className = "travel-post vlog";

        article.innerHTML = `
          <div class="post-header toggle-btn">
            <h3>${vlog.title}</h3>
            <span class="badge badge-primary">${vlog.date}</span>
          </div>
          <div class="post-content hidden">
            <p>${vlog.description}</p>
            <img src="${vlog.image}" alt="${vlog.title}" style="width:100%;border-radius:12px;margin:15px 0;">
            <br>
            <a href="${vlog.link}" target="_blank" class="btn btn-primary">Watch on YouTube</a>
          </div>
        `;

        container.appendChild(article);
      });
    }

    // Expand / collapse logic
    document.addEventListener("click", (e) => {
      if (e.target.closest(".toggle-btn")) {
        const content = e.target.closest(".toggle-btn").nextElementSibling;
        content.classList.toggle("hidden");
      }
    });