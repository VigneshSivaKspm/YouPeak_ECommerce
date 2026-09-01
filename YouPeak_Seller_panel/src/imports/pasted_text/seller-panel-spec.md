CREATE A COMPLETE WORKING FRONTEND FOR A PREMIUM MULTI-VENDOR E-COMMERCE SELLER / VENDOR PANEL.

TECHNOLOGY:
- React
- Vite
- React Router
- Modern reusable component architecture
- Desktop-first responsive web application

PROJECT:
GreenMart
MULTI-VENDOR SELLER PLATFORM

==================================================
CRITICAL INSTRUCTION
==================================================

Use the ATTACHED SELLER / VENDOR PANEL REFERENCE IMAGES as the PRIMARY AND STRICT VISUAL REFERENCE.

Study all attached reference images carefully before creating the frontend.

The final application must look and feel like the SAME SELLER PLATFORM shown in those references.

DO NOT create:
- a poster
- a presentation board
- a dashboard collage
- a static image
- a generic admin template

CREATE THE ACTUAL WORKING REACT + VITE FRONTEND.

Each sidebar menu must open its own functional page using routing.

Do not spend time generating large amounts of fake marketplace data.

Use only minimal placeholder/mock data where necessary to demonstrate:
- tables
- charts
- cards
- forms
- states
- pagination
- interactions

The PRIMARY goal is to accurately recreate the frontend design, UX structure, component system and interactions shown in the references.

==================================================
DESIGN STYLE
==================================================

Reproduce the visual language of the attached references.

STYLE:

- Premium modern SaaS seller dashboard
- Clean white content area
- Soft light-gray application background
- Dark navy / charcoal sidebar
- Green marketplace branding
- Compact enterprise layout
- Thin subtle borders
- Very subtle card shadows
- Small professional border radius
- Dense but highly readable information
- Professional tables
- Compact buttons
- Modern form controls
- Green active states
- Clear status badges
- Clean charts
- Consistent spacing
- Minimal unnecessary whitespace

The interface should feel like a mature marketplace seller portal, not a generic dashboard template.

==================================================
COLOR SYSTEM
==================================================

Use the reference images to determine final colors.

Primary Green:
#16A34A

Deep Green:
#08783D

Dark Green:
#0B6835

Sidebar:
#102A33

Application Background:
#F5F7F6

Cards:
#FFFFFF

Primary Text:
#10252E

Secondary Text:
#64748B

Borders:
#E5E9E8

Success:
#16A34A

Warning:
#F59E0B

Danger:
#EF4444

Info:
#3B82F6

Use green sparingly for:
- active navigation
- primary actions
- positive metrics
- charts
- selected tabs
- success badges

Do NOT make the entire interface green.

==================================================
TYPOGRAPHY
==================================================

Use:
Inter

or a similar professional SaaS font.

Typography must closely match the reference:

- Strong page headings
- Compact section titles
- Small table typography
- Medium-weight labels
- Muted secondary text
- Large KPI values
- Clear visual hierarchy

Do not use oversized headings inside application pages.

==================================================
APPLICATION SHELL
==================================================

Create one reusable SellerLayout component.

The application should have:

1. Persistent left sidebar
2. Persistent top header
3. Main routed content area
4. Responsive behavior

Do not recreate the sidebar separately on every page.

==================================================
LEFT SIDEBAR
==================================================

Match the exact proportions and visual appearance of the attached references.

TOP:

GreenMart logo / marketplace icon

GreenMart

Small label:
Vendor Panel
or
Seller Platform

NAVIGATION:

Dashboard

Orders

Products

Inventory

Customers

Store

Marketing

Reviews

Returns

Earnings

Payouts

Analytics

Reports

Support

Settings

BOTTOM:

Help Center

Seller avatar

Seller Name

Store Name

Online status indicator

Logout

Use Lucide React icons or equivalent clean outline icons.

ACTIVE NAVIGATION:

The selected page should use the same bright green background treatment shown in the references.

Add subtle hover states.

SIDEBAR BEHAVIOR:

- Fixed on desktop
- Collapsible
- Smooth transition
- Icon-only collapsed state
- Mobile drawer on smaller screens

==================================================
TOP HEADER
==================================================

Create the seller-panel top header based on the reference images.

Include:

Global search

Notification bell

Unread notification indicator

Help icon

Optional quick actions

Seller avatar

Seller name

Store name

Dropdown arrow

Seller profile dropdown:

- My Profile
- Store Profile
- Account Settings
- Security
- Logout

Where appropriate include:

All Systems Operational

