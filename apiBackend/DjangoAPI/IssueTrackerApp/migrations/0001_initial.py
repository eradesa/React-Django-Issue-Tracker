# Generated by Django 4.1.9 on 2023-08-30 19:24

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Categories",
            fields=[
                ("CategoryId", models.AutoField(primary_key=True, serialize=False)),
                ("CategoryCode", models.CharField(max_length=30, unique=True)),
                ("CategoryDes", models.CharField(max_length=100)),
                (
                    "CategoryCrDate",
                    models.CharField(default="1900-01-01", max_length=30),
                ),
                (
                    "CategoryEditDate",
                    models.CharField(default="1900-01-01", max_length=30),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Departments",
            fields=[
                ("DepartmentId", models.AutoField(primary_key=True, serialize=False)),
                ("DepartmentName", models.CharField(max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name="Employees",
            fields=[
                ("EmployeeId", models.AutoField(primary_key=True, serialize=False)),
                ("EmployeeName", models.CharField(max_length=500)),
                ("Department", models.CharField(max_length=500)),
                ("DateOfJoining", models.DateField()),
                ("PhotoFileName", models.CharField(max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name="IssueLists",
            fields=[
                ("IssueListUiId", models.AutoField(primary_key=True, serialize=False)),
                ("IssueListId", models.CharField(max_length=50, unique=True)),
                ("IssuePriority", models.CharField(default="Critical", max_length=20)),
                ("IssueListName", models.CharField(default="Un Def", max_length=200)),
                ("IssueListDes", models.CharField(max_length=500)),
                ("CategoryCode", models.CharField(default="goAML", max_length=30)),
                (
                    "CompletionDate",
                    models.CharField(default="1900-01-01", max_length=30),
                ),
                ("UserGroupCode", models.CharField(default="CMP", max_length=500)),
                (
                    "IssueListAdDate",
                    models.CharField(default="1900-01-01", max_length=30),
                ),
                (
                    "IssueListEdDate",
                    models.CharField(default="1900-01-01", max_length=30),
                ),
                ("IssueListImage", models.CharField(default="not Def", max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name="UserGroups",
            fields=[
                ("UserGroupId", models.AutoField(primary_key=True, serialize=False)),
                ("UserGroupCode", models.CharField(max_length=30, unique=True)),
                ("UserGroupDes", models.CharField(max_length=100)),
                (
                    "UserGroupCrDate",
                    models.CharField(default="1900-01-01", max_length=30),
                ),
                (
                    "UserGroupEditDate",
                    models.CharField(default="1900-01-01", max_length=30),
                ),
            ],
        ),
    ]
