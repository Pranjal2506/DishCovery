# 🍽️ DishCovery - Your AI-Powered Recipe Genie

Ever seen a dish and wondered what it’s called? Or had random ingredients in the kitchen but no idea what to cook?

**DishCovery** is an AI-powered web app that helps users:
- Identify dishes by **description**
- Recognize dishes from a **photo**
- Suggest recipes based on **available ingredients**

🌐 **[Try it Live →](https://dish-covery-zeta.vercel.app/)**

📺 **[See the video →](https://dish-covery-zeta.vercel.app/)**

---

## 🔥 Features

### 🗣️ Describe a Dish

Type how the dish looked or what it had, and DishCovery will suggest matching recipes using AI.

![Describe Dish Screenshot](https://github.com/Pranjal2506/DishCovery/blob/master/client/public/Screenshot%202025-06-21%20162746.png)

---

### 📷 Upload a Photo

Upload a snap of a dish and get its name + detailed recipe instantly.

![Upload Image Screenshot](https://github.com/Pranjal2506/DishCovery/blob/master/client/public/Screenshot%202025-06-21%20162808.png)

---

### 🧂 Ingredient-Based Recipes

Enter the ingredients you have, and discover what you can cook without needing a grocery trip.

![Ingredients Screenshot](https://github.com/Pranjal2506/DishCovery/blob/master/client/public/Screenshot%202025-06-21%20162831.png)

---

## 💻 Tech Stack

| Technology         | Purpose                             |
|--------------------|-------------------------------------|
| React              | Frontend UI                         |
| Flask              | Backend API                         |
| Google Gemini API  | AI (text & vision understanding)    |
| Python             | Backend logic & image processing    |
| CSS / Tailwind     | Styling & Layout                    |

---

## 🚀 Getting Started

### 🔧 Backend (Flask)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python app.py