with a green status indicator.

Keep the header compact and professional.

==================================================
ROUTES
==================================================

Create these actual React Router routes:

/dashboard

/orders
/orders/:id

/products
/products/add
/products/:id/edit

/inventory

/customers
/customers/:id

/store

/marketing
/coupons
/offers
/flash-sales
/promotions
/campaigns
/referral

/reviews

/returns
/returns/:id

/earnings

/payouts

/analytics

/reports

/support
/support/:id

/settings

==================================================
1. SELLER DASHBOARD
==================================================

Route:
/dashboard

Recreate the seller dashboard layout shown in the attached references.

PAGE HEADER:

Greeting section

Store activity summary

Date-range selector

Notification / quick controls where appropriate.

TOP KPI CARDS:

Create reusable metric cards for:

- Total Sales
- Orders
- Products
- Customers
- Pending Orders
- Available Balance

Use minimal placeholder values.

Each KPI card should support:

- icon
- title
- value
- percentage/change indicator
- helper text

MAIN ANALYTICS AREA:

Sales Overview chart

Order Status donut chart

The sales chart should support:

Daily
Weekly
Monthly
Yearly

LOWER DASHBOARD:

Top Products

Recent Orders

Low Stock Alert

Use compact tables/cards matching the reference images.

The overall page composition should closely reproduce the reference dashboard.

==================================================
2. ORDERS
==================================================

Route:
/orders

Recreate the seller order management page.

TOP:

Page title

Search field

Export

STATUS TABS:

All
New
Processing
Packed
Ready for Pickup
Shipped
Delivered
Cancelled
Returned

FILTER BAR:

Date
Payment
Amount
Status
More Filters

Optional:
Bulk Actions

ORDER TABLE:

Order ID

Customer

Items

Date

Amount

Payment

Status

Delivery

Actions

Use only enough placeholder rows to demonstrate the interface.

Include:

Status badges

Three-dot action menu

Pagination

Rows-per-page selector

TABLE ACTIONS:

View Order
Update Status
Print
Contact Customer
Cancel

Clicking an order must navigate to:

/orders/:id

==================================================
3. ORDER DETAILS
==================================================

Route:
/orders/:id

Recreate the order-details design from the attached references.

HEADER:

Back button

Order number

Current status

Print

Update Status

MAIN AREA:

Order timeline

Customer information

Delivery address

Order items

Payment information

Order summary

TIMELINE:

Order Received
Accepted
Processing
Packed
Ready for Pickup
Picked Up
Delivered

Use a visual step/timeline component.

ORDER ITEMS:

Product thumbnail

Product

SKU

Quantity

Price

Total

ORDER SUMMARY:

Item Total
Shipping
Discount
Platform Fees
Tax
Total Amount

BOTTOM ACTIONS:

Accept

Mark as Packed

Request Pickup

Cancel Order

Actions should update local frontend state.

No backend is required.

==================================================
4. PRODUCTS
==================================================

Route:
/products

Recreate the product-management table shown in the references.

HEADER:

Products

Search products

Import

Export

Add Product

FILTERS:

Category
Brand
Status
Stock
More Filters

PRODUCT TABLE:

Product thumbnail

Product

SKU

Category

Price

Stock

Sales

Rating

Status

Actions

STATUS EXAMPLES:

Active
Draft
Low Stock
Out of Stock

ROW ACTION MENU:

View
Edit
Duplicate
Disable
Delete

Click Add Product:

/products/add

Click Edit:

/products/:id/edit

==================================================
5. ADD / EDIT PRODUCT
==================================================

Routes:

/products/add

/products/:id/edit

Recreate the professional multi-step product editor from the references.

TOP STEPPER:

Basic Info

Media

Pricing

Inventory

Variations

Shipping

SEO

Review

Each step must work.

--------------------------------------------------
BASIC INFO
--------------------------------------------------

Product Name

Category

Subcategory

Brand

SKU

HSN Code

Short Description

Full Description

Tags

Product Status

--------------------------------------------------
MEDIA
--------------------------------------------------

Product image upload

Primary image

Gallery images

Drag and drop upload area

Image preview

Remove image

Reorder images

--------------------------------------------------
PRICING
--------------------------------------------------

MRP

Selling Price

Cost Price

Discount

Tax

--------------------------------------------------
INVENTORY
--------------------------------------------------

SKU

Available Quantity

Reserved Quantity

Low Stock Threshold

Stock Status

--------------------------------------------------
VARIATIONS
--------------------------------------------------

Create variation builder for attributes such as:

