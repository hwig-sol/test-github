from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# Register Korean font
pdfmetrics.registerFont(TTFont('Malgun', 'C:/Windows/Fonts/malgun.ttf'))
pdfmetrics.registerFont(TTFont('MalgunBold', 'C:/Windows/Fonts/malgunbd.ttf'))

# Styles
title_style = ParagraphStyle(
    'Title', fontName='MalgunBold', fontSize=18, leading=24,
    textColor=HexColor('#1a1a1a'), spaceAfter=4*mm, alignment=1
)
date_style = ParagraphStyle(
    'Date', fontName='Malgun', fontSize=10, leading=14,
    textColor=HexColor('#666666'), spaceAfter=6*mm, alignment=1
)
section_style = ParagraphStyle(
    'Section', fontName='MalgunBold', fontSize=13, leading=18,
    textColor=HexColor('#2563eb'), spaceBefore=6*mm, spaceAfter=3*mm
)
body_style = ParagraphStyle(
    'Body', fontName='Malgun', fontSize=10, leading=16,
    textColor=HexColor('#333333'), leftIndent=4*mm
)
bullet_style = ParagraphStyle(
    'Bullet', fontName='Malgun', fontSize=10, leading=16,
    textColor=HexColor('#333333'), leftIndent=8*mm, bulletIndent=4*mm
)
highlight_style = ParagraphStyle(
    'Highlight', fontName='MalgunBold', fontSize=10, leading=16,
    textColor=HexColor('#dc2626'), leftIndent=12*mm
)
footer_style = ParagraphStyle(
    'Footer', fontName='Malgun', fontSize=9, leading=12,
    textColor=HexColor('#999999'), spaceBefore=8*mm, alignment=1
)

# Build PDF
output_path = r"C:\Users\HelloVR\Desktop\project\바이브코딩 강의 자료\회의록_요약본.pdf"
doc = SimpleDocTemplate(
    output_path, pagesize=A4,
    topMargin=25*mm, bottomMargin=25*mm,
    leftMargin=20*mm, rightMargin=20*mm
)

story = []
hr = HRFlowable(width="100%", thickness=1, color=HexColor('#2563eb'), spaceAfter=4*mm)

# Title
story.append(Paragraph("마케팅팀 주간회의 요약", title_style))
story.append(Paragraph("2026년 3월 9일 | 참석: 김대리, 이과장, 박사원, 정팀장", date_style))
story.append(hr)

# Section 1
story.append(Paragraph("지난주 주요 성과", section_style))
story.append(Paragraph("• SNS 광고 A/B 테스트 완료 → B안(영상형) 클릭률 2.3배 우위", bullet_style))
story.append(Paragraph("• 블로그 콘텐츠 3건 발행 완료", bullet_style))
story.append(Paragraph("• 인플루언서 협업 제안 3곳 중 1곳 회신 (푸드스타일리 김OO)", bullet_style))

# Section 2
story.append(Paragraph("이번 주 할 일", section_style))
story.append(Paragraph("• 영상 광고 3개 추가 제작 — 박사원", bullet_style))
story.append(Paragraph("• 인플루언서 미팅 일정 확정 — 이과장 (금요일까지)", bullet_style))
story.append(Paragraph("• 3월 프로모션 기획안 초안 — 김대리 (수요일까지)", bullet_style))
story.append(Paragraph("• 경쟁사 C사 캠페인 분석 — 박사원", bullet_style))

# Section 3
story.append(Paragraph("핵심 결정사항", section_style))
story.append(Paragraph("→ 4월 신제품 티저: 3월 넷째 주 시작 확정", highlight_style))
story.append(Paragraph("→ 영상 제작비 200만원 추가 예산 요청 예정", highlight_style))

# Section 4
story.append(Paragraph("다음 회의", section_style))
story.append(Paragraph("• 3월 16일 (월) 오전 10시 | 안건: 3월 프로모션 기획안 검토", bullet_style))

# Footer
story.append(Spacer(1, 10*mm))
story.append(HRFlowable(width="100%", thickness=0.5, color=HexColor('#cccccc'), spaceAfter=3*mm))
story.append(Paragraph("본 문서는 회의록 요약본입니다.", footer_style))

doc.build(story)
print(f"PDF 생성 완료: {output_path}")
