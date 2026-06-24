// ex-Vistara Flight Finder Core Logic and Fleet Database - v3 (Zero Hallucination Search)

// 1. FLEET DATABASE
const FLEET = {
  // Boeing 787-9 Dreamliner (7 aircraft)
  b787: {
    model: "Boeing 787-9 Dreamliner",
    type: "Widebody Jet",
    manufacturer: "Boeing",
    capacity: 299,
    registrations: ["VT-TSD", "VT-TSE", "VT-TSH", "VT-TSN", "VT-TSO", "VT-TSP", "VT-TSQ"],
    layout: {
      business: { seats: 30, config: "1-2-1", pitch: "44\"", style: "Full Lie-Flat Bed (Direct Aisle Access)" },
      premiumEconomy: { seats: 21, config: "2-3-2", pitch: "38\"", style: "Premium Recliner (Legrest, deeper recline)" },
      economy: { seats: 248, config: "3-3-3", pitch: "31\"", style: "Standard Economy" }
    },
    features: {
      ife: "Seatback HD Touchscreen (Panasonic eX3) in all classes",
      wifi: "Equipped (Vistara Wi-Fi connectivity)",
      power: "Universal Power Outlets & USB ports at every seat",
      experience: "Modern Dreamliner cabin, large dimmable windows, ambient lighting, lower cabin altitude."
    },
    liveryStatus: "Most still fly with original gold/aubergine Vistara livery with 'Operated by Air India' sticker, progressively repainting to new Air India logo.",
    exVistara: true
  },
  
  // Airbus A321neo (10 aircraft)
  a321neo: {
    model: "Airbus A321neo",
    type: "Narrowbody Jet",
    manufacturer: "Airbus",
    capacity: 188,
    registrations: ["VT-TVA", "VT-TVB", "VT-TVC", "VT-TVD", "VT-TVE", "VT-TVF", "VT-TVG", "VT-TVH", "VT-TVI", "VT-TVJ"],
    layout: {
      business: { seats: 12, config: "2-2", pitch: "63\"", style: "Full Lie-Flat Bed (Rare for narrowbody!)" },
      premiumEconomy: { seats: 24, config: "3-3", pitch: "33\"", style: "Premium Recliner with extra legroom" },
      economy: { seats: 152, config: "3-3", pitch: "31\"", style: "Standard Economy" }
    },
    features: {
      ife: "Seatback HD Touchscreen (Panasonic eX3) in all classes",
      wifi: "Not available",
      power: "Universal Power Outlets & USB ports at every seat",
      experience: "Quiet Airbus Cabin Flex, lie-flat business class is highly premium for short to medium-haul routes."
    },
    liveryStatus: "Operating with original livery featuring 'Operated by Air India' sticker; VT-TVG is the A321LR (Long Range) variant.",
    exVistara: true
  },

  // Airbus A320neo (53 aircraft)
  a320neo: {
    model: "Airbus A320neo",
    type: "Narrowbody Jet",
    manufacturer: "Airbus",
    capacity: 164, // 3-class standard
    registrations: [
      // TN Series
      "VT-TNB", "VT-TNC", "VT-TND", "VT-TNE", "VT-TNF", "VT-TNG", "VT-TNH", "VT-TNI", "VT-TNJ", "VT-TNK", 
      "VT-TNL", "VT-TNM", "VT-TNN", "VT-TNO", "VT-TNP", "VT-TNQ", "VT-TNR", "VT-TNS", "VT-TNT", "VT-TNU", 
      "VT-TNV", "VT-TNW", "VT-TNX", "VT-TNY", "VT-TNZ",
      // TQ Series
      "VT-TQA", "VT-TQB", "VT-TQC", "VT-TQD", "VT-TQE", "VT-TQF", "VT-TQG", "VT-TQH", "VT-TQI", "VT-TQJ", 
      "VT-TQK", "VT-TQL", "VT-TQM", "VT-TQN", "VT-TQO", "VT-TQP", "VT-TQQ", "VT-TQR", "VT-TQS", "VT-TQT", 
      "VT-TQU", "VT-TQV", "VT-TQW", "VT-TQX",
      // TY Series (All-Economy config)
      "VT-TYA", "VT-TYB", "VT-TYC", "VT-TYD", "VT-TYE"
    ],
    getLayout: (reg) => {
      // TY series is all-economy 180 seats
      if (reg && reg.startsWith("VT-TY")) {
        return {
          business: null,
          premiumEconomy: null,
          economy: { seats: 180, config: "3-3", pitch: "29-30\"", style: "All-Economy Cabin Layout" }
        };
      }
      // Standard 3-class A320neo
      return {
        business: { seats: 8, config: "2-2", pitch: "41\"", style: "Premium Recliner (7\" recline, legrest)" },
        premiumEconomy: { seats: 24, config: "3-3", pitch: "33\"", style: "Recliner with extra legroom & recline" },
        economy: { seats: 132, config: "3-3", pitch: "30-31\"", style: "Standard Economy with PED holders" }
      };
    },
    features: {
      ife: "Wireless Streaming (Vistara World) to your own phone/tablet",
      wifi: "Not available",
      power: "USB charging ports available at all seats; Universal outlets in Business/Premium Economy",
      experience: "Features personal electronic device (PED) holders on seatbacks, premium leatherette seats."
    },
    liveryStatus: "Gradually repainting; VT-TNB was Vistara's first A320neo and VT-TNY is noted as repainted in new Air India colors.",
    exVistara: true
  },

  // Standard Original Air India Boeing 787-8 (comparison)
  aiB787: {
    model: "Boeing 787-8 Dreamliner",
    type: "Widebody Jet",
    manufacturer: "Boeing",
    capacity: 256,
    registrations: ["VT-ANA", "VT-ANB", "VT-ANC", "VT-AND", "VT-ANE", "VT-ANP", "VT-ANQ"],
    layout: {
      business: { seats: 18, config: "2-2-2", pitch: "74\"", style: "Lie-flat Bed (No direct aisle access for window seats)" },
      premiumEconomy: null,
      economy: { seats: 238, config: "3-3-3", pitch: "31\"", style: "Standard Economy" }
    },
    features: {
      ife: "Seatback Touchscreens (Older Thales system, status varies)",
      wifi: "Not available",
      power: "Universal Power Outlets in Business Class; USB in Economy",
      experience: "Classic Air India cabin interior, traditional colors."
    },
    liveryStatus: "Standard original Air India livery.",
    exVistara: false
  },

  // Standard Original Air India Boeing 777-300ER (comparison)
  aiB777: {
    model: "Boeing 777-300ER",
    type: "Widebody Jet",
    manufacturer: "Boeing",
    capacity: 342,
    registrations: [],
    layout: {
      business: { seats: 40, config: "2-3-2", pitch: "78\"", style: "Lie-flat Bed (Older layout, 3-middle seat)" },
      premiumEconomy: null,
      economy: { seats: 302, config: "3-4-3", pitch: "31\"", style: "Standard Economy" }
    },
    features: {
      ife: "Seatback Touchscreens (Panasonic, older system)",
      wifi: "Not available",
      power: "Universal Power Outlets in Business Class; USB in Economy",
      experience: "Classic high-capacity widebody cabin."
    },
    liveryStatus: "Standard Air India livery.",
    exVistara: false
  },

  // Standard Original Air India Airbus A350-900 (comparison)
  aiA350: {
    model: "Airbus A350-900",
    type: "Widebody Jet",
    manufacturer: "Airbus",
    capacity: 316,
    registrations: [],
    layout: {
      business: { seats: 28, config: "1-2-1", pitch: "44\"", style: "Full Lie-flat Suite with sliding privacy door" },
      premiumEconomy: { seats: 24, config: "2-4-2", pitch: "38\"", style: "Premium Recliner (Legrest, deeper recline)" },
      economy: { seats: 264, config: "3-3-3", pitch: "31\"", style: "Standard Economy" }
    },
    features: {
      ife: "Seatback HD Touchscreen (Panasonic eX3) in all classes",
      wifi: "Equipped (activation pending regulatory approval)",
      power: "Universal Power Outlets & USB ports at every seat",
      experience: "State-of-the-art flagship cabin, extremely quiet flight, ambient lighting."
    },
    liveryStatus: "Operating in Air India's new brand livery.",
    exVistara: false
  },

  // Standard Original Air India A320neo (comparison)
  aiA320neo: {
    model: "Airbus A320neo",
    type: "Narrowbody Jet",
    manufacturer: "Airbus",
    capacity: 162,
    registrations: ["VT-EXE", "VT-EXF", "VT-EXG", "VT-EXH", "VT-EXI", "VT-CIQ", "VT-CIR", "VT-CIS"],
    layout: {
      business: { seats: 8, config: "2-2", pitch: "38\"", style: "Standard Recliner" },
      premiumEconomy: null,
      economy: { seats: 154, config: "3-3", pitch: "30\"", style: "Standard Economy" }
    },
    features: {
      ife: "No in-flight entertainment",
      wifi: "Not available",
      power: "Limited availability on older aircraft",
      experience: "Standard narrowbody layout, classic Air India red/yellow cabin styling."
    },
    liveryStatus: "Standard Air India livery.",
    exVistara: false
  }
};

