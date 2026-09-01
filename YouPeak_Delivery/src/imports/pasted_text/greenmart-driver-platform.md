CREATE A COMPLETE WORKING FRONTEND FOR A PREMIUM MULTI-VENDOR E-COMMERCE DRIVER / DELIVERY PARTNER PLATFORM.

TECHNOLOGY:
- React
- Vite
- React Router
- Responsive web application
- Mobile-first behavior where appropriate
- Reusable component architecture

PROJECT:
GreenMart
DRIVER / DELIVERY PARTNER PLATFORM

==================================================
CRITICAL REQUIREMENT
==================================================

Create the ACTUAL WORKING FRONTEND.

Do NOT create:
- a poster
- a presentation board
- a static mockup
- a dashboard collage
- a desktop-only admin panel
- a mobile-only isolated concept

The application must work beautifully across ALL SCREEN SIZES.

It must adapt correctly to:

- Large Desktop
- Standard Desktop
- Laptop
- Tablet Landscape
- Tablet Portrait
- Mobile
- Small Mobile

The same application should intelligently change navigation and layout based on the screen size.

DESKTOP / TABLET LANDSCAPE:
Use a professional left sidebar + top header delivery dashboard.

MOBILE:
Use a fixed BOTTOM NAVIGATION BAR.

The responsive behavior is extremely important.

Do not simply shrink the desktop dashboard into mobile.

Create dedicated mobile layouts while keeping the same GreenMart design system.

==================================================
1. PLATFORM PURPOSE
==================================================

This interface is for:

- Delivery Partners
- Drivers
- Riders

The driver should be able to manage:

- Availability
- Assigned deliveries
- Pickup workflow
- Delivery workflow
- Navigation
- OTP verification
- COD collection
- Proof of delivery
- Delivery history
- Earnings
- Incentives
- Payouts
- Notifications
- Profile
- Documents
- Vehicle details
- Bank / UPI details
- Support
- Settings

Do NOT provide super-admin controls.

Do NOT provide seller/vendor management controls.

The driver should only access information necessary for their own deliveries and account.

==================================================
2. VISUAL IDENTITY
==================================================

BRAND:
GreenMart

PRODUCT:
Delivery Partner

STYLE:
Premium modern delivery operations platform.

Design language:

- Clean
- Fast
- Highly readable
- Professional
- Trustworthy
- Mobile-friendly
- Driver-focused
- Minimal distractions
- Clear action hierarchy
- Easy to use outdoors

PRIMARY GREEN:
#16A34A

DEEP GREEN:
#0B6B35

DARK TEXT:
#10252E

SIDEBAR:
#102A33

BACKGROUND:
#F5F7F6

CARD:
#FFFFFF

SECONDARY TEXT:
#64748B

BORDER:
#E6EBE8

SUCCESS:
#16A34A

WARNING:
#F59E0B

ERROR:
#EF4444

INFO:
#3B82F6

Use green for:

- primary actions
- active navigation
- online status
- successful delivery states
- positive earnings
- progress indicators

Do not overuse green backgrounds.

==================================================
3. TYPOGRAPHY
==================================================

Use:

Inter

or a similar highly readable professional sans-serif.

Typography must adapt by screen size.

DESKTOP:
Compact SaaS dashboard typography.

MOBILE:
Larger touch-friendly readable text.

Create styles for:

Display

H1

H2

H3

Body

Small

Caption

Amount

Status

Button

Badge

==================================================
4. RESPONSIVE BREAKPOINT SYSTEM
==================================================

Design explicitly for:

1536px+
1440px
1366px
1280px
1024px
768px
430px
412px
390px
375px
360px

Suggested behavior:

DESKTOP:
1200px+

TABLET:
768px – 1199px

MOBILE:
Below 768px

Use:

CSS Grid
Flexbox
Auto Layout
Fluid sizing
Responsive spacing
Responsive typography
Max-width
Min-width
Clamp where useful

