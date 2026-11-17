# 후기 게시판 API — Flask + SQLite 한 파일. 정적 사이트(nginx)가 /api/ 를 이 앱(127.0.0.1:8112)으로 넘긴다.
# 익명: 이름은 앞 두 글자만 남기고 '****' 로 바꿔 저장한다(원래 이름·연락처는 저장하지 않음). IP 는 도배 방지용으로만 쓰고 글에 남기지 않는다.
#   GET  /api/reviews?q=&offset=   목록 {items:[{id,name,title,body,at}], total}
#   POST /api/reviews              {name,title,body,hp}  hp(함정 칸)는 비어 있어야 함
#   GET  /api/admin                관리 화면(로그인 화면 → 쿠키) — 숨기기·수정·삭제
import hashlib, hmac, os, re, sqlite3, time
from flask import Flask, request, jsonify, redirect, render_template_string, session

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


CSS = '''
*{box-sizing:border-box}body{margin:0;background:#f4f6f9;color:#1b2235;font:16px/1.6 'Pretendard Variable',Pretendard,system-ui,sans-serif;word-break:keep-all;-webkit-font-smoothing:antialiased}
button,input,textarea{font:inherit;color:inherit}
.btn{border:1px solid #c9d1de;background:#fff;padding:9px 16px;border-radius:4px;cursor:pointer;font-weight:600;font-size:.92rem}
.btn:hover{border-color:#1f2a44}.btn.pri{background:#1f2a44;border-color:#1f2a44;color:#fff}.btn.pri:hover{background:#2a3758}.btn.del{color:#b3261e}.btn.del:hover{border-color:#b3261e}
input[type=text],input[type=password],input[type=search],textarea{width:100%;border:1px solid #c9d1de;border-radius:4px;padding:11px 13px;background:#fff}
input:focus,textarea:focus,.btn:focus-visible{outline:2px solid #2f6fd6;outline-offset:1px}
label{display:block;font-size:.88rem;font-weight:600;margin:16px 0 6px}
.login{min-height:100vh;display:grid;place-items:center;padding:24px}
.card{width:100%;max-width:400px;background:#fff;border:1px solid #dde2ea;border-top:4px solid #1f2a44;padding:36px 32px 32px}
.card h1{margin:0;font-size:1.35rem;color:#1f2a44}.card p{margin:4px 0 12px;color:#5a6577;font-size:.92rem}
.card .btn{width:100%;margin-top:24px;padding:13px}
.err{margin:16px 0 0;padding:10px 13px;background:#fdecea;color:#8c1d18;font-size:.9rem;border-left:3px solid #b3261e}
.top{background:#1f2a44;color:#fff}.top .in{display:flex;align-items:center;justify-content:space-between;gap:12px;height:60px}
.top b{font-size:1.05rem}.top a{color:#c8d2e6;font-size:.9rem;margin-right:14px}.top .btn{background:transparent;border-color:rgba(255,255,255,.35);color:#fff;padding:7px 14px}
.in{max-width:920px;margin:0 auto;padding:0 20px}
.bar{display:flex;flex-wrap:wrap;gap:12px;align-items:center;margin:24px 0 16px}.bar input{flex:1;min-width:200px}
.tabs{display:flex;border:1px solid #c9d1de;border-radius:4px;overflow:hidden;background:#fff}
.tabs button{border:0;background:none;padding:10px 14px;cursor:pointer;font-size:.92rem;font-weight:600;color:#5a6577}.tabs button+button{border-left:1px solid #dde2ea}
.tabs button[aria-pressed=true]{background:#1f2a44;color:#fff}
.msg{margin:16px 0 0;padding:10px 13px;background:#e9f1fd;border-left:3px solid #2f6fd6;font-size:.92rem}
.rv{background:#fff;border:1px solid #dde2ea;margin-bottom:10px;padding:18px 20px}.rv.hid{background:#eef0f4}
.rv header{display:flex;flex-wrap:wrap;gap:6px 12px;align-items:baseline;font-size:.86rem;color:#5a6577}
.rv .st{font-weight:700;color:#1a7f4b}.rv.hid .st{color:#8a93a3}
.rv h2{margin:6px 0 4px;font-size:1.08rem}.rv .body{margin:0;white-space:pre-wrap;color:#333c4e;font-size:.96rem}.rv.hid h2,.rv.hid .body{color:#8a93a3}
.acts{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}.acts form{margin:0}
details{margin-top:14px}summary{list-style:none;display:inline-block}summary::-webkit-details-marker{display:none}
details[open] summary{display:none}.edit{border-top:1px solid #dde2ea;padding-top:4px}.edit textarea{min-height:150px;resize:vertical}
.none{padding:48px 0;text-align:center;color:#5a6577}
@media(max-width:560px){.rv{padding:16px}.tabs{width:100%}.tabs button{flex:1}}
'''
HEAD = '<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>후기 관리</title><link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"><style>' + CSS + '</style>'
LOGIN = HEAD + '''
<main class="login"><form class="card" method="post" action="/api/admin/login">
<h1>후기 관리</h1><p>한국금융범죄대응센터 후기 게시판</p>
<label for="u">아이디</label><input id="u" type="text" name="user" autocomplete="username" required autofocus>
<label for="p">비밀번호</label><input id="p" type="password" name="pw" autocomplete="current-password" required>
{% if err %}<p class="err" role="alert">{{ err }}</p>{% endif %}
<button class="btn pri">로그인</button></form></main>'''
ADMIN = HEAD + '''
<div class="top"><div class="in"><b>후기 관리</b><span style="display:flex;align-items:center"><a href="/review/" target="_blank" rel="noopener">게시판 보기</a>
<form method="post" action="/api/admin/logout" style="margin:0"><button class="btn">로그아웃</button></form></span></div></div>
<div class="in">
{% if msg %}<p class="msg" role="status">{{ msg }}</p>{% endif %}
<div class="bar"><input type="search" id="q" placeholder="이름·제목·내용 검색" aria-label="후기 검색">
<div class="tabs" id="tabs"><button aria-pressed="true" data-f="">전체 {{ rows|length }}</button><button aria-pressed="false" data-f="on">공개 {{ rows|rejectattr('hidden')|list|length }}</button><button aria-pressed="false" data-f="hid">숨김 {{ rows|selectattr('hidden')|list|length }}</button></div></div>
{% for r in rows %}<article class="rv{{ ' hid' if r.hidden }}" id="r{{ r.id }}">
<header><span class="st">{{ '숨김' if r.hidden else '공개 중' }}</span><span>{{ r.name }}</span><span>{{ r.at|when }}</span><span>#{{ r.id }}</span></header>
<h2>{{ r.title }}</h2><p class="body">{{ r.body }}</p>
<details><summary class="btn">수정</summary><form class="edit" method="post" action="/api/admin">
<input type="hidden" name="id" value="{{ r.id }}">
<label>제목</label><input type="text" name="title" value="{{ r.title }}" maxlength="80" required>
<label>내용</label><textarea name="body" maxlength="2000" required>{{ r.body }}</textarea>
<div class="acts"><button class="btn pri" name="act" value="save">저장</button><button class="btn" type="button" onclick="this.closest('details').open=false">취소</button></div></form></details>
<div class="acts"><form method="post" action="/api/admin"><input type="hidden" name="id" value="{{ r.id }}">
<button class="btn" name="act" value="{{ 'show' if r.hidden else 'hide' }}">{{ '다시 보이기' if r.hidden else '숨기기' }}</button>
<button class="btn del" name="act" value="delete" onclick="return confirm('이 후기를 완전히 지웁니다. 되돌릴 수 없습니다.')">삭제</button></form></div>
</article>{% else %}<p class="none">아직 올라온 후기가 없습니다.</p>{% endfor %}
<p class="none" id="none" hidden>조건에 맞는 후기가 없습니다.</p>
</div>
<script>
var q=document.getElementById('q'),tabs=document.getElementById('tabs'),f='';
function go(){var k=q.value.trim().toLowerCase(),n=0;document.querySelectorAll('.rv').forEach(function(a){var h=a.classList.contains('hid');
var ok=(!f||(f=='hid')==h)&&(!k||a.textContent.toLowerCase().indexOf(k)>-1);a.hidden=!ok;n+=ok});document.getElementById('none').hidden=n>0||!document.querySelector('.rv')}
q.oninput=go;tabs.onclick=function(e){var b=e.target.closest('button');if(!b)return;f=b.dataset.f;tabs.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed',x==b)});go()};
</script>'''
MSGS = {'hide': '후기를 숨겼습니다.', 'show': '후기를 다시 공개했습니다.', 'save': '후기를 수정했습니다.', 'delete': '후기를 지웠습니다.', 'bad': '제목 2~80자, 내용 5~2000자로 적어 주세요.'}
fails: dict[str, list] = {}  # ip → 로그인 실패 시각 (10분에 8번 틀리면 잠깐 막는다)

