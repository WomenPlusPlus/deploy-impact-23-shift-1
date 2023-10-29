const CandidateProfileData = {
    candidate_id: 2,
    name: 'Siddhesh Habtemichael',
    isNameVisible: true,
    prefferedName: 'Sid',
    isPrefferedNameVisible: true,
    email: 'siddxd@mail.com',
    isEmailVisible: true,
    phoneNumber: '+41785551834',
    isPhoneNumberVisible: false,
    summary:
        'Lorem ipsum dolor sit amet consectetur. Erat auctor a aliquam vel congue luctus. Leo diam cras neque mauris ac arcu elit ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Erat auctor a aliquam vel congue luctus. Leo diam cras neque mauris ac arcu elit ipsum dolor sit amet consectetur.',
    termsAndConditions: true,
    privacyPolicy: true,
    expertise: [
        { name: 'UX design', years: 3, isVisible: true },
        { name: 'UX research', years: 2, isVisible: true },
    ],
    languages: [
        { name: 'Arabic', level: 'Advanced', isVisible: false },
        { name: 'English', level: 'Advanced', isVisible: true },
        { name: 'French', level: 'Intermediate', isVisible: true },
    ],
    jobInterests: {
        industry: [{ name: 'Healthcare' }, { name: 'Science' }],
        values: [{ name: 'Sustainability' }, { name: 'Diversity' }],
        workType: [{ name: 'Sustainability' }, { name: 'Diversity' }],
        companySize: [{ name: 'Start-up' }, { name: '0 - 50' }],
        benefits: [{ name: 'Events' }, { name: 'Fruits' }],
        noticePeriod: [{ name: 'None' }, { name: '1-2 weeks' }],
        references: [{ name: 'women++' }, { name: 'Steve Jobs' }],
    },
};

export default CandidateProfileData;
