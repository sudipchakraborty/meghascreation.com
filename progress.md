# Project progress

## 2026-11-06 — Product management review

- Request: allow the owner to add handmade products, upload photos, and change prices without editing code.
- Inspected the React/Vite storefront, product components, catalog, and Hostinger deployment workflow.
- Current catalog: four products defined in `src/data/products.js`; the storefront imports this file directly. No backend, owner authentication, or shared product storage currently exists.
- Deployment currently uploads the Vite build to Hostinger's `public_html` through GitHub Actions.
- Proposed direction: a password-protected owner page with photo preview, product details, prices, and publish/hide controls, backed by persistent shared storage. Keep storage access behind a configurable reusable service and document public interfaces with Doxygen-compatible comments.
- Pending: choose the persistence approach and confirm hosting capabilities before implementation. No product functionality has been changed yet.

## 2026-11-06 — Local-folder trial implementation

- Owner selected local-folder storage now, with database integration deferred.
- Added `server/fileCatalog.js`: parameterized filesystem repository, validated product data and JPEG/PNG/WebP uploads, generated image filenames, and atomic JSON catalog replacement.
- Added a loopback-only Vite middleware API with cross-origin protection. Local data lives in ignored `local-data/products.json` and `local-data/images/` and survives restarts.
- Added an injectable catalog service/provider; later adapters implement `read()`, `save(products)`, and `upload(dataUrl)` to reuse the same UI.
- Added `#manage-products`: add/edit products, photo preview/replacement, price, category, description, label, show/hide controls, save/error/loading feedback, and a responsive layout.
- Storefront now reads shared catalog state, displays descriptions, filters hidden products, and preserves uploaded-photo framing. The manager link appears below the local product collection.
- Local trial intentionally has no authentication; production build keeps the bundled storefront catalog and does not enable management. No deployment or push performed.
- Documented owner steps, backups, single-editor limitation, retained replaced photos, and future storage integration in README.md; added implementation notes under docs/.
- Verification so far: three Node tests passed (disk persistence/validation, image validation, and real HTTP upload/save/read/cross-origin checks); local catalog API and transformed manager module both returned HTTP 200. Initial production build passed. Browser inspection unavailable because browser access host is unavailable.
- Updated the lockfile to resolve existing Vite/source-map-js vulnerabilities. Final verification: all three tests passed, Vite 8.3.6 production build passed, `git diff --check` passed, and dependency audit reported zero vulnerabilities. npm emitted a cleanup warning for an in-use old native build-tool binary; installation and all checks completed successfully.

## 2026-11-10 — Repository publication

- User requested committing and pushing the local product-management implementation to `origin/main`.
- Reviewed changed and untracked files; local product data, photos, dependencies, and build output remain excluded from Git.
- Fresh verification: all three tests passed, production build passed using Vite 8.3.6, and `git diff --check` passed.
- Fetched origin and confirmed main had no divergence before committing. The existing main-push workflow attempts Hostinger deployment; deployed product management remains disabled pending shared storage and authentication.
