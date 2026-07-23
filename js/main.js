/* =========================================================
   ACLPIT — shared data + rendering
   Edit the two arrays below to manage content site-wide.
   ========================================================= */

// ---------- Publications (edit/add here) ----------
const PUBLICATIONS = [
  {
    title: "Data Protection Enforcement in East Africa: A Comparative Review",
    tag: "Data Protection",
    date: "June 2026",
    type: "Research report",
    img: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800",
    link: "#"
  },
  {
    title: "Algorithmic Accountability in African Public Services",
    tag: "Artificial Intelligence",
    date: "May 2026",
    type: "Policy brief",
    img: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800",
    link: "#"
  },
  {
    title: "Digital Courts: Lessons from Justice Sector Modernisation",
    tag: "Digital Justice",
    date: "April 2026",
    type: "Working paper",
    img: "https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=800",
    link: "#"
  },
  {
    title: "Mobile Money and Consumer Protection: Closing the Regulatory Gaps",
    tag: "Fintech",
    date: "March 2026",
    type: "Research report",
    img: "https://images.pexels.com/photos/50987/money-card-business-credit-card-50987.jpeg?auto=compress&cs=tinysrgb&w=800",
    link: "#"
  },
  {
    title: "Blockchain for Land Registries: Promise, Pitfalls, and Practice",
    tag: "Blockchain",
    date: "February 2026",
    type: "Policy brief",
    img: "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=800",
    link: "#"
  },
  {
    title: "Internet Shutdowns and the Right to Expression in Digital Spaces",
    tag: "Digital Rights",
    date: "January 2026",
    type: "Advocacy paper",
    img: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800",
    link: "#"
  },
  {
    title: "Digital Identity Systems: Rights-Respecting Design for African States",
    tag: "Data Protection",
    date: "December 2025",
    type: "Research report",
    img: "https://images.pexels.com/photos/5474028/pexels-photo-5474028.jpeg?auto=compress&cs=tinysrgb&w=800",
    link: "#"
  },
  {
    title: "Regulating Digital Lending: A Framework for Responsible Fintech",
    tag: "Fintech",
    date: "November 2025",
    type: "Working paper",
    img: "https://images.pexels.com/photos/4386366/pexels-photo-4386366.jpeg?auto=compress&cs=tinysrgb&w=800",
    link: "#"
  },
  {
    title: "AI Governance in Africa: Mapping Emerging National Strategies",
    tag: "Artificial Intelligence",
    date: "October 2025",
    type: "Research report",
    img: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
    link: "#"
  }
];

// ---------- Legal dialogues: YouTube videos (edit/add here) ----------
// Replace each `youtubeId` with the real YouTube video ID
// (the part after watch?v= in the URL, e.g. https://www.youtube.com/watch?v=ABC123xyz → "ABC123xyz")
const DIALOGUES = [
  {
    youtubeId: "REPLACE_ID_1",
    title: "Data Protection in Practice: Enforcement Across African Jurisdictions",
    speaker: "Panel dialogue",
    date: "June 2026"
  },
  {
    youtubeId: "REPLACE_ID_2",
    title: "AI and the Courts: Can African Judiciaries Keep Pace?",
    speaker: "Fireside conversation",
    date: "May 2026"
  },
  {
    youtubeId: "REPLACE_ID_3",
    title: "Mobile Money Regulation and the Consumer",
    speaker: "Expert roundtable",
    date: "April 2026"
  },
  {
    youtubeId: "REPLACE_ID_4",
    title: "Digital Rights Litigation: Lessons from Recent Cases",
    speaker: "Panel dialogue",
    date: "March 2026"
  },
  {
    youtubeId: "REPLACE_ID_5",
    title: "Blockchain and Public Registries: Separating Hype from Utility",
    speaker: "Keynote & Q/A",
    date: "February 2026"
  },
  {
    youtubeId: "REPLACE_ID_6",
    title: "Internet Governance in Africa: Who Decides?",
    speaker: "Multi-stakeholder dialogue",
    date: "January 2026"
  }
];

// ---------- Renderers ----------
function pubCard(p) {
  return `
    <div class="col-md-6 col-lg-4 reveal" data-tag="${p.tag}">
      <article class="pub-card">
        <img src="${p.img}" alt="${p.title}" loading="lazy" />
        <div class="card-body">
          <span class="pub-tag">${p.tag}</span>
          <h3>${p.title}</h3>
          <p class="pub-meta mb-3">${p.type} · ${p.date}</p>
          <a href="${p.link}" class="pub-link">Read publication <i class="bi bi-arrow-right"></i></a>
        </div>
      </article>
    </div>`;
}

function videoCard(d) {
  const hasId = d.youtubeId && !d.youtubeId.startsWith("REPLACE");
  const media = hasId
    ? `<iframe src="https://www.youtube-nocookie.com/embed/${d.youtubeId}" title="${d.title}"
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
         allowfullscreen loading="lazy"></iframe>`
    : `<div class="d-flex flex-column align-items-center justify-content-center h-100 text-white">
         <i class="bi bi-play-circle" style="font-size:3.2rem;"></i>
         <small class="mt-2 opacity-75">Video coming soon</small>
       </div>`;
  return `
    <div class="col-md-6 reveal">
      <article class="video-card">
        <div class="ratio ratio-16x9">${media}</div>
        <div class="card-body">
          <h3>${d.title}</h3>
          <p class="pub-meta mb-0">${d.speaker} · ${d.date}</p>
        </div>
      </article>
    </div>`;
}

// ---------- Mount points ----------
const pubPreview = document.getElementById("pubPreview");
if (pubPreview) pubPreview.innerHTML = PUBLICATIONS.slice(0, 3).map(pubCard).join("");

const pubGrid = document.getElementById("pubGrid");
if (pubGrid) pubGrid.innerHTML = PUBLICATIONS.map(pubCard).join("");

const dialoguePreview = document.getElementById("dialoguePreview");
if (dialoguePreview) dialoguePreview.innerHTML = DIALOGUES.slice(0, 2).map(videoCard).join("");

const dialogueGrid = document.getElementById("dialogueGrid");
if (dialogueGrid) dialogueGrid.innerHTML = DIALOGUES.map(videoCard).join("");

// ---------- Publication filters (publications.html) ----------
const filterBar = document.getElementById("pubFilters");
if (filterBar && pubGrid) {
  const tags = ["All", ...new Set(PUBLICATIONS.map(p => p.tag))];
  filterBar.innerHTML = tags
    .map((t, i) => `<button class="filter-pill${i === 0 ? " active" : ""}" data-tag="${t}">${t}</button>`)
    .join("");

  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-pill");
    if (!btn) return;
    filterBar.querySelectorAll(".filter-pill").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const tag = btn.dataset.tag;
    pubGrid.querySelectorAll("[data-tag]").forEach(card => {
      card.classList.toggle("d-none", tag !== "All" && card.dataset.tag !== tag);
    });
  });
}

// ---------- Scroll reveal ----------
const observer = new IntersectionObserver(
  (entries) => entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); observer.unobserve(en.target); } }),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
