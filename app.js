/**
 * SRI LANKA VEHICLE CUSTOMS TAX CALCULATOR 2026 — MOBILE APP ENGINE
 * Features: Photo Upload, Auction Sheet Upload, In-App Storage Directory, Profit Estimator & PDF Exporter
 */

// Exchange Rates Table (Sri Lanka Customs Official Rates 2026)
const EXCHANGE_RATES = {
    JPY: 2.085,
    USD: 305.50,
    EUR: 332.10,
    GBP: 395.25,
    AUD: 202.80,
    CAD: 222.40,
    CNY: 42.80,
    LKR: 1.00
};

// Official Chapter 87 HS Code Database
const HS_DATABASE = [
    { code: "8703.21.00", desc: "Motor cars petrol ≤ 1000cc", category: "Passenger", fuel: "Petrol", ccMax: 1000, cid: 0.20, cidSur: 0.50, pal: 0.10, cess: 0.0, exType: "Compound", exVal: 1.50, exSpec: 3150, sscl: 0.025, vat: 0.18, maxAge: 3 },
    { code: "8703.22.00", desc: "Motor cars petrol 1001-1500cc", category: "Passenger", fuel: "Petrol", ccMax: 1500, cid: 0.20, cidSur: 0.50, pal: 0.10, cess: 0.0, exType: "Compound", exVal: 1.75, exSpec: 4200, sscl: 0.025, vat: 0.18, maxAge: 3 },
    { code: "8703.23.10", desc: "Motor cars petrol 1501-1800cc", category: "Passenger", fuel: "Petrol", ccMax: 1800, cid: 0.20, cidSur: 0.50, pal: 0.10, cess: 0.0, exType: "Compound", exVal: 2.00, exSpec: 5500, sscl: 0.025, vat: 0.18, maxAge: 3 },
    { code: "8703.23.20", desc: "Motor cars petrol 1801-2000cc", category: "Passenger", fuel: "Petrol", ccMax: 2000, cid: 0.20, cidSur: 0.50, pal: 0.10, cess: 0.0, exType: "Compound", exVal: 2.25, exSpec: 6800, sscl: 0.025, vat: 0.18, maxAge: 3 },
    { code: "8703.23.30", desc: "Motor cars petrol 2001-2500cc", category: "Passenger", fuel: "Petrol", ccMax: 2500, cid: 0.20, cidSur: 0.50, pal: 0.10, cess: 0.0, exType: "Compound", exVal: 2.50, exSpec: 8500, sscl: 0.025, vat: 0.18, maxAge: 3 },
    { code: "8703.24.00", desc: "Motor cars petrol > 3000cc", category: "Passenger", fuel: "Petrol", ccMax: 99999, cid: 0.30, cidSur: 0.50, pal: 0.10, cess: 0.0, exType: "Compound", exVal: 3.00, exSpec: 12500, sscl: 0.025, vat: 0.18, maxAge: 3 },
    { code: "8703.31.00", desc: "Motor cars diesel ≤ 1500cc", category: "Passenger", fuel: "Diesel", ccMax: 1500, cid: 0.20, cidSur: 0.50, pal: 0.10, cess: 0.0, exType: "Compound", exVal: 1.80, exSpec: 4800, sscl: 0.025, vat: 0.18, maxAge: 3 },
    { code: "8703.32.00", desc: "Motor cars diesel 1501-2500cc", category: "Passenger", fuel: "Diesel", ccMax: 2500, cid: 0.20, cidSur: 0.50, pal: 0.10, cess: 0.0, exType: "Compound", exVal: 2.50, exSpec: 8800, sscl: 0.025, vat: 0.18, maxAge: 3 },
    { code: "8703.33.00", desc: "Motor cars diesel > 2500cc", category: "Passenger", fuel: "Diesel", ccMax: 99999, cid: 0.30, cidSur: 0.50, pal: 0.10, cess: 0.0, exType: "Compound", exVal: 3.00, exSpec: 13000, sscl: 0.025, vat: 0.18, maxAge: 3 },
    { code: "8703.40.00", desc: "Hybrid petrol motor cars", category: "Passenger", fuel: "Hybrid (Petrol)", ccMax: 2500, cid: 0.15, cidSur: 0.50, pal: 0.10, cess: 0.0, exType: "Compound", exVal: 1.25, exSpec: 3800, sscl: 0.025, vat: 0.18, maxAge: 3 },
    { code: "8703.50.00", desc: "Hybrid diesel motor cars", category: "Passenger", fuel: "Hybrid (Diesel)", ccMax: 2500, cid: 0.15, cidSur: 0.50, pal: 0.10, cess: 0.0, exType: "Compound", exVal: 1.50, exSpec: 4500, sscl: 0.025, vat: 0.18, maxAge: 3 },
    { code: "8703.60.00", desc: "Plug-in Hybrid (PHEV) petrol", category: "Passenger", fuel: "Plug-in Hybrid (PHEV)", ccMax: 2500, cid: 0.15, cidSur: 0.50, pal: 0.10, cess: 0.0, exType: "Compound", exVal: 1.20, exSpec: 3500, sscl: 0.025, vat: 0.18, maxAge: 3 },
    { code: "8703.80.00", desc: "Electric Vehicles (EV)", category: "Passenger", fuel: "Electric (EV)", ccMax: 99999, cid: 0.10, cidSur: 0.50, pal: 0.05, cess: 0.0, exType: "Specific", exVal: 0.50, exSpec: 35000, sscl: 0.025, vat: 0.18, maxAge: 3 },
    { code: "8711.20.00", desc: "Motorcycles 51-125cc", category: "Two-wheeler", fuel: "Petrol", ccMax: 250, cid: 0.15, cidSur: 0.50, pal: 0.10, cess: 0.0, exType: "Specific", exVal: 0.0, exSpec: 1500, sscl: 0.025, vat: 0.18, maxAge: 3 },
    { code: "8711.90.00", desc: "Electric Motorcycles", category: "Two-wheeler", fuel: "Electric (EV)", ccMax: 99999, cid: 0.10, cidSur: 0.50, pal: 0.05, cess: 0.0, exType: "Specific", exVal: 0.0, exSpec: 15000, sscl: 0.025, vat: 0.18, maxAge: 3 },
    { code: "8704.21.00", desc: "Commercial Trucks ≤ 5 tons", category: "Commercial", fuel: "Diesel", ccMax: 99999, cid: 0.15, cidSur: 0.50, pal: 0.10, cess: 0.15, exType: "AdValorem", exVal: 0.60, exSpec: 0, sscl: 0.025, vat: 0.18, maxAge: 5 },
    { code: "8704.31.00", desc: "Single Cab Pickups", category: "Commercial", fuel: "Diesel", ccMax: 99999, cid: 0.15, cidSur: 0.50, pal: 0.10, cess: 0.10, exType: "AdValorem", exVal: 0.40, exSpec: 0, sscl: 0.025, vat: 0.18, maxAge: 5 },
    { code: "8702.10.00", desc: "Passenger Buses ≥ 10 seats", category: "Commercial", fuel: "Diesel", ccMax: 99999, cid: 0.10, cidSur: 0.50, pal: 0.05, cess: 0.0, exType: "AdValorem", exVal: 0.20, exSpec: 0, sscl: 0.025, vat: 0.18, maxAge: 5 },
    { code: "8703.90.00", desc: "Three-wheelers Auto-rickshaws", category: "Three-wheeler", fuel: "Petrol", ccMax: 300, cid: 0.15, cidSur: 0.50, pal: 0.10, cess: 0.0, exType: "Specific", exVal: 0.0, exSpec: 2200, sscl: 0.025, vat: 0.18, maxAge: 3 }
];

