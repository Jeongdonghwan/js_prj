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
m.app.config['SESSION_COOKIE_SECURE'] = False  # 검사는 http
r = c.get('/api/admin'); assert r.status_code == 401 and '로그인' in r.get_data(as_text=True)
assert c.post('/api/admin', data={'id': 1, 'act': 'hide'}).status_code == 401                 # 로그인 없이는 못 바꾼다
assert c.get('/api/reviews').get_json()['total'] == 1
assert c.post('/api/admin/login', data={'user': 'admin', 'pw': 'wrong'}).status_code == 401
assert c.post('/api/admin/login', data={'user': 'admin', 'pw': '1234'}).status_code == 302
assert c.post('/api/admin', data={'id': 1, 'act': 'save', 'title': '<b>고친 제목', 'body': '고친 내용입니다.'}).status_code == 302
r = c.get('/api/admin?m=save').get_data(as_text=True); assert '&lt;b&gt;고친 제목' in r and '<b>고친' not in r and '수정했습니다' in r   # 글 내용은 태그로 안 먹힌다
assert c.post('/api/admin', data={'id': 1, 'act': 'save', 'title': 'x', 'body': 'y'}).status_code == 302
assert c.get('/api/reviews').get_json()['items'][0]['title'] == '<b>고친 제목'                # 너무 짧은 수정은 반영 안 됨
assert c.post('/api/admin', data={'id': 1, 'act': 'hide'}).status_code == 302
assert c.get('/api/reviews').get_json()['total'] == 0
c.post('/api/admin', data={'id': 1, 'act': 'show'}); assert c.get('/api/reviews').get_json()['total'] == 1
c.post('/api/admin', data={'id': 1, 'act': 'delete'}); assert c.get('/api/reviews').get_json()['total'] == 0
c.post('/api/admin/logout'); assert c.get('/api/admin').status_code == 401
print('ok')
