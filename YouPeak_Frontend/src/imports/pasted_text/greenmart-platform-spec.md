CREATE A COMPLETE WORKING FRONTEND FOR A PREMIUM MULTI-VENDOR E-COMMERCE CUSTOMER / USER PLATFORM.

TECHNOLOGY:
- React
- Vite
- React Router
- Responsive web application
- Mobile-first behavior where appropriate
- Reusable component architecture

PROJECT:
GreenMart
MULTI-VENDOR E-COMMERCE CUSTOMER PLATFORM

==================================================
CRITICAL REQUIREMENT
==================================================

Create the ACTUAL WORKING FRONTEND.

Do NOT create:
- a poster
- a presentation board
- a UI collage
- a static mockup
- a desktop-only website
- a mobile-only application

The application must work beautifully across ALL SCREEN SIZES.

It must adapt correctly to:

- Large Desktop
- Standard Desktop
- Laptop
- Tablet Landscape
- Tablet Portrait
- Mobile
- Small Mobile

The same application should intelligently change its navigation and layout based on screen size.

DESKTOP / TABLET LANDSCAPE:
Use a professional e-commerce top header and desktop navigation.

MOBILE:
Use a fixed BOTTOM NAVIGATION BAR.

The responsive behavior is extremely important.

Do not simply shrink the desktop layout into mobile.

Create dedicated responsive mobile layouts while keeping the same design system.

==================================================
1. VISUAL IDENTITY
==================================================

BRAND:
GreenMart

STYLE:
Premium modern multi-vendor e-commerce marketplace.

Design language:

- Clean
- Professional
- Modern
- Fast
- Trustworthy
- Product-focused
- Premium but simple
- Highly usable
- Conversion focused

Use a bright white / light neutral shopping experience.

PRIMARY GREEN:
#16A34A

DEEP GREEN:
#0B6B35

DARK TEXT:
#10252E

SECONDARY TEXT:
#64748B

BACKGROUND:
#F7F9F8

CARD:
#FFFFFF

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

Use green primarily for:
- CTAs
- selected states
- discount indicators
- active navigation
- trust elements
- success states

Avoid excessive green backgrounds.

==================================================
2. TYPOGRAPHY
==================================================

Use:

Inter

or another modern highly readable sans-serif font.

Typography should be responsive.

DESKTOP:
Large but controlled headings.

MOBILE:
Compact headings.

Never allow oversized headings to dominate mobile screens.

Create consistent text styles:

Display

H1

H2

H3

Body

Small

Caption

Price

Discount Price

Button

Badge

==================================================
3. RESPONSIVE BREAKPOINT SYSTEM
==================================================

Design explicitly for these widths:

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

Do not depend only on fixed pixel values.

Use responsive:

Grid

Flexbox

Auto Layout

Fluid widths

Max widths

Min widths

Clamp where useful

Responsive typography

Responsive spacing

==================================================
4. MAX CONTENT WIDTH
==================================================

On desktop:

Use a centered content container.

Suggested maximum:

1440px

Maintain proper side margins.

At large screen sizes, do not stretch content endlessly.

On mobile:

Use approximately 16px horizontal page padding.

On tablets:

Use approximately 20–24px padding.

==================================================
5. DESKTOP HEADER
==================================================

For desktop and large tablet views create a premium multi-row e-commerce header.

TOP MAIN HEADER:

LEFT:
GreenMart logo

CENTER:
Large product search bar

Search placeholder:
Search products, brands and categories...

Allow category selection inside search where appropriate.

RIGHT:

Location / Delivery Address

Wishlist

Orders

Cart

Customer profile

Optional:
Notifications

SECONDARY NAVIGATION:

Categories

Electronics

Fashion

Home & Kitchen

Beauty

Grocery

Sports

Mobiles

Appliances

More

Include:

All Categories button

Deals / Offers link

Become a Seller if appropriate

Use a clean marketplace-style navigation.

==================================================
6. TABLET HEADER
==================================================

For medium screen sizes:

Reduce the number of visible navigation items.

Keep:

Logo

Search

Location

Cart

Profile

Use a compact category navigation.

Move less-important items into:

More menu

or

Drawer

==================================================
7. MOBILE HEADER
==================================================

