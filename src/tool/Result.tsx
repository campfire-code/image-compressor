// 单张图片的压缩结果：原图与压缩后拖动对比，下方用大字显示省了多少
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import type { InputItem, ItemResult } from '../kit/types';
import { fileSrc } from '../kit/platform';
import { formatBytes } from './core';
import './tool.css';

export interface Stat { before: number; after: number; sw: number; sh: number; w: number; h: number; format: string }

const FMT: Record<string, string> = { jpg: 'JPG', png: 'PNG', webp: 'WebP' };

export function ResultBody({ item, result }: { item: InputItem; result: ItemResult }) {
  const st = result.data as Stat | undefined;
  const [pos, setPos] = useState(50);
  const before = st?.before ?? item.size ?? 0;
  const saved = st && before ? Math.round((1 - st.after / before) * 100) : null;
  const orig = item.path;
  const out = result.preview;
  return (
    <div className="ic-res">
      {orig && out && (
        <div className="ic-cmp" style={{ aspectRatio: st ? `${st.w} / ${st.h}` : '4 / 3' }}>
          <img className="ic-img" src={fileSrc(out)} alt="压缩后" />
          <img className="ic-img top" src={fileSrc(orig)} alt="原图" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} />
          <span className="ic-tag l">原图</span>
          <span className="ic-tag r">压缩后</span>
          <span className="ic-handle" style={{ left: `${pos}%` }} aria-hidden="true" />
          <input type="range" min={0} max={100} value={pos} aria-label="拖动对比原图和压缩后" onChange={(e) => setPos(Number(e.target.value))} />
        </div>
      )}
      <div className="ic-stat">
        <div className="ic-from"><small>原图</small><b className="k-num">{formatBytes(before)}</b>{st && <span className="k-num">{st.sw}×{st.sh}</span>}</div>
        <ArrowRight size={18} className="ic-to-arrow" />
        <div className="ic-from now"><small>压缩后{st ? `（${FMT[st.format] ?? st.format}）` : ''}</small><b className="k-num">{st ? formatBytes(st.after) : '—'}</b>{st && <span className="k-num">{st.w}×{st.h}</span>}</div>
        <div className={`ic-save${saved !== null && saved <= 0 ? ' bad' : ''}`}>
          <b className="k-num">{saved === null ? '' : saved > 0 ? `−${saved}%` : saved < 0 ? `+${-saved}%` : '0%'}</b>
          <small>{saved === null ? result.summary : saved > 0 ? `省下 ${formatBytes(before - (st?.after ?? 0))}` : '没有变小'}</small>
        </div>
      </div>
      {st && <div className="ic-bar" role="img" aria-label={`压缩后占原图的 ${100 - (saved ?? 0)}%`}><i style={{ width: `${Math.min(100, Math.max(2, (st.after / before) * 100))}%` }} /></div>}
    </div>
  );
}