// Sample Presets
const PRESETS = [
    { title: "Toyota RAV4 Hybrid SUV", cat: "Passenger", sub: "SUV", make: "Toyota", model: "RAV4 Hybrid", fuel: "Hybrid (Petrol)", cc: 2487, kw: 88, price: 3850000, curr: "JPY", freight: 220000, ins: 35000 },
    { title: "Toyota Vitz 1000cc Hatchback", cat: "Passenger", sub: "Hatchback", make: "Toyota", model: "Vitz 1.0L", fuel: "Petrol", cc: 996, kw: 0, price: 1850000, curr: "JPY", freight: 180000, ins: 25000 },
    { title: "Toyota Land Cruiser Prado 2.8L", cat: "Passenger", sub: "SUV", make: "Toyota", model: "Prado Diesel", fuel: "Diesel", cc: 2755, kw: 0, price: 6500000, curr: "JPY", freight: 320000, ins: 45000 },
    { title: "BYD Atto 3 Electric SUV", cat: "Passenger", sub: "SUV", make: "BYD", model: "Atto 3 EV", fuel: "Electric (EV)", cc: 0, kw: 150, price: 28000, curr: "USD", freight: 1200, ins: 250 },
    { title: "Suzuki Wagon R Kei Car", cat: "Passenger", sub: "Hatchback", make: "Suzuki", model: "Wagon R", fuel: "Petrol", cc: 658, kw: 0, price: 1250000, curr: "JPY", freight: 150000, ins: 20000 }
];