Avoid excessive fixed widths.

==================================================
5. DESKTOP APPLICATION SHELL
==================================================

For desktop create:

LEFT SIDEBAR

TOP HEADER

MAIN CONTENT AREA

The sidebar should remain fixed.

TOP SIDEBAR:

GreenMart logo

GreenMart

DELIVERY PARTNER

NAVIGATION:

Dashboard

Deliveries

Delivery History

Earnings

Payouts

Incentives

Notifications

Performance

Documents

Vehicle

Support

Settings

BOTTOM:

Help Center

Driver avatar

Driver Name

Driver ID

Online / Offline status

Logout

ACTIVE NAVIGATION:

Green highlighted state.

SIDEBAR:

Collapsible.

==================================================
6. DESKTOP TOP HEADER
==================================================

Include:

Page title

Breadcrumb where useful

Search

Current status

Online / Offline toggle

Notifications

Help

Driver avatar

Driver name

Profile dropdown

Optional:

All Systems Operational

Keep compact.

==================================================
7. TABLET NAVIGATION
==================================================

For tablet:

Collapse sidebar automatically when required.

Use:

Icon-only sidebar

or

Drawer navigation

Maintain top header.

Do not squeeze desktop sidebar into narrow tablet layouts.

==================================================
8. MOBILE HEADER
==================================================

On mobile:

Do NOT show the desktop sidebar.

Create dedicated mobile header.

HOME:

Driver avatar

Greeting

Online / Offline status

Notification icon

Other pages:

Back button where required

Page title

Contextual action icon

Keep mobile header compact and sticky where useful.

==================================================
9. MOBILE BOTTOM NAVIGATION
==================================================

THIS IS MANDATORY.

Create a fixed bottom navigation bar with 5 items:

HOME

DELIVERIES

EARNINGS

NOTIFICATIONS

PROFILE

Icons:

Home

Package

Wallet

Bell

User

ACTIVE:

Green icon

Green label

Subtle active background / indicator

INACTIVE:

Muted gray

The bottom navigation must:

- remain fixed
- respect safe-area-inset-bottom
- never cover page content
- show unread badge on Notifications where appropriate

Hide bottom navigation during focused workflows such as:

- full-screen navigation
- QR scanner
- barcode scanner
- OTP verification
- camera
- proof of delivery
- critical delivery confirmation

==================================================
10. ROUTES
==================================================

Create these React Router routes:

/

/deliveries

/deliveries/:id

/deliveries/:id/pickup

/deliveries/:id/navigation

/deliveries/:id/verify-pickup

/deliveries/:id/package-check

/deliveries/:id/delivery

/deliveries/:id/verify-delivery

/deliveries/:id/proof

/history

/earnings

/payouts

/incentives

/notifications

/performance

/profile

/profile/documents

/profile/vehicle

/profile/bank

/support

/support/:id

/settings

/login

/register

/verify

/approval-status

==================================================
11. DRIVER DASHBOARD / HOME
==================================================

Route:
/

Create a driver-focused dashboard.

DESKTOP:

Use dashboard layout with:

- Driver status
- Today's deliveries
- Completed
- Pending
- Today's earnings
- Current delivery
- Upcoming deliveries
- Delivery progress
- Quick actions

MOBILE:

Keep extremely simple and action-oriented.

TOP:

Greeting

Driver Name

Online / Offline toggle

Notification

SUMMARY CARDS:

Today's Deliveries

Completed

Pending

Today's Earnings

Use compact 2-column mobile grid.

==================================================
12. CURRENT DELIVERY
==================================================

This is the most important dashboard card.

Show:

CURRENT DELIVERY

Order ID

Current status

Pickup / Delivery stage

Customer or Vendor

Location

Distance

ETA

Payment type

Primary button:

CONTINUE DELIVERY

Secondary quick actions:

CALL

NAVIGATE

On mobile:

