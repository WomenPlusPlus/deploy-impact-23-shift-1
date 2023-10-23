from django.db import models

### ->python manage.py inspectdb<- find the model for each table in db !!

class Candidate(models.Model):
    candidateid = models.BigAutoField(db_column='candidateID', primary_key=True)  # Field name made lowercase.
    userid = models.BigIntegerField(db_column='userID')  # Field name made lowercase.
    jobid = models.BigIntegerField(db_column='jobID')  # Field name made lowercase.
    headline = models.TextField(blank=True, null=True)
    skills = models.TextField(blank=True, null=True)  # This field type is a guess.
    educationhistory = models.TextField(db_column='educationHistory', blank=True, null=True)  # Field name made lowercase. This field type is a guess.
    workexperience = models.TextField(db_column='workExperience', blank=True, null=True)  # Field name made lowercase.
    certification = models.TextField(blank=True, null=True)
    volunteering = models.TextField(blank=True, null=True)
    preferredjoblocations = models.TextField(db_column='preferredJobLocations', blank=True, null=True)  # Field name made lowercase. This field type is a guess.
    resume = models.TextField(blank=True, null=True)
    jobapplications = models.TextField(db_column='jobApplications', blank=True, null=True)  # Field name made lowercase. This field type is a guess.

    class Meta:
        managed = False
        db_table = 'candidate'


class Job(models.Model):
    jobid = models.BigAutoField(db_column='jobID', primary_key=True)  # Field name made lowercase.
    companyid = models.BigIntegerField(db_column='companyID')  # Field name made lowercase.
    associationid = models.BigIntegerField(db_column='associationID')  # Field name made lowercase.
    title = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    jobtype = models.TextField(db_column='jobType', blank=True, null=True)  # Field name made lowercase.
    category = models.TextField(blank=True, null=True)
    location = models.TextField(blank=True, null=True)
    salaryrange = models.TextField(db_column='salaryRange', blank=True, null=True)  # Field name made lowercase.
    appplicationdeadline = models.DateField(db_column='appplicationDeadline', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'job'


class User(models.Model):
    userid = models.BigAutoField(db_column='userID', primary_key=True)  # Field name made lowercase.
    username = models.TextField()
    password = models.TextField()
    email = models.TextField(blank=True, null=True)
    firstname = models.TextField(db_column='firstName', blank=True, null=True)  # Field name made lowercase.
    lastname = models.TextField(db_column='lastName', blank=True, null=True)  # Field name made lowercase.
    contactnumber = models.TextField(db_column='contactNumber', blank=True, null=True)  # Field name made lowercase.
    profilepicture = models.TextField(db_column='profilePicture', blank=True, null=True)  # Field name made lowercase. This field type is a guess.
    registrationdate = models.DateField(db_column='registrationDate', blank=True, null=True)  # Field name made lowercase.
    usertype = models.TextField(db_column='userType', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'user'
        