Size
Color
Storage
Material

Allow:

Add Variant
Remove Variant

--------------------------------------------------
SHIPPING
--------------------------------------------------

Weight

Dimensions

Shipping Class

Package Information

--------------------------------------------------
SEO
--------------------------------------------------

SEO Title

Meta Description

URL Slug

--------------------------------------------------
ACTIONS
--------------------------------------------------

Save as Draft

Save & Continue

Previous

Next

Publish Product

==================================================
6. INVENTORY
==================================================

Route:
/inventory

Recreate the inventory dashboard shown in the reference.

TOP SUMMARY CARDS:

Total Products

In Stock

Low Stock

Out of Stock

Inventory Value

ACTIONS:

Bulk Update

Import

Export

Stock Adjustment

SEARCH + FILTERS:

Search products

Category

Warehouse

Stock Status

More Filters

INVENTORY TABLE:

Product

SKU

Available

Reserved

Total

Low Stock Limit

Status

Action

Support:

Stock adjustment modal

Bulk selection

Pagination

Low-stock warning states

Out-of-stock states

==================================================
7. CUSTOMERS
==================================================

Route:
/customers

Create seller-specific customer management.

HEADER:

Customers

Search

Filters

Export

SUMMARY:

Total Customers

New Customers

Repeat Customers

Active Customers

TABLE:

Customer

Contact

Orders

Total Spent

Last Order

Status

Actions

Clicking a customer opens:

/customers/:id

==================================================
8. CUSTOMER DETAILS
==================================================

Route:
/customers/:id

Create:

Customer profile

Contact details

Order history

Total orders

Total spent

Recent purchases

Return history

Support history

Do not expose unnecessary marketplace-wide information to the vendor.

Only show data related to the seller's store.

==================================================
9. STORE MANAGEMENT
==================================================

Route:
/store

Recreate the store-management page from the reference.

Include:

STORE PROFILE

Store Name

Store Category

Store Phone

Store Email

Store Description

Established Date

STORE BRANDING

Store Logo

Store Banner

Brand colors where applicable

Image upload/change controls

STORE INFORMATION

Store Type

GST / Tax Information

Business Address

Business Hours

STORE PREVIEW

Create a professional storefront preview card.

Show:

Banner

Logo

Store name

Store rating

Product count

View Store button

STOREFRONT ACTIONS:

Featured Products

Collections

Top Categories

Active Offers

Save Changes button

==================================================
10. MARKETING & COUPONS
==================================================

Route:
/marketing

Match the reference seller marketing interface.

TABS:

Coupons

Offers

Flash Sales

Product Promotions

Campaigns

Referral

Provide separate routes where appropriate.

COUPON TABLE:

Coupon Code

Discount

Minimum Order

Usage

Expiry

Status

Actions

BUTTON:

Create Coupon

CREATE COUPON FORM:

Coupon Code

Discount Type

Discount Value

Minimum Order Value

Maximum Discount

Usage Limit

Applicable Products

Start Date

End Date

Show on Storefront

ACTIONS:

Cancel

Create Coupon

==================================================
11. REVIEWS
==================================================

Route:
/reviews

Recreate the review dashboard from the reference.

TOP OVERVIEW:

Overall Rating

Total Reviews

Rating Distribution

FILTERS:

Product

Rating

Status

Search

REVIEWS TABLE:

Customer

Product

Rating

Review

Date

Status

Actions

Actions:

View

Reply

Report

Allow seller to reply using a modal or side panel.

==================================================
12. RETURNS
==================================================

Route:
/returns

Recreate the returns management screen shown in the attached reference.

TABS:

Requested

Approved

Pickup

Received

Refunded

Rejected

SEARCH + FILTERS

RETURNS TABLE:

Return ID

Order ID

Customer

Product

Reason

Amount

Date

Status

Action

Selecting a return should display detailed information.

RETURN DETAILS:

Return ID

Customer reason

Product condition

Uploaded return images

Order information

Product information

Return timeline

Actions appropriate to seller permissions.

==================================================
13. EARNINGS
==================================================

Route:
/earnings

Recreate the earnings dashboard shown in the reference.

TOP CARDS:

Gross Sales

Platform Commission

Refunds

Adjustments

Net Earnings

Pending Balance

Available Balance

CHARTS:

Revenue Trend

Commission Trend

Net Earnings Trend

BOTTOM:

Earnings Breakdown

Use placeholder values only.

Focus on visual layout and functionality.

==================================================
14. PAYOUTS
==================================================

Route:
/payouts

Recreate the payout page from the reference.