Make this card prominent and easy to tap.

==================================================
13. UPCOMING DELIVERIES
==================================================

Show compact upcoming delivery cards.

Each card:

Order ID

Pickup location

Delivery area

Distance

Scheduled time

Status

Action:

VIEW

Do not overload with unnecessary details.

==================================================
14. QUICK ACTIONS
==================================================

Create quick actions:

Scan Package

Navigate

Delivery History

Call Support

On desktop:
Card/button row.

On mobile:
2x2 compact icon grid.

==================================================
15. DELIVERIES PAGE
==================================================

Route:
/deliveries

DESKTOP:

Header

Search

Filters

Status tabs

Delivery table

MOBILE:

Header

Tabs

Filter chips

Delivery cards

TABS:

ACTIVE

UPCOMING

COMPLETED

CANCELLED

==================================================
16. DESKTOP DELIVERY TABLE
==================================================

Columns:

Delivery ID

Order ID

Pickup

Customer

Destination

Distance

ETA

Payment

Status

Actions

Actions:

View

Navigate

Call

Update Status

Use compact table styling.

==================================================
17. MOBILE DELIVERY CARDS
==================================================

Do NOT render desktop tables on mobile.

Each delivery should become a card.

Show:

Order ID

Status badge

Pickup

Destination

Distance

ETA

Payment type

Primary status-aware action.

Examples:

START PICKUP

NAVIGATE

VERIFY PICKUP

START DELIVERY

ARRIVED

COMPLETE DELIVERY

==================================================
18. DELIVERY DETAILS
==================================================

Route:
/deliveries/:id

DESKTOP:

Use two-column or three-column content.

Include:

Delivery information

Pickup information

Customer information

Package information

Delivery timeline

Payment information

Map preview

Actions

MOBILE:

Stack vertically.

Keep current delivery status visible.

==================================================
19. DELIVERY STATUS TIMELINE
==================================================

Create reusable timeline.

Stages:

Assigned

Accepted

Navigating to Pickup

Arrived at Pickup

Pickup Verified

Picked Up

Out for Delivery

Arrived at Customer

OTP Verified

Delivered

DESKTOP:
Horizontal or vertical based on available space.

MOBILE:
Vertical compact timeline.

Clearly distinguish:

Completed

Current

Upcoming

Failed

==================================================
20. PICKUP INFORMATION
==================================================

Show:

Vendor / Store Name

Pickup Address

Pickup Contact

Distance

ETA

Package Count

Buttons:

CALL STORE

NAVIGATE

ARRIVED

On mobile:

Use sticky primary CTA if driver is actively navigating.

==================================================
21. CUSTOMER INFORMATION
==================================================

Show only necessary customer information.

Customer Name

Delivery Address

Delivery Instructions

Phone action

Chat action

Distance

ETA

Avoid exposing unnecessary customer details.

==================================================
22. MAP EXPERIENCE
==================================================

Map functionality is a major part of the UX.

Create responsive map components for:

Pickup route

Delivery route

Active delivery

Current location

Map should show:

Driver marker

Pickup marker

Customer marker

Route line

Distance

ETA

Recenter button

DESKTOP:

Map may appear inside dashboard card or split view.

MOBILE:

Use near full-screen map.

Add bottom floating info card.

==================================================
23. MOBILE FULL-SCREEN NAVIGATION
==================================================

Create dedicated mobile navigation screen.

Map fills most of screen.

TOP:

Back

Destination label

Optional help icon

BOTTOM CARD:

Destination

Distance

ETA

Contact

Primary button:

START NAVIGATION

or

I'VE ARRIVED

Hide normal bottom nav while this screen is active.

==================================================
24. NEW DELIVERY REQUEST
==================================================

Create assignment/request interaction.

DESKTOP:

Use side drawer or modal.

MOBILE:

Use large bottom sheet.

Show:

NEW DELIVERY REQUEST

Order ID

