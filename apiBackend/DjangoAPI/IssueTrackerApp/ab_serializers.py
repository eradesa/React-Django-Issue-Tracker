from rest_framework import serializers
from IssueTrackerApp.aa_models import Categories, UserGroups, IssueLists

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Categories 
        fields=('CategoryId','CategoryCode','CategoryDes','CategoryCrDate','CategoryEditDate')
        #fields=('CategoryId','CategoryCode','CategoryDes')

# Update Serializer for Categories
class CategoryUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model=Categories 
        fields=('CategoryId','CategoryDes','CategoryEditDate')
        #fields=('CategoryId','CategoryCode','CategoryDes')

class UserGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserGroups 
        fields=('UserGroupId','UserGroupCode','UserGroupDes','UserGroupCrDate','UserGroupEditDate')

class IssueListSerializer(serializers.ModelSerializer):
    class Meta:
        model=IssueLists 
        fields=('IssueListUiId','IssueListId','IssuePriority','IssueListName','IssueListDes','CategoryCode','CompletionDate','UserGroupCode','IssueListAdDate','IssueListImage')

# Update Serializer for Issues
class IssueListUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model=IssueLists 
        fields=('IssueListUiId','IssuePriority','IssueListName','IssueListDes','CategoryCode','CompletionDate','UserGroupCode','IssueListEdDate','IssueListImage')