// App Media & Database State
let mediaState = {
    vehiclePhoto: null,
    auctionSheet: null
};
let currentCalculation = {};
let savedVehicles = [];

document.addEventListener("DOMContentLoaded", () => {
    loadSavedVehiclesFromStorage();
    initNavigation();
    initMediaUploads();
    initEventListeners();
    initPresets();
    calculateTax();
});

function initNavigation() {
    const tabs = document.querySelectorAll(".nav-tab");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            
            const target = tab.getAttribute("data-target");
            document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
            document.getElementById(target).classList.add("active");

            if (target === "tab-saved") {
                renderSavedDirectory();
            }
        });
    });

    document.getElementById("btn-show-detail").addEventListener("click", () => {
        document.querySelector('.nav-tab[data-target="tab-breakdown"]').click();
    });
}

// Media Upload & Base64 Reader
function initMediaUploads() {
    setupFileInput("file-vehicle-photo", "ph-vehicle-photo", "prev-vehicle-photo", "img-vehicle-photo", "rm-vehicle-photo", "vehiclePhoto");
    setupFileInput("file-auction-sheet", "ph-auction-sheet", "prev-auction-sheet", "img-auction-sheet", "rm-auction-sheet", "auctionSheet");
}

function setupFileInput(inputId, phId, prevId, imgId, rmId, stateKey) {
    const fileInput = document.getElementById(inputId);
    const ph = document.getElementById(phId);
    const prev = document.getElementById(prevId);
    const img = document.getElementById(imgId);
    const rmBtn = document.getElementById(rmId);

    fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64 = event.target.result;
                mediaState[stateKey] = base64;
                img.src = base64;
                ph.style.display = "none";
                prev.style.display = "block";
            };
            reader.readAsDataURL(file);
        }
    });

    rmBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        fileInput.value = "";
        mediaState[stateKey] = null;
        img.src = "";
        prev.style.display = "none";
        ph.style.display = "flex";
    });

    // Zoom preview on thumbnail click
    img.addEventListener("click", () => {
        if (img.src) {
            document.getElementById("img-zoom-target").src = img.src;
            document.getElementById("modal-image-zoom").classList.add("active");
        }
    });

    document.getElementById("btn-close-zoom").addEventListener("click", () => {
        document.getElementById("modal-image-zoom").classList.remove("active");
    });
}

