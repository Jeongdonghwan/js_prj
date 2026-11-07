'use client';
// 후기 게시판 — 목록·검색·글쓰기 전부 /api/reviews 와 통신(api/app.py). 이름은 서버가 앞 두 글자만 남기고 가린다.
import { useEffect, useState, FormEvent } from 'react';

type R = { id: number; name: string; title: string; body: string; at: number };
const ago = (t: number) => { const s = Date.now() / 1000 - t; if (s < 3600) return `${Math.max(1, Math.floor(s / 60))}분전`; if (s < 86400) return `${Math.floor(s / 3600)}시간전`; return `${Math.floor(s / 86400)}일전`; };

export default function ReviewBoard() {
  const [items, setItems] = useState<R[]>([]);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState('');
  const [open, setOpen] = useState<number | null>(null);
  const [write, setWrite] = useState(false);
  const [msg, setMsg] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('loading');

  const load = async (query = q, offset = 0) => {
    setState('loading');
    try {
      const r = await fetch(`/api/reviews?q=${encodeURIComponent(query)}&offset=${offset}`);
      if (!r.ok) throw new Error();
      const d = await r.json();
      setItems(offset ? (p) => [...p, ...d.items] : d.items);
      setTotal(d.total);
      setState('idle');
    } catch { setState('error'); }
  };
  useEffect(() => { load('', 0); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = Object.fromEntries(f.entries());
    setMsg('올리는 중…');
    const r = await fetch('/api/reviews', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) { setMsg(d.error || '올리지 못했습니다. 잠시 뒤 다시 시도해 주세요.'); return; }
    setMsg(''); setWrite(false); e.currentTarget.reset(); load(q, 0);
  };

  return (
    <div className="board">
      <div className="board-tools">
        <form className="board-search" onSubmit={(e) => { e.preventDefault(); load(q, 0); }}>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="제목·내용 검색" aria-label="검색" />
          <button type="submit" className="btn navy">검색</button>
        </form>
        <button type="button" className="btn navy" onClick={() => setWrite((v) => !v)}>{write ? '닫기' : '후기 쓰기'}</button>
      </div>

      {write && (
        <form className="board-form" onSubmit={submit}>
          <p>이름은 앞 두 글자만 보이고 나머지는 별표로 가려집니다(예: 송아****). 연락처는 받지 않습니다. 링크는 적을 수 없습니다.</p>
          <div className="bf-row"><input name="name" maxLength={20} required placeholder="이름" aria-label="이름" /><input name="title" maxLength={80} required placeholder="제목" aria-label="제목" /></div>
          <textarea name="body" maxLength={2000} required rows={6} placeholder="어떤 연락을 받았고, 상담 뒤 무엇이 달라졌는지 적어 주세요." aria-label="내용" />
          <input name="hp" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
          <div className="bf-foot"><small>{msg}</small><button type="submit" className="btn navy">등록</button></div>
        </form>
      )}

      <table className="board-list">
        <thead><tr><th>제목</th><th>글쓴이</th><th>작성시간</th></tr></thead>
        <tbody>
          {items.map((r) => (
            <tr key={r.id} className={open === r.id ? 'on' : ''}>
              <td><button type="button" className="row-title" onClick={() => setOpen(open === r.id ? null : r.id)}>{r.title}</button>{open === r.id && <p className="row-body">{r.body}</p>}</td>
              <td>{r.name}</td>
              <td>{ago(r.at)}</td>
            </tr>
          ))}
          {state === 'idle' && items.length === 0 && <tr><td colSpan={3} className="board-empty">아직 후기가 없습니다. 첫 후기를 남겨 주세요.</td></tr>}
          {state === 'error' && <tr><td colSpan={3} className="board-empty">목록을 불러오지 못했습니다. 잠시 뒤 새로고침해 주세요.</td></tr>}
        </tbody>
      </table>
      {items.length < total && <button type="button" className="btn ghost board-more" onClick={() => load(q, items.length)}>더 보기 ({items.length}/{total})</button>}
    </div>
  );
}
