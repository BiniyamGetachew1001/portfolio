#!/usr/bin/env python3
"""
Master Business Dashboard + Life Gamifier
Cinematic Dark Theme — Freelance Cinematographer
Sheets: Dashboard | Pipeline | Pricing | Revenue | Habits | Lookup
"""

from openpyxl import Workbook
from openpyxl.styles import PatternFill, Font, Alignment, Border, Side
from openpyxl.utils import get_column_letter
from openpyxl.formatting.rule import FormulaRule, CellIsRule
from openpyxl.worksheet.datavalidation import DataValidation
from datetime import date, timedelta
import os

# ── PALETTE (ARGB) ────────────────────────────────────────────────────────────
BG      = "FF0D0D0D"
SURF    = "FF1A1A2E"
SURF2   = "FF111118"
GOLD    = "FFE2B04A"
GDARK   = "FF3D2B0A"
EMERALD = "FF2ECC71"
EDARK   = "FF0A3320"
CRIMSON = "FFE74C3C"
RDARK   = "FF3D1010"
SLATE   = "FF8892A4"
WHITE   = "FFF0F0F0"
PURPLE  = "FF9B59B6"
PDARK   = "FF2D1040"
BLUE    = "FF3498DB"
BDARK   = "FF0D2A3D"
ORANGE  = "FFE67E22"
GRAY    = "FF2C2C3E"
DGRAY   = "FF1E1E2E"


# ── HELPERS ───────────────────────────────────────────────────────────────────
def F(c):
    return PatternFill("solid", fgColor=c)

def FN(c=WHITE, sz=10, b=False, i=False):
    return Font(color=c, size=sz, bold=b, italic=i, name="Calibri")

def AL(h="left", v="center", wrap=False):
    return Alignment(horizontal=h, vertical=v, wrap_text=wrap)

def gold_left(bottom=True):
    return Border(
        left=Side(style="medium", color=GOLD),
        bottom=Side(style="thin", color=GOLD) if bottom else Side(style="thin", color=GRAY)
    )

def thin_border(color=GRAY):
    s = Side(style="thin", color=color)
    return Border(left=s, right=s, top=s, bottom=s)

def sc(ws, r, c, v="", bg=SURF, fg=WHITE, sz=10, b=False, h="left", wrap=False, italic=False, border=None):
    cell = ws.cell(row=r, column=c, value=v)
    cell.fill = F(bg)
    cell.font = FN(fg, sz, b, italic)
    cell.alignment = AL(h, "center", wrap)
    if border:
        cell.border = border
    return cell

def mc(ws, r1, c1, r2, c2, v="", bg=SURF, fg=WHITE, sz=12, b=False, h="center", border=None):
    ws.merge_cells(start_row=r1, start_column=c1, end_row=r2, end_column=c2)
    cell = ws.cell(row=r1, column=c1, value=v)
    cell.fill = F(bg)
    cell.font = FN(fg, sz, b)
    cell.alignment = AL(h, "center")
    if border:
        cell.border = border
    return cell

def section_header(ws, r, c1, c2, text, r2=None):
    ws.merge_cells(start_row=r, start_column=c1, end_row=r2 or r, end_column=c2)
    cell = ws.cell(row=r, column=c1, value=text)
    cell.fill = F(SURF)
    cell.font = FN(GOLD, 11, True)
    cell.alignment = AL("left", "center")
    cell.border = gold_left(True)
    return cell

def fill_bg(ws, r1, c1, r2, c2, color=SURF):
    for row in ws.iter_rows(min_row=r1, max_row=r2, min_col=c1, max_col=c2):
        for cell in row:
            cell.fill = F(color)

def col_header(ws, r, c, text, bg=GDARK, fg=GOLD, sz=9, b=True):
    cell = ws.cell(row=r, column=c, value=text)
    cell.fill = F(bg)
    cell.font = FN(fg, sz, b)
    cell.alignment = AL("center", "center")
    cell.border = Border(bottom=Side(style="medium", color=GOLD))
    return cell

def cw(ws, widths):
    for i, w in enumerate(widths, 1):
        ws.column_dimensions[get_column_letter(i)].width = w

def rh(ws, heights):
    for row, h in heights.items():
        ws.row_dimensions[row].height = h

def tab(ws, color):
    ws.sheet_properties.tabColor = color