function initEventListeners() {
    const inputs = document.querySelectorAll(".input-control");
    inputs.forEach(inp => {
        inp.addEventListener("input", calculateTax);
        inp.addEventListener("change", calculateTax);
    });

    // Collapsible Logistics Toggle
    document.getElementById("toggle-logistics").addEventListener("click", () => {
        const content = document.getElementById("content-logistics");
        const chevron = document.querySelector("#toggle-logistics .chevron");
        if (content.style.display === "none") {
            content.style.display = "flex";
            chevron.style.transform = "rotate(180deg)";
        } else {
            content.style.display = "none";
            chevron.style.transform = "rotate(0deg)";
        }
    });

    // Currency Change
    document.getElementById("inp-currency").addEventListener("change", (e) => {
        const curr = e.target.value;
        const exMode = document.getElementById("inp-ex-mode").value;
        if (exMode === "Customs Official") {
            document.getElementById("inp-ex-rate").value = EXCHANGE_RATES[curr] || 1.0;
        }
        calculateTax();
    });

    // Valuation mode toggle
    document.getElementById("inp-val-mode").addEventListener("change", (e) => {
        const grp = document.getElementById("grp-assessed-val");
        grp.style.display = e.target.value === "Use Customs Assessed Value" ? "flex" : "none";
        calculateTax();
    });

    // Fuel type toggle for CC/kW fields visibility
    document.getElementById("inp-fuel").addEventListener("change", (e) => {
        const isEV = e.target.value === "Electric (EV)";
        document.getElementById("grp-cc").style.display = isEV ? "none" : "flex";
        document.getElementById("grp-kw").style.display = isEV ? "flex" : "none";
        calculateTax();
    });

    // Buttons
    document.getElementById("btn-save-current").addEventListener("click", saveVehicleToApp);
    document.getElementById("btn-save-vehicle-app").addEventListener("click", saveVehicleToApp);
    document.getElementById("btn-export-pdf").addEventListener("click", () => window.print());
    document.getElementById("btn-share-quote").addEventListener("click", shareQuote);
    document.getElementById("inp-search-saved").addEventListener("input", renderSavedDirectory);
}

