# SmartSalon AI

A responsive salon booking and day-to-day management prototype built with React, Vite, React Router, and browser local storage.

## Run it

Requirements: Node.js 20.19+ (or 22.12+) and pnpm 10+.

```sh
pnpm install
pnpm dev
```

Open the local URL printed by Vite. To create and serve a production build:

```sh
pnpm build
pnpm preview
```

## What is implemented

- Customer home, service catalogue with search/filter, employee directory, multi-step booking, live queue, booking lookup, and customer preferences.
- Required employee/service defaults: Tulasi offers eyebrow threading and waxing; Shankar offers haircuts, beard trimming, hair styling, and general grooming.
- Slot calculation checks configured salon hours, employee work hours, breaks, holidays/special schedules, service assignments, blocked periods, existing bookings, booking duration, and past times. Appointment changes are checked for schedule conflicts.
- Booking references, customer records, appointment status changes, queue numbers, queue progression, customer preferences, service prices/durations, employee availability/schedules, salon settings, offers, and analytics persist in local storage.
- Staff dashboard with overview, day/week appointment lists, appointment creation and rescheduling, queue operations, employee schedule and assignments, customer lookup/history, service editing, analytics, settings, offer management, and demo reset.
- Indian rupee formatting and Asia/Kolkata date/time display throughout. Public queue information does not expose customer names or contact details.
- Staff can preview reminder and offer text. The prototype does not send SMS, email, or WhatsApp messages.

## Demo data and research

The starting state includes sample services and clearly marked sample appointments, customers, and walk-ins. Starter prices, durations, and the example opening hours are illustrative, editable values. Do not treat them as confirmed business information. The pasted brief summarized three interviews (two salon workers and one customer); interview transcript files were not present in the supplied workspace, so the implementation uses only the findings stated in the brief and makes no statistical claims.

## Data and security limits

This is a frontend-only demo. Data is saved in the current browser profile with `localStorage`; it is not shared with another browser or device, backed up, encrypted as an application feature, or protected by secure staff/customer authentication. The staff dashboard is openly accessible as demo access. Use fictitious data during presentations. No real salon address or phone number is configured.

The queue estimate is a transparent duration-based estimate using the current service, customers ahead, and scheduled appointments that take priority. It cannot account for unexpected delays. Queue actions are local to this browser and do not synchronize between staff devices.

## Reset demo data

Open **Staff dashboard → Settings → Reset demo** and confirm. This restores the initial services, Tulasi and Shankar assignments, example hours, and labelled sample records in this browser.

## Verification performed

- `pnpm run build` completed successfully.
- Started the Vite development server and opened the site in the in-app browser.
- Checked the homepage, customer booking and service/team data, booking form validation, slot generation, service/employee qualification, and exclusion of an already-booked overlapping slot.
- Completed a sample haircut booking and verified its confirmation, customer booking lookup, and appearance in the staff overview.
- Added a walk-in to Tulasi's queue, called the customer, started service, and completed the entry.
- Edited a service price and opening hours, then confirmed the values updated across the site.
- Marked Tulasi unavailable and confirmed eyebrow-threading slots were removed.
- Saved a customer grooming preference, refreshed, and confirmed it remained available as an explicit booking reminder.
- Reset demo data and confirmed the starter price, opening hours, employee availability, and sample queue returned.
- Checked public queue privacy and the customer, staff, and booking layouts at desktop and mobile widths.
- Verified staff overview crowding, next-slot, expected booking value, and employee/service details render.

The site has not been connected to a backend, SMS/email provider, production authentication, payment service, or real salon schedule.