Pickup

Destination

Distance

ETA

Package Count

Payment type

Estimated earning if applicable

Actions:

DECLINE

ACCEPT DELIVERY

Make Accept strong green CTA.

==================================================
25. PICKUP VERIFICATION
==================================================

Create a dedicated verification screen.

Options:

OTP

QR CODE

BARCODE

OTP:

Enter pickup OTP

VERIFY

QR:

Scanner area

SCAN QR

Barcode:

Scanner area

SCAN BARCODE

Manual fallback where appropriate.

==================================================
26. PACKAGE CHECK
==================================================

After pickup verification:

Show package checklist.

Package cards:

Package ID

Package number

Status

Checkbox

Display:

Total packages

Special handling instructions

Checkbox:

I confirm all packages were received in good condition.

Button:

CONFIRM PICKUP

==================================================
27. PICKUP SUCCESS
==================================================

Success screen:

Green check

PICKUP COMPLETED

Package count

Order ID

Primary button:

START DELIVERY

==================================================
28. OUT FOR DELIVERY
==================================================

Create active delivery state.

Desktop:

Map + delivery information split layout.

Mobile:

Large map

Bottom customer card

Display:

OUT FOR DELIVERY

Distance Remaining

ETA

Customer

Address

Instructions

Actions:

CALL

CHAT

NAVIGATE

Primary:

ARRIVED AT LOCATION

==================================================
29. ARRIVAL AT CUSTOMER
==================================================

Show:

ARRIVED AT DELIVERY LOCATION

Customer

Address

Order ID

Payment status

If COD:

AMOUNT TO COLLECT

Make amount highly visible.

Buttons:

CALL CUSTOMER

VERIFY DELIVERY

UNABLE TO DELIVER

==================================================
30. DELIVERY OTP
==================================================

Create focused verification page.

Ask customer for OTP.

6-digit OTP input.

Actions:

VERIFY OTP

RESEND OTP

Create states:

Incorrect OTP

OTP Verified

OTP Expired

==================================================
31. COD COLLECTION
==================================================

If Cash on Delivery:

Show:

Amount to Collect

Payment Method

Cash

UPI

Checkbox / confirmation:

Payment received.

Button:

CONFIRM PAYMENT

Frontend-only state.

No real payment processing.

==================================================
32. PROOF OF DELIVERY
==================================================

Create proof page.

Options:

Take Delivery Photo

Upload Photo

Customer Signature

Delivery Notes

Package Handed To:

Customer

Family Member

Security

Reception

Other

Button:

COMPLETE DELIVERY

On mobile:

Use camera-first UX.

==================================================
33. DELIVERY SUCCESS
==================================================

Create polished success state.

Large green success icon.

DELIVERY COMPLETED

Show:

Order ID

Completion Time

Delivery Earning

Actions:

DONE

VIEW EARNINGS

==================================================
34. UNABLE TO DELIVER
==================================================

DESKTOP:

Modal / drawer.

MOBILE:

Bottom sheet.

Reasons:

Customer Unavailable

Customer Not Answering

Wrong Address

Customer Refused

Payment Issue

Location Inaccessible

Package Issue

Other

Include:

Notes

Photo upload if required

Primary:

SUBMIT

Require confirmation.

==================================================
35. DELIVERY HISTORY
==================================================

Route:
/history

DESKTOP:

Filter toolbar

History table

MOBILE:

Filter chips

History cards

FILTERS:

Today

This Week

This Month

Custom

STATUS:

All

Delivered

Failed

Cancelled

Each item:

Order ID

Date

Area

Distance

Status

Earning

Click opens delivery details.

==================================================
36. EARNINGS
==================================================

Route:
/earnings

DESKTOP:

Earnings dashboard.

MOBILE:

Simple wallet-style screen.

TOP:

Total Earnings

Available Balance

Pending Amount

PERIOD:

Today

This Week

This Month

CHART:

