#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_intern_final.py
Assemble les 6 chapitres en scripts/intern.json prêt pour import.js
Usage : python3 scripts/build_intern_final.py
"""
import json, os, ast

# Extraire la liste final_exam depuis final_exam.py via ast.literal_eval
_fe_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'final_exam.py')
_fe_code = open(_fe_path).read()
_start = _fe_code.index('final_exam = [') + len('final_exam = ')
_end   = _fe_code.index('\n]\n', _start) + 2  # inclure le ']'
final_exam = ast.literal_eval(_fe_code[_start:_end])

BASE = os.path.dirname(os.path.abspath(__file__))

def load(n):
    p = os.path.join(BASE, f'intern_ch{n}.json')
    with open(p, 'r', encoding='utf-8') as f:
        return json.load(f)

ch1 = load(1)
ch2 = load(2)
ch3 = load(3)
ch4 = load(4)
ch5 = load(5)
ch6 = load(6)

data = {
    "subject_name":  "Internationalisation des programmes de fiction",
    "teacher_name":  "Sophie Noël",
    "subject_color": "mint",
    "icon":          "film",
    "exam_type":     "qrc",
    "next_exam":     "12 mai 2025",
    "chapters":      [ch1, ch2, ch3, ch4, ch5, ch6],
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
