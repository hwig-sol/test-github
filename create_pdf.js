const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({ size: 'A4', margin: 50 });
const output = fs.createWriteStream('회의록_요약본.pdf');
doc.pipe(output);

const fontPath = 'C:/Windows/Fonts/malgun.ttf';
const fontBoldPath = 'C:/Windows/Fonts/malgunbd.ttf';
doc.registerFont('Malgun', fontPath);
doc.registerFont('MalgunBold', fontBoldPath);

const blue = '#2563eb';
const red = '#dc2626';
const dark = '#1a1a1a';
const gray = '#666666';
const bodyColor = '#333333';

// Title
doc.font('MalgunBold').fontSize(20).fillColor(dark)
   .text('마케팅팀 주간회의 요약', { align: 'center' });
doc.moveDown(0.3);
doc.font('Malgun').fontSize(10).fillColor(gray)
   .text('2026년 3월 9일  |  참석: 김대리, 이과장, 박사원, 정팀장', { align: 'center' });
doc.moveDown(0.8);

// Divider
doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor(blue).lineWidth(1.5).stroke();
doc.moveDown(1);

// Helper functions
function sectionTitle(text) {
  doc.font('MalgunBold').fontSize(13).fillColor(blue).text(text);
  doc.moveDown(0.4);
}

function bullet(text) {
  doc.font('Malgun').fontSize(10).fillColor(bodyColor)
     .text('•  ' + text, 70, doc.y, { width: 460 });
  doc.moveDown(0.3);
}

function highlight(text) {
  doc.font('MalgunBold').fontSize(10).fillColor(red)
     .text('→  ' + text, 80, doc.y, { width: 450 });
  doc.moveDown(0.3);
}

// Section 1
sectionTitle('지난주 주요 성과');
bullet('SNS 광고 A/B 테스트 완료 → B안(영상형) 클릭률 2.3배 우위');
bullet('블로그 콘텐츠 3건 발행 완료');
bullet('인플루언서 협업 제안 3곳 중 1곳 회신 (푸드스타일리 김OO)');
doc.moveDown(0.5);

// Section 2
sectionTitle('이번 주 할 일');
bullet('영상 광고 3개 추가 제작 — 박사원');
bullet('인플루언서 미팅 일정 확정 — 이과장 (금요일까지)');
bullet('3월 프로모션 기획안 초안 — 김대리 (수요일까지)');
bullet('경쟁사 C사 캠페인 분석 — 박사원');
doc.moveDown(0.5);

// Section 3
sectionTitle('핵심 결정사항');
highlight('4월 신제품 티저: 3월 넷째 주 시작 확정');
highlight('영상 제작비 200만원 추가 예산 요청 예정');
doc.moveDown(0.5);

// Section 4
sectionTitle('다음 회의');
bullet('3월 16일 (월) 오전 10시  |  안건: 3월 프로모션 기획안 검토');

// Footer
doc.moveDown(3);
doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor('#cccccc').lineWidth(0.5).stroke();
doc.moveDown(0.5);
doc.font('Malgun').fontSize(9).fillColor('#999999')
   .text('본 문서는 회의록 요약본입니다.', { align: 'center' });

doc.end();
output.on('finish', () => {
  console.log('PDF 생성 완료: 회의록_요약본.pdf');
});
