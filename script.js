const start = Date.now() - 37000;
const timer = document.querySelector("#sessionTimer");
const moreButton = document.querySelector(".more-button");
const details = document.querySelector("#detailFacts");
const profileFields = document.querySelectorAll("[data-profile-field]");
const heroImage = document.querySelector("#heroImage");
const profileImage = document.querySelector("#profileImage");
const heroPreload = document.querySelector("#heroPreload");
const prototypeImage = "images/person-a.png";

const profiles = {
  a: {
    name: "Paul",
    age: "22",
    location: "Karlsruhe",
    relationship: "Vergeben",
    lastVisited: "www.fremdgehen.de",
    interests: "Fußball, Gaming, Fitness",
    heroImage: prototypeImage,
    profileImage: prototypeImage,
    alt: "Portrait von Paul mit QR-Code statt Gesicht"
  },
  b: {
    name: "Maya",
    age: "27",
    location: "Berlin",
    relationship: "Single",
    lastVisited: "www.kreditvergleich.de",
    interests: "Reisen, Politik, Yoga",
    heroImage: prototypeImage,
    profileImage: prototypeImage,
    alt: "Portrait von Maya mit QR-Code statt Gesicht"
  },
  c: {
    name: "Jonas",
    age: "34",
    location: "Hamburg",
    relationship: "Kompliziert",
    lastVisited: "www.therapie-finden.de",
    interests: "Finanzen, Dating, Gesundheit",
    heroImage: prototypeImage,
    profileImage: prototypeImage,
    alt: "Portrait von Jonas mit QR-Code statt Gesicht"
  }
};

function getProfileKey() {
  const params = new URLSearchParams(window.location.search);
  const direct = params.get("person") || params.get("profile") || params.get("persion");
  const typoValue = params.get("");
  const typoMatch = typoValue?.match(/(?:person|profile|persion)=([a-z])/i);
  const key = (direct || typoMatch?.[1] || "a").toLowerCase();

  return profiles[key] ? key : "a";
}

function applyProfile() {
  const profile = profiles[getProfileKey()];

  profileFields.forEach((field) => {
    const key = field.dataset.profileField;
    field.textContent = profile[key];
  });

  if (heroImage) {
    heroImage.src = profile.heroImage;
    heroImage.alt = profile.alt;
  }

  if (profileImage) {
    profileImage.src = profile.profileImage;
  }

  if (heroPreload) {
    heroPreload.href = profile.heroImage;
  }
}

function renderTimer() {
  if (!timer) return;
  const elapsed = Math.floor((Date.now() - start) / 1000);
  const minutes = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const seconds = String(elapsed % 60).padStart(2, "0");
  timer.textContent = `${minutes}:${seconds} min`;
}

applyProfile();
renderTimer();
setInterval(renderTimer, 1000);

moreButton?.addEventListener("click", () => {
  const isExpanded = moreButton.getAttribute("aria-expanded") === "true";
  moreButton.setAttribute("aria-expanded", String(!isExpanded));
  details.hidden = isExpanded;
  moreButton.textContent = isExpanded ? "Mehr anzeigen" : "Weniger anzeigen";
});
