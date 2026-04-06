const { createCanvas, registerFont } = require('canvas');
const fs = require('fs');

// Register Korean font
registerFont('C:/Windows/Fonts/malgun.ttf', { family: 'Malgun' });
registerFont('C:/Windows/Fonts/malgunbd.ttf', { family: 'Malgun', weight: 'bold' });

const width = 900;
const height = 520;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Background
ctx.fillStyle = '#ffffff';
ctx.beginPath();
roundRect(ctx, 0, 0, width, height, 16);
ctx.fill();

// Title
ctx.font = 'bold 20px Malgun';
ctx.fillStyle = '#1a1a1a';
ctx.textAlign = 'center';
ctx.fillText('지난주 진행사항 요약', width / 2, 44);

// --- Chart 1: A/B Test Bar Chart (left) ---
const chart1X = 60;
const chart1Y = 80;
const chart1W = 380;
const chart1H = 360;

// Subtitle
ctx.font = 'bold 14px Malgun';
ctx.fillStyle = '#2563eb';
ctx.textAlign = 'center';
ctx.fillText('SNS 광고 A/B 테스트 클릭률', chart1X + chart1W / 2, chart1Y + 20);

// Bar chart
const barData = [
  { label: 'A안 (이미지형)', value: 1.0, color: '#94a3b8' },
  { label: 'B안 (영상형)', value: 2.3, color: '#2563eb' },
];
const barAreaY = chart1Y + 50;
const barAreaH = 220;
const barWidth = 100;
const barGap = 60;
const barStartX = chart1X + (chart1W - (barWidth * 2 + barGap)) / 2;
const maxVal = 3.0;

// Grid lines
ctx.strokeStyle = '#eee';
ctx.lineWidth = 1;
for (let i = 0; i <= 3; i++) {
  const y = barAreaY + barAreaH - (i / maxVal) * barAreaH;
  ctx.beginPath();
  ctx.moveTo(chart1X + 30, y);
  ctx.lineTo(chart1X + chart1W - 20, y);
  ctx.stroke();
  ctx.font = '11px Malgun';
  ctx.fillStyle = '#aaa';
  ctx.textAlign = 'right';
  ctx.fillText(i.toFixed(1), chart1X + 26, y + 4);
}

// Y-axis label
ctx.save();
ctx.translate(chart1X + 8, barAreaY + barAreaH / 2);
ctx.rotate(-Math.PI / 2);
ctx.font = '11px Malgun';
ctx.fillStyle = '#999';
ctx.textAlign = 'center';
ctx.fillText('상대 클릭률', 0, 0);
ctx.restore();

barData.forEach((d, i) => {
  const x = barStartX + i * (barWidth + barGap);
  const barH = (d.value / maxVal) * barAreaH;
  const y = barAreaY + barAreaH - barH;

  // Bar with rounded top
  ctx.fillStyle = d.color;
  ctx.beginPath();
  roundRect(ctx, x, y, barWidth, barH, [8, 8, 0, 0]);
  ctx.fill();

  // Value on top
  ctx.font = 'bold 16px Malgun';
  ctx.fillStyle = d.color;
  ctx.textAlign = 'center';
  ctx.fillText(d.value + 'x', x + barWidth / 2, y - 10);

  // Label below
  ctx.font = '12px Malgun';
  ctx.fillStyle = '#555';
  ctx.fillText(d.label, x + barWidth / 2, barAreaY + barAreaH + 24);
});

// 2.3배 badge
ctx.fillStyle = '#fef2f2';
ctx.beginPath();
roundRect(ctx, chart1X + chart1W / 2 - 60, barAreaY + barAreaH + 44, 120, 30, 15);
ctx.fill();
ctx.font = 'bold 13px Malgun';
ctx.fillStyle = '#dc2626';
ctx.textAlign = 'center';
ctx.fillText('B안 2.3배 우위', chart1X + chart1W / 2, barAreaY + barAreaH + 64);

// --- Chart 2: Progress (right) ---
const chart2X = 480;
const chart2Y = 80;
const chart2W = 380;

ctx.font = 'bold 14px Malgun';
ctx.fillStyle = '#2563eb';
ctx.textAlign = 'center';
ctx.fillText('업무 진행 현황', chart2X + chart2W / 2, chart2Y + 20);

const tasks = [
  { label: '블로그 콘텐츠 발행', done: 3, total: 3, color: '#10b981' },
  { label: '인플루언서 제안 발송', done: 3, total: 3, color: '#10b981' },
  { label: '인플루언서 회신', done: 1, total: 3, color: '#f59e0b' },
];

const progStartY = chart2Y + 56;
const progBarW = 260;
const progBarH = 28;
const progGap = 56;

tasks.forEach((t, i) => {
  const y = progStartY + i * (progBarH + progGap);
  const px = chart2X + 60;

  // Label
  ctx.font = '13px Malgun';
  ctx.fillStyle = '#333';
  ctx.textAlign = 'left';
  ctx.fillText(t.label, px, y - 8);

  // Background bar
  ctx.fillStyle = '#f1f5f9';
  ctx.beginPath();
  roundRect(ctx, px, y, progBarW, progBarH, 14);
  ctx.fill();

  // Progress bar
  const fillW = (t.done / t.total) * progBarW;
  ctx.fillStyle = t.color;
  ctx.beginPath();
  roundRect(ctx, px, y, fillW, progBarH, 14);
  ctx.fill();

  // Count text
  ctx.font = 'bold 12px Malgun';
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  if (fillW > 40) {
    ctx.fillText(`${t.done} / ${t.total}`, px + fillW / 2, y + 18);
  }

  // Percentage
  const pct = Math.round((t.done / t.total) * 100);
  ctx.font = 'bold 14px Malgun';
  ctx.fillStyle = t.color;
  ctx.textAlign = 'left';
  ctx.fillText(`${pct}%`, px + progBarW + 12, y + 18);
});

// Save
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('지난주_진행사항.png', buffer);
console.log('이미지 저장 완료: 지난주_진행사항.png');

// Rounded rect helper
function roundRect(ctx, x, y, w, h, r) {
  if (typeof r === 'number') r = [r, r, r, r];
  ctx.moveTo(x + r[0], y);
  ctx.lineTo(x + w - r[1], y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r[1]);
  ctx.lineTo(x + w, y + h - r[2]);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r[2], y + h);
  ctx.lineTo(x + r[3], y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r[3]);
  ctx.lineTo(x, y + r[0]);
  ctx.quadraticCurveTo(x, y, x + r[0], y);
  ctx.closePath();
}
