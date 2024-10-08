from django.contrib import admin
from django import forms

from .models import *


class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'visible', 'link', 'choosed')
    list_filter = ['date', 'visible', 'lang']
    search_fields = ['title', 'date']
    empty_value_display = ''
    ordering = ['date']
    fields = ['title', 'date', 'description', 'visible', 'link', 'choosed',
              'image', 'tags', 'languages', 'lang']


class TagAdmin(admin.ModelAdmin):
    list_display = ('name', 'icon')
    list_filter = ['name', 'icon']
    search_fields = ['name', 'icon']
    empty_value_display = ''
    fieldsets = [
        ('Tag', {'fields': ['name', 'icon', 'lang']}),
    ]


class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'visible')
    list_filter = ['name', 'visible']
    search_fields = ['name', 'visible']
    empty_value_display = ''
    fieldsets = [
        ('Skill', {'fields': ['name', 'icon', 'description', 'visible', 'lang'
                              ]}),
    ]


class HobbieAdmin(admin.ModelAdmin):
    list_display = ('name', 'visible')
    list_filter = ['name', 'visible']
    search_fields = ['name', 'visible']
    empty_value_display = ''
    fieldsets = [
        ('Hobbie', {'fields': ['name', 'icon', 'visible', 'lang']}),
    ]


class EducationAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'visible')
    list_filter = ['title', 'visible']
    search_fields = ['title', 'visible']
    empty_value_display = ''
    fieldsets = [
        ('Education', {'fields': ['title', 'date', 'visible', 'lang']}),
    ]


class LanguageAdmin(admin.ModelAdmin):
    list_display = ('language', 'level', 'visible')
    list_filter = ['language']
    search_fields = ['language']
    empty_value_display = ''
    fieldsets = [
        ('Language', {'fields': ['language', 'level', 'visible', 'lang']}),
    ]


class StrengthAdmin(admin.ModelAdmin):
    list_display = ('name', 'visible')
    list_filter = ['name', 'visible']
    search_fields = ['name', 'visible']
    empty_value_display = ''
    fieldsets = [
        ('Strength', {'fields': ['name', 'icon', 'visible', 'lang']}),
    ]


class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'visible')
    list_filter = ['title', 'visible']
    search_fields = ['title', 'visible']
    empty_value_display = ''
    fieldsets = [
        ('Experience', {'fields': ['title', 'description', 'date', 'visible',
                                   'icon', 'lang']}),
    ]


class LangAdmin(admin.ModelAdmin):
    list_display = ('name', 'lang')
    list_filter = ['name', 'lang']
    search_fields = ['name', 'lang']
    empty_value_display = ''
    fieldsets = [
        ('Lang', {'fields': ['name', 'lang']}),
    ]


admin.site.register(Lang, LangAdmin)
admin.site.register(Project, ProjectAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(Skill, SkillAdmin)
admin.site.register(Hobbie, HobbieAdmin)
admin.site.register(Education, EducationAdmin)
admin.site.register(Language, LanguageAdmin)
admin.site.register(Strength, StrengthAdmin)
admin.site.register(Experience, ExperienceAdmin)