TOP CARDS:

Available Balance

Pending Payout

Next Payout

PRIMARY ACTION:

Request Payout

PAYOUT HISTORY TABLE:

Date

Payout ID

Amount

Method

Status

Transaction ID

Actions

Include:

Export

Pagination

REQUEST PAYOUT MODAL:

Available Balance

Payout Amount

Bank / UPI Method

Account

Confirm Request

==================================================
15. ANALYTICS
==================================================

Route:
/analytics

Recreate the seller analytics page from the attached reference.

TOP FILTERS:

Date Range

Compare Period

Export

TOP KPI CARDS:

Revenue

Orders

Average Order Value

Conversion Rate

MAIN ANALYTICS:

Revenue vs Orders chart

Sales by Category donut chart

LOWER CARDS:

Best Sellers

Most Viewed Products

Store Performance

Use responsive chart components.

Do not overpopulate the charts with fake data.

==================================================
16. REPORTS
==================================================

Route:
/reports

Recreate the reports center.

TOP:

Search reports

Date range

Report type

REPORT CARDS:

Sales Report

Order Report

Product Report

Inventory Report

Customer Report

Commission Report

Payout Report

Return Report

Tax Report

Each card should support:

View

Download

RECENT EXPORTS:

Report Name

Date Range

Format

Generated Date

Generated By

Download

Frontend download actions can use mock files/state.

==================================================
17. SUPPORT
==================================================

Route:
/support

Recreate the seller support center shown in the reference.

TOP TABS:

Create Ticket

My Tickets

FAQ

Help Center

Contact Support

MY TICKETS:

Status

Priority

Search

Ticket list/table

Selecting a ticket should open a conversation view.

Create a professional ticket conversation interface.

LEFT / TOP:

Ticket information

Customer/seller support details

CENTER:

Message conversation

BOTTOM:

Reply field

Attachments

Send button

Ticket status controls

==================================================
18. PROFILE & SETTINGS
==================================================

Route:
/settings

Recreate the detailed seller settings interface shown in the reference.

SETTINGS SIDEBAR / TABS:

STORE

Store Profile

Store Logo

Store Banner

Business Information

ACCOUNT

Profile Information

Change Password

Two-Factor Authentication

BUSINESS

GST / Tax

Business Documents

BANKING

Bank Account

UPI Details

Payout Information

SHIPPING

Shipping Preferences

Delivery Zones

Processing Time

SECURITY

Login Sessions

Devices

Activity Log

PREFERENCES

Language & Region

Timezone

Currency

==================================================
SETTINGS FORMS
==================================================

STORE PROFILE:

Store Name

Store Description

Store Category

Store Email

Store Phone

Store Address

Store Website

Business Type

GST Number

PAN Number

Business Start Date

Return Policy

Support Email

BANK DETAILS:

Account Holder

Account Number

IFSC

Bank Name

Branch

UPI ID

SECURITY:

Change Password

Enable / Disable 2FA

Active Sessions

Logged-in Devices

Recent Activity

==================================================
GLOBAL COMPONENT LIBRARY
==================================================

Create reusable components for the whole application.

Components should include:

SellerSidebar

SellerHeader

PageHeader

Breadcrumbs

KPICard

MetricCard

ChartCard

DataTable

SearchInput

FilterSelect

FilterBar

DateRangePicker

Tabs

StatusBadge

RatingStars

Pagination

RowsPerPage

ActionMenu

Dropdown

Modal

ConfirmationModal

Drawer

SidePanel

Toast

Tooltip

Input

Textarea

Select

Checkbox

Radio

Toggle

Button

FileUpload

ImageUpload

Avatar

Stepper

EmptyState

ErrorState

SuccessState

LoadingState

SkeletonLoader

==================================================
WORKING FRONTEND INTERACTIONS
==================================================

The frontend must actually behave like an application.

Implement frontend interactions using React state.

Required:

- Sidebar navigation works
- React Router navigation works
- Sidebar collapses
- Profile dropdown works
- Notification dropdown works
- Search fields accept input
- Tabs switch
- Filters open/change
- Dropdowns work
- Pagination works
- Table action menus work
- Modals open/close
- Drawers open/close
- Forms are editable
- Toggles work
- Checkboxes work
- Product stepper works
- Image upload preview works
- Buttons have hover states
- Buttons have disabled states
- Buttons have loading states where appropriate
- Toast messages appear after actions
- Confirmation dialogs appear for destructive actions

Examples:

Save Product → show success toast

Request Payout → open payout modal

Cancel Order → confirmation modal

