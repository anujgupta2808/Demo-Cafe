/**
 * Demo Café — Table Reservation Module
 * 
 * Handles reservation form validation, past-date prevention,
 * and formats Click-to-Chat WhatsApp reservation requests.
 */

const AureliaReservation = (() => {
  // Format today's date as YYYY-MM-DD
  const getTodayDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  // Restrict date inputs to today onwards
  const setupDateInputs = () => {
    const todayStr = getTodayDateString();
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
      input.min = todayStr;
      if (!input.value) {
        input.value = todayStr;
      }
    });
  };

  // Validate past dates
  const isDateInPast = (dateStr) => {
    if (!dateStr) return true;
    const selectedDate = new Date(dateStr + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate < today;
  };

  // Send WhatsApp reservation request
  const submitReservation = (formData) => {
    const waNumber = (typeof CAFE_CONFIG !== "undefined") ? CAFE_CONFIG.whatsappNumber : "918779747746";

    // Validate fields
    if (!formData.name || formData.name.trim().length < 2) {
      alert("Please enter a valid guest name.");
      return false;
    }

    if (formData.requirePhone && (!formData.phone || formData.phone.trim().length < 8)) {
      alert("Please provide a valid contact phone number.");
      return false;
    }

    if (isDateInPast(formData.date)) {
      alert("Please select a valid reservation date (past dates cannot be booked).");
      return false;
    }

    if (!formData.time) {
      alert("Please select your preferred reservation time.");
      return false;
    }

    if (!formData.guests || parseInt(formData.guests, 10) < 1) {
      alert("Please specify the number of guests.");
      return false;
    }

    // Format WhatsApp message
    let msg = `📅 *TABLE RESERVATION REQUEST — DEMO CAFÉ*\n`;
    msg += `--------------------------------------\n`;
    msg += `👤 *Guest Name:* ${formData.name.trim()}\n`;
    if (formData.phone && formData.phone.trim().length > 0) {
      msg += `📞 *Phone:* ${formData.phone.trim()}\n`;
    } else {
      msg += `📞 *Phone:* (Sending via this WhatsApp chat)\n`;
    }
    if (formData.email) {
      msg += `✉️ *Email:* ${formData.email.trim()}\n`;
    }
    msg += `🗓️ *Date:* ${formData.date}\n`;
    msg += `⏰ *Time:* ${formData.time}\n`;
    msg += `👥 *Number of Guests:* ${formData.guests} ${parseInt(formData.guests, 10) === 1 ? "Person" : "People"}\n`;
    if (formData.seating) {
      msg += `🪑 *Seating Preference:* ${formData.seating}\n`;
    }
    if (formData.requests) {
      msg += `✨ *Special Request:* ${formData.requests.trim()}\n`;
    }
    msg += `--------------------------------------\n`;
    msg += `_I understand this booking is pending until Demo Café staff confirms table availability._`;

    const encoded = encodeURIComponent(msg);
    const whatsappUrl = `https://wa.me/${waNumber}?text=${encoded}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

    // Show confirmation modal or alert
    alert(
      `Table Reservation Request Sent!\n\n` +
      `Your booking request has been drafted in WhatsApp.\n` +
      `Please tap "Send" in WhatsApp to notify our reservation desk.\n\n` +
      `Important: Your reservation is PENDING until our staff replies with a confirmation.`
    );

    return true;
  };

  // Wire full reservation page form
  const initPageForm = () => {
    const form = document.getElementById("reservationFullForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = {
        requirePhone: true,
        name: document.getElementById("resName") ? document.getElementById("resName").value : "",
        phone: document.getElementById("resPhone") ? document.getElementById("resPhone").value : "",
        email: document.getElementById("resEmail") ? document.getElementById("resEmail").value : "",
        date: document.getElementById("resDate") ? document.getElementById("resDate").value : "",
        time: document.getElementById("resTime") ? document.getElementById("resTime").value : "",
        guests: document.getElementById("resGuests") ? document.getElementById("resGuests").value : "",
        seating: document.getElementById("resSeating") ? document.getElementById("resSeating").value : "",
        requests: document.getElementById("resRequests") ? document.getElementById("resRequests").value : ""
      };

      const success = submitReservation(formData);
      if (success) {
        form.reset();
        setupDateInputs();
      }
    });
  };

  // Wire quick reservation form on homepage
  const initQuickForm = () => {
    const quickForm = document.getElementById("quickReserveForm");
    if (!quickForm) return;

    quickForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = {
        requirePhone: false,
        name: document.getElementById("quickResName") ? document.getElementById("quickResName").value : "",
        phone: document.getElementById("quickResPhone") ? document.getElementById("quickResPhone").value : "",
        date: document.getElementById("quickResDate") ? document.getElementById("quickResDate").value : "",
        time: document.getElementById("quickResTime") ? document.getElementById("quickResTime").value : "",
        guests: document.getElementById("quickResGuests") ? document.getElementById("quickResGuests").value : "2",
        seating: "Standard Indoor",
        requests: ""
      };

      const success = submitReservation(formData);
      if (success) {
        quickForm.reset();
        setupDateInputs();
      }
    });
  };

  const init = () => {
    setupDateInputs();
    initPageForm();
    initQuickForm();
  };

  return {
    init,
    submitReservation
  };
})();

const DemoReservation = AureliaReservation;
if (typeof window !== "undefined") {
  window.DemoReservation = AureliaReservation;
  window.AureliaReservation = AureliaReservation;
}

document.addEventListener("DOMContentLoaded", AureliaReservation.init);