On mobile screens:

Do NOT use the full desktop header.

Create a dedicated mobile header.

TOP ROW:

Left:
GreenMart logo

Center / flexible:
Delivery location

Right:
Notification / Cart where appropriate

SECOND ROW:

Full-width Search Bar

Placeholder:
Search for products...

Use sticky header behavior if useful.

Keep it compact.

==================================================
8. MOBILE BOTTOM NAVIGATION
==================================================

THIS IS MANDATORY.

For mobile screens create a fixed bottom navigation bar.

Use 5 items:

HOME

CATEGORIES

SEARCH

CART

ACCOUNT

Icons:

Home

Grid / Categories

Search

Shopping Cart

User

The active item must use:

Green icon

Green text

Subtle green highlight / indicator

Inactive items:

Muted gray

Bottom navigation must remain visible on most main browsing screens.

Hide the bottom navigation only when required, for example:

- Checkout payment focus screen
- Full-screen image viewer
- OTP verification
- Certain confirmation screens

Add a Cart Badge showing item count.

Example:

Cart
3

The bottom navigation must respect:

Safe area

Mobile browser bottom inset

Gesture navigation area

Do not allow page content to hide behind the bottom navigation.

==================================================
9. ROUTES
==================================================

Create these React Router routes:

/

/categories
/category/:slug

/search

/product/:id

/wishlist

/cart

/checkout

/checkout/address
/checkout/payment
/order-success

/orders
/orders/:id

/track-order/:id

/account

/account/profile
/account/addresses
/account/wallet
/account/rewards
/account/coupons
/account/notifications
/account/referral
/account/support
/account/settings

/login
/register
/verify

==================================================
10. HOME PAGE
==================================================

Route:
/

Create a premium marketplace homepage.

DESKTOP STRUCTURE:

Header

Category navigation

Hero banner

Quick categories

Deals section

Featured products

Trending products

Top brands

Recommended products

Popular stores / vendors

Recently viewed

Promotional banners

Footer

MOBILE STRUCTURE:

Compact header

Search bar

Horizontal category shortcuts

Mobile hero carousel

Deals

Products

Recommended

Stores

Recently Viewed

Bottom navigation

==================================================
11. HERO SECTION
==================================================

Create responsive promotional hero.

DESKTOP:

Large wide banner

Optional secondary promo cards beside it.

MOBILE:

Single-card horizontal carousel.

Allow swipe.

Use pagination dots.

Never show an oversized desktop hero on mobile.

==================================================
12. CATEGORY SHORTCUTS
==================================================

Create quick category icons/cards.

Examples:

Mobiles

Fashion

Electronics

Home

Beauty

Grocery

Appliances

Sports

More

DESKTOP:
Grid / horizontal row

MOBILE:
Horizontally scrollable icon list or compact grid.

Each category item:

Icon/image

Category name

Click navigates to category page.

==================================================
13. PRODUCT CARD SYSTEM
==================================================

Create a highly reusable ProductCard.

Product card should support:

Product image

Wishlist heart

Optional badge:
Best Seller
New
Deal

Product name

Short vendor / brand

Rating

Review count

Original price

Selling price

Discount percentage

Delivery information

Stock status

Add to Cart

Quick Add if appropriate

==================================================
14. RESPONSIVE PRODUCT GRID
==================================================

The product grid MUST adapt based on width.

LARGE DESKTOP:
5 or 6 columns

DESKTOP:
4 or 5 columns

TABLET:
3 columns

MOBILE:
2 columns

SMALL MOBILE:
2 compact columns

Do NOT use a single-column product list for normal mobile shopping unless the user selects list view.

Cards must resize gracefully.

Images must maintain aspect ratio.

Product names should clamp to 2 lines.

Prices must never overflow.

==================================================
15. CATEGORY LISTING PAGE
==================================================

Route:
/category/:slug

DESKTOP:

Breadcrumb

Category title

Subcategory shortcuts

Left filter sidebar

Right product listing

Sort controls

Product grid

Pagination / Load More

FILTERS:

Price

Brand

Rating

Discount

Availability

Vendor

Delivery

Category-specific attributes

DESKTOP:
Filters remain in left sidebar.

MOBILE:
Do NOT show permanent left sidebar.