# 로그인 유지 쿠키 서명 키 — 따로 안 주면 관리자 비밀번호에서 만든다(비밀번호를 바꾸면 예전 로그인은 풀린다)
app.secret_key = os.environ.get('SECRET_KEY') or hashlib.sha256(f'jcreview:{ADMIN_ID}:{ADMIN_PW}'.encode()).hexdigest()
app.config.update(SESSION_COOKIE_SAMESITE='Lax', SESSION_COOKIE_SECURE=True, SESSION_COOKIE_PATH='/api', PERMANENT_SESSION_LIFETIME=7 * 86400)
app.jinja_env.filters['when'] = lambda at: time.strftime('%Y-%m-%d %H:%M', time.localtime(at))


@app.post('/api/admin/login')
def login():
    now = time.time(); f = fails[ip()] = [t for t in fails.get(ip(), []) if now - t < 600]
    if len(f) >= 8:
        return render_template_string(LOGIN, err='여러 번 틀렸습니다. 10분 뒤 다시 시도해 주세요.'), 429
    ok = hmac.compare_digest(request.form.get('user', ''), ADMIN_ID) & hmac.compare_digest(request.form.get('pw', ''), ADMIN_PW)
    if not ok:
        f.append(now)
        return render_template_string(LOGIN, err='아이디 또는 비밀번호가 맞지 않습니다.'), 401
    session.permanent = True; session['admin'] = 1
    return redirect('/api/admin')