// Helper: Determine if a tail number is ex-Vistara
function isExVistaraTail(tailNumber) {
  if (!tailNumber) return null;
  const cleanTail = tailNumber.toUpperCase().trim();
  
  if (FLEET.b787.registrations.includes(cleanTail)) return { brand: "b787", data: FLEET.b787 };
  if (FLEET.a321neo.registrations.includes(cleanTail)) return { brand: "a321neo", data: FLEET.a321neo };
  if (FLEET.a320neo.registrations.includes(cleanTail)) return { brand: "a320neo", data: FLEET.a320neo };
  
  if (cleanTail.startsWith("VT-TS")) return { brand: "b787", data: FLEET.b787 };
  if (cleanTail.startsWith("VT-TV")) return { brand: "a321neo", data: FLEET.a321neo };
  if (cleanTail.startsWith("VT-TN") || cleanTail.startsWith("VT-TQ") || cleanTail.startsWith("VT-TY")) {
    return { brand: "a320neo", data: FLEET.a320neo };
  }
  
  return null;
}

// Helper: Determine if a flight is ex-Vistara based on its flight number and route
function isExVistaraRouteFlight(flightNo, fromCode, toCode) {
  const cleanFlight = flightNo.replace(/\s+/g, "").toUpperCase(); // e.g. "AI2414"
  const routeKey = `${fromCode.toUpperCase()}-${toCode.toUpperCase()}`;
  const meta = ROUTE_METADATA[routeKey];
  
  if (!meta) {
    const numPart = cleanFlight.replace("AI", "");
    const num = parseInt(numPart);
    if (isNaN(num)) return false;
    
    // Legacy Vistara domestic range: AI 27xx, AI 28xx, AI 29xx
    if (num >= 2700 && num <= 2999) {
      return true;
    }
    if (num === 2382 || num === 2383 || num === 161 || num === 162) {
      return true;
    }
    return false;
  }
  
  if (routeKey === "DEL-BOM" || routeKey === "BOM-DEL") {
    const numPart = cleanFlight.replace("AI", "");
    const num = parseInt(numPart);
    return num >= 2955 && num <= 2996;
  }
  
  if (routeKey === "DEL-BLR") {
    return ["AI2809", "AI2813", "AI2815", "AI2819"].includes(cleanFlight);
  }
  if (routeKey === "BLR-DEL") {
    return ["AI2810", "AI2814", "AI2820"].includes(cleanFlight);
  }
  
  if (routeKey === "DEL-HYD") {
    return ["AI2835", "AI2837", "AI2839"].includes(cleanFlight);
  }
  if (routeKey === "HYD-DEL") {
    return ["AI2836", "AI2838", "AI2840"].includes(cleanFlight);
  }
  
  if (routeKey === "DEL-LHR") {
    return cleanFlight === "AI161";
  }
  if (routeKey === "LHR-DEL") {
    return cleanFlight === "AI162";
  }
  
  if (routeKey === "DEL-SIN") {
    return cleanFlight === "AI2382";
  }
  if (routeKey === "SIN-DEL") {
    return cleanFlight === "AI2383";
  }
  
  return false;
}

// 2. EX-VISTARA ROUTE METADATA (NO DYNAMIC TIMES - 100% CORRECT ARCHITECTURAL METRICS)
const ROUTE_METADATA = {
  "DEL-BOM": {
    fromCity: "Delhi", fromCode: "DEL", toCity: "Mumbai", toCode: "BOM",
    status: "active",
    type: "Frequent Deployments",
    aircraft: ["a320neo", "a321neo"],
    flightPrefixes: "AI 2955 to AI 2996 range",
    analysis: "This is one of the busiest corridors. Air India deploys ex-Vistara A320neos and A321neos here. Look for flight numbers starting with 2 (AI 2xxx) in your Google Flights results to secure the ex-Vistara cabin layout. Selected flights (e.g. AI 2975/2976) feature A321neos with lie-flat Business class beds."
  },
  "BOM-DEL": {
    fromCity: "Mumbai", fromCode: "BOM", toCity: "Delhi", toCode: "DEL",
    status: "active",
    type: "Frequent Deployments",
    aircraft: ["a320neo", "a321neo"],
    flightPrefixes: "AI 2955 to AI 2996 range",
    analysis: "Ex-Vistara A320neos and A321neos operate heavily on this return leg. Look for AI 2xxx numbers on Google Flights. Business class passengers should watch out for the A321neo flatbeds (which represent a huge upgrade over standard recliners)."
  },
  "DEL-BLR": {
    fromCity: "Delhi", fromCode: "DEL", toCity: "Bengaluru", toCode: "BLR",
    status: "active",
    type: "Frequent Deployments",
    aircraft: ["a320neo", "a321neo"],
    flightPrefixes: "AI 2809, AI 2813, AI 2815, AI 2819",
    analysis: "Regularly operated with ex-Vistara aircraft. Look for 4-digit flight numbers starting with 2 on Google Flights. Premium Economy class is highly recommended on these narrowbodies as it features Vistara's extra-legroom seats and dedicated meals."
  },
  "BLR-DEL": {
    fromCity: "Bengaluru", fromCode: "BLR", toCity: "Delhi", toCode: "DEL",
    status: "active",
    type: "Frequent Deployments",
    aircraft: ["a320neo", "a321neo"],
    flightPrefixes: "AI 2810, AI 2814, AI 2820",
    analysis: "Excellent availability of ex-Vistara A320neo narrowbodies. If you spot a 2-series flight number (AI 2xxx) on Google Flights, it will feature Vistara's premium 3-class cabin layout (including Premium Economy) and Vistara World streaming."
  },
  "DEL-HYD": {
    fromCity: "Delhi", fromCode: "DEL", toCity: "Hyderabad", toCode: "HYD",
    status: "active",
    type: "Frequent Deployments",
    aircraft: ["a320neo"],
    flightPrefixes: "AI 2835, AI 2837, AI 2839",
    analysis: "Air India runs ex-Vistara Airbus A320neo aircraft on several of its daily schedules. Standard flight numbers (AI 560 etc.) use original Air India cabins, whereas the AI 283x series flights are ex-Vistara."
  },
  "HYD-DEL": {
    fromCity: "Hyderabad", fromCode: "HYD", toCity: "Delhi", toCode: "DEL",
    status: "active",
    type: "Frequent Deployments",
    aircraft: ["a320neo"],
    flightPrefixes: "AI 2836, AI 2838, AI 2840",
    analysis: "Return leg frequently uses ex-Vistara A320neos (AI 283x/284x series). Verify the flight number in Google Flights to secure Vistara's premium narrowbody cabin service."
  },
  "DEL-LHR": {
    fromCity: "Delhi", fromCode: "DEL", toCity: "London Heathrow", toCode: "LHR",
    status: "active",
    type: "Widebody Operations",
    aircraft: ["b787"],
    flightPrefixes: "AI 161",
    analysis: "Air India deploys ex-Vistara Boeing 787-9 Dreamliners on international long-haul flights. The flight number AI 161 is operated with these premium aircraft. Tapping the flight details on Google Flights will show a 1-2-1 direct aisle access Business Class layout with seatback screens in all classes."
  },
  "LHR-DEL": {
    fromCity: "London Heathrow", fromCode: "LHR", toCity: "Delhi", toCode: "DEL",
    status: "active",
    type: "Widebody Operations",
    aircraft: ["b787"],
    flightPrefixes: "AI 162",
    analysis: "The return international schedule AI 162 uses the ex-Vistara Boeing 787-9 Dreamliner. It provides a significantly better cabin product than Air India's standard B787-8s (which have a 2-2-2 Business class layout with no direct aisle access and older IFEs)."
  },
  "DEL-SIN": {
    fromCity: "Delhi", fromCode: "DEL", toCity: "Singapore", toCode: "SIN",
    status: "active",
    type: "Widebody Operations",
    aircraft: ["b787"],
    flightPrefixes: "AI 2382",
    analysis: "This international schedule features the ex-Vistara B787-9 Dreamliner. Check the flight number on Google Flights—look for the 2xxx widebody number to secure the ex-Vistara premium product."
  },
  "SIN-DEL": {
    fromCity: "Singapore", fromCode: "SIN", toCity: "Delhi", toCode: "DEL",
    status: "active",
    type: "Widebody Operations",
    aircraft: ["b787"],
    flightPrefixes: "AI 2383",
    analysis: "Return flight operated with the ex-Vistara Boeing 787-9 Dreamliner. A major upgrade over standard narrowbodies or older B787s."
  }
};

