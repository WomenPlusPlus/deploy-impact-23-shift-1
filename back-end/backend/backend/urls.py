"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import re_path, path, include

from backend_project import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", views.homepage),
    re_path("login/", views.login),
    re_path("signup/", views.signup),
    re_path("get_users/", views.get_users),
    re_path("delete_user/", views.delete_user),
    re_path("delete_users/", views.delete_users),
    # re_path("test_token/", views.test_token),
    re_path("post_candidate_profile/", views.create_candidate_profile),
    re_path("get_candidates/", views.get_candidates),
    re_path("get_candidate_details/", views.get_candidate_details),
    re_path("post_company/", views.create_company),
    re_path("get_companies/", views.get_companies),
    re_path("get_jobs/", views.get_jobs),
    re_path("post_job", views.create_job),
    re_path("update_job/", views.update_job),
    # re_path("match_candidate/", views.match_candidate),
    re_path("match_candidate_post/", views.match_candidate_post),
    re_path("match_job_company/", views.match_job_company),
    re_path("match_job_candidate_post/", views.match_job_candidate_post),
]
