import markdown
from django.db import models


class Project(models.Model):
    title = models.CharField(max_length=200)
    date = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/', blank=True, null=True,
                              default='')
    link = models.CharField(max_length=200, blank=True, null=True)
    tags = models.ManyToManyField("Tag", blank=True)
    visible = models.BooleanField(default=True)

    def __str__(self):
        return self.title

    def hasLink(self):
        return self.link != "" and self.link is not None


class Tag(models.Model):
    name = models.CharField(max_length=150)
    icon = models.CharField(max_length=150, default="fa-solid fa-gear")

    def __str__(self):
        return self.name


class Skill(models.Model):
    name = models.CharField(max_length=150)
    icon = models.CharField(max_length=150, default="fa-solid fa-gear")
    description = models.TextField()
    description_html = models.TextField(null=True)
    visible = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    def formatted_skills(self):
        return markdown.markdown(self.description)


class Hobbie(models.Model):
    name = models.CharField(max_length=150)
    icon = models.CharField(max_length=150, default="fa-solid fa-gear")
    visible = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Education(models.Model):
    title = models.CharField(max_length=200)
    date = models.CharField(max_length=200)
    visible = models.BooleanField(default=True)



class Experience(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.CharField(max_length=200)
    visible = models.BooleanField(default=True)


class Language(models.Model):
    language = models.CharField(max_length=200)
    level = models.CharField(max_length=200)
    visible = models.BooleanField(default=True)

    def formatted_language(self):
        return markdown.markdown(self.language)


class Strength(models.Model):
    name = models.CharField(max_length=200)
    icon = models.CharField(max_length=200, default="fa-solid fa-gear")
    visible = models.BooleanField(default=True)
