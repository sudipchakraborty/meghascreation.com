# Megha's Creation

React and Vite storefront for Megha's Creation.

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
