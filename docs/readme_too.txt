We chose supabase because it had the ready to use authentication, database and 
storage services all in the same neat package. Authentication seemed easy to use 
and it also had a ready to use functionality for email inviting the users to the 
platform, which was a requirement.

For the frontend we chose typescrypt react, because the front end teammembers were 
familiar with react and wanted to learn typescript front end and we did not want 
everything to be all new for us. And typescript was a requirement, as react was 
recommendation.

For the backend we chose Django/python, because our backend lead recommended Django 
and was familiar with, also because the data science part was to be implemented in 
python. In retrospect I did not feel that Django was perhaps mature enough compared 
to some other frameworks that feel more straightforward/troubless to use.

Front end data security is in pretty good shape thanks to supabase authentication and 
the sidebar/routing we created that allowes each role user access to only the pages 
they need. Sidebar is easy to configure for more menu items without having to write 
more actual code. One thing to be addressed there is the strong password checking.

Backend data security is almost nonexistent and needs to be addressed asap. We lost 
the authentication token, when our backend lead rewrote the code from sqlite to 
postgresql and we did not have time to recode that yet, as we lost our backend lead. 
Also it needs a system to control which data is accessible for who, as the frontend as.

Error handling also needs to be addressed asap with some kind of global system. And 
it needs more conformative look and feel and use of same components as well as 
functionality is still not quite adequate even for MVP. We did not have time to 
utilize the UI design and our figma wireframes enough. Also accepting and availability 
of privacy policy and terms and conditions is not implemented yet. Which is important 
to be addressed asap.

API is somewhat documented in the test.rest and matching_test.rest files.
Also we have some initial data in the fixtures/initial_data.json file and some test
data for the matching process in the matching_test.rest file.

We have automatic deployment, which is although currently a bit broken as something
(assumably the matching process model file) takes more space than we are allotted in
our hosting provider.

The matching process uses real data from the database and has it's own api endpoint
in the backend. We did not have time to implement the storing of the matching results,
which we wanted to do in order to retrain the model in the future with actual data
for improved accuracy.

Matching process uses either word2vec-google-news-300.gensim or 
glove-wiki-gigaword-100.gensim model to create the matching scores between jobs
and candidates.

Once the first admin user is created through the process described in the readme file
all the other users can be invited to the platform by the invite page in the ui.
They can sign up for the platform using the link they receive in the invite email
Each role has slightly different functionalities (limited so far):
Admin can invite.
Association can also invite.
Company user can view Jobs and edit / (add new ones).
Candidate has the profile page with limited functionality and very basic match me -
functionality under the MatchMe -button.

The invitation email templates can be modified in supabase dashboard under 
Authentication / Email Templates