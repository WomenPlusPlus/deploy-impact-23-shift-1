from django.db import models


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