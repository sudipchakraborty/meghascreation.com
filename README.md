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
