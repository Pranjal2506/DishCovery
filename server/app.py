from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import dotenv
import os
import ast
from prompts import ingredients_propmt, image_prompt, description_prompt, detailed_recipe_prompt
from PIL import Image
import io
import json

app = Flask(__name__)
CORS(app, origins="*")

dotenv.load_dotenv()
key = os.getenv("api_key")
genai.configure(api_key=key)
model = genai.GenerativeModel("gemini-1.5-flash")

@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({"message": "pong"}), 200

@app.route('/suggest_dishes_ingredients', methods=['POST'])
def ingredients_input():
    data = request.get_json()
    input = data.get("input", '')
    prompt = ingredients_propmt + input
    
    try:
        response = model.generate_content(
            prompt,
            stream = False
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    recipies = ast.literal_eval(response.text)
    return jsonify({"dishes": recipies}), 200

@app.route('/suggest_dishes_image', methods=['POST'])
def image_suggestion():
    image = request.files.get('image')
    if not image:
        return jsonify({"error": "No image provided"}), 400
    
    image_bytes = image.read()
    image_pil = Image.open(io.BytesIO(image_bytes))
    
    res = model.generate_content(contents=[image_prompt, image_pil], stream=False)
    res_text = res.text.strip()
    
    # Clean triple backticks and optional "json" tag
    if res_text.startswith("```json"):
        lines = res_text.split("\n")
        # Remove first line (```json) and last line (```)
        if lines[-1].strip() == "```":
            lines = lines[1:-1]
        else:
            lines = lines[1:]
        cleaned_text = "\n".join(lines)
    else:
        cleaned_text = res_text
    
    try:
        resjson = json.loads(cleaned_text)
    except json.JSONDecodeError as e:
        print("JSON decode error:", e)
        return jsonify({"error": "Failed to parse response from AI"}), 500
    
    print(resjson)
    return jsonify(resjson), 200

@app.route('/describe_dish', methods=['POST'])
def get_describe_name():
    data = request.get_json()
    description = data.get('description','')
    
    if not description:
        return jsonify({'error': 'Description is required'}), 400
    
    prompt = description_prompt + description
    
    try:
        response = model.generate_content(
            prompt,
            stream = False
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    possible_dishes = response.text
    dishes = ast.literal_eval(possible_dishes)
    
    return jsonify({'dishes': dishes}), 200

@app.route('/detailed_dish', methods=['POST'])
def detailed_dish():
    data = request.get_json()
    dish_name = data.get('dishname','')
    if not dish_name:
        return jsonify({'error': 'Dish name is required'}), 400
    prompt = detailed_recipe_prompt+ "\n\n" + dish_name
    response = model.generate_content(prompt, stream=False)
    res_text = response.text.strip()
    
    # Clean triple backticks and optional "json" tag
    if res_text.startswith("```json"):
        lines = res_text.split("\n")
        # Remove first line (```json) and last line (```)
        if lines[-1].strip() == "```":
            lines = lines[1:-1]
        else:
            lines = lines[1:]
        cleaned_text = "\n".join(lines)
    else:
        cleaned_text = res_text
    
    try:
        resjson = json.loads(cleaned_text)
    except json.JSONDecodeError as e:
        print("JSON decode error:", e)
        return jsonify({"error": "Failed to parse response from AI"}), 500
    
    print(resjson)
    return jsonify(resjson), 200
    
    

if __name__ == '__main__':
    app.run(debug=True)