@app.post('/api/admin/logout')
def logout():
    session.clear()
    return redirect('/api/admin')


@app.route('/api/admin', methods=['GET', 'POST'])
def admin():
    if not session.get('admin'):
        return render_template_string(LOGIN, err=''), 401
    if request.method == 'POST':  # 다른 사이트가 대신 보내는 요청은 쿠키 SameSite=Lax 가 막는다
        rid, act = request.form.get('id'), request.form.get('act')
        with db() as c:
            if act in ('hide', 'show'):
                c.execute('UPDATE reviews SET hidden=? WHERE id=?', (act == 'hide', rid))
            elif act == 'delete':
                c.execute('DELETE FROM reviews WHERE id=?', (rid,))
            elif act == 'save':
                title, body = request.form.get('title', '').strip(), request.form.get('body', '').strip()
                if 2 <= len(title) <= 80 and 5 <= len(body) <= 2000:
                    c.execute('UPDATE reviews SET title=?, body=? WHERE id=?', (title, body, rid))
                else:
                    act = 'bad'
        return redirect(f'/api/admin?m={act}' + ('' if act == 'delete' else f'#r{rid}'))
    with db() as c:
        rows = c.execute('SELECT * FROM reviews ORDER BY id DESC LIMIT 300').fetchall()
    return render_template_string(ADMIN, rows=rows, msg=MSGS.get(request.args.get('m', '')))


@app.get('/api/health')
def health():
    return 'ok'


if __name__ == '__main__':
    app.run(port=8112)