# ── SHEET 1: DASHBOARD ────────────────────────────────────────────────────────
def build_dashboard(wb):
    ws = wb.create_sheet("Dashboard")
    tab(ws, GOLD)
    ws.sheet_view.showGridLines = False
    ws.freeze_panes = "A4"

    cw(ws, [1.5, 18, 16, 16, 16, 16, 16, 16, 4])
    fill_bg(ws, 1, 1, 80, 9, BG)

    # ── Title bar
    mc(ws, 1, 2, 2, 8, "  ◈  CINEMATOGRAPHER  ·  MASTER DASHBOARD", SURF, GOLD, 15, True, "left", gold_left(True))
    ws.row_dimensions[1].height = 22
    ws.row_dimensions[2].height = 22

    # ── KPI row label
    section_header(ws, 4, 2, 8, "  KPI OVERVIEW")
    ws.row_dimensions[4].height = 22

    # KPI cards: [col_start, col_end, label, value_formula, fg_color]
    kpis = [
        (2, 3, "MONTHLY REVENUE", "=Revenue!D14",  GOLD),
        (4, 4, "PIPELINE VALUE",  "=Pipeline!C3",  EMERALD),
        (5, 5, "BOOKED / MTH",    "=Pipeline!D3",  BLUE),
        (6, 6, "RESPONSE RATE",   "=Pipeline!E3",  ORANGE),
        (7, 7, "HABITS TODAY",    "=Habits!B6",    PURPLE),
        (8, 8, "LEVEL",           "=Habits!D4",    WHITE),
    ]
    for (c1, c2, label, val, fg) in kpis:
        ws.merge_cells(start_row=5, start_column=c1, end_row=5, end_column=c2)
        lc = ws.cell(row=5, column=c1, value=label)
        lc.fill = F(SURF)
        lc.font = FN(SLATE, 8, False, True)
        lc.alignment = AL("left", "center")
        lc.border = gold_left(False)

        ws.merge_cells(start_row=6, start_column=c1, end_row=7, end_column=c2)
        vc = ws.cell(row=6, column=c1, value=val)
        vc.fill = F(SURF)
        vc.font = FN(fg, 20, True)
        vc.alignment = AL("center", "center")
    ws.row_dimensions[5].height = 16
    ws.row_dimensions[6].height = 28
    ws.row_dimensions[7].height = 18

    fill_bg(ws, 5, 2, 7, 8, SURF)

    # Spacer
    fill_bg(ws, 8, 2, 8, 8, BG)
    ws.row_dimensions[8].height = 8

    # ── Active Pipeline mini-table
    section_header(ws, 9, 2, 5, "  ACTIVE PIPELINE — TOP LEADS")
    section_header(ws, 9, 6, 8, "  THIS WEEK  ·  HABITS")
    ws.row_dimensions[9].height = 20

    headers = ["CLIENT", "SERVICE", "VALUE ($)", "STAGE", "NEXT ACTION"]
    for i, h in enumerate(headers):
        col_header(ws, 10, i + 2, h, GDARK, GOLD, 8)
    ws.row_dimensions[10].height = 18

    pipeline_data = [
        ("Selam Films",   "Commercial",    3500, "NEGOTIATING",   "Send revised proposal"),
        ("KAYD Agency",   "Brand Video",   2200, "PROPOSAL SENT", "Follow up Tue"),
        ("Henok Wedding", "Wedding Film",  1800, "BOOKED",        "Pre-shoot call Fri"),
        ("Nova Studios",  "Music Video",   2800, "INTERESTED",    "Schedule site visit"),
        ("TeleBirhan",    "Documentary",   5000, "CONTACTED",     "Send portfolio link"),
    ]
    stage_colors = {
        "BOOKED": EMERALD, "NEGOTIATING": ORANGE,
        "PROPOSAL SENT": BLUE, "INTERESTED": PURPLE, "CONTACTED": SLATE
    }
    for i, (name, svc, val, stage, nxt) in enumerate(pipeline_data):
        r = 11 + i
        row_bg = SURF if i % 2 == 0 else SURF2
        sc(ws, r, 2, name, row_bg, WHITE, 9, b=True)
        sc(ws, r, 3, svc,  row_bg, SLATE, 9)
        sc(ws, r, 4, val,  row_bg, GOLD, 9, h="right")
        ws.cell(row=r, column=4).number_format = '"$"#,##0'
        sc(ws, r, 5, stage, row_bg, stage_colors.get(stage, WHITE), 9, b=True, h="center")
        ws.row_dimensions[r].height = 16

    fill_bg(ws, 11, 6, 15, 8, SURF)
    # Habits this week (placeholder)
    habits_week = [
        ("Craft Work",   "✓ ✓ ✓ ✓ ✓ — —"),
        ("Workout",      "✓ ✓ — ✓ ✓ ✓ —"),
        ("Client Outch", "✓ — ✓ ✓ — ✓ —"),
        ("Read 20 min",  "✓ ✓ ✓ — ✓ ✓ ✓"),
        ("Journaling",   "— ✓ ✓ ✓ — — ✓"),
    ]
    for i, (hname, dots) in enumerate(habits_week):
        r = 11 + i
        sc(ws, r, 6, hname, SURF, SLATE, 8, italic=True)
        sc(ws, r, 7, dots, SURF, EMERALD, 9, h="center")
        fill_bg(ws, r, 8, r, 8, SURF)

    # Spacer
    fill_bg(ws, 16, 2, 16, 8, BG)
    ws.row_dimensions[16].height = 8

    # ── Motivational quote
    section_header(ws, 17, 2, 8, "  DAILY SIGNAL")
    ws.row_dimensions[17].height = 20

    quote_formula = ('=CHOOSE(WEEKDAY(TODAY()),'
                     '"The frame is your truth — own it.",'
                     '"One great shot changes everything.",'
                     '"Light is language. Learn it deeply.",'
                     '"Your lens, your vision, your legacy.",'
                     '"Craft compounds. Show up daily.",'
                     '"The best directors were once broke filmmakers.",'
                     '"Motion is emotion — make them feel it.")')
    mc(ws, 18, 2, 19, 8, quote_formula, GDARK, GOLD, 12, True, "center", gold_left(False))
    ws.row_dimensions[18].height = 22
    ws.row_dimensions[19].height = 22