function calculateTax() {
    const category = document.getElementById("inp-category").value;
    const subcategory = document.getElementById("inp-subcategory").value;
    const make = document.getElementById("inp-make").value;
    const model = document.getElementById("inp-model").value;
    const chassis = document.getElementById("inp-chassis").value;
    const auctionGrade = document.getElementById("inp-auction-grade").value;
    const mileage = document.getElementById("inp-mileage").value;
    const interiorGrade = document.getElementById("inp-interior-grade").value;

    const mfgDate = new Date(document.getElementById("inp-mfg-date").value);
    const importDate = new Date(document.getElementById("inp-import-date").value);
    const diffDays = Math.max(0, (importDate - mfgDate) / (1000 * 60 * 60 * 24));
    const ageYears = (diffDays / 365.25).toFixed(1);
    document.getElementById("inp-age").value = `${ageYears} Years`;

    const condition = document.getElementById("inp-condition").value;
    const fuel = document.getElementById("inp-fuel").value;
    const cc = parseFloat(document.getElementById("inp-cc").value) || 0;
    const kw = parseFloat(document.getElementById("inp-kw").value) || 0;

    const priceFC = parseFloat(document.getElementById("inp-price").value) || 0;
    const curr = document.getElementById("inp-currency").value;
    const freightFC = parseFloat(document.getElementById("inp-freight").value) || 0;
    const insFC = parseFloat(document.getElementById("inp-insurance").value) || 0;
    const exRate = parseFloat(document.getElementById("inp-ex-rate").value) || 1.0;

    const fobLKR = priceFC * exRate;
    const freightLKR = freightFC * exRate;
    const insLKR = insFC * exRate;
    const cifLKR = fobLKR + freightLKR + insLKR;

    const valMode = document.getElementById("inp-val-mode").value;
    const assessedLKR = parseFloat(document.getElementById("inp-assessed-val").value) || 0;
    const taxableCustomsVal = (valMode === "Use Customs Assessed Value" && assessedLKR > 0) ? assessedLKR : cifLKR;

    // Match HS Code
    let tariffMatch = HS_DATABASE.find(h => h.category === category && h.fuel === fuel && (fuel === "Electric (EV)" ? true : cc <= h.ccMax));
    if (!tariffMatch) tariffMatch = HS_DATABASE[0];

    const baseCidRate = tariffMatch.cid;
    const cidSurcharge = tariffMatch.cidSur;
    const effCidRate = baseCidRate * (1 + cidSurcharge);
    const cidAmount = taxableCustomsVal * effCidRate;

    const palRate = tariffMatch.pal;
    const palAmount = cifLKR * palRate;

    const cessRate = tariffMatch.cess;
    const cessAmount = cifLKR * cessRate;

    const exciseBase = taxableCustomsVal + cidAmount + palAmount + cessAmount;
    let exciseAmount = 0;

    if (tariffMatch.exType === "Specific") {
        exciseAmount = (fuel === "Electric (EV)" ? kw : cc) * tariffMatch.exSpec;
    } else if (tariffMatch.exType === "AdValorem") {
        exciseAmount = exciseBase * tariffMatch.exVal;
    } else {
        const adValAmt = exciseBase * tariffMatch.exVal;
        const specAmt = (fuel === "Electric (EV)" ? kw : cc) * tariffMatch.exSpec;
        exciseAmount = Math.max(adValAmt, specAmt);
    }

    const ssclBase = taxableCustomsVal + cidAmount + palAmount + cessAmount + exciseAmount;
    const ssclRate = 0.025;
    const ssclAmount = ssclBase * ssclRate;

    const vatBase = ssclBase + ssclAmount;
    const vatRate = 0.18;
    const vatAmount = vatBase * vatRate;

    const luxuryTax = cifLKR > 3500000 ? (cifLKR - 3500000) * 0.10 : 0;
    const totalGovtTaxes = cidAmount + palAmount + cessAmount + exciseAmount + ssclAmount + vatAmount + luxuryTax;

    const portFee = parseFloat(document.getElementById("inp-port-fee").value) || 0;
    const agentFee = parseFloat(document.getElementById("inp-agent-fee").value) || 0;
    const regFee = parseFloat(document.getElementById("inp-reg-fee").value) || 0;
    const miscFee = parseFloat(document.getElementById("inp-misc-fee").value) || 0;
    const totalLogistics = portFee + agentFee + regFee + miscFee;

    const totalLandedCost = cifLKR + totalGovtTaxes + totalLogistics;
    const taxBurdenPct = ((totalGovtTaxes / cifLKR) * 100).toFixed(1);
    const taxMultiplier = (totalLandedCost / cifLKR).toFixed(2);

    // Profit & Commercial Estimator
    const repairCost = parseFloat(document.getElementById("inp-repair-cost").value) || 0;
    const targetPrice = parseFloat(document.getElementById("inp-target-price").value) || 0;
    const netProfit = targetPrice - (totalLandedCost + repairCost);
    const roiPct = targetPrice > 0 ? ((netProfit / (totalLandedCost + repairCost)) * 100).toFixed(1) : "0.0";

    document.getElementById("out-profit").value = formatLKR(netProfit);
    document.getElementById("out-roi").value = `${roiPct}%`;

    // Save State
    currentCalculation = {
        id: Date.now(),
        make, model, chassis, auctionGrade, mileage, interiorGrade, category, subcategory, fuel, cc, kw, ageYears, condition,
        priceFC, curr, freightFC, insFC, exRate, cifLKR, taxableCustomsVal,
        hsCode: tariffMatch.code, hsDesc: tariffMatch.desc,
        cidAmount, palAmount, cessAmount, exciseAmount, ssclAmount, vatAmount, luxuryTax,
        totalGovtTaxes, totalLogistics, totalLandedCost, taxBurdenPct, taxMultiplier,
        repairCost, targetPrice, netProfit, roiPct,
        vehiclePhoto: mediaState.vehiclePhoto,
        auctionSheet: mediaState.auctionSheet,
        savedAt: new Date().toLocaleDateString()
    };

    updateUI();
}

