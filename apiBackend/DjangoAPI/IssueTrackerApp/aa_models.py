from django.db import models
import datetime

# Database models.

class Categories(models.Model):
    CategoryId = models.AutoField(primary_key=True)
    CategoryCode = models.CharField(max_length=30 , unique=True)
    CategoryDes = models.CharField(max_length=100)
    CategoryCrDate = models.CharField(max_length=30, default='1900-01-01')
    CategoryEditDate = models.CharField(max_length=30, default='1900-01-01')

    #def __str__(self):
        #return  self.CategoryCode

class UserGroups(models.Model):
    UserGroupId = models.AutoField(primary_key=True)
    UserGroupCode = models.CharField(max_length=30, unique=True)
    UserGroupDes = models.CharField(max_length=100)
    UserGroupCrDate = models.CharField(max_length=30, default='1900-01-01')
    UserGroupEditDate = models.CharField(max_length=30, default='1900-01-01')
    
    #def __str__(self):
        #return  self.UserGroupCode

class IssueLists(models.Model):
    IssueListUiId = models.AutoField(primary_key=True)
    IssueListId = models.CharField(max_length=50, unique=True)
    IssuePriority = models.CharField(max_length=20, default='Critical')
    IssueListName = models.CharField(max_length=200, default='Un Def')
    IssueListDes = models.CharField(max_length=500)
    #CategoryId = models.ForeignKey(Categories, on_delete=models.CASCADE)
    CategoryCode = models.CharField(max_length=30, default='goAML')
    CompletionDate = models.CharField(max_length=30, default='1900-01-01')
    #UserGroupId = models.ForeignKey(UserGroups, on_delete=models.CASCADE)
    UserGroupCode = models.CharField(max_length=500, default='CMP')
    IssueListAdDate = models.CharField(max_length=30, default='1900-01-01')
    IssueListEdDate = models.CharField(max_length=30, default='1900-01-01')    
    IssueListImage = models.CharField(max_length=500, default='not Def')  