# ── SHEET 2: CLIENT PIPELINE ──────────────────────────────────────────────────
def build_pipeline(wb):
    ws = wb.create_sheet("Pipeline")
    tab(ws, EMERALD)
    ws.sheet_view.showGridLines = False
    ws.freeze_panes = "A6"

    cw(ws, [1.5, 22, 14, 12, 14, 14, 14, 18, 12, 10, 18, 10, 10])
    fill_bg(ws, 1, 1, 200, 13, BG)

    # Title
    mc(ws, 1, 2, 2, 13, "  ◈  CLIENT PIPELINE  ·  OUTREACH TRACKER", SURF, GOLD, 14, True, "left", gold_left(True))
    rh(ws, {1: 22, 2: 22})

    # Summary bar formulas
    fill_bg(ws, 3, 2, 4, 13, SURF2)
    summary = [
        (2, "TOTAL PIPELINE",   '=SUMIF(E6:E205,"<>CLOSED LOST",C6:C205)', GOLD),
        (4, "BOOKED THIS MONTH","=SUMIF(E6:E205,\"BOOKED\",C6:C205)",       EMERALD),
        (6, "ACTIVE LEADS",     '=COUNTIF(E6:E205,"<>CLOSED LOST")',        BLUE),
        (8, "RESPONSE RATE",    '=IFERROR(COUNTIF(E6:E205,"INTERESTED")/COUNTIF(E6:E205,"<>COLD"),"—")', ORANGE),
        (10,"PROPOSALS OUT",    '=COUNTIF(E6:E205,"PROPOSAL SENT")',         PURPLE),
    ]
    for (col, label, formula, color) in summary:
        sc(ws, 3, col, label, SURF2, SLATE, 8, italic=True)
        c = ws.cell(row=4, column=col, value=formula)
        c.fill = F(SURF2)
        c.font = FN(color, 14, True)
        c.alignment = AL("left", "center")

    ws.cell(row=4, column=2).number_format = '"$"#,##0'
    ws.cell(row=4, column=4).number_format = '"$"#,##0'
    ws.cell(row=4, column=8).number_format = '0%'
    rh(ws, {3: 14, 4: 22, 5: 20})

    # Column headers
    headers = ["CLIENT NAME", "DEAL VALUE ($)", "SERVICE TYPE", "STAGE",
               "FIRST CONTACT", "LAST FOLLOW-UP", "NEXT ACTION",
               "DAYS SINCE CONTACT", "PRIORITY", "NOTES", "PROPOSAL?", "SIGNED?"]
    for i, h in enumerate(headers):
        col_header(ws, 5, i + 2, h)

    # Stage dropdown
    stages = '"COLD,CONTACTED,INTERESTED,PROPOSAL SENT,NEGOTIATING,BOOKED,CLOSED LOST"'
    dv_stage = DataValidation(type="list", formula1=stages, allow_blank=True)
    dv_stage.sqref = "E6:E205"
    ws.add_data_validation(dv_stage)

    # Yes/No dropdowns
    yn = DataValidation(type="list", formula1='"YES,NO,—"', allow_blank=True)
    yn.sqref = "L6:M205"
    ws.add_data_validation(yn)

    # Sample data
    today = date.today()
    data = [
        ("Selam Films",    3500, "Commercial",     "NEGOTIATING",    today - timedelta(3),  today - timedelta(1),  "Send revised proposal",   "—"),
        ("KAYD Agency",    2200, "Brand Video",    "PROPOSAL SENT",  today - timedelta(7),  today - timedelta(2),  "Follow up Tuesday",       "YES"),
        ("Henok Wedding",  1800, "Wedding Film",   "BOOKED",         today - timedelta(14), today - timedelta(1),  "Pre-shoot call Friday",   "YES"),
        ("Nova Studios",   2800, "Music Video",    "INTERESTED",     today - timedelta(5),  today - timedelta(3),  "Schedule site visit",     "—"),
        ("TeleBirhan",     5000, "Documentary",    "CONTACTED",      today - timedelta(10), today - timedelta(5),  "Send portfolio link",     "—"),
        ("Biruk Events",   1500, "Event Coverage", "COLD",           today - timedelta(20), today - timedelta(20), "Initial outreach",        "—"),
        ("Liya Media",     4200, "Ad Campaign",    "NEGOTIATING",    today - timedelta(8),  today - timedelta(2),  "Confirm budget ceiling",  "YES"),
        ("Addis Photo",    900,  "Product Shoot",  "PROPOSAL SENT",  today - timedelta(6),  today - timedelta(4),  "Chase response",          "YES"),
    ]
    stage_fg = {
        "BOOKED": EMERALD, "NEGOTIATING": ORANGE, "PROPOSAL SENT": BLUE,
        "INTERESTED": PURPLE, "CONTACTED": SLATE, "COLD": GRAY, "CLOSED LOST": RDARK
    }
    for i, (name, val, svc, stage, first, last, nxt, prop) in enumerate(data):
        r = 6 + i
        row_bg = SURF if i % 2 == 0 else SURF2
        days_since = (today - last).days

        sc(ws, r, 2,  name,       row_bg, WHITE, 9, b=True)
        c = ws.cell(row=r, column=3, value=val)
        c.fill = F(row_bg); c.font = FN(GOLD, 9, True); c.alignment = AL("right", "center")
        c.number_format = '"$"#,##0'
        sc(ws, r, 4,  svc,        row_bg, SLATE, 9)
        sc(ws, r, 5,  stage,      row_bg, stage_fg.get(stage, WHITE), 9, True, "center")
        c = ws.cell(row=r, column=6, value=first)
        c.fill = F(row_bg); c.font = FN(SLATE, 9); c.alignment = AL("center", "center")
        c.number_format = "MMM D, YYYY"
        c = ws.cell(row=r, column=7, value=last)
        c.fill = F(row_bg); c.font = FN(SLATE, 9); c.alignment = AL("center", "center")
        c.number_format = "MMM D, YYYY"
        sc(ws, r, 8,  nxt,        row_bg, WHITE, 8, wrap=True)
        c = ws.cell(row=r, column=9, value=days_since)
        c.fill = F(row_bg)
        c.font = FN(CRIMSON if days_since > 14 else SLATE, 9, days_since > 14)
        c.alignment = AL("center", "center")
        # Priority score
        stage_w = {"BOOKED":6,"NEGOTIATING":5,"PROPOSAL SENT":4,"INTERESTED":3,"CONTACTED":2,"COLD":1}
        priority = round((val / 1000) * stage_w.get(stage, 1), 1)
        sc(ws, r, 10, priority, row_bg, ORANGE, 9, h="center")
        sc(ws, r, 11, "",       row_bg, SLATE, 9)
        sc(ws, r, 12, prop,    row_bg, EMERALD if prop == "YES" else SLATE, 9, h="center")
        sc(ws, r, 13, "—",     row_bg, SLATE, 9, h="center")
        ws.row_dimensions[r].height = 16

    # Conditional formatting — BOOKED rows green
    green_rule = FormulaRule(
        formula=['$E6="BOOKED"'],
        fill=F(EDARK),
        font=FN(EMERALD, 9, True)
    )
    ws.conditional_formatting.add("B6:M205", green_rule)

    # CLOSED LOST — muted
    lost_rule = FormulaRule(
        formula=['$E6="CLOSED LOST"'],
        fill=F(SURF2),
        font=FN(GRAY, 9)
    )
    ws.conditional_formatting.add("B6:M205", lost_rule)

    # Stale contact — crimson flag
    stale_rule = CellIsRule(operator="greaterThan", formula=["14"], fill=F(RDARK), font=FN(CRIMSON, 9, True))
    ws.conditional_formatting.add("J6:J205", stale_rule)