Simple earnings trend.

BREAKDOWN:

Delivery Earnings

Incentives

Bonuses

Tips if supported

Transactions list below.

==================================================
37. EARNINGS TRANSACTIONS
==================================================

DESKTOP:
Table.

MOBILE:
Transaction cards/list rows.

Show:

Type

Order ID

Date

Amount

Status

==================================================
38. PAYOUTS
==================================================

Route:
/payouts

TOP:

Available Balance

Pending Payout

Next Payout

Primary:

REQUEST PAYOUT

HISTORY:

Payout ID

Date

Amount

Method

Status

Transaction ID

DESKTOP:
Table.

MOBILE:
Stacked payout cards.

==================================================
39. REQUEST PAYOUT
==================================================

Desktop:
Modal.

Mobile:
Bottom sheet.

Show:

Available Balance

Payout Amount

Bank / UPI destination

Confirm button

Success:

Payout Request Submitted

==================================================
40. INCENTIVES
==================================================

Route:
/incentives

Create progress-based incentive cards.

Examples:

Daily target

Weekly deliveries

Peak hour

Special campaign

Each card:

Title

Progress

Target

Reward

Expiry

Status

Use responsive progress bars.

==================================================
41. PERFORMANCE
==================================================

Route:
/performance

Create driver performance summary.

Metrics:

Total Deliveries

Completion Rate

On-Time Rate

Average Rating

Cancellation Rate if applicable

DESKTOP:
Compact analytics cards + charts.

MOBILE:
Simple performance cards + progress bars.

Do not make it overly analytical.

==================================================
42. NOTIFICATIONS
==================================================

Route:
/notifications

Categories:

ALL

DELIVERIES

EARNINGS

SYSTEM

Notification types:

Delivery Assigned

Pickup Reminder

Delivery Updated

Payout Processed

Incentive Achieved

Document Expiring

System Message

Unread notification:

Subtle highlighted background.

Actions:

Mark as Read

Mark All as Read

Mobile bottom-nav bell should show unread badge.

==================================================
43. PROFILE
==================================================

Route:
/profile

MOBILE:

Driver avatar

Driver Name

Driver ID

Rating

Verification badge

Online / Offline state

Sections:

PERSONAL

Personal Information

Documents

Vehicle Details

BANKING

Bank Account

UPI Details

WORK

Delivery History

Earnings

Performance

APP

Notifications

Language

Support

Settings

Logout

DESKTOP:

Use profile sidebar + content panel.

==================================================
44. DOCUMENTS
==================================================

Route:
/profile/documents

Show:

Government ID

Driving Licence

Vehicle RC

Insurance if applicable

Each document:

Status

Expiry

Preview

Update

STATUS:

Verified

Pending

Rejected

Expiring Soon

==================================================
45. VEHICLE
==================================================

Route:
/profile/vehicle

Show:

Vehicle Type

Vehicle Number

Vehicle Model

Vehicle Document

Status

Edit details

==================================================
46. BANK & UPI
==================================================

Route:
/profile/bank

Show:

Bank Account

Masked Account Number

Account Holder

Bank Name

IFSC

Status

UPI ID

Verification Status

Actions:

Edit

Update

==================================================
47. SUPPORT
==================================================

Route:
/support

Create driver support hub.

Categories:

Delivery Issue

Payment Issue

Customer Issue

Vendor Issue

App Issue

Account Issue

Emergency Support

FAQ

Contact Support

Create Ticket

==================================================
48. SUPPORT CHAT
==================================================

Route:
/support/:id

Create:

Ticket header

Ticket ID

Status

Priority

Conversation

Attachments

Message input

Send

DESKTOP:

Two-column support layout if useful.

MOBILE:

Full-screen chat.

==================================================
49. SETTINGS
==================================================

Route:
/settings

Options:

Notification Preferences

Language

Appearance

Navigation Preferences

Location Permission

Camera Permission

Privacy