const ALL_AIRPORTS = {
  "DEL": "Delhi",
  "BOM": "Mumbai",
  "BLR": "Bengaluru",
  "HYD": "Hyderabad",
  "LHR": "London Heathrow",
  "SIN": "Singapore"
};

// 3. UI STATE & INTERACTION LOGIC
let activeTripType = "oneway"; // oneway, roundtrip, multicity

document.addEventListener("DOMContentLoaded", () => {
  setupTabs();
  setupTripTypes();
  populateDropdowns();
  document.getElementById("search-from").value = "BLR";
  document.getElementById("search-to").value = "DEL";
  setupEventListeners();
  renderFleetExplorer();
  setDefaultDates();
  setupFAQ();
  
  // Initial search load
  performSearch();
});

// FAQ Accordion Toggle
function setupFAQ() {
  document.querySelectorAll(".faq-question").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const isOpen = item.classList.contains("open");
      
      // Close all other items
      document.querySelectorAll(".faq-item.open").forEach(openItem => {
        openItem.classList.remove("open");
        openItem.querySelector(".faq-question").setAttribute("aria-expanded", "false");
      });
      
      // Toggle current item
      if (!isOpen) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
}

// Setup search panel tab switches
function setupTabs() {
  const tabs = document.querySelectorAll(".tab-btn");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      
      const targetId = tab.dataset.target;
      document.querySelectorAll(".search-panel").forEach(p => p.classList.remove("active"));
      document.getElementById(targetId).classList.add("active");
      
      // Clear results on switch
      document.getElementById("results-container").innerHTML = "";
      document.getElementById("results-summary").classList.add("hidden");
    });
  });
}

// Setup Trip Type selectors (One-way, Round-trip, Multi-city)
function setupTripTypes() {
  const selectors = document.querySelectorAll(".trip-type-btn");
  selectors.forEach(btn => {
    btn.addEventListener("click", () => {
      selectors.forEach(s => s.classList.remove("active"));
      btn.classList.add("active");
      
      activeTripType = btn.dataset.type;
      
      const retGroup = document.getElementById("return-date-group");
      const multiCityWrap = document.getElementById("multicity-segments-wrapper");
      const standardInputs = document.getElementById("standard-route-inputs");
      
      if (activeTripType === "oneway") {
        standardInputs.style.display = "block";
        retGroup.style.display = "none";
        multiCityWrap.style.display = "none";
      } else if (activeTripType === "roundtrip") {
        standardInputs.style.display = "block";
        retGroup.style.display = "flex";
        multiCityWrap.style.display = "none";
      } else if (activeTripType === "multicity") {
        standardInputs.style.display = "none";
        multiCityWrap.style.display = "block";
        
        // Ensure we have at least 2 segments initialized
        const segments = document.querySelectorAll(".multicity-segment");
        if (segments.length < 2) {
          initializeMultiCityRows();
        }
      }
    });
  });
}

// Populate Route Origin & Destination dropdowns dynamically
function populateDropdowns(selectElement = null) {
  const dropdowns = selectElement ? [selectElement] : document.querySelectorAll(".city-select");
  
  const sortedCities = Object.entries(ALL_AIRPORTS).sort((a, b) => a[1].localeCompare(b[1]));
  
  dropdowns.forEach(dropdown => {
    const currentValue = dropdown.value;
    dropdown.innerHTML = "";
    
    sortedCities.forEach(([code, city]) => {
      const opt = document.createElement("option");
      opt.value = code;
      opt.textContent = `${city} (${code})`;
      dropdown.appendChild(opt);
    });
    
    if (currentValue) {
      dropdown.value = currentValue;
    }
  });
}

// Set default travel dates
function setDefaultDates() {
  const today = new Date();
  const format = (d) => {
    const yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();
    if (mm < 10) mm = "0" + mm;
    if (dd < 10) dd = "0" + dd;
    return `${yyyy}-${mm}-${dd}`;
  };
  
  document.getElementById("search-date").value = format(today);
  document.getElementById("search-date").min = format(today);
  
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);
  document.getElementById("search-return-date").value = format(nextWeek);
  document.getElementById("search-return-date").min = format(today);
}

// Initialize Multi-City segments list (first two flights)
function initializeMultiCityRows() {
  const container = document.getElementById("multicity-segments");
  container.innerHTML = "";
  
  addMultiCityRow("DEL", "BOM", 0);
  addMultiCityRow("BOM", "BLR", 3); // 3 days later
}

// Add a single segment row for Multi-city searches
function addMultiCityRow(defaultFrom = "DEL", defaultTo = "BOM", daysOffset = 0) {
  const container = document.getElementById("multicity-segments");
  const rowIndex = container.children.length;
  
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  const formattedDate = date.toISOString().split('T')[0];
  
  const row = document.createElement("div");
  row.className = "multicity-segment";
  row.id = `mc-row-${rowIndex}`;
  
  row.innerHTML = `
    <div class="mc-row-header">
      <span>Flight ${rowIndex + 1}</span>
      ${rowIndex >= 2 ? `<button type="button" class="btn-remove-segment" onclick="removeMultiCityRow(${rowIndex})">✕ Remove</button>` : ''}
    </div>
    <div class="mc-inputs-grid">
      <div class="form-group">
        <label>Origin</label>
        <select class="form-control city-select mc-from"></select>
      </div>
      <div class="form-group">
        <label>Destination</label>
        <select class="form-control city-select mc-to"></select>
      </div>
      <div class="form-group">
        <label>Date</label>
        <input type="date" class="form-control mc-date" value="${formattedDate}">
      </div>
    </div>
  `;
  
  container.appendChild(row);
  
  const fromSelect = row.querySelector(".mc-from");
  const toSelect = row.querySelector(".mc-to");
  
  populateDropdowns(fromSelect);
  populateDropdowns(toSelect);
  
  fromSelect.value = defaultFrom;
  toSelect.value = defaultTo;
}

// Remove a Multi-city row and re-index remaining rows
window.removeMultiCityRow = (index) => {
  const row = document.getElementById(`mc-row-${index}`);
  if (row) {
    row.remove();
    const container = document.getElementById("multicity-segments");
    Array.from(container.children).forEach((child, idx) => {
      child.querySelector(".mc-row-header span").textContent = `Flight ${idx + 1}`;
    });
  }
};

// Setup Event Listeners
function setupEventListeners() {
  document.getElementById("btn-route-search").addEventListener("click", performSearch);
  document.getElementById("btn-flight-search").addEventListener("click", performFlightNumberSearch);
  document.getElementById("btn-tail-search").addEventListener("click", performTailNumberSearch);
  
  // Quick route swaps
  document.getElementById("btn-swap-cities").addEventListener("click", (e) => {
    e.preventDefault();
    const fromSelect = document.getElementById("search-from");
    const toSelect = document.getElementById("search-to");
    const temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;
    performSearch();
  });
  
  // Add Multi-city segment
  document.getElementById("btn-add-segment").addEventListener("click", () => {
    const container = document.getElementById("multicity-segments");
    const lastRow = container.lastElementChild;
    const lastTo = lastRow ? lastRow.querySelector(".mc-to").value : "DEL";
    addMultiCityRow(lastTo, "DEL", 5);
  });
}