# ── SHEET 3: PRICING ──────────────────────────────────────────────────────────
def build_pricing(wb):
    ws = wb.create_sheet("Pricing")
    tab(ws, GOLD)
    ws.sheet_view.showGridLines = False

    cw(ws, [1.5, 26, 26, 26, 18])
    fill_bg(ws, 1, 1, 120, 5, BG)

    mc(ws, 1, 2, 2, 5, "  ◈  SERVICE RATE CARD  ·  GOOD · BETTER · BEST", SURF, GOLD, 14, True, "left", gold_left(True))
    rh(ws, {1: 22, 2: 22, 3: 10})

    # ── Tier Cards side by side (cols 2, 3, 4)
    tier_data = [
        ("TIER 1  ·  DAY RATE",   "Essential",  SURF,  GOLD,    800,
         ["✦ 1 camera operator", "✦ Up to 8 hrs on location",
          "✦ Basic color grade", "✦ 1 final cut delivery",
          "✦ Web-ready export"],
         "Startups · Events · Small brands"),
        ("TIER 2  ·  PROJECT PKG", "Standard",   SURF,  BLUE,   2400,
         ["✦ 2-day shoot included", "✦ 2 camera setups",
          "✦ Full color grade + LUTs", "✦ Sound design",
          "✦ 2 revision rounds", "✦ Drone add-on available"],
         "Agencies · Music artists · SMEs"),
        ("TIER 3  ·  BRAND PARTNER","Premium",   GDARK, GOLD,  0,
         ["✦ Monthly retainer (4-8 shoot days)",
          "✦ Dedicated edit suite", "✦ Unlimited revisions",
          "✦ Rush delivery included", "✦ Usage rights: unlimited",
          "✦ Creative direction included"],
         "Corporates · Broadcast · Retainers"),
    ]

    for col_offset, (name, sub, bg, fg, price, bullets, client_type) in enumerate(tier_data):
        c = col_offset + 2
        # Tier name card
        mc(ws, 4, c, 5, c, name, bg, fg, 11, True, "left",
           Border(left=Side(style="medium", color=fg),
                  bottom=Side(style="thin", color=fg)))
        # Subtitle
        mc(ws, 6, c, 6, c, sub, bg, SLATE, 9, False, "left")
        # Price
        if price > 0:
            mc(ws, 7, c, 8, c, f"from  ${price:,}", bg, fg, 18, True, "center")
        else:
            mc(ws, 7, c, 8, c, "Custom Quote", bg, ORANGE, 16, True, "center")
        # Bullets
        bullet_text = "\n".join(bullets)
        cell = ws.cell(row=9, column=c, value=bullet_text)
        ws.merge_cells(start_row=9, start_column=c, end_row=14, end_column=c)
        cell.fill = F(bg)
        cell.font = FN(WHITE, 9)
        cell.alignment = AL("left", "top", True)
        # Client type
        mc(ws, 15, c, 15, c, f"→  {client_type}", bg, SLATE, 8, False, "left")

    rh(ws, {4:20, 5:20, 6:14, 7:22, 8:22, 9:14, 10:14, 11:14, 12:14, 13:14, 14:14, 15:16, 16:10})
    fill_bg(ws, 4, 2, 15, 4, SURF)
    fill_bg(ws, 4, 4, 15, 4, GDARK)

    # ── Add-ons table
    section_header(ws, 17, 2, 5, "  ADD-ONS  ·  À LA CARTE")
    rh(ws, {17: 20, 18: 18})
    col_header(ws, 18, 2, "SERVICE")
    col_header(ws, 18, 3, "PRICE")
    col_header(ws, 18, 4, "NOTES")

    addons = [
        ("Drone / Aerial",        "$300 / day",  "FAA-compliant operator"),
        ("Express Delivery",      "+40%",         "72-hr turnaround"),
        ("Sound Design + Mix",    "$250 / min",   "Full audio post"),
        ("Extra Revision Round",  "$150 each",    "Beyond package limit"),
        ("BTS + Making-of",       "$400",         "Additional camera"),
        ("Color Grade — Adv.",    "$500",         "HDR + custom LUTs"),
        ("Usage: Broadcast",      "+50% of fee",  "TV / OTT platforms"),
        ("Usage: Unlimited",      "+100% of fee", "All platforms, all time"),
        ("Subtitle / Caption",    "$80 / video",  "SRT file included"),
        ("Photography Add-on",    "$350 / half-day", "Stills alongside video"),
    ]
    for i, (svc, price, note) in enumerate(addons):
        r = 19 + i
        row_bg = SURF if i % 2 == 0 else SURF2
        sc(ws, r, 2, svc,   row_bg, WHITE, 9, b=True)
        sc(ws, r, 3, price, row_bg, GOLD, 9, b=True)
        sc(ws, r, 4, note,  row_bg, SLATE, 9)
        rh(ws, {r: 15})

    # ── Quote calculator
    section_header(ws, 30, 2, 5, "  QUICK QUOTE CALCULATOR")
    rh(ws, {30: 20, 31: 16})

    sc(ws, 31, 2, "SELECT BASE TIER", SURF2, SLATE, 8, italic=True)
    sc(ws, 32, 2, "Tier 2  ·  Project Package", SURF2, GOLD, 10, b=True)
    ws.cell(row=32, column=3, value=2400).fill = F(SURF2)
    ws.cell(row=32, column=3).font = FN(GOLD, 10, True)
    ws.cell(row=32, column=3).number_format = '"$"#,##0'
    ws.cell(row=32, column=3).alignment = AL("right", "center")

    quote_rows = [
        (33, "Drone / Aerial",      300),
        (34, "Express Delivery",    0),
        (35, "Color Grade (Adv.)",  500),
    ]
    for r, item, amt in quote_rows:
        sc(ws, r, 2, item, SURF2, SLATE, 9)
        c = ws.cell(row=r, column=3, value=amt)
        c.fill = F(SURF2); c.font = FN(SLATE, 9); c.alignment = AL("right", "center")
        c.number_format = '"$"#,##0'
        rh(ws, {r: 15})

    rh(ws, {32: 18, 36: 10})
    mc(ws, 37, 2, 37, 2, "ESTIMATED TOTAL", GDARK, GOLD, 11, True)
    total_cell = ws.cell(row=37, column=3, value="=SUM(C32:C35)")
    total_cell.fill = F(GDARK)
    total_cell.font = FN(GOLD, 18, True)
    total_cell.alignment = AL("right", "center")
    total_cell.number_format = '"$"#,##0'
    rh(ws, {37: 28})


