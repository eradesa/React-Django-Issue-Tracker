#from django.conf.urls import url
from django.urls import path,include, re_path
from IssueTrackerApp import ac_views

from django.conf.urls.static import static
from django.conf import settings

# API End Points exposed to the Front End
urlpatterns=[
    re_path(r'^category$',ac_views.categoryApi),
    re_path(r'^category/([0-9]+)$',ac_views.categoryApi),
    re_path(r'^issue$',ac_views.issueApi),
    re_path(r'^issue/([0-9]+)$',ac_views.issueApi),

    re_path(r'^groups$',ac_views.groupApi),
    re_path(r'^groups/([0-9]+)$',ac_views.groupApi),

    re_path(r'^issue/savefile',ac_views.SaveFile)
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)