document.addEventListener("DOMContentLoaded", () => {

  async function loadSpaTowns() {
    const response = await fetch("data/towns.json");
    const towns = await response.json();

    const map = L.map("map").setView([48, 10], 4);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);
    const markers = L.layerGroup().addTo(map);

    function updateMap(filteredTowns) {
      markers.clearLayers();
      const bounds = [];
      filteredTowns.forEach(t => {
        if (t.Latitude && t.Longitude) {
          const marker = L.marker([t.Latitude, t.Longitude]);
          marker.bindPopup(`<b>${t.Name}</b><br>${t.Type || ""}<br>${t.Country || ""}`);
          marker.addTo(markers);
          bounds.push([t.Latitude, t.Longitude]);
        }
      });
      if (bounds.length) map.fitBounds(bounds, { padding: [50,50] });
    }

    function displayTable(filteredTowns) {
      const tbody = document.querySelector("#spa-table tbody");
      tbody.innerHTML = "";
      filteredTowns.forEach(t => {
        const row = `<tr>
          <td>${t.Name}</td>
          <td>${t.Alternative_Names || ""}</td>
          <td>${t.Country || ""}</td>
          <td>${t.Type || ""}</td>
          <td>${t.List_Availability || ""}</td>
          <td>${t.Link || ""}</td>
          <td>${t.Progress || ""}</td>
        </tr>`;
        tbody.insertAdjacentHTML("beforeend", row);
      });
      const totalDiv = document.getElementById("total-count");
      totalDiv.textContent = `Showing ${filteredTowns.length} spa towns`;
    }

    function filterTowns(term) {
      term = term.toLowerCase();
      return towns.filter(t =>
        ["Name","Alternative_Names","Country","Type","List_Availability","Progress","Link"]
        .some(key => t[key] && t[key].toLowerCase().includes(term))
      );
    }

    displayTable(towns);
    updateMap(towns);

    const input = document.getElementById("search");
    if(input){
      input.addEventListener("input", debounce(e => {
        const filtered = filterTowns(e.target.value);
        displayTable(filtered);
        updateMap(filtered);
      }, 300));
    }

    const headers = document.querySelectorAll("#spa-table th");
    headers.forEach((th, index) => {
      th.addEventListener("click", () => {
        const sorted = [...document.querySelectorAll("#spa-table tbody tr")];
        const ascending = !th.classList.contains("asc");
        th.classList.toggle("asc", ascending);
        th.classList.toggle("desc", !ascending);

        sorted.sort((a,b) => {
          const cellA = a.children[index].textContent.toLowerCase();
          const cellB = b.children[index].textContent.toLowerCase();
          if(cellA < cellB) return ascending?-1:1;
          if(cellA > cellB) return ascending?1:-1;
          return 0;
        });

        const tbody = document.querySelector("#spa-table tbody");
        tbody.innerHTML = "";
        sorted.forEach(row => tbody.appendChild(row));
      });
    });
  }

  loadSpaTowns();

  // Last updated
  async function showLastUpdated() {
    try {
      const res = await fetch("data/metadata.json");
      const data = await res.json();
      if (data.last_updated) {
        document.getElementById("last-updated").textContent =
          `Data last updated: ${data.last_updated}`;
      }
    } catch(err){
      console.warn("No last-updated info found.");
    }
  }
  showLastUpdated();

  // Back to top button
  const toTopBtn = document.getElementById("toTopBtn");
  if(toTopBtn){
    window.addEventListener("scroll", () => {
      toTopBtn.style.display = window.scrollY>750?"block":"none";
    });
    toTopBtn.addEventListener("click", () => {
      window.scrollTo({top:0, behavior:"smooth"});
    });
  }

  // Debounce helper
  function debounce(func, wait){
    let timeout;
    return function(...args){
      clearTimeout(timeout);
      timeout = setTimeout(()=>func.apply(this,args), wait);
    }
  }

});