# ── SHEET 4: REVENUE PLANNER ──────────────────────────────────────────────────
def build_revenue(wb):
    ws = wb.create_sheet("Revenue")
    tab(ws, BLUE)
    ws.sheet_view.showGridLines = False
    ws.freeze_panes = "A6"

    cw(ws, [1.5, 14, 14, 14, 14, 14, 12, 12, 16])
    fill_bg(ws, 1, 1, 100, 9, BG)

    mc(ws, 1, 2, 2, 9, "  ◈  REVENUE PLANNER  ·  12-MONTH TRACKER", SURF, GOLD, 14, True, "left", gold_left(True))
    rh(ws, {1: 22, 2: 22, 3: 10})

    # ── Annual targets
    section_header(ws, 4, 2, 9, "  ANNUAL TARGET")
    rh(ws, {4: 20, 5: 22, 6: 20})
    targets = [
        (2, "ANNUAL GOAL",    36000, GOLD),
        (4, "MONTHS LEFT",    f"={12 - date.today().month}", SLATE),
        (5, "MONTHLY NEEDED", "=IFERROR((B5-SUM(D14:D25))/(12-MONTH(TODAY())),0)", ORANGE),
        (6, "YTD COLLECTED",  "=SUM(D14:D25)", EMERALD),
        (7, "PIPELINE NEED",  "=MAX(0,B5-SUM(D14:D25))", CRIMSON),
    ]
    for col, label, val, color in targets:
        sc(ws, 5, col, label, SURF, SLATE, 8, italic=True)
        c = ws.cell(row=6, column=col, value=val)
        c.fill = F(SURF); c.font = FN(color, 15, True); c.alignment = AL("right", "center")
        if col != 4:
            c.number_format = '"$"#,##0'

    # Column headers
    section_header(ws, 12, 2, 9, "  MONTHLY BREAKDOWN")
    rh(ws, {12: 20, 13: 18})
    month_headers = ["MONTH", "BOOKED", "PROJECTED", "COLLECTED", "OUTSTANDING", "EXPENSES", "NET PROFIT", "MARGIN %", "PROGRESS"]
    for i, h in enumerate(month_headers):
        col_header(ws, 13, i + 1, h)

    months = ["January","February","March","April","May","June",
              "July","August","September","October","November","December"]
    sample_data = [
        (2800, 3000, 2800, 0,   620),
        (1800, 2000, 1800, 0,   540),
        (3500, 3500, 3200, 300, 700),
        (2200, 2500, 2200, 0,   580),
        (4200, 4000, 3800, 400, 820),
        (1500, 2000, 0,    0,   450),
        (0,    2500, 0,    0,   0),
        (0,    3000, 0,    0,   0),
        (0,    2800, 0,    0,   0),
        (0,    3200, 0,    0,   0),
        (0,    3500, 0,    0,   0),
        (0,    4000, 0,    0,   0),
    ]

    for i, (month, (booked, projected, collected, outstanding, expenses)) in enumerate(zip(months, sample_data)):
        r = 14 + i
        row_bg = SURF if i % 2 == 0 else SURF2
        net = collected - expenses if collected > 0 else 0
        margin = round(net / collected * 100, 1) if collected > 0 else 0

        sc(ws, r, 1, month, row_bg, WHITE, 9, b=True)
        for col, val, fmt in [
            (2, booked,      '"$"#,##0'),
            (3, projected,   '"$"#,##0'),
            (4, collected,   '"$"#,##0'),
            (5, outstanding, '"$"#,##0'),
            (6, expenses,    '"$"#,##0'),
            (7, net,         '"$"#,##0'),
        ]:
            c = ws.cell(row=r, column=col, value=val)
            c.fill = F(row_bg)
            c.font = FN(EMERALD if (col == 7 and net > 0) else (CRIMSON if (col == 7 and net < 0) else SLATE), 9)
            c.alignment = AL("right", "center")
            c.number_format = fmt

        margin_color = GOLD if margin > 30 else (EMERALD if margin > 15 else CRIMSON)
        c = ws.cell(row=r, column=8, value=margin / 100 if margin else 0)
        c.fill = F(row_bg); c.font = FN(margin_color, 9, margin > 30)
        c.alignment = AL("center", "center"); c.number_format = "0%"

        # Progress bar
        pct = min(collected / booked, 1.0) if booked > 0 else 0
        filled = int(pct * 15)
        bar = "█" * filled + "░" * (15 - filled)
        sc(ws, r, 9, bar, row_bg, EMERALD if pct >= 1.0 else BLUE, 9)
        ws.row_dimensions[r].height = 16

    # Totals row
    r = 26
    fill_bg(ws, r, 1, r, 9, GDARK)
    sc(ws, r, 1, "TOTALS", GDARK, GOLD, 10, True)
    for col, start_col in [(2,'B'),(3,'C'),(4,'D'),(5,'E'),(6,'F'),(7,'G')]:
        c = ws.cell(row=r, column=col, value=f"=SUM({start_col}14:{start_col}25)")
        c.fill = F(GDARK); c.font = FN(GOLD, 10, True)
        c.alignment = AL("right", "center"); c.number_format = '"$"#,##0'
    ws.row_dimensions[r].height = 20