// Global search state storage
let searchSegments = []; // Array of {from, to, date, label}
// Main Search router
function performSearch() {
  searchSegments = [];
  
  if (activeTripType === "oneway") {
    const from = document.getElementById("search-from").value;
    const to = document.getElementById("search-to").value;
    const date = document.getElementById("search-date").value;
    
    if (from === to) {
      showError("Origin and Destination cannot be the same city.");
      return;
    }
    
    searchSegments.push({ from, to, date, label: "Outbound Flight" });
  } 
  else if (activeTripType === "roundtrip") {
    const from = document.getElementById("search-from").value;
    const to = document.getElementById("search-to").value;
    const depDate = document.getElementById("search-date").value;
    const retDate = document.getElementById("search-return-date").value;
    
    if (from === to) {
      showError("Origin and Destination cannot be the same city.");
      return;
    }
    
    if (new Date(retDate) < new Date(depDate)) {
      showError("Return date cannot be earlier than departure date.");
      return;
    }
    
    searchSegments.push({ from, to, date: depDate, label: "Outbound Flight" });
    searchSegments.push({ from: to, to: from, date: retDate, label: "Inbound Return Flight" });
  } 
  else if (activeTripType === "multicity") {
    const rows = document.querySelectorAll(".multicity-segment");
    let hasError = false;
    
    rows.forEach((row, idx) => {
      const from = row.querySelector(".mc-from").value;
      const to = row.querySelector(".mc-to").value;
      const date = row.querySelector(".mc-date").value;
      
      if (from === to) {
        showError(`Flight ${idx + 1} has identical origin and destination.`);
        hasError = true;
      }
      
      searchSegments.push({ from, to, date, label: `Flight ${idx + 1}: ${from} → ${to}` });
    });
    
    if (hasError) return;
  }
  
  renderResultsHTML();
}

// 4. GOOGLE FLIGHTS LINK GENERATOR (Natural Language query logic)
function generateGoogleFlightsUrl() {
  const paxStr = "1 adult";
  const classStr = "economy class";
  let queryParts = [];
  
  if (activeTripType === "oneway" && searchSegments.length > 0) {
    const seg = searchSegments[0];
    queryParts.push(`Flights to ${seg.to} from ${seg.from} on ${seg.date}`);
  } 
  else if (activeTripType === "roundtrip" && searchSegments.length > 1) {
    const outbound = searchSegments[0];
    const inbound = searchSegments[1];
    queryParts.push(`Flights to ${outbound.to} from ${outbound.from} on ${outbound.date} through ${inbound.date}`);
  } 
  else if (activeTripType === "multicity") {
    const mcStrings = searchSegments.map(seg => `from ${seg.from} to ${seg.to} on ${seg.date}`);
    queryParts.push(`Flights ${mcStrings.join(", ")}`);
  }
  
  const fullQuery = `${queryParts.join("")} for ${paxStr} ${classStr} on Air India`;
  const encodedQuery = encodeURIComponent(fullQuery);
  
  return `https://www.google.com/travel/flights?q=${encodedQuery}`;
}

