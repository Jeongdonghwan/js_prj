# 후기 게시판 API — Flask + SQLite 한 파일. 정적 사이트(nginx)가 /api/ 를 이 앱(127.0.0.1:8112)으로 넘긴다.
# 익명: 이름은 앞 두 글자만 남기고 '****' 로 바꿔 저장한다(원래 이름·연락처는 저장하지 않음). IP 는 도배 방지용으로만 쓰고 글에 남기지 않는다.
#   GET  /api/reviews?q=&offset=   목록 {items:[{id,name,title,body,at}], total}
#   POST /api/reviews              {name,title,body,hp}  hp(함정 칸)는 비어 있어야 함
#   GET  /api/admin                관리(Basic Auth) — 글 숨기기
import os, re, sqlite3, time, html
from flask import Flask, request, jsonify, Response, abort

app = Flask(__name__)
DB = os.environ.get('DB_PATH', os.path.join(os.path.dirname(__file__), 'reviews.db'))
ADMIN_ID = os.environ.get('ADMIN_ID', 'admin')
ADMIN_PW = os.environ.get('ADMIN_PW', '1234')
PAGE = 20
# ponytail: IP 별 마지막 글 시각을 메모리에 둔다(워커 1개 기준). 워커를 늘리면 DB 로 옮긴다
last_post: dict[str, float] = {}


def db():
    c = sqlite3.connect(DB)
    c.row_factory = sqlite3.Row
    c.execute('CREATE TABLE IF NOT EXISTS reviews (id INTEGER PRIMARY KEY, name TEXT, title TEXT, body TEXT, at INTEGER, hidden INTEGER DEFAULT 0)')
    return c


def mask(name: str) -> str:
    name = re.sub(r'\s+', '', name)
    return name[:2] + '****'


def ip() -> str:
    return (request.headers.get('X-Forwarded-For', '').split(',')[0] or request.remote_addr or '').strip()


@app.get('/api/reviews')
def list_reviews():
    q = request.args.get('q', '').strip()[:40]
    offset = max(0, int(request.args.get('offset', 0) or 0))
    where, args = 'hidden=0', []
    if q:
        where += ' AND (title LIKE ? OR body LIKE ?)'
        args = [f'%{q}%', f'%{q}%']
    with db() as c:
        total = c.execute(f'SELECT COUNT(*) FROM reviews WHERE {where}', args).fetchone()[0]
        rows = c.execute(f'SELECT id,name,title,body,at FROM reviews WHERE {where} ORDER BY at DESC, id DESC LIMIT ? OFFSET ?', [*args, PAGE, offset]).fetchall()
    return jsonify(items=[dict(r) for r in rows], total=total)


@app.post('/api/reviews')
def add_review():
    d = request.get_json(silent=True) or {}
    name, title, body = (str(d.get(k, '')).strip() for k in ('name', 'title', 'body'))
    if d.get('hp'):  # 함정 칸 — 사람은 못 보고 봇만 채운다
        return jsonify(ok=True), 201
    if not (1 <= len(name) <= 20 and 2 <= len(title) <= 80 and 5 <= len(body) <= 2000):
        return jsonify(error='이름 1~20자, 제목 2~80자, 내용 5~2000자로 적어 주세요.'), 400
    if re.search(r'https?://|www\.', title + body):
        return jsonify(error='링크는 적을 수 없습니다.'), 400
    now = time.time()
    if now - last_post.get(ip(), 0) < 60:
        return jsonify(error='잠시 뒤 다시 올려 주세요.'), 429
    last_post[ip()] = now
    with db() as c:
        c.execute('INSERT INTO reviews (name,title,body,at) VALUES (?,?,?,?)', (mask(name), title, body, int(now)))
    return jsonify(ok=True), 201


def need_auth():
    a = request.authorization
    if not a or a.username != ADMIN_ID or a.password != ADMIN_PW:
        return Response('로그인이 필요합니다.', 401, {'WWW-Authenticate': 'Basic realm="reviews"'})


@app.route('/api/admin', methods=['GET', 'POST'])
def admin():
    if (r := need_auth()):
        return r
    with db() as c:
        if request.method == 'POST':
            rid, act = request.form.get('id'), request.form.get('act')
            c.execute('UPDATE reviews SET hidden=? WHERE id=?', (1 if act == 'hide' else 0, rid))
        rows = c.execute('SELECT * FROM reviews ORDER BY id DESC LIMIT 300').fetchall()
    tr = ''.join(
        f"<tr{' class=h' if r['hidden'] else ''}><td>{r['id']}</td><td>{html.escape(r['name'])}</td><td><b>{html.escape(r['title'])}</b><br><small>{html.escape(r['body'])}</small></td>"
        f"<td>{time.strftime('%m-%d %H:%M', time.localtime(r['at']))}</td><td><form method=post><input type=hidden name=id value={r['id']}>"
        f"<button name=act value={'show' if r['hidden'] else 'hide'}>{'보이기' if r['hidden'] else '숨기기'}</button></form></td></tr>" for r in rows)
    return f"<!doctype html><meta charset=utf-8><title>후기 관리</title><style>body{{font:15px/1.5 sans-serif;margin:24px}}table{{border-collapse:collapse;width:100%}}td{{border-top:1px solid #ddd;padding:8px;vertical-align:top}}.h{{opacity:.4}}</style><h1>후기 관리</h1><table>{tr}</table>"


@app.get('/api/health')
def health():
    return 'ok'


if __name__ == '__main__':
    app.run(port=8112)
