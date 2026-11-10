# Local product management — 2026-11-06

The owner approved local-folder storage for a trial before moving to a database.
Use a Vite development middleware with JSON metadata and uploaded images under
`local-data/`. Browser-only storage would not satisfy the folder requirement;
a database or hosted CMS is deferred. The manager is local-only, without a login,
and the static production build retains the bundled catalog.

## Implementation plan

- [x] Test file persistence, input validation, image validation, and empty catalogs using Node's test runner.
- [x] Implement a parameterized file repository with atomic catalog replacement and a local-only API middleware.
- [x] Add a configurable catalog service and provider, a product editor with image preview, and storefront integration.
- [x] Verify tests, production build, and local API persistence; document usage and limitations in README and progress.md.

Verification: all three Node tests pass, including real HTTP image upload and
retrieval, Unicode persistence, and cross-origin rejection. Production build
passes with Vite 8.3.6; dependency audit reports zero vulnerabilities. Browser
visual inspection could not run because the browser access host is unavailable.

The repository owns validation and disk I/O. Middleware owns HTTP handling. The
React service owns transport and can later be replaced with database-backed API
calls without rewriting the form. Reject invalid prices and unsupported images;
show loading, failed-save, and empty states. Keep existing photos during edits.
The local API must reject cross-origin writes and run on loopback only.