Use sticky controls:

FILTER

SORT

When Filter is tapped:

Open a full-screen mobile filter drawer or bottom sheet.

Include:

Apply Filters

Clear All

==================================================
16. SEARCH
==================================================

Route:
/search

Create intelligent search UI.

SEARCH STATES:

Initial Search

Typing

Suggestions

Recent Searches

Trending Searches

Search Results

No Results

MOBILE SEARCH:

When Search bottom-nav item is tapped:

Open a dedicated search screen.

Top:

Back

Search input auto-focused

Suggestions below.

Search suggestions can show:

Products

Categories

Brands

Stores

Recent searches

==================================================
17. PRODUCT DETAILS PAGE
==================================================

Route:
/product/:id

DESKTOP:

Two-column layout.

LEFT:

Large product image gallery

Thumbnails

Zoom

RIGHT:

Product title

Brand

Rating

Reviews

Price

Original price

Discount

Offers

Variants

Color

Size

Quantity

Delivery check

Vendor/store

Trust details

Add to Cart

Buy Now

Wishlist

MOBILE:

Stack layout vertically.

Image carousel first.

Then:

Product details

Price

Offer

Variants

Delivery

Store

Description

Reviews

Recommendations

==================================================
18. MOBILE PRODUCT STICKY CTA
==================================================

On mobile product page:

Create a sticky bottom action bar.

Buttons:

ADD TO CART

BUY NOW

This sticky action area should sit above the device safe area.

It may temporarily replace/hide the standard bottom navigation on the product details page.

Make both actions highly visible.

==================================================
19. PRODUCT IMAGE GALLERY
==================================================

DESKTOP:

Large main image

Vertical or horizontal thumbnails

MOBILE:

Swipeable image carousel

Image counter

Example:
2 / 6

Tap image:

Full-screen viewer.

Support pinch/zoom visually where practical.

==================================================
20. PRODUCT VARIANTS
==================================================

Create reusable options for:

Size

Color

Storage

RAM

Material

Other marketplace variants

Selected variant:

Green border / subtle green background

Unavailable variant:

Disabled state

==================================================
21. DELIVERY CHECK
==================================================

Create delivery availability section.

Enter PIN Code

CHECK

Display:

Available / unavailable

Estimated delivery date

Delivery charge

COD availability

Return policy

==================================================
22. STORE / VENDOR INFORMATION
==================================================

Product detail should clearly identify seller/store.

Store card:

Store logo

Store Name

Rating

Products

Trust / verified indicator

Button:

VISIT STORE

Display marketplace trust information.

==================================================
23. RATINGS & REVIEWS
==================================================

Create:

Overall rating

Rating distribution

Review count

Photo reviews

Individual reviews

Helpful button

Filter reviews

Sort reviews

MOBILE:

Keep review cards compact.

Allow horizontal photo scroll.

==================================================
24. WISHLIST
==================================================

Route:
/wishlist

Create responsive wishlist.

Desktop:
Product grid

Mobile:
2-column grid or compact product cards

Actions:

Move to Cart

Remove

Open Product

Show empty wishlist state.

==================================================
25. CART
==================================================

Route:
/cart

This is a MULTI-VENDOR marketplace.

Group cart products by SELLER / STORE.

Example structure:

STORE A

Product
Quantity
Price

STORE B

Product
Quantity
Price

Create:

Quantity selector

Remove

Move to Wishlist

Available offers

Coupon

Delivery fee

Tax

Discount

Wallet deduction

Price summary

==================================================
26. CART RESPONSIVE BEHAVIOR
==================================================

DESKTOP:

Two columns.

LEFT:
Cart products

RIGHT:
Sticky price summary.

MOBILE:

Single-column layout.

Products first.

Summary below.

Create sticky bottom CTA:

PROCEED TO CHECKOUT

Display total price beside CTA.

Example:

₹4,850

PROCEED

Do not let the mobile bottom navigation conflict with checkout CTA.

==================================================
27. COUPONS
==================================================

Create coupon experience.

Available Coupons

Coupon Code input

APPLY

Cards:

Coupon name

Benefit

Minimum order

Expiry

Apply button

Use bottom sheet on mobile.

==================================================
28. CHECKOUT
==================================================

