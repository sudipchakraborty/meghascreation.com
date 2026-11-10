# Megha's Creation

React and Vite storefront for Megha's Creation.

## Project structure

```text
src/
├── assets/            # Bundled images and global styles
├── components/
│   ├── common/        # Small reusable presentation components
│   ├── home/          # Landing-page sections
│   ├── layout/        # Header and footer
│   └── product/       # Reusable catalog components
├── context/           # Application-wide ecommerce state
├── data/              # Product catalog and editable site content
├── hooks/             # Reusable UI state and behavior
├── pages/             # Route-level page assembly
├── utils/             # Pure formatting and helper functions
├── App.jsx            # Providers and application entry
└── main.jsx           # React DOM bootstrap
```

Product details are maintained in `src/data/products.js`. Navigation, footer,
and editorial content are kept in `src/data/siteContent.js`, separate from the
reusable components that render them.

## Manage products locally (trial)

1. Run `npm install` once, then `npm run dev` from this folder.
2. Open the local address printed by Vite and click **Manage products** below
   the product collection, or open `http://127.0.0.1:5173/#manage-products`.
3. Choose a photo (JPEG, PNG, or WebP, maximum 5 MB), enter a name and price,
   and click **Save product**. Category, description, and label are optional.
4. Click **Edit** next to an existing product to change its price or photo.
   Uncheck **Show in shop** to hide a sold or unavailable item, then save.
5. Click **Back to shop** to see the saved collection.

Product metadata is saved in `local-data/products.json`; uploaded photos are
saved in `local-data/images/`. The folder is created on the first save/upload,
is excluded from Git, and survives server restarts. Back up the entire folder.
Existing sample photos stay bundled with the application. Replaced photos are
retained in the folder to avoid accidental loss. Only one editor should make
changes at a time. The last saved catalog wins if multiple tabs edit it.

This is a local trial: it requires the development server, accepts requests only
from this computer, and has no owner login. The deployed/static production site
continues to show the bundled sample catalog. Local edits are not published by
the deployment workflow. Before public use, connect shared storage and owner
authentication. `CatalogProvider` accepts a service with asynchronous `read()`,
`save(products)`, and `upload(dataUrl)` methods, so database integration can reuse
the editor. `createFileCatalog({ directory })` makes the folder configurable.

Run `npm test` for storage validation and `npm run build` for the production build.

## Local development

```powershell
npm install
npm run dev
```

## Hostinger deployment

The workflow in `.github/workflows/deploy.yml` builds and deploys the site whenever `main` is updated. It can also be started manually from the repository's **Actions** tab.

Before the first deployment, open the GitHub repository and go to:

**Settings → Secrets and variables → Actions → New repository secret**

Add these repository secrets:

| Secret | Value |
| --- | --- |
| `FTP_SERVER` | The FTP hostname or IP only, without `ftp://` |
| `FTP_USERNAME` | The Hostinger FTP account username |
| `FTP_PASSWORD` | The current Hostinger FTP password |

The compiled files from `dist/` are uploaded to `/public_html/`. Never commit FTP credentials to this repository.

To deploy manually, open **Actions → Build and deploy to Hostinger → Run workflow**.
