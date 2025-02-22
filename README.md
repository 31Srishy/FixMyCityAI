# FixMyCityAI
# 🚀 FixMyCity AI - GenAI-powered Civic Issue Tracker

## 📌 Overview
FixMyCity AI is an AI-powered platform that helps citizens report civic issues (like potholes, garbage dumps, and traffic congestion) and enables authorities to resolve them efficiently.

## 📜 How to Run Locally
1️⃣ Clone the repo:
```sh
git clone https://github.com/31Srishy/FixMyCity-AI.git

# To run django file
cd django-backend\FixMyCityAI
pip install -r requirements.txt
# To be done only done only when required(when the models are modified)
python manage.py makemigrations
python manage.py migrate
#to run
python manage.py runserver

# To run frontend
cd frontend
# only the first time
npm install
#to run
npm run dev


#Pitch video:
https://drive.google.com/file/d/13bntu-xTjlf2_83fFGwZk4seJDOw97o8/view?usp=sharing