Security

Change Password

Two-Factor Authentication

Logged-in Devices

Terms

Privacy Policy

App Version

==================================================
50. LOGIN
==================================================

Route:
/login

Create responsive driver login.

Methods:

Mobile Number

Password

or

Login with OTP

Forgot Password

Register as Delivery Partner

Mobile optimized.

==================================================
51. REGISTRATION
==================================================

Route:
/register

Use multi-step process.

Steps:

Personal Details

Identity Verification

Vehicle Details

Bank / UPI

Review

On desktop:
Centered stepper form.

On mobile:
Full-screen vertical step flow.

==================================================
52. APPROVAL STATUS
==================================================

Route:
/approval-status

States:

Under Review

Approved

Rejected

Document Required

Use clear status cards.

If document correction required:

Show exact document

Update action

==================================================
53. MOBILE STICKY ACTIONS
==================================================

Use sticky bottom CTA areas where needed.

Examples:

CONTINUE DELIVERY

ACCEPT DELIVERY

I'VE ARRIVED

VERIFY PICKUP

CONFIRM PICKUP

START DELIVERY

VERIFY OTP

CONFIRM PAYMENT

COMPLETE DELIVERY

These should sit above safe area.

Do not conflict with bottom navigation.

If a task-specific CTA is active, either:

- place it above bottom nav
or
- temporarily hide bottom nav

Choose whichever provides better usability.

==================================================
54. RESPONSIVE TABLE RULE
==================================================

Desktop may use tables.

Mobile MUST NOT blindly use tables.

Convert:

Delivery Table
History Table
Payout Table
Earnings Table

into:

Cards
Stacked rows
Expandable items

Only use horizontal table scroll if truly necessary.

==================================================
55. RESPONSIVE MAP RULE
==================================================

DESKTOP:

Map can share screen with delivery information.

TABLET:

Map may appear above details.

MOBILE:

Map should become large/full-screen during active navigation.

Never shrink map into a tiny unusable card.

==================================================
56. RESPONSIVE DASHBOARD RULE
==================================================

DESKTOP:

Use multi-column cards.

TABLET:

2-column cards.

MOBILE:

1 or 2 column summary grid.

Current delivery should become full-width.

Upcoming deliveries should stack.

==================================================
57. ONLINE / OFFLINE STATUS
==================================================

Create reusable status control.

ONLINE:

Green

Available for deliveries

OFFLINE:

Gray

Not accepting deliveries

Changing state should update local frontend state.

Add confirmation if going offline during active delivery.

==================================================
58. GLOBAL COMPONENT LIBRARY
==================================================

Create reusable:

ResponsiveDriverHeader

DesktopSidebar

MobileHeader

MobileBottomNav

DriverStatusToggle

DeliveryCard

CurrentDeliveryCard

UpcomingDeliveryCard

MapView

MapBottomCard

RouteSummary

StatusTimeline

KPICard

EarningsCard

PayoutCard

IncentiveCard

NotificationCard

DocumentCard

VehicleCard

SupportCard

SearchBar

FilterChip

FilterDrawer

BottomSheet

ActionSheet

Modal

ConfirmationDialog

OTPInput

Button

IconButton

Input

Select

Checkbox

Toggle

Textarea

FileUpload

ImageUpload

CameraUpload

StatusBadge

Rating

ProgressBar

Stepper

Toast

Snackbar

Skeleton

EmptyState

ErrorState

SuccessState

OfflineBanner

==================================================
59. MOBILE BOTTOM SHEETS
==================================================

Prefer mobile bottom sheets for:

New Delivery Request

Filters

Sort

Call Options

Unable to Deliver

Request Payout

Status Update

COD Confirmation

Delivery Actions

Document Actions

Bottom sheets should include:

Drag handle

Rounded top corners

Clear title

Large touch targets

Sticky primary action where needed

==================================================
60. FRONTEND INTERACTIONS
==================================================

