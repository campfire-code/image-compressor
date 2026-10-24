// 空状态：画出「一张大图 → 一张小图」，写清支持的格式和三个可调的东西
import { Gauge, Maximize2, Repeat2, Upload } from 'lucide-react';
import './tool.css';

function Photo({ x, y, w, h, big }: { x: number; y: number; w: number; h: number; big?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="8" className={big ? 'ic-photo big' : 'ic-photo'} />
      <circle cx={x + w * 0.74} cy={y + h * 0.27} r={h * 0.1} className="ic-sun" />
      <path d={`M${x} ${y + h * 0.8} L${x + w * 0.32} ${y + h * 0.42} L${x + w * 0.55} ${y + h * 0.68} L${x + w * 0.7} ${y + h * 0.55} L${x + w} ${y + h * 0.82} V${y + h - 8} Q${x + w} ${y + h} ${x + w - 8} ${y + h} H${x + 8} Q${x} ${y + h} ${x} ${y + h - 8} Z`} className="ic-hill" />
    </g>
  );
}

export function Empty({ hover }: { hover: boolean }) {
  return (
    <div className="ic-empty">
      <svg viewBox="0 0 420 160" role="img" aria-label="一张 4.2 MB 的大图压成 620 KB 的小图，画面几乎看不出差别">
        <Photo x={10} y={14} w={150} h={112} big />
        <text x="85" y="150" textAnchor="middle" className="ic-size big">4.2 MB</text>
        <path d="M176 74 H212 M203 65 L214 74 L203 83" className="ic-arrow" />
        <text x="195" y="56" textAnchor="middle" className="ic-cap">小了 85%</text>
        <Photo x={232} y={40} w={96} h={68} />
        <text x="280" y="128" textAnchor="middle" className="ic-size">620 KB</text>
        <g className="ic-fmt">
          <rect x="350" y="30" width="56" height="22" rx="11" /><text x="378" y="45" textAnchor="middle">JPG</text>
          <rect x="350" y="62" width="56" height="22" rx="11" /><text x="378" y="77" textAnchor="middle">WebP</text>
          <rect x="350" y="94" width="56" height="22" rx="11" /><text x="378" y="109" textAnchor="middle">PNG</text>
        </g>
      </svg>
      <ul className="ic-knobs">
        <li><Gauge size={16} /><b>质量</b><span>默认 82%，肉眼几乎看不出差别</span></li>
        <li><Maximize2 size={16} /><b>最长边</b><span>过大的图缩到 1920 像素以内</span></li>
        <li><Repeat2 size={16} /><b>格式</b><span>可转成 JPG、WebP、PNG</span></li>
      </ul>
      <h2 className="ic-title">{hover ? '松开鼠标，开始添加' : '把图片拖进来'}</h2>
      <p className="ic-act"><Upload size={15} />支持 JPG、PNG、WebP、BMP、GIF，也可以拖入整个文件夹；原图不会被改动</p>
    </div>
  );
}
