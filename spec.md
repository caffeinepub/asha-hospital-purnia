# Asha Hospital Purnia

## Current State
The app has 4 tabs: Home, Doctors, Services, Contact. Backend stores hospital info, 9 doctors, services, and contact info. No appointment booking functionality exists.

## Requested Changes (Diff)

### Add
- Online OPD Appointment booking form (new tab "OPD अपॉइंटमेंट")
- Backend: OPD appointment type with fields: patient name, phone, doctor selected, date, time slot, message
- Backend: `bookAppointment` function to store appointment
- Backend: `getAppointments` function to retrieve all appointments (admin view)
- Frontend: OPD Booking page with form — patient name, phone number, select doctor, select date, select time slot, optional message
- Frontend: Success confirmation screen after booking
- Frontend: Show booked appointment reference number
- Payment note: No actual online payment gateway (Stripe not enabled); show "Pay at Hospital" option clearly with UPI QR code placeholder

### Modify
- App.tsx: Add 5th nav tab "OPD" with calendar icon
- Backend: Add appointment storage and booking functions

### Remove
- Nothing removed

## Implementation Plan
1. Update backend (main.mo) to add Appointment type, bookAppointment, getAppointments functions
2. Regenerate backend.d.ts types
3. Create OpdPage.tsx with booking form: name, phone, doctor dropdown (from backend doctors list), date picker, time slot selector, optional note
4. Add success state showing confirmation with appointment ID
5. Add OPD tab to App.tsx navigation with CalendarDays icon
6. Wire form to backend bookAppointment call
