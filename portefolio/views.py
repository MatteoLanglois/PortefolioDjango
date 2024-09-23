from itertools import chain

from django.shortcuts import render
# Create your views here.
from .models import *


def index(request):
    skills = Skill.objects.all()
    for skill in skills:
        skill.description_html = skill.formatted_skills()

    languages = Language.objects.all()
    for language in languages:
        language.language = language.formatted_language()[3:-4]

    return render(request, 'portefolio/index.html', {
        'projects': Project.objects.filter(choosed=True),
        'tags': chain(Tag.objects.all(), Skill.objects.all()),
        'skills': skills.order_by('name'),
        'hobbies': Hobbie.objects.all(),
        'educations': Education.objects.all(),
        'languages': languages,
        'strengths': Strength.objects.all(),
        'experiences': Experience.objects.all(),
        'langs': Lang.objects.all(),
    })


def project(request):
    return render(request, 'portefolio/projects.html', {
        'projects': Project.objects.filter(visible=True),
        'tags': Tag.objects.all(),
    })
