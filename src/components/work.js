import React, { useState } from 'react';
import { Tabs as MuiTabs, Tab, Box, Typography } from '@mui/material';
import './styles/work.css';

const workExperiences = [
    {
        employer: "Civic DX",
        location: "Atlanta, GA",
        date: "October 2024 - Present",
        title: "Software Engineer",
        point1: "Consulting, Software QA and Development for Civic DX.",
        point2: "Developing application for ABM Industries to facilitate management of ABM assets and facilities with React, JavaScript, C#, and MongoDB.",
        point3: "Spearheading Software QA and Testing for asset management application with AzureDevOps",
        description: "Developing internal tooling and Consulting for Civic DX. Currently developing an application for ABM Industries to facilitate the management of ABM assets and facilities using React.js, JavaScript, C#, and MongoDB."
    },
    {
        employer: "eKlozet",
        location: "Atlanta, GA",
        date: "January 2022 - December 2022",
        title: "Client-Facing Software Developer",
        point1: "Spearheaded backend development of eKlozet iOS app with SQL; serving 10,000+ users",
        point2: "Developed collaborative-filtering algorithm for personalized outfit recommendations",
        point3: "Designed and implemented SQL database for user CRUD functionality utilizing Git for version control",
        description: "As a Client-Facing Software Developer for eKlozet, I collaborated with a team of student developers to create a sustainable fashion iOS mobile app for client Tanjuria Willis. My contributions included developing a collaborative-filtering algorithm for personalized outfit recommendations and designing a SQL database to manage user CRUD functionality, ultimately serving 10,000+ users. Additionally, I proficiently used Git/GitHub for code versioning, playing a role in coordinating team responsibilities, ensuring the successful completion of sprints and feature delivery."
    },
    {
        employer: "GT WebDev",
        location: "Atlanta, GA",
        date: "August 2020 - May 2021",
        title: "Web Developer",
        point1: "Developed Material UI/UX features for collaborative HackGT web application in student-led teams",
        point2: "Managed code versioning to ensure seamless integration across app components",
        point3: "Organized and hosted front-end workshops resulting in 50% increase in attendance",
        description: "As a member of the Georgia Tech student organization GT WebDev, I contributed to the development of a collaborative web application by working with student-led teams. My responsibilities included developing Material UI/UX features and managing code versioning to ensure seamless integration across app components. Additionally, I organized and hosted multiple front-end workshops and seminars, resulting in a 50% increase in attendance."
    },
];

const TabPanel = ({ children, value, index, ...other }) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            className='tab_panel'
            {...other}>
            {value === index && ( 
                <Box className="content" sx={{display: 'flex', px: 2, maxWidth: 'calc(100%)' }}> 
                    <Typography>{children}</Typography> 
                </Box> 
            )}
        </div>
    );
};

const Work = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <div className="work_container">
            <div className="work_title">/experience</div>
            <div style={{ display: 'flex', width: '70%' }}>
                <MuiTabs
                    orientation="vertical"
                    variant="scrollable"
                    value={selectedTab}
                    onChange={(event, newValue) => setSelectedTab(newValue)}
                    aria-label="Vertical tabs"
                    textColor="inherit"
                    indicatorColor="secondary"
                    sx={{
                        borderRight: 1,
                        borderColor: 'divider',
                        width: '200px',
                        color: 'var(--white)',
                        fontFamily: 'var(--current-font)',
                        textAlign: 'left',
                        '& .MuiTabs-indicator': {
                            backgroundColor: 'var(--white)',
                        },
                        '@media (max-width: 750px)': {
                            orientation: 'horizontal',
                            width: '90px',
                        },
                    }}>
                    {workExperiences.map((experience, index) => (
                        <Tab key={index} label={experience.employer} 
                            sx={{ fontSize: '0.7em', 
                                fontFamily: {
                                    xs: 'var(--font-family-ibm-plex-mono)',
                                    lg: 'var(--font-family-inter)',
                                    xl: 'var(--font-family-inter)',
                                },
                                textTransform: 'none', 
                                justifyContent: 'flex-start',
                                alignItems: 'start',
                                borderTop: '1px solid var(--primary-color)',
                            }}/>
                    ))}
                </MuiTabs>

                <div className="work_tab_panel" style={{ flex: 1, paddingLeft: '20px', minHeight: '300px', position: 'relative' }}>
                    {workExperiences.map((experience, index) => (
                        <TabPanel key={index} value={selectedTab} index={index} className="tab_panel" 
                            style={{ 
                                width: '100%',
                                position: 'absolute', 
                                top: 0, 
                                left: '20px', 
                                right: 0, 
                                opacity: selectedTab === index ? 1 : 0, 
                                transition: 'opacity 0.3s ease-in-out'
                            }}>
                            <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <h2 className='experience_title'>{experience.title} @ {experience.employer}</h2>
                                <p className='experience_location'>{experience.date}</p>
                                <ul className='experience_description'>
                                    <li className='experience_point'>{experience.point1}</li>
                                    <li className='experience_point'>{experience.point2}</li>
                                    <li className='experience_point'>{experience.point3}</li>
                                </ul>
                            </div>
                        </TabPanel>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Work;