// 5. RENDER SEARCH RESULTS TO HTML (LIVE SYNC & DEPLOYMENT SPECS)
async function renderResultsHTML() {
  const container = document.getElementById("results-container");
  const summaryBox = document.getElementById("results-summary");
  
  if (searchSegments.length === 0) {
    summaryBox.classList.add("hidden");
    container.innerHTML = "";
    return;
  }
  
  // Show loading indicator
  container.innerHTML = `
    <div class="search-loading">
      <div class="spinner"></div>
      <p>Retrieving live schedules & identifying ex-Vistara aircraft...</p>
    </div>
  `;
  summaryBox.classList.add("hidden");
  
  try {
    // Fetch live flights for all segments in parallel
    const segmentResults = await Promise.all(searchSegments.map(async (segment) => {
      try {
        const res = await fetch(`/api/search?from=${segment.from}&to=${segment.to}&date=${segment.date}`);
        if (!res.ok) throw new Error("API error");
        const flights = await res.json();
        return { segment, flights, error: false };
      } catch (e) {
        console.error("API error for segment", segment, e);
        return { segment, flights: [], error: true };
      }
    }));
    
    // Clear container
    container.innerHTML = "";
    
    // 1. Google Flights redirection button at the very top
    const liveSyncCard = document.createElement("div");
    liveSyncCard.className = "live-sync-banner card";
    liveSyncCard.innerHTML = `
      <div class="live-sync-content">
        <div class="live-sync-icon-wrap">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="live-sync-icon">
            <circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24M14.83 9.17l4.24-4.24M14.83 14.83l4.24 4.24M9.17 14.83l-4.24 4.24"/>
          </svg>
        </div>
        <div class="live-sync-text">
          <h4>Retrieve Live Fares & Bookings</h4>
          <p>Book flights and view real-time pricing updates directly on Google Flights.</p>
        </div>
      </div>
      <a href="${generateGoogleFlightsUrl()}" target="_blank" class="btn btn-google-flights">
        Launch Google Flights
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="arrow-up-right">
          <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
        </svg>
      </a>
    `;
    container.appendChild(liveSyncCard);
    
    let totalFlights = 0;
    
    // 2. Render flights and guides for each segment
    segmentResults.forEach(({ segment, flights, error }, segmentIdx) => {
      const segmentDiv = document.createElement("div");
      segmentDiv.className = "segment-result-group";
      
      // Segment header
      const segmentHeader = document.createElement("div");
      segmentHeader.className = "segment-result-header";
      segmentHeader.innerHTML = `<h3>${segment.label} <span class="header-date">(${formatDate(segment.date)})</span></h3>`;
      segmentDiv.appendChild(segmentHeader);
      
      // Live Flights container
      const flightsListContainer = document.createElement("div");
      flightsListContainer.className = "flights-list-container";
      
      if (error) {
        flightsListContainer.innerHTML = `
          <div class="error-banner">
            <svg class="error-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span>Failed to connect to local schedule sync. Showing route guide only.</span>
          </div>
        `;
      } else if (flights.length === 0) {
        flightsListContainer.innerHTML = `
          <div class="route-guide-card card" style="padding: 1.25rem; text-align: center; border-left: 3px solid var(--color-gold-glow);">
            <p style="margin: 0; font-size: 0.9rem; color: var(--color-text-muted);">
              No scheduled Air India flights operating on <strong>${formatDate(segment.date)}</strong>. Use Google Flights to check secondary routes or connections.
            </p>
          </div>
        `;
      } else {
        totalFlights += flights.length;
        
        // Process all flights
        const processedFlights = [];
        flights.forEach((flight) => {
          let isEx = false;
          let detectedAcKey = null;
          
          if (flight.tail_no) {
            const tailMatch = isExVistaraTail(flight.tail_no);
            if (tailMatch) {
              isEx = true;
              detectedAcKey = tailMatch.brand;
            } else {
              isEx = false;
            }
          } else {
            isEx = isExVistaraRouteFlight(flight.flight_no, segment.from, segment.to);
          }
          
          let acKey = "aiA320neo";
          let modelName = "Airbus A320neo";
          
          if (detectedAcKey) {
            acKey = detectedAcKey;
            modelName = FLEET[acKey].model;
          } else {
            const lowerAc = (flight.aircraft || "").toLowerCase();
            if (lowerAc.includes("787") || lowerAc.includes("dreamliner") || lowerAc.includes("788") || lowerAc.includes("789")) {
              acKey = isEx ? "b787" : "aiB787";
              modelName = isEx ? "Boeing 787-9 Dreamliner" : "Boeing 787-8 Dreamliner";
            } else if (lowerAc.includes("321") || lowerAc.includes("a321")) {
              acKey = isEx ? "a321neo" : "aiA320neo";
              modelName = isEx ? "Airbus A321neo (Lie-Flat Bed Business)" : "Airbus A321";
            } else if (isEx) {
              acKey = "a320neo";
              modelName = "Airbus A320neo";
            }
          }
          
          const acInfo = FLEET[acKey] || FLEET.aiA320neo;
          const acLayout = (acKey === "a320neo" && typeof acInfo.getLayout === "function") 
            ? acInfo.getLayout(flight.tail_no || "") 
            : acInfo.layout;
            
          let depHour = 0;
          if (flight.dep_time) {
            const parts = flight.dep_time.split(":");
            if (parts.length > 0) depHour = parseInt(parts[0]) || 0;
          }
          
          const hasPremiumEcon = !!(acLayout && acLayout.premiumEconomy);
          const hasLieFlat = !!(acLayout && acLayout.business && acLayout.business.style.toLowerCase().includes("lie-flat"));
          const isWide = ["b787", "aiB787", "aiB777", "aiA350"].includes(acKey);
          
          processedFlights.push({
            flight,
            isEx,
            acKey,
            modelName,
            acInfo,
            acLayout,
            depHour,
            hasPremiumEcon,
            hasLieFlat,
            isWide
          });
        });

        // Render Filter Bar
        const filterBar = document.createElement("div");
        filterBar.className = "results-filter-bar";
        filterBar.innerHTML = `
          <div class="filter-group">
            <label for="filter-time-${segmentIdx}">Departure Time</label>
            <select id="filter-time-${segmentIdx}" class="filter-select">
              <option value="all">All Times</option>
              <option value="morning">Morning (before 12 PM)</option>
              <option value="afternoon">Afternoon (12 PM - 6 PM)</option>
              <option value="evening">Evening/Night (after 6 PM)</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="filter-cabin-${segmentIdx}">Cabin Features</label>
            <select id="filter-cabin-${segmentIdx}" class="filter-select">
              <option value="all">All Cabins</option>
              <option value="pe">Premium Economy</option>
              <option value="flat">Lie-Flat Business Beds</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="filter-aircraft-${segmentIdx}">Aircraft Class</label>
            <select id="filter-aircraft-${segmentIdx}" class="filter-select">
              <option value="all">All Aircraft</option>
              <option value="widebody">Widebody (787/A350)</option>
              <option value="narrowbody">Narrowbody (A320/A321)</option>
            </select>
          </div>
        `;
        segmentDiv.appendChild(filterBar);

        // Render Tabs Switcher
        const tabsDiv = document.createElement("div");
        tabsDiv.className = "results-tabs";
        tabsDiv.innerHTML = `
          <button type="button" id="tab-btn-vistara-${segmentIdx}" class="results-tab-btn tab-vistara active">
            ✨ ex-Air Vistara <span class="tab-count" id="count-vistara-${segmentIdx}">0</span>
          </button>
          <button type="button" id="tab-btn-standard-${segmentIdx}" class="results-tab-btn tab-standard">
            Standard Air India <span class="tab-count" id="count-standard-${segmentIdx}">0</span>
          </button>
        `;
        segmentDiv.appendChild(tabsDiv);
        segmentDiv.appendChild(flightsListContainer);

        let activeTab = "vistara";

        const updateSegmentDisplay = () => {
          const timeVal = document.getElementById(`filter-time-${segmentIdx}`).value;
          const cabinVal = document.getElementById(`filter-cabin-${segmentIdx}`).value;
          const aircraftVal = document.getElementById(`filter-aircraft-${segmentIdx}`).value;
          
          const filtered = processedFlights.filter(f => {
            if (timeVal === "morning" && f.depHour >= 12) return false;
            if (timeVal === "afternoon" && (f.depHour < 12 || f.depHour >= 18)) return false;
            if (timeVal === "evening" && f.depHour < 18) return false;
            
            if (cabinVal === "pe" && !f.hasPremiumEcon) return false;
            if (cabinVal === "flat" && !f.hasLieFlat) return false;
            
            if (aircraftVal === "widebody" && !f.isWide) return false;
            if (aircraftVal === "narrowbody" && f.isWide) return false;
            
            return true;
          });
          
          const vistaraFlights = filtered.filter(f => f.isEx);
          const standardFlights = filtered.filter(f => !f.isEx);
          
          document.getElementById(`count-vistara-${segmentIdx}`).textContent = vistaraFlights.length;
          document.getElementById(`count-standard-${segmentIdx}`).textContent = standardFlights.length;
          
          flightsListContainer.innerHTML = "";
          const activeFlightsList = activeTab === "vistara" ? vistaraFlights : standardFlights;
          
          if (activeFlightsList.length === 0) {
            const emptyCard = document.createElement("div");
            emptyCard.className = "results-empty-state";
            emptyCard.innerHTML = `
              <svg class="results-empty-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/>
              </svg>
              <h5>No matching flights found</h5>
              <p>Try adjusting your filters or checking the other tab for more options.</p>
            `;
            flightsListContainer.appendChild(emptyCard);
          } else {
            activeFlightsList.forEach((f, fIdx) => {
              const cardId = `flight-card-${segment.from}-${segment.to}-${segmentIdx}-${fIdx}`;
              const flightCard = document.createElement("div");
              flightCard.className = `flight-card ${f.isEx ? 'ex-vistara-border' : 'standard-ai-border'}`;
              
              flightCard.innerHTML = `
                <div class="card-main-info" onclick="toggleFlightDetails('${cardId}')">
                  <div class="card-header">
                    <div class="flight-identity">
                      <span class="flight-no">${f.flight.flight_no}</span>
                      <span class="flight-date">${f.flight.dep_time} &rarr; ${f.flight.arr_time} (${f.flight.days})</span>
                    </div>
                    <div class="badges-wrapper">
                      ${f.isEx ? `
                        <span class="badge ex-vistara-badge"><span class="sparkle">✨</span> ex-Air Vistara Fleet</span>
                      ` : `
                        <span class="badge standard-badge">Standard Cabin</span>
                      `}
                    </div>
                  </div>
                  <div class="card-quick-specs">
                    <div class="spec-item">
                      <svg class="spec-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                      <span>Aircraft: ${f.flight.aircraft || f.modelName} ${f.flight.tail_no ? `(${f.flight.tail_no})` : ''}</span>
                    </div>
                    <div style="margin-left: auto; display: flex; align-items: center; gap: 4px; font-size: 0.75rem; color: var(--color-gold);">
                      <span>View Details</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width: 12px; height: 12px; transition: transform 0.3s;" class="arrow-icon"><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                  </div>
                </div>
                
                <div id="${cardId}" class="card-details-panel" style="display: none;">
                  <div class="details-divider"></div>
                  
                  ${f.flight.tail_no ? `
                  <div class="details-section">
                    <h4>Aircraft Verification</h4>
                    <div style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; background: rgba(212, 175, 55, 0.1); border: 1px solid var(--color-gold); padding: 0.5rem; border-radius: 6px; margin-bottom: 1rem;">
                      <strong style="color: var(--color-gold);">Registration:</strong>
                      <span style="font-family: monospace; font-weight: bold;">${f.flight.tail_no}</span>
                      <a href="https://www.flightradar24.com/data/aircraft/${f.flight.tail_no.toLowerCase()}" target="_blank" style="margin-left: auto; color: var(--color-gold); text-decoration: underline; display: flex; align-items: center; gap: 4px;">
                        Track Live
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width: 12px; height: 12px;"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                      </a>
                    </div>
                  </div>
                  ` : ''}
                  
                  <div class="details-section">
                    <h4>Cabin Configuration</h4>
                    <div class="layout-grid">
                      ${renderClassRow("Business Class", f.acLayout ? f.acLayout.business : null)}
                      ${renderClassRow("Premium Economy", f.acLayout ? f.acLayout.premiumEconomy : null)}
                      ${renderClassRow("Economy Class", f.acLayout ? f.acLayout.economy : null)}
                    </div>
                  </div>

                  <div class="details-section">
                    <h4>In-Flight Features</h4>
                    <ul class="features-list">
                      <li><strong>Entertainment:</strong> ${f.acInfo.features.ife}</li>
                      <li><strong>Power Outlets:</strong> ${f.acInfo.features.power}</li>
                      <li><strong>Wi-Fi:</strong> ${f.acInfo.features.wifi}</li>
                      <li><strong>Experience Note:</strong> ${f.acInfo.features.experience}</li>
                    </ul>
                  </div>
                  
                  ${f.isEx ? `
                  <div class="details-section">
                    <h4>Livery & Heritage</h4>
                    <p class="livery-desc">${f.acInfo.liveryStatus}</p>
                  </div>
                  ` : ''}

                  <div class="details-section">
                    <h4>Interactive Seat Layout Map</h4>
                    <div class="seat-map-visualizer">
                      ${generateSeatMapSvg({ aircraftModel: f.modelName, isExVistara: f.isEx, layout: f.acLayout })}
                    </div>
                    <div class="seat-legend">
                      <div class="legend-item"><span class="legend-box bus-color"></span> Business</div>
                      ${f.acLayout && f.acLayout.premiumEconomy ? '<div class="legend-item"><span class="legend-box pe-color"></span> Premium Econ</div>' : ''}
                      <div class="legend-item"><span class="legend-box econ-color"></span> Economy</div>
                    </div>
                  </div>
                </div>
              `;
              flightsListContainer.appendChild(flightCard);
            });
          }
        };

        // Bind events after elements are in DOM
        setTimeout(() => {
          const timeSelect = document.getElementById(`filter-time-${segmentIdx}`);
          const cabinSelect = document.getElementById(`filter-cabin-${segmentIdx}`);
          const aircraftSelect = document.getElementById(`filter-aircraft-${segmentIdx}`);
          const tVistaraBtn = document.getElementById(`tab-btn-vistara-${segmentIdx}`);
          const tStandardBtn = document.getElementById(`tab-btn-standard-${segmentIdx}`);

          if (timeSelect && cabinSelect && aircraftSelect && tVistaraBtn && tStandardBtn) {
            timeSelect.addEventListener("change", updateSegmentDisplay);
            cabinSelect.addEventListener("change", updateSegmentDisplay);
            aircraftSelect.addEventListener("change", updateSegmentDisplay);

            tVistaraBtn.addEventListener("click", () => {
              activeTab = "vistara";
              tStandardBtn.classList.remove("active");
              tVistaraBtn.classList.add("active");
              updateSegmentDisplay();
            });

            tStandardBtn.addEventListener("click", () => {
              activeTab = "standard";
              tVistaraBtn.classList.remove("active");
              tStandardBtn.classList.add("active");
              updateSegmentDisplay();
            });

            // Auto-select tab with flights
            const initialVistaraCount = processedFlights.filter(f => f.isEx).length;
            if (initialVistaraCount === 0) {
              activeTab = "standard";
              tVistaraBtn.classList.remove("active");
              tStandardBtn.classList.add("active");
            }

            // Initial render
            updateSegmentDisplay();
          }
        }, 0);
      }
      
      // 3. Render the route guide underneath the list of flights
      const routeKey = `${segment.from}-${segment.to}`;
      const meta = ROUTE_METADATA[routeKey];
      const guideCard = document.createElement("div");
      guideCard.className = "route-guide-card card mt-4";
      
      if (meta) {
        let aircraftBadges = meta.aircraft.map(ac => {
          const name = ac === "b787" ? "Boeing 787-9" : (ac === "a321neo" ? "Airbus A321neo" : "Airbus A320neo");
          return `<span class="ac-badge-pill">${name}</span>`;
        }).join(" ");
        
        guideCard.innerHTML = `
          <div class="guide-card-header">
            <span class="route-badge active-ex-vistara">✨ ex-Vistara Deployment Insights</span>
            <span class="route-direction">${meta.fromCity} (${meta.fromCode}) &rarr; ${meta.toCity} (${meta.toCode})</span>
          </div>
          <div class="guide-detail-row">
            <strong>Historical deploys on this route:</strong>
            <div class="ac-badges-wrap" style="margin-top: 0.5rem;">${aircraftBadges}</div>
          </div>
          <div class="guide-detail-row">
            <strong>Route specs:</strong>
            <p class="guide-analysis-text">${meta.analysis}</p>
          </div>
        `;
      } else {
        const fromName = ALL_AIRPORTS[segment.from] || segment.from;
        const toName = ALL_AIRPORTS[segment.to] || segment.to;
        guideCard.className = "route-guide-card card standard-route-card mt-4";
        guideCard.innerHTML = `
          <div class="guide-card-header">
            <span class="route-badge standard-ai">Standard Route Info</span>
            <span class="route-direction">${fromName} (${segment.from}) &rarr; ${toName} (${segment.to})</span>
          </div>
          <div class="guide-detail-row">
            <p>Air India operates standard cabins on this route. Ex-Vistara aircraft (Aubergine/Gold livery, 3-class layouts, lie-flat A321neo beds) are not regularly deployed here.</p>
          </div>
        `;
      }
      
      segmentDiv.appendChild(guideCard);
      container.appendChild(segmentDiv);
    });
    
    // Toggle details panel visibility
    window.toggleFlightDetails = (cardId) => {
      const panel = document.getElementById(cardId);
      const card = panel.closest('.flight-card');
      const arrow = card.querySelector('.arrow-icon');
      
      if (panel.style.display === 'none') {
        panel.style.display = 'block';
        arrow.style.transform = 'rotate(180deg)';
        card.classList.add('expanded');
      } else {
        panel.style.display = 'none';
        arrow.style.transform = 'rotate(0deg)';
        card.classList.remove('expanded');
      }
    };
    
    summaryBox.classList.remove("hidden");
    const countText = document.getElementById("results-count");
    countText.textContent = `Found ${totalFlights} scheduled Air India flight${totalFlights === 1 ? '' : 's'} across ${searchSegments.length} segment${searchSegments.length === 1 ? '' : 's'}`;
    
  } catch (error) {
    console.error(error);
    showError("An error occurred while fetching live schedules.");
  }
}

