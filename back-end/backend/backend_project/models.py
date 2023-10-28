from django.db import models

### ->python manage.py inspectdb<- find the model for each table in db !!

class Role(models.Model):
    role_id = models.BigAutoField(db_column='candidateID', primary_key=True)  # Field name made lowercase.
    name = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'role'

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
        db_table = 'user'


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
        db_table = 'job'

class ExpertiseCategories(models.Model):
    type = models.TextField(db_column='type', blank=True, null=True)  # Field name made lowercase. 
    class Meta:
        db_table = 'expertiseCategories'

class Expertise(models.Model):   
    expertise = models.ManyToManyField(ExpertiseCategories)
    years = models.IntegerField(blank=True, null=True)
    class Meta:
        db_table = 'expertise'


class Language(models.Model):
    level = models.IntegerField(blank=True, null=True)
    class Meta:
        db_table = 'language'

class Candidate(models.Model):
    candidate_id = models.BigAutoField(db_column='candidateID', primary_key=True)  # Field name made lowercase.
    users = models.ManyToManyField(User)
    jobs = models.ManyToManyField(Job)
    preferred_roles = models.ManyToManyField(Role)
    location = models.TextField(blank=True, null=True)
    relocation = models.BooleanField()
    expertise = models.ManyToManyField(Expertise)
    language = models.ManyToManyField(Language)
    education = models.TextField(db_column='educationHistory', blank=True, null=True)  # Field name made lowercase. 
    work_experience = models.TextField(db_column='workExperience', blank=True, null=True)  # Field name made lowercase.
    volunteer_experience = models.TextField(db_column='volunteerExperience', blank=True, null=True)  # Field name made lowercase.
    certification = models.TextField(blank=True, null=True)
    preferredjoblocations = models.TextField(db_column='preferredJobLocations', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        db_table = 'candidate'