Delete Product → confirmation modal

Reply Review → reply modal

Adjust Stock → stock adjustment modal

Save Store Settings → success state

==================================================
CHARTS
==================================================

Use Recharts or another suitable React chart library.

Create:

Line charts

Area charts

Bar charts

Donut charts

Charts must be:

Responsive

Clean

Minimal

Professional

Styled to match the attached references.

==================================================
MOCK DATA RULE
==================================================

Do NOT hard-code huge datasets.

Use a small centralized mock-data structure only for demonstrating UI functionality.

For example:

3–6 table rows per module is enough.

The goal is NOT to create fake marketplace content.

The goal is to create the COMPLETE FRONTEND that can later connect to real APIs.

Keep mock data separate from components.

==================================================
SELLER PERMISSION RULE
==================================================

This is a VENDOR / SELLER PANEL, NOT THE SUPER ADMIN PANEL.

The seller must only manage their own:

- Store
- Products
- Inventory
- Orders
- Customers related to their orders
- Marketing
- Reviews
- Returns
- Earnings
- Payouts
- Analytics
- Reports
- Support
- Settings

Do NOT give the seller marketplace-wide admin controls.

The seller must NOT be able to:

- manage other vendors
- approve vendors
- configure global marketplace commissions
- manage all marketplace customers
- access platform-wide finance
- change global marketplace settings
- manage platform administrators

Maintain clear role separation.

==================================================
RESPONSIVE DESIGN
==================================================

Primary target:

1440px and larger desktop screens.

Also optimize for:

1366px desktop

1280px laptop

1024px tablet landscape

Tablet

Mobile where practical

On smaller screens:

- collapse sidebar
- stack KPI cards
- make tables horizontally scrollable
- convert side panels into drawers
- keep forms usable
- maintain visual hierarchy

Do NOT destroy the desktop layout just to make it mobile responsive.

Desktop admin usability is the primary target.

==================================================
PROJECT STRUCTURE
==================================================

Create a maintainable React + Vite project.

Use a structure similar to:

src/
  assets/
  components/
    common/
    dashboard/
    tables/
    forms/
    charts/
  layouts/
  pages/
    dashboard/
    orders/
    products/
    inventory/
    customers/
    store/
    marketing/
    reviews/
    returns/
    earnings/
    payouts/
    analytics/
    reports/
    support/
    settings/
  routes/
  hooks/
  data/
  utils/
  constants/

Do not put the entire project inside App.jsx.

Use reusable components wherever possible.

==================================================
IMPORTANT UX REQUIREMENTS
==================================================

Maintain consistency across all pages.

Tables must share the same design system.

Buttons must share the same design system.

Inputs must share the same design system.

Status badges must share the same design system.

Cards must share the same visual language.

Do not randomly change spacing, border radius or typography between screens.

Keep controls compact like the references.

Avoid excessive gradients.

Avoid glassmorphism.

Avoid oversized dashboard cards.

Avoid huge empty spaces.

Avoid unnecessarily large typography.

Avoid generic Bootstrap-style UI.

Avoid generic admin-template appearance.

==================================================
STRICT VISUAL REFERENCE INSTRUCTION
==================================================

The three attached seller-platform reference images define the visual target.

Study them for:

- sidebar width
- sidebar background
- active menu treatment
- GreenMart branding
- header dimensions
- content margins
- card proportions
- KPI card arrangement
- chart dimensions
- table density
- row height
- border treatment
- green accents
- button dimensions
- icon size
- typography scale
- tab design
- filter controls
- status badges
- pagination
- product thumbnails
- form structure
- settings navigation
- information hierarchy

Recreate that visual language as accurately as possible.

DO NOT reinterpret the references into another design style.

It should look like the SAME GreenMart Seller Platform when navigating between pages.

==================================================
FINAL REQUIREMENT
==================================================

Build the COMPLETE WORKING SELLER / VENDOR PANEL FRONTEND in React + Vite.

This must be a connected application, not isolated mockup screens.

All listed routes must exist.

All sidebar navigation items must work.

All major buttons and controls must have frontend interactions.

Use reusable components.

Use minimal mock data.

No backend is required.

No database is required.

No API implementation is required.

No real payment processing is required.

Structure the frontend so real APIs and backend services can be connected later without redesigning the UI.

MOST IMPORTANT:

Match the attached GreenMart Seller Platform reference images as closely as possible in layout, proportions, styling, information density, navigation, components and overall visual quality.

The final result should feel like a polished, production-ready seller portal for a professional multi-vendor e-commerce marketplace.