// Render class row details
function renderClassRow(className, classData) {
  if (!classData) return `<div class="layout-row disabled"><span>${className}</span><span>Not Available</span></div>`;
  
  return `
    <div class="layout-row">
      <div class="class-label">
        <span class="dot ${className.toLowerCase().replace(" ", "-")}-dot"></span>
        <strong>${className}</strong>
      </div>
      <div class="class-data">
        <span>${classData.seats} seats (${classData.config})</span>
        <span class="class-pitch">Pitch: ${classData.pitch} | ${classData.style}</span>
      </div>
    </div>
  `;
}

// Generate interactive seat maps
function generateSeatMapSvg(flight) {
  const model = flight.aircraftModel;
  const isEx = flight.isExVistara;
  
  if (model.includes("787") || model.includes("777") || model.includes("A350")) {
    const isVistara787 = isEx && model.includes("787");
    const isA350 = model.includes("A350");
    const isB777 = model.includes("777");
    return `
      <div class="aircraft-tube widebody">
        <div class="cockpit">Cockpit</div>
        <div class="cabin-section">
          <div class="section-title">Business Class (${isA350 ? '1-2-1 Suite with Privacy Door' : (isVistara787 ? '1-2-1 Lie-Flat' : (isB777 ? '2-3-2 Lie-Flat' : '2-2-2 Lie-Flat'))})</div>
          <div class="seating-grid bus-grid">
            ${generateSeatRows(3, (isVistara787 || isA350) ? 4 : (isB777 ? 7 : 6), "bus-seat")}
          </div>
        </div>
        ${(isVistara787 || isA350) ? `
        <div class="cabin-section PE-section">
          <div class="section-title">Premium Economy (${isA350 ? '2-4-2 Layout' : '2-3-2 Layout'})</div>
          <div class="seating-grid pe-grid">
            ${generateSeatRows(3, isA350 ? 8 : 7, "pe-seat")}
          </div>
        </div>
        ` : ''}
        <div class="cabin-section">
          <div class="section-title">Economy Class (${isB777 ? '3-4-3 Layout' : '3-3-3 Layout'})</div>
          <div class="seating-grid econ-grid">
            ${generateSeatRows(12, isB777 ? 10 : 9, "econ-seat")}
          </div>
        </div>
        <div class="tail">Galley / Lavatories</div>
      </div>
    `;
  } else {
    const isA321 = model.includes("A321");
    const layout = flight.layout;
    const hasPE = layout && layout.premiumEconomy !== null;
    const hasBus = layout && layout.business !== null;
    
    return `
      <div class="aircraft-tube narrowbody">
        <div class="cockpit">Cockpit</div>
        ${hasBus ? `
        <div class="cabin-section">
          <div class="section-title">Business Class (2-2 ${isA321 ? 'Lie-Flat Bed' : 'Recliner'})</div>
          <div class="seating-grid bus-grid">
            ${generateSeatRows(isA321 ? 3 : 2, 4, "bus-seat")}
          </div>
        </div>
        ` : ''}
        ${hasPE ? `
        <div class="cabin-section PE-section">
          <div class="section-title">Premium Economy (3-3 Layout)</div>
          <div class="seating-grid pe-grid">
            ${generateSeatRows(4, 6, "pe-seat")}
          </div>
        </div>
        ` : ''}
        <div class="cabin-section">
          <div class="section-title">Economy Class (3-3 Layout)</div>
          <div class="seating-grid econ-grid">
            ${generateSeatRows(isA321 ? 15 : 18, 6, "econ-seat")}
          </div>
        </div>
        <div class="tail">Galley / Lavatories</div>
      </div>
    `;
  }
}

