from itertools import chain
from typing import Any

import markdown
from django.db import models
from django.db.models import QuerySet


def get_default_lang() -> int:
    lang, _ = Lang.objects.get_or_create(lang="fr")
    return lang.pk


class Lang(models.Model):
    lang = models.CharField(max_length=2, blank=True,
                            null=True)
    name = models.CharField(max_length=200)

    def __str__(self) -> str:
        return self.name

    def get_prev(self):
        langs = Lang.objects.all()
        index = list(langs).index(self)
        if index == 0:
            return langs.last()
        return langs[index - 1]


class Project(models.Model):
    title = models.CharField(max_length=200)
    date = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/', blank=True, null=True,
                              default='')
    link = models.CharField(max_length=200, blank=True, null=True)
    tags = models.ManyToManyField("Tag", blank=True)
    visible = models.BooleanField(default=True)
    lang = models.ManyToManyField(Lang)
    choosed = models.BooleanField(default=False, blank=True, null=True)
    languages = models.ManyToManyField("Skill", blank=True)

    def __str__(self):
        return self.title

    def hasLink(self):
        return self.link != "" and self.link is not None

    def get_lang(self):
        first_lang = self.lang.first()
        return first_lang.lang if first_lang else None

    def save(self, *args, **kwargs):
        super(Project, self).save(*args, *kwargs)
        if not self.lang.exists():
            self.lang.add(get_default_lang())

    def get_tags(self) -> chain[Any]:
        return chain(self.tags.get_queryset(), self.languages.get_queryset())


class Tag(models.Model):
    name = models.CharField(max_length=150)
    icon = models.CharField(max_length=150, default="fa-solid fa-gear")
    lang = models.ManyToManyField(Lang)

    def __str__(self):
        return self.name

    def get_lang(self):
        first_lang = self.lang.first()
        return first_lang.lang if first_lang else None

    def save(self, *args, **kwargs):
        super(Tag, self).save(*args, *kwargs)
        if not self.lang.exists():
            self.lang.add(get_default_lang())


class Skill(models.Model):
    name = models.CharField(max_length=150)
    icon = models.CharField(max_length=150, default="fa-solid fa-gear")
    description = models.TextField()
    description_html = models.TextField(null=True)
    visible = models.BooleanField(default=True)
    lang = models.ManyToManyField(Lang)

    def __str__(self):
        return self.name

    def formatted_skills(self):
        return markdown.markdown(self.description)

    def get_lang(self):
        first_lang = self.lang.first()
        return first_lang.lang if first_lang else None

    def got_projects(self) -> bool:
        return len(Project.objects.filter(languages=self,  visible=True)) != 0

    def get_projects(self) -> QuerySet:
        projects = Project.objects.filter(languages=self, visible=True)
        return projects.all() if projects else []

    def save(self, *args, **kwargs):
        super(Skill, self).save(*args, *kwargs)
        if not self.lang.exists():
            self.lang.add(get_default_lang())


class Hobbie(models.Model):
    name = models.CharField(max_length=150)
    icon = models.CharField(max_length=150, default="fa-solid fa-gear")
    visible = models.BooleanField(default=True)
    lang = models.ManyToManyField(Lang)

    def __str__(self):
        return self.name

    def get_lang(self):
        return self.lang.first().lang

    def save(self, *args, **kwargs):
        super(Hobbie, self).save(*args, *kwargs)
        if not self.lang.exists():
            self.lang.add(get_default_lang())


class Education(models.Model):
    title = models.CharField(max_length=200)
    date = models.CharField(max_length=200)
    visible = models.BooleanField(default=True)
    lang = models.ManyToManyField(Lang)

    def get_lang(self):
        first_lang = self.lang.first()
        return first_lang.lang if first_lang else None

    def save(self, *args, **kwargs):
        super(Education, self).save(*args, *kwargs)
        if not self.lang.exists():
            self.lang.add(get_default_lang())


class Experience(models.Model):
    title = models.CharField(max_length=200)
    icon = models.CharField(max_length=200, default="fa-solid fa-gear",
                            blank=True, null=True)
    description = models.TextField()
    date = models.CharField(max_length=200)
    visible = models.BooleanField(default=True)
    lang = models.ManyToManyField(Lang)

    def get_lang(self):
        first_lang = self.lang.first()
        return first_lang.lang if first_lang else None

    def save(self, *args, **kwargs):
        super(Experience, self).save(*args, *kwargs)
        if not self.lang.exists():
            self.lang.add(get_default_lang())


class Language(models.Model):
    language = models.CharField(max_length=200)
    level = models.CharField(max_length=200)
    visible = models.BooleanField(default=True)
    lang = models.ManyToManyField(Lang)

    def formatted_language(self):
        return markdown.markdown(self.language)

    def __str__(self):
        return self.language + " : " + self.level

    def get_lang(self):
        first_lang = self.lang.first()
        return first_lang.lang if first_lang else None

    def save(self, *args, **kwargs):
        super(Language, self).save(*args, *kwargs)
        if not self.lang.exists():
            self.lang.add(get_default_lang())


class Strength(models.Model):
    name = models.CharField(max_length=200)
    icon = models.CharField(max_length=200, default="fa-solid fa-gear")
    visible = models.BooleanField(default=True)
    lang = models.ManyToManyField(Lang)

    def __str__(self):
        return self.name

    def get_lang(self):
        first_lang = self.lang.first()
        return first_lang.lang if first_lang else None

    def save(self, *args, **kwargs):
        super(Strength, self).save(*args, *kwargs)
        if not self.lang.exists():
            self.lang.add(get_default_lang())
