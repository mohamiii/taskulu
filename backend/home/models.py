from django.db import models
from django.contrib.auth.models import User


class Board(models.Model):
    title = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='boards')


class Project(models.Model):
    board = models.ForeignKey(Board, on_delete=models.CASCADE, related_name='projects')
    title = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='projects')


class Page(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='pages')
    title = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='pages')


class TaskList(models.Model):
    page = models.ForeignKey(Page, on_delete=models.CASCADE, related_name='lists')
    title = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='lists')


class Task(models.Model):
    list = models.ForeignKey(TaskList, on_delete=models.CASCADE, related_name='tasks')
    title = models.CharField(max_length=200)
    state = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks')
