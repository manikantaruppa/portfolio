# Manikanta Portfolio - Vercel Deployment

Production-ready portfolio website with serverless backend for Vercel deployment.

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: Vercel Serverless Functions (Node.js)
- **Email**: Nodemailer with Gmail SMTP

## Project Structure

```
portfolio-prod/
├── api/                    # Vercel Serverless Functions
│   └── send-email.js       # Contact form email endpoint
├── src/                    # React frontend source
│   ├── components/         # UI components
│   ├── lib/                # Utilities
│   └── hooks/              # Custom hooks
├── public/                 # Static assets
├── vercel.json             # Vercel configuration
├── package.json            # Dependencies
└── vite.config.ts          # Vite configuration
```

## Deployment to Vercel

### Step 1: Push to GitHub

```bash
cd portfolio-prod
git init
git add .
git commit -m "Initial commit - Portfolio for Vercel"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/manikanta-portfolio.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variables (see below)
6. Click "Deploy"

### Step 3: Configure Environment Variables

In Vercel Dashboard > Project Settings > Environment Variables, add:

| Variable | Value | Description |
|----------|-------|-------------|
| `EMAIL_USER` | `your-email@gmail.com` | Gmail address |
| `EMAIL_APP_PASSWORD` | `xxxx xxxx xxxx xxxx` | Gmail App Password |
| `EMAIL_FROM` | `your-email@gmail.com` | From address |
| `EMAIL_TO` | `your-email@gmail.com` | Recipient address |
| `SEND_AUTO_REPLY` | `true` | Enable auto-reply |
| `NODE_ENV` | `production` | Environment |

### Step 4: Set Custom Subdomain (Optional)

1. Go to Vercel Dashboard > Project > Settings > Domains
2. Change the default domain to your preferred subdomain:
   - `manikanta-ai.vercel.app`
   - Or connect a custom domain

## Gmail App Password Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Go to [Google Account Settings](https://myaccount.google.com/)
3. Navigate to Security > 2-Step Verification > App passwords
4. Generate an app password for "Mail"
5. Use this 16-character password in `EMAIL_APP_PASSWORD`

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/send-email` | POST | Send contact form email |

### Request Body

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "subject": "Hello",
  "message": "Your message here..."
}
```

## Free Subdomain Setup (is-a.dev)

After Vercel deployment, you can get a free `.is-a.dev` or `.is-an-ai.dev` subdomain:

1. Fork [is-a-dev/register](https://github.com/is-a-dev/register)
2. Create `domains/manikanta.json`:
   ```json
   {
     "owner": {
       "username": "manikantaruppa",
       "email": "your-email@gmail.com"
     },
     "record": {
       "CNAME": "manikanta-ai.vercel.app"
     }
   }
   ```
3. Submit a Pull Request
4. Once merged, your site will be at `manikanta.is-a.dev`

## License

MIT License - Manikanta Ruppa