Route:
/checkout

Create a clean multi-step checkout.

Steps:

ADDRESS

DELIVERY

PAYMENT

REVIEW

DESKTOP:

Use checkout progress indicator at top.

MOBILE:

Compact stepper.

==================================================
29. DELIVERY ADDRESS
==================================================

Create address selection.

Address card:

Name

Phone

Address

Address Type:
Home
Work
Other

Actions:

Edit

Delete

Deliver Here

Button:

ADD NEW ADDRESS

Mobile:
Use full-screen address form or bottom sheet where appropriate.

==================================================
30. ADD ADDRESS
==================================================

Fields:

Full Name

Mobile

Address Line

Landmark

City

State

PIN Code

Address Type

Set as Default

SAVE ADDRESS

==================================================
31. PAYMENT
==================================================

Create payment method selector.

Methods:

UPI

Credit / Debit Card

Net Banking

Wallet

Cash on Delivery

Each option uses an expandable mobile-friendly card.

Do NOT implement real payment processing.

Frontend state only.

==================================================
32. ORDER SUMMARY
==================================================

Checkout order summary:

Items

Subtotal

Discount

Delivery

Tax

Wallet

Coupon

Total

On desktop:

Sticky right sidebar.

On mobile:

Expandable summary card.

==================================================
33. PLACE ORDER CTA
==================================================

Desktop:

PLACE ORDER button in summary.

Mobile:

Sticky bottom bar.

LEFT:
Final Total

RIGHT:
PLACE ORDER

Keep button reachable with one hand.

==================================================
34. ORDER SUCCESS
==================================================

Route:
/order-success

Create success screen.

Large green success icon.

ORDER PLACED SUCCESSFULLY

Order Number

Estimated Delivery

Payment Status

Buttons:

TRACK ORDER

CONTINUE SHOPPING

VIEW ORDERS

==================================================
35. MY ORDERS
==================================================

Route:
/orders

Tabs:

ALL

ACTIVE

DELIVERED

CANCELLED

RETURNED

Order card:

Order ID

Products

Seller

Order Date

Total

Status

Expected Delivery

Actions:

TRACK

VIEW DETAILS

CANCEL if eligible

RETURN if eligible

BUY AGAIN

==================================================
36. ORDER DETAILS
==================================================

Route:
/orders/:id

Create complete order details.

Order ID

Order date

Status

Products

Vendor

Address

Payment

Price summary

Delivery tracking

Invoice

Support

Cancellation

Return

==================================================
37. ORDER TRACKING
==================================================

Route:
/track-order/:id

Create a premium order tracking experience.

Timeline:

Order Placed

Confirmed

Processing

Packed

Shipped

Out for Delivery

Delivered

When delivery is active:

Show map preview.

Display:

Delivery Partner

ETA

Contact options

Buttons:

CALL

CHAT

Refresh status

MOBILE:

Make tracking extremely readable.

==================================================
38. RETURNS
==================================================

Create return request workflow.

Select product

Select reason

Options:

Damaged Product

Wrong Product

Missing Item

Quality Issue

Size Issue

Changed Mind if applicable

Add comments

Upload images

Select refund method

Submit Return

Create return tracking afterward.

==================================================
39. ACCOUNT
==================================================

Bottom Nav:
ACCOUNT

Create mobile-first account dashboard.

TOP:

Customer avatar

Name

Mobile / Email

Edit Profile

Sections:

ORDERS

My Orders

Wishlist

ACCOUNT

Profile

Addresses

Wallet

Rewards

Coupons

Refer & Earn

COMMUNICATION

Notifications

Help & Support

SETTINGS

Language

Privacy

Security

Logout

Use clean list cards with icons.

==================================================
40. PROFILE
==================================================

Route:
/account/profile

Fields:

Profile Photo

Full Name

Mobile

Email

Date of Birth

Gender if required

Save Changes

==================================================
41. ADDRESS MANAGEMENT
==================================================

Route:
/account/addresses

Show saved addresses.

Actions:

Add

Edit

Delete

Set Default

==================================================
42. WALLET
==================================================

Route:
/account/wallet

Create:

Wallet Balance

Add Money UI if supported

Transaction history

Refund credits

Promotional credits

