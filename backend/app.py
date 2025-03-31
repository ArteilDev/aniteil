from flask import Flask, jsonify, request
from flask_cors import CORS
import parser
from anime_parsers_ru import KodikParser
# import use_db

app = Flask(__name__)
CORS(app)

anime_parser = KodikParser()

@app.route('/main_slider/<int:limit>', methods=['GET'])
def get_main_titles(limit):
    titles = parser.get_titles_main(limit)
    main_titles = []
    
    for item in titles:
        item_info = anime_parser.search_by_id(item, "shikimori")[0]

        main_titles.append(item_info)

    return jsonify(main_titles)

@app.route('/top', methods=['GET'])
def get_top_titles():
    top_titles = parser.get_titles_top()
    # query = use_db.execute(f"""SELECT * FROM titles LIMIT 10""")
    # top_titles = []
    # for row in query: 
    #     data = {
    #         "id": row[1],
    #         "shikimori_url": row[2],
    #         "image": row[3],
    #         "title": row[4],
    #         "type": row[5],
    #         "year": row[6],
    #     }
    #     top_titles.append(data)

    return jsonify(top_titles)

@app.route('/ongoing', methods=['GET'])
def get_ongoing_titles():
    ongoing_titles = parser.get_titles_ongoing()

    return jsonify(ongoing_titles)

@app.route('/titles/genre/<string:genre>/', methods=['GET'])
def get_titles_by_genre(genre):
    titles_by_genre = parser.get_titles_by_genre(genre, 10)

    return jsonify(titles_by_genre)

@app.route('/title/<int:title_id>/', methods=['GET'])
def get_titles(title_id):
    title = anime_parser.search_by_id(title_id, "shikimori")

    return jsonify(title)

@app.route('/title/info/<int:title_id>/', methods=['GET'])
def get_titles_info(title_id):
    title_info = anime_parser.get_info(title_id, "shikimori")

    return jsonify(title_info)

@app.route('/title/video/<string:title_id>/<string:series_num>/<string:translation_id>')
def get_video(title_id, series_num, translation_id):
    
    video = anime_parser.get_link(
                id = title_id, 
                id_type ="shikimori", 
                seria_num = series_num, 
                translation_id = translation_id)
    
    return jsonify(video)

@app.route('/search/<string:query>/', methods=['GET'])
def search_titles(query):
    try:
        search = anime_parser.search(query)

        return jsonify(search)
    except Exception:
        return jsonify('Ничего не найдено')
    
@app.route('/catalog', methods=['GET'])
def get_catalog():
    sort_by = request.args.get('sort_by')
    statuses = request.args.get('statuses')
    page = request.args.get('page')

    catalog = parser.get_catalog(page, sort_by, statuses)
    return jsonify(catalog)

if __name__ == '__main__':
    app.run(debug=True)