All important frontend interactions should work.

Required:

Sidebar works

Bottom navigation works

Route navigation works

Online toggle works

Filters work

Tabs switch

Dropdowns work

Modals work

Bottom sheets work

Delivery status can progress

OTP shows success/error

Package check works

COD confirmation works

Proof upload preview works

Payout request works

Notifications can be marked read

Forms can be edited

Buttons have:

Hover state

Pressed state

Disabled state

Loading state

==================================================
61. DELIVERY WORKFLOW STATE MACHINE
==================================================

Create connected frontend state flow:

ASSIGNED

↓

ACCEPTED

↓

NAVIGATING TO PICKUP

↓

ARRIVED AT PICKUP

↓

VERIFY PICKUP

↓

PACKAGE CONFIRMED

↓

PICKED UP

↓

OUT FOR DELIVERY

↓

ARRIVED AT CUSTOMER

↓

OTP / PAYMENT VERIFIED

↓

PROOF OF DELIVERY

↓

DELIVERED

Buttons and page actions must change according to current delivery state.

This workflow is extremely important.

==================================================
62. LOCATION & GPS STATES
==================================================

Create:

Location permission education

GPS unavailable

Location loading

Live location active

Route recalculating

Location permission denied

Actions:

ENABLE LOCATION

TRY AGAIN

OPEN SETTINGS

==================================================
63. NETWORK STATES
==================================================

Drivers may have weak signal.

Create persistent offline banner:

NO INTERNET CONNECTION

Some actions may be unavailable.

Buttons:

RETRY

Preserve locally entered state where possible.

==================================================
64. CAMERA STATES
==================================================

For:

QR scan

Barcode scan

Proof of Delivery

Document Upload

Create frontend camera permission and preview states.

Do not implement real device camera backend.

==================================================
65. EMPTY STATES
==================================================

Create:

No Active Deliveries

No Upcoming Deliveries

No Delivery History

No Earnings Yet

No Payouts

No Incentives

No Notifications

No Support Tickets

Each should have:

Simple icon

Short explanation

Relevant CTA

==================================================
66. ERROR STATES
==================================================

Create reusable:

Incorrect OTP

Delivery Already Assigned

Unable to Update Delivery

GPS Error

Network Error

Upload Failed

Payment Confirmation Failed

Session Expired

Route Not Available

Provide clear recovery action.

==================================================
67. LOADING STATES
==================================================

Use skeleton loaders for:

Dashboard

Deliveries

Delivery details

Earnings

Payouts

Notifications

Profile

Avoid only using centered spinners.

==================================================
68. TOUCH TARGETS
==================================================

On mobile:

Interactive elements should be approximately 44px or larger where practical.

Large primary delivery actions:

48–56px height.

Keep actions thumb-friendly.

==================================================
69. SAFE AREA
==================================================

Respect:

safe-area-inset-top

safe-area-inset-bottom

Bottom navbar

Sticky CTAs

Bottom sheets

Full-screen map controls

must not overlap gesture navigation.

==================================================
70. MOBILE KEYBOARD
==================================================

Forms must remain usable when keyboard opens.

Inputs must scroll into view.

Do not let sticky CTAs cover focused inputs.

==================================================
71. ACCESSIBILITY
==================================================

Maintain strong contrast.

Do not communicate status by color alone.

Use:

Icons

Text

Badges

Provide clear focus states.

Use readable type sizes.

==================================================
72. FRONTEND STATE MANAGEMENT
==================================================

Use local frontend state or React Context for:

Driver status

Current delivery

Delivery progress

Filters

OTP state

Payment confirmation

Package checklist

Notifications

Payout request

Profile edits

Document upload preview

No backend is required.

==================================================
73. MOCK DATA RULE
==================================================

Use only minimal mock data.

Approximately:

3–5 deliveries

A few earnings transactions

A few payouts

A few notifications

A few support tickets

