# 한 번 도는 검사: cd api && python test_app.py
import os, tempfile, base64
os.environ['DB_PATH'] = os.path.join(tempfile.mkdtemp(), 'r.db')
import app as m
c = m.app.test_client()
assert c.post('/api/reviews', json={'name': '홍길동', 'title': '전화가 멈췄어요', 'body': '기록 정리 뒤 신고하니 연락이 끊겼습니다.'}).status_code == 201
assert c.post('/api/reviews', json={'name': '홍길동', 'title': '두 번째', 'body': '바로 또 올리기'}).status_code == 429  # 60초 제한
assert c.post('/api/reviews', json={'name': 'x', 'title': 'a', 'body': 'b', 'hp': ''}).status_code == 400
assert c.post('/api/reviews', json={'name': '봇', 'title': '스팸 제목', 'body': '스팸 내용입니다', 'hp': 'x'}).status_code == 201
r = c.get('/api/reviews').get_json()
assert r['total'] == 1 and r['items'][0]['name'] == '홍길****' and r['items'][0]['title'] == '전화가 멈췄어요', r
assert c.get('/api/reviews?q=없는말').get_json()['total'] == 0
assert c.get('/api/admin').status_code == 401
h = {'Authorization': 'Basic ' + base64.b64encode(b'admin:1234').decode()}
assert c.post('/api/admin', data={'id': 1, 'act': 'hide'}, headers=h).status_code == 200
assert c.get('/api/reviews').get_json()['total'] == 0
print('ok')