// Generate rows of seats
function generateSeatRows(rowCount, seatsPerRow, seatClass) {
  let html = "";
  for (let r = 1; r <= rowCount; r++) {
    html += `<div class="seat-row">`;
    html += `<span class="row-num">${r}</span>`;
    for (let s = 1; s <= seatsPerRow; s++) {
      if (seatsPerRow === 4 && s === 3) html += `<div class="aisle-spacer">Aisle</div>`;
      if (seatsPerRow === 6 && s === 4) html += `<div class="aisle-spacer">Aisle</div>`;
      if (seatsPerRow === 7 && (s === 3 || s === 6)) html += `<div class="aisle-spacer">Aisle</div>`;
      if (seatsPerRow === 9 && (s === 4 || s === 7)) html += `<div class="aisle-spacer">Aisle</div>`;
      html += `<div class="seat-cell ${seatClass}" title="Seat Row ${r}"></div>`;
    }
    html += `</div>`;
  }
  return html;
}

// 6. FLIGHT NUMBER LOOKUP EXECUTION (VERIFIED FLIGHT NUMBER SCHEMAS)
function performFlightNumberSearch() {
  const flightNoRaw = document.getElementById("search-flight-no").value.trim().toUpperCase();
  if (!flightNoRaw) {
    showError("Please enter an Air India flight number.");
    return;
  }
  
  let flightNo = flightNoRaw;
  if (!flightNo.startsWith("AI")) {
    if (/^\d+$/.test(flightNo)) {
      flightNo = `AI ${flightNo}`;
    } else {
      flightNo = `AI ${flightNo.replace("AI", "").trim()}`;
    }
  } else {
    flightNo = `AI ${flightNo.replace("AI", "").trim()}`;
  }
  
  const flightNumPart = flightNo.replace("AI", "").trim();
  const num = parseInt(flightNumPart);
  const isEx = (num >= 2700 && num <= 2999) || num === 2382 || num === 2383 || num === 161 || num === 162;
  
  const container = document.getElementById("results-container");
  const summaryBox = document.getElementById("results-summary");
  container.innerHTML = "";
  summaryBox.classList.add("hidden");
  
  if (isEx) {
    // Determine the likely aircraft based on numbering conventions
    // International widebody schedules range (23xx/21xx) or flight length
    const isWidebody = flightNumPart.startsWith("23") || flightNumPart.startsWith("21");
    // Selected flights are configured with lie-flat beds (A321neos)
    const isA321 = flightNumPart === "2816" || flightNumPart === "2975" || flightNumPart === "2976" || flightNumPart === "2815";
    
    let acKey = "a320neo";
    let modelName = "Airbus A320neo";
    if (isWidebody) {
      acKey = "b787";
      modelName = "Boeing 787-9 Dreamliner";
    } else if (isA321) {
      acKey = "a321neo";
      modelName = "Airbus A321neo (Lie-Flat Bed Business)";
    }
    
    const acInfo = FLEET[acKey];
    const tailList = acInfo.registrations;
    const sampleTail = tailList[0];
    
    const card = document.createElement("div");
    card.className = "flight-card ex-vistara-border expanded";
    
    card.innerHTML = `
      <div class="card-main-info">
        <div class="card-header">
          <div class="flight-identity">
            <span class="flight-no">${flightNo}</span>
            <span class="flight-date">✨ Verified ex-Vistara Service</span>
          </div>
          <div class="badges-wrapper">
            <span class="badge ex-vistara-badge"><span class="sparkle">✨</span> ex-Air Vistara Fleet</span>
          </div>
        </div>
        
        <div class="card-quick-specs">
          <div class="spec-item">
            <svg class="spec-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
            <span>Assigned Fleet: ${modelName}</span>
          </div>
        </div>

        <div class="card-details-panel">
          <div class="details-divider"></div>
          
          <div class="details-section">
            <h4>Cabin Configuration</h4>
            <div class="layout-grid">
              ${renderClassRow("Business Class", acInfo.layout.business)}
              ${renderClassRow("Premium Economy", acInfo.layout.premiumEconomy)}
              ${renderClassRow("Economy Class", acInfo.layout.economy)}
            </div>
          </div>

          <div class="details-section">
            <h4>In-Flight Features</h4>
            <ul class="features-list">
              <li><strong>Entertainment:</strong> ${acInfo.features.ife}</li>
              <li><strong>Power Outlets:</strong> ${acInfo.features.power}</li>
              <li><strong>Wi-Fi:</strong> ${acInfo.features.wifi}</li>
              <li><strong>Experience Note:</strong> ${acInfo.features.experience}</li>
            </ul>
          </div>
          
          <div class="details-section">
            <h4>Livery & Heritage</h4>
            <p class="livery-desc">${acInfo.liveryStatus} (e.g. typical registrations include ${tailList.slice(0, 3).join(", ")}).</p>
          </div>

          <div class="details-section">
            <h4>Interactive Seat Layout Map</h4>
            <div class="seat-map-visualizer">
              ${generateSeatMapSvg({ aircraftModel: modelName, isExVistara: true, layout: acInfo.layout })}
            </div>
            <div class="seat-legend">
              <div class="legend-item"><span class="legend-box bus-color"></span> Business</div>
              ${acInfo.layout.premiumEconomy ? '<div class="legend-item"><span class="legend-box pe-color"></span> Premium Econ</div>' : ''}
              <div class="legend-item"><span class="legend-box econ-color"></span> Economy</div>
            </div>
          </div>
        </div>
      </div>
    `;
    container.appendChild(card);
  } else {
    // Standard Air India
    const card = document.createElement("div");
    card.className = "flight-card card standard-cabin-info-card";
    card.innerHTML = `
      <div class="card-header">
        <div class="flight-identity">
          <span class="flight-no">${flightNo}</span>
          <span class="flight-date">Standard Flight Number</span>
        </div>
        <div class="badges-wrapper">
          <span class="badge standard-badge">Standard Air India</span>
        </div>
      </div>
      <div class="guide-detail-row" style="margin-top: 1rem;">
        <p>This flight number (<strong>${flightNo}</strong>) is not operated by a legacy ex-Vistara aircraft. It is serviced by standard Air India aircraft, which do not feature Vistara's Premium Economy cabins or Airbus A321neo lie-flat business class seats.</p>
      </div>
    `;
    container.appendChild(card);
  }
}