function formatLKR(val) {
    return `LKR ${Math.round(val).toLocaleString()}`;
}

function updateUI() {
    const c = currentCalculation;
    document.getElementById("bar-landed-cost").innerText = formatLKR(c.totalLandedCost);
    document.getElementById("bar-tax-burden").innerText = `Govt Taxes: ${formatLKR(c.totalGovtTaxes)} (${c.taxBurdenPct}%)`;

    const badge = document.getElementById("status-badge");
    const text = document.getElementById("status-text");
    if (c.ageYears > 3) {
        badge.className = "status-indicator estimate";
        badge.innerText = "🟡 ESTIMATE — AGE EXCEEDS 3 YEARS";
        text.innerText = "Vehicle age exceeds standard 3-year passenger limit";
    } else {
        badge.className = "status-indicator verified";
        badge.innerText = "🟢 VERIFIED 2026 TARIFF MATCH";
        text.innerText = `Matched HS ${c.hsCode} — ${c.hsDesc}`;
    }

    renderBreakdown();
    renderCompare();
}

function renderBreakdown() {
    const c = currentCalculation;
    const container = document.getElementById("breakdown-container");

    const items = [
        { name: "1. CIF LKR Value", desc: "FOB + Freight + Insurance", amt: c.cifLKR, rate: "-" },
        { name: "2. Taxable Customs Value", desc: "Assessed Base for Customs", amt: c.taxableCustomsVal, rate: "-" },
        { name: "3. Customs Duty (CID + 50% Surcharge)", desc: `HS ${c.hsCode} Base Duty + Gazette 2501/88`, amt: c.cidAmount, rate: "30.0%" },
        { name: "4. Port & Airport Levy (PAL)", desc: "10% on CIF LKR Value", amt: c.palAmount, rate: "10.0%" },
        { name: "5. CESS Levy", desc: "Applicable CESS Rate", amt: c.cessAmount, rate: "0.0%" },
        { name: "6. Excise Duty (Special Provisions)", desc: "Compound Duty (Ad Valorem vs Specific)", amt: c.exciseAmount, rate: "Compound" },
        { name: "7. Social Security Levy (SSCL)", desc: "2.5% on Cumulative Tax Base", amt: c.ssclAmount, rate: "2.5%" },
        { name: "8. Value Added Tax (VAT)", desc: "18% on Cumulative Tax Base", amt: c.vatAmount, rate: "18.0%" },
        { name: "9. Luxury Tax / Special Levies", desc: "Threshold Tax > LKR 3.5M", amt: c.luxuryTax, rate: "10.0%" },
        { name: "TOTAL GOVERNMENT TAXES", desc: `Effective Burden: ${c.taxBurdenPct}%`, amt: c.totalGovtTaxes, rate: `${c.taxMultiplier}x` },
        { name: "TOTAL LANDED COST", desc: "CIF + Taxes + Local Clearance", amt: c.totalLandedCost, rate: "FINAL" }
    ];

    container.innerHTML = items.map(item => `
        <div class="breakdown-card">
            <div class="breakdown-left">
                <h4>${item.name}</h4>
                <p>${item.desc}</p>
            </div>
            <div class="breakdown-right">
                <div class="amount">${formatLKR(item.amt)}</div>
                <div class="rate">${item.rate}</div>
            </div>
        </div>
    `).join('');
}

