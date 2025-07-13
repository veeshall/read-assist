from flask import Flask, request, jsonify, send_from_directory
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import os
import json
import hashlib

app = Flask(__name__, static_folder='../frontend')
PROGRESS_FILE = os.path.join(os.path.dirname(__file__), '../storage/progress.json')
ANNOTATIONS_FILE = os.path.join(os.path.dirname(__file__), '../storage/annotations.json')

def get_paragraph_id(paragraph):
    return hashlib.md5(paragraph.encode('utf-8')).hexdigest()

def read_progress():
    if not os.path.exists(PROGRESS_FILE):
        return {}
    with open(PROGRESS_FILE, 'r') as f:
        return json.load(f)

def write_progress(data):
    with open(PROGRESS_FILE, 'w') as f:
        json.dump(data, f, indent=4)

def read_annotations():
    if not os.path.exists(ANNOTATIONS_FILE):
        return {}
    with open(ANNOTATIONS_FILE, 'r') as f:
        return json.load(f)

def write_annotations(data):
    with open(ANNOTATIONS_FILE, 'w') as f:
        json.dump(data, f, indent=4)

@app.route('/api/process-url', methods=['POST'])
def process_url():
    data = request.get_json()
    url = data.get('url')

    if not url:
        return jsonify({'error': 'URL is required'}), 400

    try:
        options = webdriver.ChromeOptions()
        options.add_argument('--headless')
        driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=options)
        driver.get(url)
        html = driver.page_source
        driver.quit()
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    soup = BeautifulSoup(html, 'html.parser')
    paragraphs = [p.get_text() for p in soup.find_all('p')]

    paragraphs_with_ids = []
    for p in paragraphs:
        if p.strip():
            paragraphs_with_ids.append({
                'id': get_paragraph_id(p),
                'text': p
            })

    return jsonify({'paragraphs': paragraphs_with_ids})

@app.route('/api/progress', methods=['GET'])
def get_progress():
    progress = read_progress()
    return jsonify(progress)

@app.route('/api/progress', methods=['POST'])
def update_progress():
    data = request.get_json()
    progress = read_progress()
    paragraph_id = data.get('paragraph_id')
    read = data.get('read')
    if paragraph_id:
        if 'read_paragraphs' not in progress:
            progress['read_paragraphs'] = {}
        progress['read_paragraphs'][paragraph_id] = read
        write_progress(progress)
        return jsonify({'status': 'success'})
    return jsonify({'error': 'paragraph_id is required'}), 400

@app.route('/api/annotations', methods=['GET'])
def get_annotations():
    annotations = read_annotations()
    return jsonify(annotations)

@app.route('/api/annotations', methods=['POST'])
def update_annotations():
    data = request.get_json()
    annotations = read_annotations()
    paragraph_id = data.get('paragraph_id')
    highlight = data.get('highlight')
    note = data.get('note')
    if paragraph_id:
        if 'annotations' not in annotations:
            annotations['annotations'] = {}
        if paragraph_id not in annotations['annotations']:
            annotations['annotations'][paragraph_id] = {}
        if highlight is not None:
            annotations['annotations'][paragraph_id]['highlight'] = highlight
        if note is not None:
            annotations['annotations'][paragraph_id]['note'] = note
        write_annotations(annotations)
        return jsonify({'status': 'success'})
    return jsonify({'error': 'paragraph_id is required'}), 400


@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
