# 🚀 Wild Terraform-Medicine n8n Workflow

A crazy automation setup combining Terraform Associate exam prep with medical research for you and your GF!

## 🎯 What This Does

This n8n workflow automates:
1. **Daily Terraform Practice** - Applies AWS infrastructure (S3, EC2, VPC) for hands-on learning
2. **Medical Research Scraping** - Fetches latest papers from PubMed API
3. **Smart Email Digest** - Sends daily updates with Terraform quiz questions + medical insights
4. **Visual Dashboard** - Beautiful web interface to monitor workflow progress

## 🛠️ Setup Instructions

### 1. n8n Workflow
```bash
# Start n8n
npm run n8n

# Access at http://localhost:5678
# Import workflow from: workflows/terraform-study.json
```

### 2. Web Dashboard
```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

### 3. AWS Configuration
- Set up AWS credentials in Terraform exec node
- Configure S3 bucket, EC2 instances, VPC in your `.tf` files
- Update working directory path in workflow

### 4. Email Setup
- Add your email credentials to n8n
- Configure recipient (your GF's email)
- Test email sending

## 📊 Workflow Visualization

The web app shows real-time status of:
- **Schedule Trigger** → Daily 9 AM automation
- **Terraform Execution** → AWS infrastructure deployment
- **PubMed Scraping** → Medical research updates
- **Email Notification** → Study digest delivery

## 🎓 Terraform Associate Exam Prep

Includes:
- Infrastructure as Code practice
- State management exercises
- Module creation challenges
- AWS resource provisioning
- Cost optimization tracking

## 🏥 Medical Research Integration

Features:
- PubMed API integration
- Research paper summaries
- Medical terminology learning
- Clinical trial updates
- Research methodology tips

## 🚀 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 📱 Study Resources

- [Terraform + Medical Research Guide](https://docs.google.com/document/d/1wApYQBXRGIj9ISJtOJ4j0bdqxbccK-OYx38rjlhrA38/edit)
- n8n Workflow: `workflows/terraform-study.json`
- Web Dashboard: `pages/index.js`

## 🔧 Tech Stack

- **n8n** - Workflow automation
- **Next.js** - Web dashboard
- **Tailwind CSS** - Styling
- **Terraform** - Infrastructure as Code
- **AWS** - Cloud provider
- **PubMed API** - Medical research
- **Gmail API** - Email notifications

## 💡 Why This Is Wild

This setup combines:
- Terraform learning through daily AWS deployments
- Medical research automation for your GF
- Visual workflow monitoring
- Automated study reminders
- Real-world cloud infrastructure practice

Perfect for your Terraform Associate exam prep while helping with medical research! 🎉 