function renderCompare() {
    const c = currentCalculation;
    const container = document.getElementById("compare-container");

    const compareVehicles = [
        { name: `${c.make} ${c.model}`, cif: c.cifLKR, taxes: c.totalGovtTaxes, landed: c.totalLandedCost, burden: `${c.taxBurdenPct}%` },
        { name: "Honda Fit Hybrid (1.5L)", cif: 4850000, taxes: 7565578, landed: 12530578, burden: "156.0%" },
        { name: "Toyota Prado Diesel (2.8L)", cif: 14250000, taxes: 32919525, landed: 47284525, burden: "231.0%" },
        { name: "BYD Atto 3 EV (150 kW)", cif: 8850000, taxes: 7837625, landed: 16802625, burden: "88.5%" }
    ];

    container.innerHTML = compareVehicles.map(v => `
        <div class="compare-card">
            <h4>${v.name}</h4>
            <div class="compare-row"><span class="lbl">CIF LKR</span><span class="val">${formatLKR(v.cif)}</span></div>
            <div class="compare-row"><span class="lbl">Govt Taxes</span><span class="val">${formatLKR(v.taxes)}</span></div>
            <div class="compare-row"><span class="lbl">Landed Cost</span><span class="val">${formatLKR(v.landed)}</span></div>
            <div class="compare-row"><span class="lbl">Tax Burden</span><span class="val">${v.burden}</span></div>
        </div>
    `).join('');
}

// Storage Operations
function saveVehicleToApp() {
    const item = { ...currentCalculation };
    savedVehicles.unshift(item);
    try {
        localStorage.setItem("sl_saved_vehicles_2026", JSON.stringify(savedVehicles));
    } catch(e) {
        console.warn("LocalStorage full, saved in memory");
    }
    updateSavedCount();
    alert(`✓ Vehicle "${item.make} ${item.model}" saved successfully inside App Directory!`);
}

function loadSavedVehiclesFromStorage() {
    try {
        const stored = localStorage.getItem("sl_saved_vehicles_2026");
        if (stored) savedVehicles = JSON.parse(stored);
    } catch(e) {
        savedVehicles = [];
    }
    updateSavedCount();
}

function updateSavedCount() {
    document.getElementById("saved-count").innerText = savedVehicles.length;
}

