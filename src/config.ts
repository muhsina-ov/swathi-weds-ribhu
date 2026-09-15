// ─────────────────────────────────────────────────────────────
//  WEDDING CONFIG — edit this one file per customer
// ─────────────────────────────────────────────────────────────

export const wedding = {
  bride: "Swati",
  groom: "Ribhu",
  brideFull: "Swati Gupta",
  groomFull: "Ribhu Pramanik",
  brideParents: "Daughter of Smt. & Shri Gupta",
  groomParents: "Son of Smt. & Shri Pramanik",
  hashtag: "#SwatiWedsRibhu",
  monogram: "S · R",

  // Wedding reception muhurat (countdown + calendar target)
  dateISO: "2026-12-08T18:30:00+05:30",
  dateLabel: "Tuesday, 8th December 2026",
  timeLabel: "Reception at 6:30 PM onwards",

  venue: {
    name: "Swapno Bhor (Seniors' Park)",
    address: "Action Area I, New Town, Kolkata, West Bengal 700156",
    mapsQuery: "Swapno Bhor Seniors Park Newtown Kolkata",
    directUrl: "https://maps.app.goo.gl/UchqNP23Zeeed2yG8",
  },

  verse: {
    hindi: "॥ श्री गणेशाय नमः ॥",
    text: "Together with their families, Swati and Ribhu cordially request the honour of your presence to celebrate their Wedding Reception as two beautiful traditions unite in love.",
  },

  // The event for the day — Wedding Reception
  events: [
    {
      name: "Wedding Reception",
      icon: "heart",
      date: "Tuesday, 8th December 2026",
      time: "6:30 PM Onwards",
      venue: "Swapno Bhor (Seniors' Park), New Town, Kolkata",
      note: "An auspicious evening celebrating the confluence of Bengali & North Indian traditions, dinner & festivities.",
    },
  ],
};

// Google Calendar deep link — derived from dateISO so it stays correct.
export const googleCalendarUrl = () => {
  // Convert 2026-12-06T16:30:00+05:30 → 20261206T110000Z
  const start = new Date(wedding.dateISO);
  const end = new Date(start.getTime() + 7 * 60 * 60 * 1000);
  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]|\.\d{3}/g, "").slice(0, 15) + "Z";
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${wedding.bride} weds ${wedding.groom}`,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: `${wedding.venue.name} — ${wedding.venue.address}. ${wedding.hashtag}`,
    location: `${wedding.venue.name}, ${wedding.venue.address}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

// Downloadable .ics file (works with Apple / Outlook / any calendar).
export const downloadICS = () => {
  const start = new Date(wedding.dateISO);
  const end = new Date(start.getTime() + 7 * 60 * 60 * 1000);
  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:.]/g, "").slice(0, 15) + "Z";
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//InviteStory//Wedding//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@invitestory`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${wedding.bride} weds ${wedding.groom}`,
    `DESCRIPTION:${wedding.venue.name} — ${wedding.venue.address}`,
    `LOCATION:${wedding.venue.name}\\, ${wedding.venue.address}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${wedding.bride}-${wedding.groom}-wedding.ics`;
  a.click();
  URL.revokeObjectURL(url);
};

export const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
  wedding.venue.name + " " + wedding.venue.address
)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

export const mapsDirectionsUrl =
  wedding.venue.directUrl ||
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    wedding.venue.mapsQuery
  )}`;