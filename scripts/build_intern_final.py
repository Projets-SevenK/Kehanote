#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_intern_final.py
Assemble les 4 chapitres en scripts/intern.json prêt pour import.js
Usage : python3 scripts/build_intern_final.py
"""
import json, os, random

BASE = os.path.dirname(os.path.abspath(__file__))

def load(n):
    p = os.path.join(BASE, f'intern_ch{n}.json')
    with open(p, 'r', encoding='utf-8') as f:
        return json.load(f)

ch1 = load(1)
ch2 = load(2)
ch3 = load(3)
ch4 = load(4)

# ── Examen blanc : 8 questions hard par chapitre = 32 ──────────────────────────
def hard_q(ch, n=8):
    return ch['qcm']['hard'][:n]

final_exam = hard_q(ch1) + hard_q(ch2) + hard_q(ch3) + hard_q(ch4, 6)

data = {
    "subject_name":  "Internationalisation des programmes de fiction",
    "teacher_name":  "Sophie Noël",
    "subject_color": "mint",
    "icon":          "film",
    "exam_type":     "qrc",
    "next_exam":     "12 mai 2025",
    "chapters":      [ch1, ch2, ch3, ch4],
    "final_exam":    final_exam,
}

out = os.path.join(BASE, 'intern.json')
with open(out, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

# Résumé
total_fc  = sum(len(c['flashcards']) for c in data['chapters'])
total_qcm = sum(len(c['qcm']['easy']) + len(c['qcm']['medium']) + len(c['qcm']['hard'])
               for c in data['chapters'])
total_qrc = sum(len(c['qrc']) for c in data['chapters'])
total_pan = sum(len(c['panic']) for c in data['chapters'])

print(f"\n✅ intern.json généré")
print(f"   Chapitres : {len(data['chapters'])}")
print(f"   Flashcards: {total_fc}")
print(f"   QCM       : {total_qcm} (+ {len(final_exam)} examen final)")
print(f"   QRC       : {total_qrc}")
print(f"   Panique   : {total_pan}")
print(f"\n➡  node scripts/import.js scripts/intern.json\n")