Use simple mobile-friendly cards.

==================================================
43. REWARDS
==================================================

Route:
/account/rewards

Show:

Reward Points

Available Rewards

Points History

Redeem options

Use progress indicators.

==================================================
44. COUPONS PAGE
==================================================

Route:
/account/coupons

Show:

Available

Used

Expired

Each coupon:

Offer

Code

Minimum spend

Expiry

COPY CODE

==================================================
45. REFER & EARN
==================================================

Create referral interface.

Referral code

Copy

Share

Referral benefit

Referral history

Use native-share-style frontend interaction.

==================================================
46. NOTIFICATIONS
==================================================

Route:
/account/notifications

Categories:

ALL

ORDERS

OFFERS

ACCOUNT

Notification cards:

Title

Description

Time

Unread indicator

Mark as Read

Mark All as Read

==================================================
47. HELP & SUPPORT
==================================================

Route:
/account/support

Create customer support center.

Search Help

Popular Topics

Order Issues

Payment Issues

Refund Issues

Delivery Issues

Account Issues

Returns

FAQ

Contact Support

Chat Support

Create Ticket

==================================================
48. LOGIN
==================================================

Route:
/login

Simple clean mobile and desktop responsive login.

Methods:

Mobile / Email

Password

Login

or

Login with OTP

Forgot Password

Create Account

Do not create real authentication backend.

==================================================
49. REGISTER
==================================================

Route:
/register

Fields:

Full Name

Mobile

Email

Password

Confirm Password

Terms acceptance

CREATE ACCOUNT

Keep simple.

==================================================
50. OTP
==================================================

Route:
/verify

Create:

6-digit OTP field

Resend timer

Verify

Change Number

Mobile optimized.

==================================================
51. DESKTOP FOOTER
==================================================

On desktop/tablet create full marketplace footer.

Sections:

About GreenMart

Customer Service

Policies

Sell on GreenMart

Help

Social Links

Payment Methods

App Download

Copyright

==================================================
52. MOBILE FOOTER
==================================================

On mobile:

Do not show an excessively large desktop footer.

Use compact accordion sections where appropriate.

For primary app-like routes:

Bottom navigation is more important than footer.

==================================================
53. MOBILE-FIRST INTERACTIONS
==================================================

Use mobile-friendly patterns.

Prefer:

Bottom sheets

Action sheets

Swipeable carousels

Sticky CTAs

Horizontal filter chips

Accordion sections

Full-screen search

Sticky mobile header

Avoid:

Tiny desktop dropdowns

Permanent sidebars

Hover-only functionality

Desktop-style modal boxes for everything

==================================================
54. DESKTOP INTERACTIONS
==================================================

For desktop:

Support hover states.

Dropdown menus.

Mega-menu for categories where appropriate.

Sticky filter sidebar.

Sticky price summary.

Hover product actions.

Quick-view where appropriate.

==================================================
55. FILTER & SORT MOBILE BAR
==================================================

On mobile product listing:

Create a sticky bar above bottom navigation.

Buttons:

SORT

FILTER

Optional:

VIEW

Click SORT:

Bottom sheet with:

Popularity

Price Low to High

Price High to Low

Newest

Rating

Discount

Click FILTER:

Full-screen filter panel.

==================================================
56. SEARCH BAR BEHAVIOR
==================================================

DESKTOP:

Large central search.

MOBILE:

Compact full-width search below header.

Search should support frontend state for:

Suggestions

Recent searches

Clear search

Submit

No results

==================================================
57. CART COUNT
==================================================

Update cart badge in:

Desktop header

Mobile bottom navigation

Product Add to Cart action should update local cart state.

Show success toast:

Added to Cart

==================================================
58. WISHLIST STATE
==================================================

Heart button should work visually.

Inactive:

Outline heart

Active:

Filled / highlighted heart

Use frontend state.

Show toast:

Added to Wishlist

Removed from Wishlist

==================================================
59. RESPONSIVE TABLE RULE
==================================================

Do NOT force desktop tables onto mobile.

For data-like screens such as:

Orders

Transactions

Wallet

Convert desktop tables into:

Cards

Stacked rows

Accordion items

or horizontal scroll only when absolutely necessary.

