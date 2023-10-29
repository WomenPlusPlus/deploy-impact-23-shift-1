from django.db import models
from django.core.validators import MinValueValidator

### ->python manage.py inspectdb<- find the model for each table in db !!


class Role(models.Model):
    """
    A specific role in a company
    (i.e. Data Scientist, Prodject Manager).
    """

    name = models.TextField()

    class Meta:
        db_table = "role"


class User(models.Model):
    """
    A user of this application.
    Diffrent types of user have access to diffrent profiles,
    it can be personal access (i.g. to a candidate profile)
    or group acess (i.g. to an assosiation profile)
    """

    ADM = "admin"
    CND = "candidate"
    ASM = "assosiation_member"
    CPE = "company_employee"
    TYPE_CHOICES = [
        (ADM, ADM),
        (CND, CND),
        (ASM, ASM),
        (CPE, CPE),
    ]
    type = models.CharField(choices=TYPE_CHOICES, default=CND)
    username = models.TextField()
    password = models.TextField()
    name = models.TextField(blank=True, null=True)
    preffered_name = models.TextField(blank=True, null=True)
    email = models.TextField(blank=True, null=True)
    phone_number = models.TextField(blank=True, null=True)
    picture_url = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    terms_and_conditions = models.BooleanField()
    privacy_policy = models.BooleanField()
    registration_date = models.DateField(blank=True, null=True)
    last_access_date = models.DateField(blank=True, null=True)

    class Meta:
        db_table = "user"


class Language(models.Model):
    name = models.TextField()

    class Meta:
        db_table = "language"


class Expertise(models.Model):
    name = models.TextField()

    class Meta:
        db_table = "expertise"


class Job_Property(models.Model):
    icon_url = models.TextField(blank=True, null=True)
    name = models.TextField()
    INDUSTRY = "industry"
    VALUE = "value"
    LOCATION = "location"
    SIZE = "size"
    BENEFIT = "benefit"
    NOTICE_PERIOD = "notice_period"
    REFERENCE = "reference"
    TYPE_CHOICES = [
        (INDUSTRY, INDUSTRY),
        (VALUE, VALUE),
        (LOCATION, LOCATION),
        (SIZE, SIZE),
        (BENEFIT, BENEFIT),
        (NOTICE_PERIOD, NOTICE_PERIOD),
        (REFERENCE, REFERENCE),
    ]
    type = models.CharField(choices=TYPE_CHOICES)

    class Meta:
        db_table = "job_property"


class Company(models.Model):
    company_id = models.BigAutoField(primary_key=True)
    name = models.TextField(blank=True, null=True)
    website = models.TextField(blank=True, null=True)
    email = models.TextField(blank=True, null=True)
    contactnumber = models.TextField(blank=True, null=True)
    linkedin = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    registrationdate = models.DateField(blank=True, null=True)
    # industry = models.ManyToManyField(Industry)
    # value = models.ManyToManyField(Value)
    # worklocation = models.ManyToManyField(WorkLocation)
    # benefits = models.ManyToManyField(Benefit)
    language = models.ManyToManyField(Language)

    class Meta:
        db_table = "company"


class Job(models.Model):
    job_id = models.BigAutoField(primary_key=True)
    is_published = models.BooleanField()
    company_id = models.ForeignKey(Company, on_delete=models.CASCADE)
    title = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    location = models.TextField(blank=True, null=True)
    jobtype = models.TextField(blank=True, null=True)
    category = models.TextField(blank=True, null=True)
    salaryrange = models.TextField(blank=True, null=True)
    appplicationdeadline = models.DateField(blank=True, null=True)

    languages = models.ManyToManyField(
        Language,
        through="Language_Requirment",
        through_fields=("job", "language"),
    )
    expertises = models.ManyToManyField(
        Expertise,
        through="Job_Expertise",
        through_fields=("job", "expertise"),
    )
    determined_job_roperties = models.ManyToManyField(
        Job_Property,
        through="Determined_Job_Property",
        through_fields=("job", "job_property"),
    )

    class Meta:
        db_table = "job"


class Candidate(models.Model):
    """
    A candidate profile.
    """

    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    title = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    skills = models.TextField(blank=True, null=True)
    location = models.TextField(blank=True, null=True)
    relocation = models.BooleanField(default=False)
    education = models.TextField(blank=True, null=True)
    work_experience = models.TextField(blank=True, null=True)
    volunteer_experience = models.TextField(blank=True, null=True)
    courses = models.TextField(blank=True, null=True)
    preffered_roles = models.ManyToManyField(Role)

    languages = models.ManyToManyField(
        Language,
        through="Language_Knowledge",
        through_fields=("candidate", "language"),
    )
    expertises = models.ManyToManyField(
        Expertise,
        through="Candidate_Expertise",
        through_fields=("candidate", "expertise"),
    )
    desired_job_roperties = models.ManyToManyField(
        Job_Property,
        through="Desired_Job_Property",
        through_fields=("candidate", "job_property"),
    )

    jobs = models.ManyToManyField(Job)

    class Meta:
        db_table = "candidate"


class Language_Knowledge(models.Model):
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    BASIC = "basic"
    INTERMEDIATE = "intermediate"
    ADVANCED = "advanced"
    LEVEL_CHOICES = [
        (BASIC, BASIC),
        (INTERMEDIATE, INTERMEDIATE),
        (ADVANCED, ADVANCED),
    ]
    level = models.CharField(choices=LEVEL_CHOICES, blank=True, null=True)

    class Meta:
        db_table = "language_knowledge"


class Language_Requirment(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)

    class Meta:
        db_table = "language_requirment"


class Candidate_Expertise(models.Model):
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE)
    expertise = models.ForeignKey(Expertise, on_delete=models.CASCADE)
    years = models.IntegerField(
        blank=True, null=True, validators=[MinValueValidator(1)]
    )

    class Meta:
        db_table = "candidate_expertise"


class Job_Expertise(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    expertise = models.ForeignKey(Expertise, on_delete=models.CASCADE)
    years = models.IntegerField(
        blank=True, null=True, validators=[MinValueValidator(1)]
    )

    class Meta:
        db_table = "job_expertise"


class Desired_Job_Property(models.Model):
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE)
    job_property = models.ForeignKey(Job_Property, on_delete=models.CASCADE)

    class Meta:
        db_table = "desired_job_property"


class Determined_Job_Property(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    job_property = models.ForeignKey(Job_Property, on_delete=models.CASCADE)

    class Meta:
        db_table = "determined_job_property"
