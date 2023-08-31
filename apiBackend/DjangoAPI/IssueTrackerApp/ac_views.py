from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from IssueTrackerApp.aa_models import Categories, UserGroups, IssueLists
from IssueTrackerApp.ab_serializers import  CategorySerializer, UserGroupSerializer, IssueListSerializer,CategoryUpdateSerializer,IssueListUpdateSerializer

from django.core.files.storage import default_storage

# API logics for specific types of APIs

@csrf_exempt
def categoryApi(request,id=0):
    if request.method=='GET':
        categories = Categories.objects.all()
        categories_serializer=CategorySerializer(categories,many=True)
        return JsonResponse(categories_serializer.data,safe=False)
    elif request.method=='POST':
        categories_data=JSONParser().parse(request)
        categories_serializer=CategorySerializer(data=categories_data)
        if categories_serializer.is_valid():
            categories_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        categories_data=JSONParser().parse(request)
        categories=Categories.objects.get(CategoryId=categories_data['CategoryId'])
        categories_serializer=CategoryUpdateSerializer(categories,data=categories_data)
        if categories_serializer.is_valid():
            categories_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
    elif request.method=='DELETE':
        category=Categories.objects.get(CategoryId=id)
        category.delete()
        return JsonResponse("Deleted Successfully",safe=False)

@csrf_exempt
def issueApi(request,id=0):
    if request.method=='GET':
        issueLists = IssueLists.objects.all()
        issueLists_serializer=IssueListSerializer(issueLists,many=True)
        return JsonResponse(issueLists_serializer.data,safe=False)
    elif request.method=='POST':
        issueLists_data=JSONParser().parse(request)
        issueLists_serializer=IssueListSerializer(data=issueLists_data)
        if issueLists_serializer.is_valid():
            issueLists_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        issueLists_data=JSONParser().parse(request)
        issueLists=IssueLists.objects.get(IssueListUiId=issueLists_data['IssueListUiId'])
        issueLists_serializer=IssueListUpdateSerializer(issueLists,data=issueLists_data)
        if issueLists_serializer.is_valid():
            issueLists_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update",safe=False)
    elif request.method=='DELETE':
        issueList=IssueLists.objects.get(IssueListUiId=id)
        issueList.delete()
        return JsonResponse("Deleted Successfully",safe=False)

@csrf_exempt
def groupApi(request,id=0):
    pass

@csrf_exempt
def SaveFile(request):
    file=request.FILES['file']
    file_name=default_storage.save(file.name,file)
    return JsonResponse(file_name,safe=False)