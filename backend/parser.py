import bs4
import requests

shikimori_url = 'https://shikimori.one'

headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
    }

def get_soup(url):
    res = requests.get(url, headers=headers)
    return bs4.BeautifulSoup(res.text, 'html.parser')

def get_titles_top():
    titles_top_page = get_soup(shikimori_url + '/animes')
    titles_top_list = titles_top_page.find_all('article', class_ = 'c-anime')[:10]
    titles_top = []
    for item in titles_top_list:
        id = item.get('id')
        title = item.find('span', class_ = 'name-ru').find(text = True).strip()
        # image = item.find('source').get('srcset').split(',')
        image = item.find('img').get('src')
        miscs = [x.text for x in item.find('span', class_ = 'misc').findAll('span')]
            
        titles_top.append({ 'id': id, 'title': title, 'image': image, 'miscs': miscs })

    return titles_top

def get_titles_ongoing():
    titles_top_page = get_soup(shikimori_url + '/animes/status/ongoing')
    titles_top_list = titles_top_page.find_all('article', class_ = 'c-anime')
    titles_top = []
    for item in titles_top_list:
        id = item.get('id')
        title = item.find('span', class_ = 'name-ru').find(text = True).strip()
        image = item.find('img').get('src')
        miscs = [x.text for x in item.find('span', class_ = 'misc').findAll('span')]
            
        titles_top.append({ 'id': id, 'title': title, 'image': image, 'miscs': miscs })

    return titles_top

def get_titles_main(limit):
    titles_main_page = get_soup(shikimori_url + '/animes/status/latest,ongoing?order=popularity')
    titles_main_list = titles_main_page.find_all('article', class_ = 'c-anime')[:limit]
    titles_main = []
    for item in titles_main_list:
        id = item.get('id')
        titles_main.append(id)

    return titles_main

def get_titles_by_genre(genre, limit):
    titles_by_genre_page = get_soup(shikimori_url + '/animes/genre/' + genre + "?order=popularity")
    titles_by_genre_list = titles_by_genre_page.find_all('article', class_ = 'c-anime')[:limit]
    titles_by_genre = []
    for item in titles_by_genre_list:
        id = item.get('id')
        title = item.find('span', class_ = 'name-ru').find(text = True).strip()
        image = item.find('img').get('src')
        miscs = [x.text for x in item.find('span', class_ = 'misc').findAll('span')]
            
        titles_by_genre.append({ 'id': id, 'title': title, 'image': image, 'miscs': miscs })

    return titles_by_genre

def get_catalog(page, sort_by, statuses):
    query = ''

    if sort_by is not None:
        query = f'&{query}order={sort_by}'
    if statuses is not None:
        catalog_page = get_soup(f'{shikimori_url}/animes/status/{statuses}?page={page}{query}')
    else:
        catalog_page = get_soup(f'{shikimori_url}/animes?page={page}{query}')
    
    catalog_list = catalog_page.find_all('article', class_ = 'c-anime')
    catalog = []

    for item in catalog_list:
        id = item.get('id')
        try:
            title = item.find('span', class_ = 'name-ru').find(text = True).strip()
        except:
            title = item.find('a').find(text = True).strip()
        image = item.find('img').get('src')
        miscs = [x.text for x in item.find('span', class_ = 'misc').findAll('span')]
            
        catalog.append({ 'id': id, 'title': title, 'image': image, 'miscs': miscs })\
        
    return catalog