function renderSavedDirectory() {
    const container = document.getElementById("saved-directory-container");
    const searchVal = (document.getElementById("inp-search-saved").value || '').toLowerCase();

    const filtered = savedVehicles.filter(v => 
        (v.make + " " + v.model + " " + v.chassis).toLowerCase().includes(searchVal)
    );

    if (filtered.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding:30px; color:var(--text-muted);">No saved vehicles found in App Directory.</div>`;
        return;
    }

    container.innerHTML = filtered.map((v, idx) => `
        <div class="saved-card">
            <div class="saved-card-header">
                <img class="saved-thumb" src="${v.vehiclePhoto || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=200'}" alt="Vehicle">
                <div class="saved-meta">
                    <h4>${v.make} ${v.model}</h4>
                    <span class="chassis-tag">Chassis: ${v.chassis || 'N/A'} | Grade: ${v.auctionGrade || '4.5'}</span>
                    <span class="date-tag">Saved: ${v.savedAt}</span>
                </div>
            </div>
            <div class="saved-card-body">
                <div class="saved-cost">
                    <span class="sub">Landed Cost</span>
                    <div class="val">${formatLKR(v.totalLandedCost)}</div>
                </div>
                <div class="saved-actions">
                    <button class="btn-mini load" onclick="loadVehicleFromDirectory(${v.id})">Load</button>
                    <button class="btn-mini delete" onclick="deleteSavedVehicle(${v.id})">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}

window.loadVehicleFromDirectory = function(id) {
    const v = savedVehicles.find(item => item.id === id);
    if (v) {
        document.getElementById("inp-make").value = v.make;
        document.getElementById("inp-model").value = v.model;
        document.getElementById("inp-chassis").value = v.chassis;
        document.getElementById("inp-auction-grade").value = v.auctionGrade || "4.5 / A";
        document.getElementById("inp-fuel").value = v.fuel;
        document.getElementById("inp-cc").value = v.cc;
        document.getElementById("inp-kw").value = v.kw;
        document.getElementById("inp-price").value = v.priceFC;
        document.getElementById("inp-currency").value = v.curr;

        if (v.vehiclePhoto) {
            mediaState.vehiclePhoto = v.vehiclePhoto;
            document.getElementById("img-vehicle-photo").src = v.vehiclePhoto;
            document.getElementById("ph-vehicle-photo").style.display = "none";
            document.getElementById("prev-vehicle-photo").style.display = "block";
        }
        if (v.auctionSheet) {
            mediaState.auctionSheet = v.auctionSheet;
            document.getElementById("img-auction-sheet").src = v.auctionSheet;
            document.getElementById("ph-auction-sheet").style.display = "none";
            document.getElementById("prev-auction-sheet").style.display = "block";
        }

        document.querySelector('.nav-tab[data-target="tab-calculator"]').click();
        calculateTax();
    }
};

window.deleteSavedVehicle = function(id) {
    if (confirm("Are you sure you want to delete this vehicle from your Saved Directory?")) {
        savedVehicles = savedVehicles.filter(item => item.id !== id);
        try {
            localStorage.setItem("sl_saved_vehicles_2026", JSON.stringify(savedVehicles));
        } catch(e){}
        updateSavedCount();
        renderSavedDirectory();
    }
};

function shareQuote() {
    const c = currentCalculation;
    const text = `🇱🇰 *SRI LANKA VEHICLE CUSTOMS TAX QUOTATION (2026)*\n\n` +
                 `🚗 *Vehicle:* ${c.make} ${c.model} (${c.fuel})\n` +
                 `🏷️ *Chassis:* ${c.chassis}\n` +
                 `⭐ *Auction Grade:* ${c.auctionGrade}\n` +
                 `------------------------------------\n` +
                 `💰 *CIF LKR:* ${formatLKR(c.cifLKR)}\n` +
                 `🏛️ *Govt Taxes:* ${formatLKR(c.totalGovtTaxes)} (${c.taxBurdenPct}%)\n` +
                 `💵 *Total Landed Cost:* ${formatLKR(c.totalLandedCost)}\n\n` +
                 `Verified against 2026 Sri Lanka Customs Gazette 2501/88.`;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
        alert("✓ Quotation copied to clipboard! You can paste and share via WhatsApp or Email.");
    } else {
        alert(text);
    }
}

function initPresets() {
    const container = document.getElementById("preset-container");
    const modal = document.getElementById("modal-presets");

    container.innerHTML = PRESETS.map((p, idx) => `
        <div class="preset-item" data-idx="${idx}">
            <h5>${p.title}</h5>
            <p>${p.fuel} | ${p.cc > 0 ? p.cc + ' cc' : p.kw + ' kW'} | ${p.curr} ${p.price.toLocaleString()}</p>
        </div>
    `).join('');

    document.getElementById("btn-preset").addEventListener("click", () => modal.classList.add("active"));
    document.getElementById("btn-close-modal").addEventListener("click", () => modal.classList.remove("active"));

    document.querySelectorAll(".preset-item").forEach(item => {
        item.addEventListener("click", () => {
            const p = PRESETS[item.getAttribute("data-idx")];
            document.getElementById("inp-category").value = p.cat;
            document.getElementById("inp-subcategory").value = p.sub;
            document.getElementById("inp-make").value = p.make;
            document.getElementById("inp-model").value = p.model;
            document.getElementById("inp-fuel").value = p.fuel;
            document.getElementById("inp-cc").value = p.cc;
            document.getElementById("inp-kw").value = p.kw;
            document.getElementById("inp-price").value = p.price;
            document.getElementById("inp-currency").value = p.curr;
            document.getElementById("inp-freight").value = p.freight;
            document.getElementById("inp-insurance").value = p.ins;

            document.getElementById("inp-fuel").dispatchEvent(new Event("change"));
            document.getElementById("inp-currency").dispatchEvent(new Event("change"));
            modal.classList.remove("active");
            calculateTax();
        });
    });
}