# ── SHEET 5: HABITS & LIFE GAMIFIER ──────────────────────────────────────────
def build_habits(wb):
    ws = wb.create_sheet("Habits")
    tab(ws, PURPLE)
    ws.sheet_view.showGridLines = False

    cw(ws, [1.5, 28, 8, 16, 6, 6, 6, 6, 6, 6, 6, 8, 8])
    fill_bg(ws, 1, 1, 120, 13, BG)

    # ── CHARACTER CARD
    mc(ws, 1, 2, 1, 13, "  ◈  LIFE GAMIFIER  ·  CHARACTER DASHBOARD", SURF, GOLD, 14, True, "left", gold_left(True))
    rh(ws, {1: 22})

    # Character name & class
    sc(ws, 2, 2, "YOUR NAME", SURF, SLATE, 8, italic=True)
    mc(ws, 2, 3, 2, 13, "[ YOUR NAME HERE ]", SURF, WHITE, 12, True, "left")
    rh(ws, {2: 20})

    sc(ws, 3, 2, "CLASS", SURF, SLATE, 8, italic=True)
    mc(ws, 3, 3, 3, 13, "Cinematographer  ·  Visual Storyteller", SURF, GOLD, 10, False, "left")
    rh(ws, {3: 18})

    # XP values (hardcoded for now — sum of habit log would be formula-driven)
    sc(ws, 4, 2, "LEVEL", SURF, SLATE, 8, italic=True)
    xp_level = ws.cell(row=4, column=3, value='=IFERROR(VLOOKUP(B6,Lookup!$D$2:$E$31,2,TRUE),"Apprentice")')
    xp_level.fill = F(SURF); xp_level.font = FN(GOLD, 16, True); xp_level.alignment = AL("left", "center")

    mc(ws, 4, 4, 4, 6, "RANK:", SURF, SLATE, 8, False, "right")
    rank_cell = ws.cell(row=4, column=7, value='=IFERROR(VLOOKUP(B6,Lookup!$D$2:$E$31,3,FALSE),"Apprentice")')
    ws.merge_cells(start_row=4, start_column=7, end_row=4, end_column=13)
    rank_cell.fill = F(SURF); rank_cell.font = FN(PURPLE, 11, True); rank_cell.alignment = AL("left", "center")
    rh(ws, {4: 22})

    sc(ws, 5, 2, "TOTAL XP", SURF, SLATE, 8, italic=True)
    xp_total = ws.cell(row=5, column=3, value="=IFERROR(SUM(L44:L73),0)")
    xp_total.fill = F(SURF); xp_total.font = FN(EMERALD, 12, True); xp_total.alignment = AL("left", "center")

    # XP progress bar cell
    sc(ws, 6, 2, "XP BAR", SURF, SLATE, 8, italic=True)
    xp_bar = ws.cell(row=6, column=3,
        value='=REPT("█",MIN(20,INT(IFERROR(SUM(L44:L73),0)/500)))&REPT("░",MAX(0,20-MIN(20,INT(IFERROR(SUM(L44:L73),0)/500))))')
    ws.merge_cells(start_row=6, start_column=3, end_row=6, end_column=10)
    xp_bar.fill = F(SURF); xp_bar.font = FN(GOLD, 11); xp_bar.alignment = AL("left", "center")

    xp_label = ws.cell(row=6, column=11, value="/ 10,000 XP")
    ws.merge_cells(start_row=6, start_column=11, end_row=6, end_column=13)
    xp_label.fill = F(SURF); xp_label.font = FN(SLATE, 9); xp_label.alignment = AL("left", "center")

    sc(ws, 7, 2, "STREAK", SURF, SLATE, 8, italic=True)
    streak = ws.cell(row=7, column=3, value="=IFERROR(COUNTIF(M44:M73,TRUE),0)")
    streak.fill = F(SURF); streak.font = FN(ORANGE, 14, True); streak.alignment = AL("left", "center")
    mc(ws, 7, 4, 7, 13, "days with at least one habit completed", SURF, SLATE, 8, False, "left")
    rh(ws, {5:18, 6:18, 7:16, 8:10})

    # ── HABIT CATEGORIES ──────────────────────────────────────────────────────
    categories = [
        ("🎬  CRAFT", GOLD,    GDARK, [
            ("Review reference films",          20),
            ("Practice shot composition",        15),
            ("Edit personal project footage",    25),
            ("Study color grading technique",    15),
        ]),
        ("💪  BODY",  EMERALD, EDARK, [
            ("Workout / Movement (30 min+)",     20),
            ("8 hours of quality sleep",         15),
            ("No junk food today",               10),
            ("Hydration goal (2L+)",             10),
        ]),
        ("🧠  MIND",  PURPLE,  PDARK, [
            ("Morning pages / journaling",       15),
            ("Read 20 minutes",                  15),
            ("Meditation (10 min+)",             10),
            ("Gratitude — 3 things",              5),
        ]),
        ("💼  BUSINESS", BLUE, BDARK, [
            ("Outreach to 1+ potential client",  25),
            ("Post content / BTS reel",          20),
            ("Follow up on active proposals",    20),
            ("Review financials / pipeline",     10),
        ]),
    ]

    habit_row_map = {}  # habit_name -> row (for lookup)
    current_row = 9
    habit_index = 0

    for (cat_name, cat_color, cat_dark, habits) in categories:
        section_header(ws, current_row, 2, 13, f"  {cat_name}")
        ws.cell(row=current_row, column=2).font = FN(cat_color, 11, True)
        ws.cell(row=current_row, column=2).border = Border(
            left=Side(style="medium", color=cat_color),
            bottom=Side(style="thin", color=cat_color)
        )
        rh(ws, {current_row: 20})
        current_row += 1

        # Sub-header for habit columns
        sc(ws, current_row, 2, "HABIT", cat_dark, cat_color, 8, True)
        sc(ws, current_row, 3, "XP", cat_dark, cat_color, 8, True, h="center")
        # Day headers Mon-Sun
        days = ["M", "T", "W", "T", "F", "S", "S"]
        for d, day in enumerate(days):
            sc(ws, current_row, 5 + d, day, cat_dark, cat_color, 8, True, h="center")
        sc(ws, current_row, 12, "DONE", cat_dark, cat_color, 8, True, h="center")
        sc(ws, current_row, 13, "XP ✓", cat_dark, cat_color, 8, True, h="center")
        rh(ws, {current_row: 16})
        current_row += 1

        for (habit_name, xp) in habits:
            row_bg = cat_dark
            sc(ws, current_row, 2, habit_name, row_bg, WHITE, 9)
            sc(ws, current_row, 3, xp, row_bg, cat_color, 9, True, h="center")
            sc(ws, current_row, 4, "", row_bg, SLATE, 9)  # spacer

            # Dropdowns for each day (✓ / —)
            dv = DataValidation(type="list", formula1='"✓,—"', allow_blank=True)
            dv.sqref = f"{get_column_letter(5)}{current_row}:{get_column_letter(11)}{current_row}"
            ws.add_data_validation(dv)

            for d in range(7):
                col = 5 + d
                default_val = "✓" if d < 5 and habit_index % 3 != 2 else "—"
                c = ws.cell(row=current_row, column=col, value=default_val)
                c.fill = F(row_bg)
                c.font = FN(EMERALD if default_val == "✓" else SLATE, 9)
                c.alignment = AL("center", "center")

            # Done count formula
            done_formula = f'=COUNTIF(E{current_row}:K{current_row},"✓")'
            done_cell = ws.cell(row=current_row, column=12, value=done_formula)
            done_cell.fill = F(row_bg); done_cell.font = FN(cat_color, 9, True)
            done_cell.alignment = AL("center", "center")

            # XP earned formula
            xp_formula = f'=IF(L{current_row}>0,C{current_row},0)'
            xp_cell = ws.cell(row=current_row, column=13, value=xp_formula)
            xp_cell.fill = F(row_bg); xp_cell.font = FN(GOLD, 9, True)
            xp_cell.alignment = AL("center", "center")

            habit_row_map[habit_name] = current_row
            rh(ws, {current_row: 16})
            current_row += 1
            habit_index += 1

        # Spacer between categories
        fill_bg(ws, current_row, 2, current_row, 13, BG)
        rh(ws, {current_row: 8})
        current_row += 1

    # ── DAILY LOG TABLE
    fill_bg(ws, current_row, 2, current_row, 13, BG)
    rh(ws, {current_row: 10})
    current_row += 1

    section_header(ws, current_row, 2, 13, "  30-DAY HABIT LOG")
    rh(ws, {current_row: 20})
    current_row += 1

    # Column headers for log
    log_headers = ["DATE", "CRAFT", "BODY", "MIND", "BIZ", "TOTAL DONE",
                   "XP TODAY", "DAILY BAR", "STREAK DAY?"]
    for i, h in enumerate(log_headers):
        col_header(ws, current_row, i + 2, h)
    rh(ws, {current_row: 18})
    log_header_row = current_row
    current_row += 1

    # Store this row for Dashboard formula reference
    log_start = current_row
    today = date.today()
    sample_log = [
        (4, 4, 4, 4, True),
        (3, 4, 3, 4, True),
        (4, 3, 4, 3, True),
        (2, 4, 3, 3, True),
        (4, 4, 4, 4, True),
        (1, 2, 2, 1, True),
        (0, 1, 0, 0, False),
    ]
    for i in range(30):
        r = current_row + i
        row_bg = SURF if i % 2 == 0 else SURF2
        d = today - timedelta(days=29 - i)

        craft, body, mind, biz = (0, 0, 0, 0)
        is_perfect = False
        if i >= 23:
            idx = i - 23
            if idx < len(sample_log):
                craft, body, mind, biz, is_perfect = sample_log[idx]

        total = craft + body + mind + biz
        max_habits = 16
        xp_today = (craft * 75 + body * 55 + mind * 45 + biz * 75) // max(1, 4)
        pct = total / max_habits
        filled = int(pct * 12)
        bar = "█" * filled + "░" * (12 - filled)
        bar_color = GOLD if pct >= 1.0 else (EMERALD if pct >= 0.5 else SLATE)

        c = ws.cell(row=r, column=2, value=d)
        c.fill = F(row_bg); c.font = FN(SLATE, 9); c.alignment = AL("center", "center")
        c.number_format = "MMM D"

        for col_offset, val, color in [
            (1, craft, GOLD), (2, body, EMERALD), (3, mind, PURPLE), (4, biz, BLUE)
        ]:
            c = ws.cell(row=r, column=2 + col_offset + 1, value=val)
            c.fill = F(GDARK if is_perfect else row_bg)
            c.font = FN(color, 9, val > 0)
            c.alignment = AL("center", "center")

        c = ws.cell(row=r, column=7, value=total)
        c.fill = F(GDARK if is_perfect else row_bg)
        c.font = FN(GOLD if is_perfect else WHITE, 9, True)
        c.alignment = AL("center", "center")

        c = ws.cell(row=r, column=8, value=xp_today)
        c.fill = F(GDARK if is_perfect else row_bg)
        c.font = FN(ORANGE if xp_today > 0 else SLATE, 9)
        c.alignment = AL("center", "center")

        c = ws.cell(row=r, column=9, value=bar)
        c.fill = F(GDARK if is_perfect else row_bg)
        c.font = FN(bar_color, 9)
        c.alignment = AL("left", "center")

        c = ws.cell(row=r, column=10, value=is_perfect)
        c.fill = F(GDARK if is_perfect else row_bg)
        c.font = FN(GOLD if is_perfect else SLATE, 8)
        c.alignment = AL("center", "center")

        if is_perfect:
            mc(ws, r, 11, r, 13, "✦ PERFECT DAY", GDARK, GOLD, 8, True, "center")
        else:
            fill_bg(ws, r, 11, r, 13, row_bg)

        ws.row_dimensions[r].height = 15

    # ── ACHIEVEMENT BADGES
    badge_row = current_row + 30 + 2
    section_header(ws, badge_row, 2, 13, "  ACHIEVEMENT BADGES")
    rh(ws, {badge_row: 20, badge_row - 1: 10})
    badge_row += 1

    badges = [
        ("7-DAY WARRIOR",   "COUNTIF(J44:J73,TRUE)>=7",  "Complete 7 perfect days"),
        ("30-DAY GRIND",    "COUNTIF(J44:J73,TRUE)>=28", "28+ perfect days in log"),
        ("CRAFT MASTER",    "SUM(C44:C73)>=100",         "100+ craft habit checks"),
        ("BUSINESS MODE",   "SUM(F44:F73)>=50",          "50+ business habit checks"),
        ("IRON BODY",       "SUM(D44:D73)>=80",          "80+ body habit checks"),
        ("FIRST BOOKING",   "Pipeline!D3>0",             "First job booked"),
        ("$10K MONTH",      "Revenue!D14>10000",         "Single month over $10K"),
        ("LEVEL 10",        "Habits!B5>=1500",           "Reach 1,500 total XP"),
    ]

    for i, (badge_name, formula, desc) in enumerate(badges):
        r = badge_row + (i // 4) * 2
        c = 2 + (i % 4) * 3
        try:
            if c + 2 <= 13:
                ws.merge_cells(start_row=r, start_column=c, end_row=r + 1, end_column=c + 2)
        except Exception:
            pass
        cell = ws.cell(row=r, column=c, value=badge_name)
        cell.fill = F(GDARK)
        cell.font = FN(GOLD, 9, True)
        cell.alignment = AL("center", "center")
        cell.border = Border(
            left=Side(style="thin", color=GOLD),
            right=Side(style="thin", color=GOLD),
            top=Side(style="thin", color=GOLD),
            bottom=Side(style="thin", color=GOLD),
        )
        rh(ws, {r: 20, r + 1: 14})

    # Add conditional formatting for badge activation
    for i, (badge_name, formula, desc) in enumerate(badges):
        r = badge_row + (i // 4) * 2
        c = 2 + (i % 4) * 3
        col_letter = get_column_letter(c)
        try:
            badge_rule = FormulaRule(
                formula=[f"={formula}"],
                fill=F(GDARK),
                font=FN(GOLD, 9, True)
            )
            ws.conditional_formatting.add(f"{col_letter}{r}", badge_rule)
        except Exception:
            pass


# ── SHEET 6: LOOKUP (HIDDEN) ──────────────────────────────────────────────────
def build_lookup(wb):
    ws = wb.create_sheet("Lookup")
    ws.sheet_state = "hidden"

    # XP → Level → Rank table (col D, E, F)
    ws.cell(row=1, column=4, value="XP_MIN")
    ws.cell(row=1, column=5, value="LEVEL")
    ws.cell(row=1, column=6, value="RANK_TITLE")

    level_data = [
        (0,     1,  "Apprentice"),
        (200,   2,  "Apprentice II"),
        (400,   3,  "Apprentice III"),
        (600,   4,  "Journeyman"),
        (900,   5,  "Journeyman II"),
        (1200,  6,  "Journeyman III"),
        (1500,  7,  "Craftsman"),
        (1900,  8,  "Craftsman II"),
        (2300,  9,  "Craftsman III"),
        (2700,  10, "Artisan"),
        (3200,  11, "Artisan II"),
        (3800,  12, "Artisan III"),
        (4400,  13, "Senior Artisan"),
        (5000,  14, "Master"),
        (5800,  15, "Master II"),
        (6700,  16, "Master III"),
        (7700,  17, "Grand Master"),
        (8800,  18, "Grand Master II"),
        (9900,  19, "Grand Master III"),
        (10000, 20, "Legend"),
        (12000, 21, "Legend II"),
        (14500, 22, "Legend III"),
        (17000, 23, "Visionary"),
        (20000, 24, "Visionary II"),
        (24000, 25, "Elite Visionary"),
        (28000, 26, "Icon"),
        (33000, 27, "Icon II"),
        (38000, 28, "Grand Icon"),
        (44000, 29, "Immortal"),
        (50000, 30, "LEGEND: CINEMATOGRAPHER"),
    ]
    for i, (xp, level, rank) in enumerate(level_data):
        ws.cell(row=i + 2, column=4, value=xp)
        ws.cell(row=i + 2, column=5, value=level)
        ws.cell(row=i + 2, column=6, value=rank)

    # Service types (col A)
    ws.cell(row=1, column=1, value="SERVICE_TYPES")
    service_types = ["Commercial", "Wedding Film", "Music Video", "Documentary",
                     "Brand Video", "Event Coverage", "Ad Campaign", "Product Shoot",
                     "Corporate Film", "Personal Project"]
    for i, s in enumerate(service_types):
        ws.cell(row=i + 2, column=1, value=s)


# ── MAIN ──────────────────────────────────────────────────────────────────────
def main():
    wb = Workbook()
    wb.remove(wb.active)  # remove default Sheet

    print("Building sheets...")
    build_dashboard(wb)
    print("  OK Dashboard")
    build_pipeline(wb)
    print("  OK Pipeline")
    build_pricing(wb)
    print("  OK Pricing")
    build_revenue(wb)
    print("  OK Revenue")
    build_habits(wb)
    print("  OK Habits")
    build_lookup(wb)
    print("  OK Lookup")

    out_path = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                            "master-dashboard.xlsx")
    wb.save(out_path)
    print(f"\nSaved -> {out_path}\n")
    print("Next steps:")
    print("  1. Open master-dashboard.xlsx in Excel or upload to Google Sheets")
    print("  2. Fill in your name on the Habits sheet (row 2)")
    print("  3. Update your annual revenue goal on Revenue sheet (cell B5)")
    print("  4. Add your real rates to Pricing sheet (tier cards + add-ons)")


if __name__ == "__main__":
    main()
