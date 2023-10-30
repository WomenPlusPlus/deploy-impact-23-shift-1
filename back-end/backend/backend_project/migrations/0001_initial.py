# Generated by Django 4.2.5 on 2023-10-29 13:24

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('company_id', models.BigAutoField(primary_key=True, serialize=False)),
                ('name', models.TextField(blank=True, null=True)),
                ('website', models.TextField(blank=True, null=True)),
                ('email', models.TextField(blank=True, null=True)),
                ('contactnumber', models.TextField(blank=True, null=True)),
                ('linkedin', models.TextField(blank=True, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('registrationdate', models.DateField(blank=True, null=True)),
            ],
            options={
                'db_table': 'company',
            },
        ),
        migrations.CreateModel(
            name='Determined_Job_Property',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'db_table': 'determined_job_property',
            },
        ),
        migrations.CreateModel(
            name='Expertise',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
            ],
            options={
                'db_table': 'expertise',
            },
        ),
        migrations.CreateModel(
            name='Job',
            fields=[
                ('job_id', models.BigAutoField(primary_key=True, serialize=False)),
                ('is_published', models.BooleanField()),
                ('title', models.TextField(blank=True, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('location', models.TextField(blank=True, null=True)),
                ('jobtype', models.TextField(blank=True, null=True)),
                ('category', models.TextField(blank=True, null=True)),
                ('salaryrange', models.TextField(blank=True, null=True)),
                ('appplicationdeadline', models.DateField(blank=True, null=True)),
                ('company_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend_project.company')),
            ],
            options={
                'db_table': 'job',
            },
        ),
        migrations.CreateModel(
            name='Job_Property',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('icon_url', models.TextField(blank=True, null=True)),
                ('name', models.TextField()),
                ('type', models.CharField(choices=[('industry', 'industry'), ('value', 'value'), ('location', 'location'), ('size', 'size'), ('benefit', 'benefit'), ('notice_period', 'notice_period'), ('reference', 'reference')])),
            ],
            options={
                'db_table': 'job_property',
            },
        ),
        migrations.CreateModel(
            name='Language',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
            ],
            options={
                'db_table': 'language',
            },
        ),
        migrations.CreateModel(
            name='Role',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
            ],
            options={
                'db_table': 'role',
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(choices=[('admin', 'admin'), ('candidate', 'candidate'), ('assosiation_member', 'assosiation_member'), ('company_employee', 'company_employee')], default='candidate')),
                ('username', models.TextField()),
                ('password', models.TextField()),
                ('name', models.TextField(blank=True, null=True)),
                ('preffered_name', models.TextField(blank=True, null=True)),
                ('email', models.TextField(blank=True, null=True)),
                ('phone_number', models.TextField(blank=True, null=True)),
                ('picture_url', models.TextField(blank=True, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('terms_and_conditions', models.BooleanField()),
                ('privacy_policy', models.BooleanField()),
                ('registration_date', models.DateField(blank=True, null=True)),
                ('last_access_date', models.DateField(blank=True, null=True)),
            ],
            options={
                'db_table': 'user',
            },
        ),
        migrations.CreateModel(
            name='Candidate',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='backend_project.user')),
                ('location', models.TextField(blank=True, null=True)),
                ('relocation', models.BooleanField(default=False)),
                ('education', models.TextField(blank=True, null=True)),
                ('work_experience', models.TextField(blank=True, null=True)),
                ('volunteer_experience', models.TextField(blank=True, null=True)),
                ('courses', models.TextField(blank=True, null=True)),
            ],
            options={
                'db_table': 'candidate',
            },
        ),
        migrations.CreateModel(
            name='Language_Requirment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('job', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend_project.job')),
                ('language', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend_project.language')),
            ],
            options={
                'db_table': 'language_requirment',
            },
        ),
        migrations.CreateModel(
            name='Job_Expertise',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('years', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(1)])),
                ('expertise', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend_project.expertise')),
                ('job', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend_project.job')),
            ],
            options={
                'db_table': 'job_expertise',
            },
        ),
        migrations.AddField(
            model_name='job',
            name='determined_job_roperties',
            field=models.ManyToManyField(through='backend_project.Determined_Job_Property', to='backend_project.job_property'),
        ),
        migrations.AddField(
            model_name='job',
            name='expertises',
            field=models.ManyToManyField(through='backend_project.Job_Expertise', to='backend_project.expertise'),
        ),
        migrations.AddField(
            model_name='job',
            name='languages',
            field=models.ManyToManyField(through='backend_project.Language_Requirment', to='backend_project.language'),
        ),
        migrations.AddField(
            model_name='determined_job_property',
            name='job',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend_project.job'),
        ),
        migrations.AddField(
            model_name='determined_job_property',
            name='job_property',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend_project.job_property'),
        ),
        migrations.AddField(
            model_name='company',
            name='language',
            field=models.ManyToManyField(to='backend_project.language'),
        ),
        migrations.CreateModel(
            name='Language_Knowledge',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('level', models.CharField(blank=True, choices=[('basic', 'basic'), ('intermediate', 'intermediate'), ('advanced', 'advanced')], null=True)),
                ('language', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend_project.language')),
                ('candidate', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend_project.candidate')),
            ],
            options={
                'db_table': 'language_knowledge',
            },
        ),
        migrations.CreateModel(
            name='Desired_Job_Property',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('job_property', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend_project.job_property')),
                ('candidate', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend_project.candidate')),
            ],
            options={
                'db_table': 'desired_job_property',
            },
        ),
        migrations.CreateModel(
            name='Candidate_Expertise',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('years', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(1)])),
                ('expertise', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend_project.expertise')),
                ('candidate', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend_project.candidate')),
            ],
            options={
                'db_table': 'candidate_expertise',
            },
        ),
        migrations.AddField(
            model_name='candidate',
            name='desired_job_roperties',
            field=models.ManyToManyField(through='backend_project.Desired_Job_Property', to='backend_project.job_property'),
        ),
        migrations.AddField(
            model_name='candidate',
            name='expertises',
            field=models.ManyToManyField(through='backend_project.Candidate_Expertise', to='backend_project.expertise'),
        ),
        migrations.AddField(
            model_name='candidate',
            name='jobs',
            field=models.ManyToManyField(to='backend_project.job'),
        ),
        migrations.AddField(
            model_name='candidate',
            name='languages',
            field=models.ManyToManyField(through='backend_project.Language_Knowledge', to='backend_project.language'),
        ),
        migrations.AddField(
            model_name='candidate',
            name='preffered_roles',
            field=models.ManyToManyField(to='backend_project.role'),
        ),
    ]