==================================================
60. RESPONSIVE CARD RULE
==================================================

Cards must not have fixed desktop widths.

Use fluid sizing.

Desktop:

Multi-column

Tablet:

Fewer columns

Mobile:

1 or 2 columns depending on content.

For product grids:

Maintain 2 columns on mobile.

For account / order content:

Prefer 1 column.

==================================================
61. IMAGE RESPONSIVENESS
==================================================

All product images:

Use aspect-ratio containers.

object-fit: contain or cover depending on context.

Never distort product images.

Use responsive image sizing.

Add skeleton states while images load.

==================================================
62. TOUCH TARGETS
==================================================

All mobile interactive targets should be approximately 44px or larger where practical.

This includes:

Buttons

Nav items

Checkboxes

Wishlist

Quantity controls

Filter chips

Back buttons

Close buttons

==================================================
63. SAFE AREA HANDLING
==================================================

Mobile fixed elements must respect safe-area-inset-bottom.

Bottom navbar

Sticky cart CTA

Sticky checkout CTA

Sticky product CTA

should never overlap the phone gesture area.

==================================================
64. MOBILE KEYBOARD HANDLING
==================================================

Forms and search fields should remain usable when keyboard opens.

Do not position required fields behind fixed bottom bars.

Allow proper vertical scroll.

==================================================
65. LOADING STATES
==================================================

Create skeleton loaders for:

Homepage

Product cards

Product details

Search

Category results

Cart

Orders

Account

Use realistic skeleton layouts rather than only centered spinners.

==================================================
66. EMPTY STATES
==================================================

Create dedicated empty states for:

Empty Cart

Empty Wishlist

No Orders

No Search Results

No Notifications

No Coupons

No Wallet Transactions

Include:

Simple icon / illustration

Short message

Useful CTA

Example:

Your cart is empty

START SHOPPING

==================================================
67. ERROR STATES
==================================================

Create reusable:

Network Error

Product Not Available

Payment Failed

Order Failed

Address Error

Server Error

Session Expired

Provide clear recovery CTA.

==================================================
68. TOAST / SNACKBAR SYSTEM
==================================================

Use frontend toast messages for:

Added to Cart

Removed from Cart

Added to Wishlist

Coupon Applied

Address Saved

Profile Updated

Order Cancelled

Return Submitted

Payment Failed

==================================================
69. MODALS & BOTTOM SHEETS
==================================================

DESKTOP:

Use centered modals or drawers.

MOBILE:

Prefer bottom sheets / full-screen overlays.

Examples:

Coupons

Filters

Sort

Quantity

Delete Address

Cancel Order

Return Reason

Contact Seller

==================================================
70. ACCESSIBILITY
==================================================

Maintain strong contrast.

Do not use color alone to communicate status.

Use:

Text

Icons

Badges

Provide visible focus states.

Use readable font sizes.

Maintain logical tab order.

Buttons should have clear labels.

==================================================
71. NAVIGATION BEHAVIOR
==================================================

DESKTOP PRIMARY NAVIGATION:

Header + category nav.

MOBILE PRIMARY NAVIGATION:

Bottom Navigation.

BOTTOM NAV ITEMS:

Home
Categories
Search
Cart
Account

When a mobile user selects:

HOME:
Go to /

CATEGORIES:
Go to /categories

SEARCH:
Go to /search

CART:
Go to /cart

ACCOUNT:
Go to /account

Active state must update according to current route.

==================================================
72. MOBILE BACK NAVIGATION
==================================================

Secondary/deeper screens should include back button in mobile header.

Examples:

Product Details

Order Details

Track Order

Account Settings

Address Editor

Return Request

Do not show unnecessary back button on main bottom-navigation routes.

==================================================
73. DESKTOP BREADCRUMBS
==================================================

Use breadcrumbs where useful.

Examples:

Home / Electronics / Mobiles

Home / My Orders / Order #...

On mobile, simplify or hide breadcrumbs.

==================================================
74. COMPONENT LIBRARY
==================================================

Create reusable components:

ResponsiveHeader

DesktopHeader

MobileHeader

CategoryNav

MobileBottomNav

SearchBar

ProductCard

ProductGrid

CategoryCard

StoreCard

HeroCarousel

PromoBanner

SectionHeader

