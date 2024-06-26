from django.contrib import admin
from .models import Board, Project, Page, TaskList, Task

admin.site.register(Board)
admin.site.register(Project)
admin.site.register(Page)
admin.site.register(TaskList)
admin.site.register(Task)
