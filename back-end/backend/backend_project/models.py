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

class ExpertiseCategory(models.Model):
    name = models.TextField(blank=True, null=True)  # Field name made lowercase. 
    class Meta:
        db_table = 'expertise_category'

class Expertise(models.Model):   
    expertise = models.ManyToManyField(ExpertiseCategory)
    years = models.IntegerField(blank=True, null=True)
    class Meta:
        db_table = 'expertise'

class LanguageCategory(models.Model):
    name = models.TextField(blank=True, null=True)
    class Meta:
        db_table = 'languagecategory'

class Language(models.Model):
    language = models.ManyToManyField(LanguageCategory)
    level = models.IntegerField(blank=True, null=True)
    class Meta:
        db_table = 'language'

class Industry(models.Model):
    name = models.TextField(blank=True, null=True)
    class Meta:
        db_table = 'industry'

class Value(models.Model):
    name = models.TextField(blank=True, null=True)
    class Meta:
        db_table = 'value'

class WorkLocation(models.Model):
    name = models.TextField(blank=True, null=True)
    class Meta:
        db_table = 'worklocation'

class Benefit(models.Model):
    name = models.TextField(blank=True, null=True)
    class Meta:
        db_table = 'benefit'


class Company(models.Model):
    company_id = models.BigAutoField(db_column='companyID', primary_key=True)  # Field name made lowercase.
    name = models.TextField(blank=True, null=True)
    website = models.TextField(blank=True, null=True)
    email = models.TextField(blank=True, null=True)
    contactnumber = models.TextField(db_column='contactNumber', blank=True, null=True)  # Field name made lowercase.
    linkedin = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    registrationdate = models.DateField(db_column='registrationDate', blank=True, null=True)  # Field name made lowercase.
    #industry = models.ManyToManyField(Industry)
    #value = models.ManyToManyField(Value)
    #worklocation = models.ManyToManyField(WorkLocation)
    #benefits = models.ManyToManyField(Benefit)
    #language = models.ManyToManyField(Language)
    
    class Meta:
        db_table = 'company'


class Job(models.Model):
    job_id = models.BigAutoField(db_column='jobID', primary_key=True)  # Field name made lowercase.
    is_published = models.BooleanField()
    company_id = models.ForeignKey(Company, on_delete=models.CASCADE)
    title = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)    
    location = models.TextField(blank=True, null=True)
    #expertise = models.ManyToManyField(Expertise)
    #language = models.ManyToManyField(Language)
    #expertise = models.ManyToManyField(ExpertiseCategory)
    #language = models.ManyToManyField(LanguageCategory)
    #worklocation = models.ManyToManyField(WorkLocation)

    jobtype = models.TextField(db_column='jobType', blank=True, null=True)  # Field name made lowercase.
    category = models.TextField(blank=True, null=True)
    salaryrange = models.TextField(db_column='salaryRange', blank=True, null=True)  # Field name made lowercase.
    appplicationdeadline = models.DateField(db_column='appplicationDeadline', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        db_table = 'job'

class Candidate(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    location = models.TextField(blank=True, null=True)
    relocation = models.BooleanField(blank=True, null=True)
    education = models.TextField(blank=True, null=True)
    work_experience = models.TextField(blank=True, null=True)
    volunteer_experience = models.TextField(blank=True, null=True)
    courses = models.TextField(blank=True, null=True)
    preffered_roles = models.ManyToManyField(Role, blank=True)
    
    jobs = models.ManyToManyField(Job, blank=True)
    expertise = models.ManyToManyField(Expertise, blank=True)
    language = models.ManyToManyField(Language, blank=True)
    
    class Meta:
        db_table = 'candidate'






