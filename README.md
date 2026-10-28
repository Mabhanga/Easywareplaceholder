# Easyware Solutions – Placeholder Content Bug

Automated Playwright reproduction of a content bug on [easywaresolutions.com](https://easywaresolutions.com/index.php).

## The bug

The **Careers** and **Web Services** pages display the placeholder text **"Text will come here."** instead of real content.

| Page | URL |
|------|-----|
| Careers | `/easy-ware-careers.php` |
| Web Services | `/easy-ware-solutions-web-services.php` |

**Steps to reproduce**
1. Open https://easywaresolutions.com/index.php
2. Click **Careers** (or **Web Services**)

**Expected:** Job listings or a "no current openings" message (and real service content on Web Services).
**Actual:** "Text will come here."
**Browsers:** Chromium, Firefox, WebKit
**Severity:** Medium. It affects the site's credibility and blocks candidates from seeing vacancies.

## Other issues noticed

- Careers page breadcrumb reads "Home > Portfolio".
- Sidebar typo: "Mircrosoft Great Plains Dynamics".
- A third-party ad banner (WebHostingPad) sits between the header image and page content.

## Tests

`tests/Careers.spec.ts` contains two tests that assert the placeholder text is **not** present. They **fail while the bug exists** and will pass once the pages are fixed.

Third-party requests are blocked so the external ad banner doesn't stall page loads.

## Run it

```bash
npm install
npx playwright install
npx playwright test tests/Careers.spec.ts --workers=1
npx playwright show-report
```

**Expected result:** 6 failed (2 tests × 3 browsers), each with `Expected: 0, Received: 1`.

## Tech

Playwright · TypeScript · GitHub Actions