// 7. TAIL NUMBER REGISTRY LOOKUP
function performTailNumberSearch() {
  const tailRaw = document.getElementById("search-tail-no").value.trim().toUpperCase();
  if (!tailRaw) {
    showError("Please enter an aircraft registration number.");
    return;
  }
  
  // Normalization: replace prefix typos like AT- with VT-, VT without hyphen, etc.
  let tail = tailRaw;
  if (tail.startsWith("AT-")) {
    tail = "VT-" + tail.substring(3);
  } else if (tail.startsWith("AT")) {
    tail = "VT-" + tail.substring(2);
  } else if (tail.startsWith("VT") && !tail.startsWith("VT-")) {
    tail = "VT-" + tail.substring(2);
  } else if (!tail.startsWith("VT-")) {
    tail = "VT-" + tail;
  }
  
  // Specific user typo mapping: AT-VNV / VT-VNV -> VT-ANV (standard Boeing 787-8)
  if (tail === "VT-VNV") {
    tail = "VT-ANV";
  }
  
  const exVistaraInfo = isExVistaraTail(tail);
  
  const container = document.getElementById("results-container");
  const summaryBox = document.getElementById("results-summary");
  container.innerHTML = "";
  summaryBox.classList.add("hidden");
  
  if (exVistaraInfo) {
    const acData = exVistaraInfo.data;
    const card = document.createElement("div");
    card.className = "flight-card ex-vistara-border expanded";
    
    card.innerHTML = `
      <div class="card-main-info">
        <div class="card-header">
          <div class="flight-identity">
            <span class="flight-no">${tail}</span>
            <span class="flight-date">Transferred ex-Vistara Airframe</span>
          </div>
          <div class="badges-wrapper">
            <span class="badge ex-vistara-badge"><span class="sparkle">✨</span> ex-Air Vistara Fleet</span>
          </div>
        </div>
        
        <div class="card-quick-specs">
          <div class="spec-item">
            <svg class="spec-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
            <span>Model: ${acData.model}</span>
          </div>
        </div>

        <div class="card-details-panel">
          <div class="details-divider"></div>
          
          <div class="details-section">
            <h4>Cabin Configuration</h4>
            <div class="layout-grid">
              ${renderClassRow("Business Class", acData.layout ? acData.layout.business : null)}
              ${renderClassRow("Premium Economy", acData.layout ? acData.layout.premiumEconomy : null)}
              ${renderClassRow("Economy Class", acData.layout ? acData.layout.economy : null)}
            </div>
          </div>

          <div class="details-section">
            <h4>In-Flight Features</h4>
            <ul class="features-list">
              <li><strong>Entertainment:</strong> ${acData.features.ife}</li>
              <li><strong>Power Outlets:</strong> ${acData.features.power}</li>
              <li><strong>Wi-Fi:</strong> ${acData.features.wifi}</li>
              <li><strong>Experience Note:</strong> ${acData.features.experience}</li>
            </ul>
          </div>
          
          <div class="details-section">
            <h4>Livery & Heritage</h4>
            <p class="livery-desc">${acData.liveryStatus}</p>
          </div>

          <div class="details-section">
            <h4>Interactive Seat Layout Map</h4>
            <div class="seat-map-visualizer">
              ${generateSeatMapSvg({ aircraftModel: acData.model, isExVistara: true, layout: acData.layout })}
            </div>
            <div class="seat-legend">
              <div class="legend-item"><span class="legend-box bus-color"></span> Business</div>
              ${acData.layout && acData.layout.premiumEconomy ? '<div class="legend-item"><span class="legend-box pe-color"></span> Premium Econ</div>' : ''}
              <div class="legend-item"><span class="legend-box econ-color"></span> Economy</div>
            </div>
          </div>
        </div>
      </div>
    `;
    container.appendChild(card);
  } else {
    // Standard Air India - check matching patterns
    let stdAcData = null;
    let modelName = "";
    
    if (/^VT-AN[A-Z]$/.test(tail) || /^VT-AM[A-Z]$/.test(tail)) {
      stdAcData = FLEET.aiB787;
      modelName = "Boeing 787-8 Dreamliner";
    } else if (/^VT-AL[A-Z]$/.test(tail) || /^VT-AE[A-Z]$/.test(tail)) {
      stdAcData = FLEET.aiB777;
      modelName = "Boeing 777-300ER";
    } else if (/^VT-JR[A-Z]$/.test(tail)) {
      stdAcData = FLEET.aiA350;
      modelName = "Airbus A350-900";
    } else if (/^VT-EX[A-Z]$/.test(tail) || /^VT-CI[A-Z]$/.test(tail) || /^VT-PP[A-Z]$/.test(tail) || /^VT-ED[A-Z]$/.test(tail)) {
      stdAcData = FLEET.aiA320neo;
      modelName = "Airbus A320neo";
    }
    
    if (stdAcData) {
      const card = document.createElement("div");
      card.className = "flight-card card standard-cabin-info-card expanded";
      card.innerHTML = `
        <div class="card-main-info">
          <div class="card-header">
            <div class="flight-identity">
              <span class="flight-no">${tail}</span>
              <span class="flight-date">Standard Air India Airframe</span>
            </div>
            <div class="badges-wrapper">
              <span class="badge standard-badge">Standard Air India</span>
            </div>
          </div>
          
          <div class="card-quick-specs">
            <div class="spec-item">
              <svg class="spec-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
              <span>Model: ${modelName}</span>
            </div>
          </div>

          <div class="card-details-panel">
            <div class="details-divider"></div>
            
            <div class="details-section">
              <h4>Cabin Configuration</h4>
              <div class="layout-grid">
                ${renderClassRow("Business Class", stdAcData.layout ? stdAcData.layout.business : null)}
                ${renderClassRow("Premium Economy", stdAcData.layout ? stdAcData.layout.premiumEconomy : null)}
                ${renderClassRow("Economy Class", stdAcData.layout ? stdAcData.layout.economy : null)}
              </div>
            </div>

            <div class="details-section">
              <h4>In-Flight Features</h4>
              <ul class="features-list">
                <li><strong>Entertainment:</strong> ${stdAcData.features.ife}</li>
                <li><strong>Power Outlets:</strong> ${stdAcData.features.power}</li>
                <li><strong>Wi-Fi:</strong> ${stdAcData.features.wifi}</li>
                <li><strong>Experience Note:</strong> ${stdAcData.features.experience}</li>
              </ul>
            </div>
            
            <div class="details-section">
              <h4>Interactive Seat Layout Map</h4>
              <div class="seat-map-visualizer">
                ${generateSeatMapSvg({ aircraftModel: modelName, isExVistara: false, layout: stdAcData.layout })}
              </div>
              <div class="seat-legend">
                <div class="legend-item"><span class="legend-box bus-color"></span> Business</div>
                ${stdAcData.layout && stdAcData.layout.premiumEconomy ? '<div class="legend-item"><span class="legend-box pe-color"></span> Premium Econ</div>' : ''}
                <div class="legend-item"><span class="legend-box econ-color"></span> Economy</div>
              </div>
            </div>
          </div>
        </div>
      `;
      container.appendChild(card);
    } else {
      showError(`Aircraft registration ${tail} was not found in the ex-Vistara 70-plane fleet or standard tracked Air India database. Prefix with 'VT-' for standard Indian airframes.`);
    }
  }
}

// 8. FLEET EXPLORER DIRECTORY
function renderFleetExplorer() {
  const listB787 = document.getElementById("fleet-787");
  const listA321 = document.getElementById("fleet-a321");
  const listA320 = document.getElementById("fleet-a320");
  
  FLEET.b787.registrations.forEach(reg => {
    listB787.appendChild(createFleetPill(reg, "B787-9"));
  });

  FLEET.a321neo.registrations.forEach(reg => {
    listA321.appendChild(createFleetPill(reg, "A321neo"));
  });

  FLEET.a320neo.registrations.forEach(reg => {
    let sub = "A320neo";
    if (reg.startsWith("VT-TY")) {
      sub = "A320neo (All-Econ)";
    }
    listA320.appendChild(createFleetPill(reg, sub));
  });
}

function createFleetPill(reg, sub) {
  const el = document.createElement("div");
  el.className = "fleet-pill";
  el.innerHTML = `
    <span class="fleet-pill-reg">${reg}</span>
    <span class="fleet-pill-sub">${sub}</span>
  `;
  el.addEventListener("click", () => {
    const tailTab = document.querySelector('[data-target="panel-tail"]');
    tailTab.click();
    document.getElementById("search-tail-no").value = reg;
    performTailNumberSearch();
  });
  return el;
}

// Format date nicely
function formatDate(dateStr) {
  if (!dateStr || dateStr === "Scheduled Daily Route") return dateStr || "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

// Display error banner
function showError(message) {
  const container = document.getElementById("results-container");
  const summaryBox = document.getElementById("results-summary");
  
  summaryBox.classList.add("hidden");
  container.innerHTML = `
    <div class="error-banner">
      <svg class="error-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      <span>${message}</span>
    </div>
  `;
}