Do not generate huge fake datasets.

Keep mock data separated from components.

==================================================
74. CODE STRUCTURE
==================================================

If generating React code, use a clean structure:

src/
  assets/
  components/
    common/
    navigation/
    delivery/
    maps/
    earnings/
    profile/
    support/
  layouts/
  pages/
    dashboard/
    deliveries/
    history/
    earnings/
    payouts/
    incentives/
    notifications/
    profile/
    support/
    settings/
    auth/
  routes/
  hooks/
  context/
  data/
  utils/
  constants/

Do not put the entire project in App.jsx.

==================================================
75. NO BACKEND
==================================================

Do NOT build:

Database

Server

Real authentication

Real OTP service

Real maps backend

Real payout processing

Real push notifications

Real dispatch algorithm

Real payment gateway

Real support chat backend

Create frontend states only.

Structure the application so APIs can be added later.

==================================================
76. RESPONSIVE QA REQUIREMENT
==================================================

Before considering the frontend complete, verify important screens at:

1440px

1366px

1024px

768px

430px

390px

360px

Check:

No horizontal overflow

No clipped text

No broken cards

No overlapping CTAs

No bottom-nav overlap

No hidden actions

No tiny map

No unreadable table

No fixed-width desktop components on mobile

No broken forms

No inaccessible sticky buttons

==================================================
77. MOST IMPORTANT RESPONSIVE TRANSFORMATIONS
==================================================

DO NOT JUST SCALE THE SAME SCREEN DOWN.

Example:

DESKTOP DELIVERIES:
Table + Filters

MOBILE DELIVERIES:
Status Tabs + Delivery Cards

DESKTOP DELIVERY DETAILS:
Map + Information Panels

MOBILE DELIVERY DETAILS:
Stacked Information + Full-screen Map Flow

DESKTOP EARNINGS:
Cards + Chart + Table

MOBILE EARNINGS:
Wallet Summary + Compact Chart + Transaction List

DESKTOP PROFILE:
Profile Navigation + Content

MOBILE PROFILE:
Profile Menu + Dedicated Subpages

DESKTOP SUPPORT:
Ticket List + Conversation

MOBILE SUPPORT:
Ticket Screen + Full-screen Conversation

This adaptive transformation is mandatory.

==================================================
78. MOBILE BOTTOM NAV BEHAVIOR
==================================================

Main routes:

HOME
DELIVERIES
EARNINGS
NOTIFICATIONS
PROFILE

Use bottom navigation for these.

Secondary screens should use:

Back button + contextual title

Examples:

Delivery Details

Pickup Verification

Proof of Delivery

Payout Request

Documents

Vehicle

Bank

Support Chat

Settings

Do not show unnecessary bottom-nav items during focused critical delivery flows.

==================================================
79. FINAL REQUIREMENT
==================================================

CREATE ONE COMPLETE CONNECTED RESPONSIVE GREENMART DRIVER / DELIVERY PARTNER FRONTEND.

DESKTOP:
Use sidebar + top header.

TABLET:
Use adaptive collapsed navigation.

MOBILE:
Use fixed bottom navigation:

HOME
DELIVERIES
EARNINGS
NOTIFICATIONS
PROFILE

The application must work smoothly from 360px mobile screens to large desktop monitors.

Do not simply resize desktop screens.

Create true adaptive layouts.

Use:

Desktop tables where useful

Mobile cards instead of tables

Responsive maps

Sticky mobile delivery actions

Bottom sheets

Mobile-safe navigation

Minimal mock data

Working frontend states

Complete delivery workflow

No backend required

No database required

No real OTP required

No real map API required

No real payment processing required

The frontend should be structured so real backend APIs can be integrated later.

MOST IMPORTANT:

The final result must feel like a polished, production-ready delivery partner platform belonging to the same GreenMart multi-vendor ecosystem, with excellent usability on every screen size and especially strong mobile usability during active deliveries.