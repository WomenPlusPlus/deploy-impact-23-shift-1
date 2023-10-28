from django.db import models

### ->python manage.py inspectdb<- find the model for each table in db !!

class Role(models.Model):
    role_id = models.BigAutoField(db_column='candidateID', primary_key=True)  # Field name made lowercase.
    name = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'role'

class User(models.Model):
    user_id = models.BigAutoField(primary_key=True)
    user_type = models.TextField(blank=True, null=True)
    username = models.TextField()
    password = models.TextField()
    name = models.TextField(blank=True, null=True)
    preffered_name = models.TextField(blank=True, null=True)
    email = models.TextField(blank=True, null=True)
    phone_number = models.TextField(blank=True, null=True)
    image_url = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    terms_and_conditions = models.BooleanField()
    privacy_policy = models.BooleanField()
    registration_date = models.DateField(blank=True, null=True)
    last_access_date = models.DateField(blank=True, null=True)

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
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    location = models.TextField(blank=True, null=True)
    relocation = models.BooleanField()
    education = models.TextField(blank=True, null=True)
    work_experience = models.TextField(blank=True, null=True)
    volunteer_experience = models.TextField(blank=True, null=True)
    courses = models.TextField(blank=True, null=True)
    preffered_roles = models.ManyToManyField(Role)
    
    jobs = models.ManyToManyField(Job)
    expertise = models.ManyToManyField(Expertise)
    language = models.ManyToManyField(Language)
    
    class Meta:
        db_table = 'candidate'






