from rest_framework import serializers
from .models import Board, Project, Page, TaskList, Task


class BoardSerializer(serializers.ModelSerializer):
    projects = serializers.SerializerMethodField()

    class Meta:
        model = Board
        fields = ("id", "title", "created", "projects")

    def get_projects(self, obj):
        result = obj.projects.values("id", "title", "created", "board")
        return result


class ProjectSerializer(serializers.ModelSerializer):
    pages = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = ("id", "title", "created", "board", "pages")

    def get_pages(self, obj):
        result = obj.pages.all()
        return PageSerializer(instance=result, many=True).data

class PageSerializer(serializers.ModelSerializer):
    lists = serializers.SerializerMethodField()

    class Meta:
        model = Page
        fields = ("id", "title", "created", "project", "lists")

    def get_lists(self, obj):
        result = obj.lists.all()
        return TaskListSerializer(instance=result, many=True).data


class TaskListSerializer(serializers.ModelSerializer):
    tasks = serializers.SerializerMethodField()

    class Meta:
        model = TaskList
        fields = ("id", "title", "created", "page", "tasks")

    def get_tasks(self, obj):
        result = obj.tasks.all()
        return TaskSerializer(instance=result, many=True).data


class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = ("id", "title", "created", "list", "state")
