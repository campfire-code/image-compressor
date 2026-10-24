// 截图与预览用的示例数据（不会进入正式运行）
import type { Row } from '../kit/runner';
import type { Stat } from './Result';

function scene(hue: number, q: number | null): string {
  const c = document.createElement('canvas');
  c.width = 640; c.height = 440;
  const g = c.getContext('2d')!;
  const sky = g.createLinearGradient(0, 0, 0, 440);
  sky.addColorStop(0, `hsl(${hue} 70% 78%)`); sky.addColorStop(1, `hsl(${hue + 30} 80% 94%)`);
  g.fillStyle = sky; g.fillRect(0, 0, 640, 440);
  g.fillStyle = '#FFE08A'; g.beginPath(); g.arc(500, 100, 46, 0, 7); g.fill();
  [[0, 330, 300], [200, 300, 340], [420, 340, 260]].forEach(([x, y, w], i) => {
    g.fillStyle = `hsl(${hue + 120} ${40 + i * 8}% ${34 + i * 8}%)`;
    g.beginPath(); g.moveTo(x, 440); g.lineTo(x + w / 2, y - 120); g.lineTo(x + w, 440); g.fill();
  });
  for (let i = 0; i < 700; i++) { // 细节噪点：压缩后会糊掉
    g.fillStyle = `hsla(${hue + i * 7} 40% ${30 + (i % 50)}% / .35)`;
    g.fillRect((i * 97) % 640, 250 + ((i * 53) % 190), 3, 3);
  }
  g.fillStyle = '#fff'; g.font = 'bold 30px sans-serif'; g.fillText('秋季上新', 28, 56);
  if (q === null) return c.toDataURL('image/png');
  const small = document.createElement('canvas');
  small.width = 110; small.height = 76;
  small.getContext('2d')!.drawImage(c, 0, 0, 110, 76);
  return small.toDataURL('image/jpeg', q);
}

const files: [string, number, number, Row['status'], number][] = [
  ['保温杯-主图-01.jpg', 4_280_000, 612_000, 'ok', 200],
  ['运动鞋-侧面.png', 6_900_000, 880_000, 'ok', 20],
  ['连衣裙-正面.jpg', 3_150_000, 420_000, 'ok', 340],
  ['蓝牙耳机-盒.jpg', 2_700_000, 310_000, 'ok', 260],
  ['零食礼盒.jpg', 5_100_000, 740_000, 'run', 40],
  ['帆布包.jpg', 1_900_000, 0, 'wait', 150],
  ['损坏的图.jpg', 12_000, 0, 'err', 0],
];

export const rows = (state: string): Row[] => state === 'empty' ? [] : files.map(([name, before, after, status, hue], i) => {
  const st = state === 'done' && status !== 'err' ? 'ok' : status;
  const stat: Stat = { before, after: after || Math.round(before * 0.14), sw: 4032, sh: 2768, w: 1920, h: 1318, format: 'jpg' };
  return {
    item: { id: `p${i}`, name, path: scene(hue, null), size: before },
    status: st,
    progress: st === 'run' ? 0.6 : st === 'ok' ? 1 : 0,
    error: st === 'err' ? '无法识别这张图片，可能已损坏或格式不受支持' : undefined,
    result: st === 'ok' ? { preview: scene(hue, 0.22), outputPath: `/示例/输出/${name}`, summary: `1920×1318 · ${Math.round((1 - stat.after / before) * 100)}%`, data: stat } : undefined,
  };
});
export const params = {};
export const notice = { kind: 'err' as const, text: '完成 6 张，失败 1 张，失败原因见列表' };
