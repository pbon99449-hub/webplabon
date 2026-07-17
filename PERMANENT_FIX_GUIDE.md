# 🔥 WearNest - পার্মানেন্ট ইমেইল ও SMS ফিক্স গাইড

## ⚠️ সমস্যা:

1. **Backend Server বন্ধ** - প্রতি রাতে বা কিছুক্ষণ পর পর বন্ধ হয়ে যায়
2. **Gmail SMTP ব্লক** - Google "Less Secure Apps" সাপোর্ট বন্ধ করে দিয়েছে
3. **Twilio SMS লিমিট** - ফ্রি ট্রায়ালে প্রতিদিন মাত্র 5টি SMS

---

## ✅ পার্মানেন্ট সমাধান (একবার করলেই হবে)

### সমাধান ১: Backend Server সবসময় চালু রাখুন (FREE)

#### Windows এর জন্য (বর্তমানে যা করতে পারেন):
```bash
# 1. Command Prompt (Admin) হিসাবে খুলুন
# 2. নিচের কমান্ড দিন:
cd /d "d:\website creating me\wearnest\backend"
node src/server.js
```
উইন্ডো বন্ধ না করলেই সার্ভার চলতে থাকবে।

#### **VPS/Hosting এ আপলোড করুন (সেরা সমাধান)**:
**FREE HOSTING অপশন:**
1. **Render.com** (FREE) - https://render.com
2. **Railway.app** (FREE $5 credit) - https://railway.app
3. **Cyclic.sh** (FREE) - https://cyclic.sh
4. **Fly.io** (FREE $5 credit) - https://fly.io

**কিভাবে আপলোড করবেন:**
1. GitHub এ push করুন
2. Render/Railway এ GitHub repo connect করুন
3. Auto-deploy হবে, আর কখনো বন্ধ হবে না!

---

### সমাধান ২: ইমেইলের জন্য Resend.com সেটআপ করুন (FREE - 100 ইমেইল/দিন)

**Gmail এর বিকল্প হিসাবে Resend.com - এটি কখনো ব্লক হয় না!**

```bash
Step 1: https://resend.com এ sign up করুন
Step 2: Email verify করুন
Step 3: API Key নিন (re_ দিয়ে শুরু)
Step 4: .env ফাইলে যোগ করুন:
```

**.env ফাইলে যোগ করুন:**
```env
RESEND_API_KEY=re_আপনার_এপিআই_কী
RESEND_FROM_EMAIL=onboarding@resend.dev
```

---

### সমাধান ৩: বাংলাদেশ SMS Gateway সেটআপ করুন (FREE)

**Twilio এর বিকল্প - বাংলাদেশের জন্য পার্মানেন্ট সমাধান:**

#### অপশন A: SMS.net.bd (RECOMMENDED - FREE)
1. https://sms.net.bd এ যান
2. ফ্রি রেজিস্ট্রেশন করুন
3. API Key নিন
4. `.env` ফাইলে যোগ করুন:
```env
BD_SMS_API_KEY=আপনার_এপিআই_কী
BD_SMS_SENDER_ID=WearNest
```

#### অপশন B: BulkSMSBD.net (ALTERNATIVE)
একই API Key কাজ করবে, Python service automatically try করবে।

#### অপশন C: Android Phone দিয়ে SMS (100% FREE)
একটি Android অ্যাপ দিয়ে SMS পাঠাতে পারেন:
1. "Tasker" বা "SMS Gateway" অ্যাপ ইন্সটল করুন
2. Webhook URL সেট করুন
3. `.env` এ যোগ করুন:
```env
SMS_WEBHOOK_URL=http://your-android-ip:8080/sms
```

---

### সমাধান ৪: MongoDB Atlas (ইতিমধ্যে কাজ করছে)

আপনার MongoDB Atlas ইতিমধ্যে কানেক্টেড এবং কাজ করছে:
```
MONGODB_URI=mongodb+srv://plabon:01863299604pl@cluster0.fghvib9.mongodb.net/wearnest?retryWrites=true&w=majority&appName=Cluster0
```

---

## 🚀 দ্রুত সমাধান (এখনই করুন)

### Step 1: Backend Server চালু করুন

**Command Prompt খুলুন (PowerShell নয়)** এবং রান করুন:
```cmd
cd /d "d:\website creating me\wearnest\backend"
node src/server.js
```

### Step 2: চেক করুন সার্ভার চলছে কিনা:
ব্রাউজারে যান: http://localhost:5000/api/health

### Step 3: ফ্রন্টেন্ড চালু করুন:
আরেকটি Command Prompt খুলুন:
```cmd
cd /d "d:\website creating me\wearnest\wearnest"
npm run dev
```

---

## 📊 কিভাবে চেক করবেন সব কাজ করছে?

### ইমেইল টেস্ট:
```bash
# Python দিয়ে সরাসরি টেস্ট:
cd "d:\website creating me\wearnest\backend"
python python_services/email_sender.py health
```

### SMS টেস্ট:
```bash
cd "d:\website creating me\wearnest\backend"
python python_services/sms_sender.py health
```

### ওয়েবসাইট চেক:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000/api/health
- Services: http://localhost:5000/api/health/services

---

## 🔧 Auto-Start Script (Windows)

**সার্ভার নিজে থেকে চালু রাখার জন্য:**

### Batch File তৈরি করুন:
`C:\Users\SILICON TECH\Desktop\start_wearnest.bat`
```batch
@echo off
title WearNest Backend
cd /d "d:\website creating me\wearnest\backend"
node src/server.js
pause
```

### Windows Task Scheduler (Auto-start on boot):
1. Task Scheduler খুলুন
2. "Create Basic Task" ক্লিক করুন
3. Trigger: "When the computer starts"
4. Action: Start a program → browse করে bat file সিলেক্ট করুন
5. Finish

**এখন থেকে কম্পিউটার ON হলেই সার্ভার auto-start হবে!**

---

## 🎯 চূড়ান্ত সুপারিশ

| সমস্যা | সমাধান | কস্ট | পার্মানেন্ট? |
|--------|---------|------|-------------|
| সার্ভার বন্ধ | Render/Railway এ হোস্ট | FREE | ✅ হ্যাঁ |
| Gmail ব্লক | Resend.com সেটআপ | FREE (100/day) | ✅ হ্যাঁ |
| SMS লিমিট | BD SMS Gateway | FREE | ✅ হ্যাঁ |

### এখনই যা করতে পারেন:
1. ❌ **এখনই** উপরের Step 1 ও Step 2 করুন (সার্ভার চালু করুন)
2. 🔜 **পরে** Render/Railway এ হোস্ট করুন (সার্ভার আর বন্ধ হবে না)
3. 🔜 **পরে** Resend.com ও BD SMS Gateway সেটআপ করুন (ইমেইল/SMS আর বন্ধ হবে না)

---

## 📞 যোগাযোগ

যদি কোনো সমস্যা হয়:
- Email: pbon99449@gmail.com
- Phone: 016797696976