PriceDisplay

Rating

WishlistButton

AddToCartButton

QuantitySelector

FilterSidebar

MobileFilterSheet

SortSheet

Chip

Tabs

Badge

Button

IconButton

Input

Select

Checkbox

Radio

Toggle

Accordion

Modal

Drawer

BottomSheet

Toast

Skeleton

EmptyState

ErrorState

AddressCard

OrderCard

ReviewCard

CouponCard

WalletTransaction

NotificationCard

AccountMenuItem

StickyMobileCTA

==================================================
75. CODE ARCHITECTURE
==================================================

If generating React code, organize cleanly.

Suggested:

src/
  assets/
  components/
    common/
    navigation/
    product/
    cart/
    checkout/
    account/
    orders/
  layouts/
  pages/
    home/
    categories/
    search/
    product/
    wishlist/
    cart/
    checkout/
    orders/
    account/
    auth/
  routes/
  data/
  hooks/
  context/
  utils/
  constants/

Use reusable layouts.

Do not place the complete application in App.jsx.

==================================================
76. FRONTEND STATE MANAGEMENT
==================================================

Use simple frontend state / Context where needed.

Support local mock functionality for:

Cart

Wishlist

Selected address

Selected payment

Filters

Sort

Search

Product variants

Quantity

Login state

Notifications

Order states

No backend is required.

==================================================
77. MOCK DATA RULE
==================================================

Use only enough mock data to demonstrate the UI.

Do not generate hundreds of products.

Use approximately:

6–12 products for visual sections

3–5 orders

A few categories

A few vendors

A few notifications

Keep mock data separated from UI components.

The goal is frontend quality, not fake data quantity.

==================================================
78. PERFORMANCE
==================================================

The frontend should be designed with performance in mind.

Use:

Lazy routes where practical

Reusable components

Optimized image components

Skeleton loading

Avoid excessive animation

Avoid huge DOM structures

Avoid unnecessarily loading every marketplace section at once

==================================================
79. RESPONSIVE QA REQUIREMENT
==================================================

Before considering the interface complete, verify every important screen at:

1440px

1366px

1024px

768px

430px

390px

360px

Check specifically:

No horizontal overflow

No overlapping text

No clipped buttons

No hidden price text

No nav overlap

No bottom-nav content overlap

No sticky CTA overlap

No broken product grid

No broken checkout layout

No stretched images

No tiny unreadable text

==================================================
80. MOST IMPORTANT RESPONSIVE RULE
==================================================

DO NOT JUST SCALE THE SAME UI DOWN.

Create adaptive layouts.

Example:

Desktop Category Page:
Sidebar + Products

Mobile Category Page:
Filter/Sort buttons + Products

Desktop Cart:
Cart + Sticky Summary

Mobile Cart:
Stacked products + Sticky Checkout CTA

Desktop Account:
Sidebar + Content

Mobile Account:
Account menu list + dedicated subpages

Desktop Product:
2 columns

Mobile Product:
Stacked layout + Sticky Add to Cart / Buy Now

This responsive transformation is mandatory.

==================================================
81. FINAL REQUIREMENT
==================================================

CREATE A COMPLETE CONNECTED CUSTOMER / USER E-COMMERCE FRONTEND.

It must feel like a polished real-world multi-vendor shopping platform.

DESKTOP:
Use premium e-commerce header navigation.

TABLET:
Adapt layouts intelligently.

MOBILE:
Use a persistent bottom navigation bar:

HOME
CATEGORIES
SEARCH
CART
ACCOUNT

All pages must work properly across all screen sizes.

Use dedicated mobile layouts where needed.

Use responsive grids.

Use sticky mobile CTAs.

Use bottom sheets for mobile actions.

Use minimal mock data.

All frontend controls should function using local state.

No backend is required.

No database is required.

No real payment gateway is required.

No real OTP implementation is required.

No real delivery API is required.

Build the frontend so backend APIs can be connected later.

MOST IMPORTANT:

The final UI must remain visually consistent, highly usable and professionally responsive from a 360px mobile screen all the way to large desktop monitors.

Do not create separate unrelated desktop and mobile products.

Create ONE cohesive responsive GreenMart customer experience that intelligently transforms based on screen size.