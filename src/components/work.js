import React, { useState } from 'react';
import { Tabs as MuiTabs, Tab, Box, Typography } from '@mui/material';
import './styles/work.css';

const workExperiences = [
    {
        employer: "eKlozet",
        location: "Atlanta, GA",
        date: "August 2022 - December 2022",
        title: "Client-Facing Software Developer",
        description: "As a Client-Facing Software Developer for eKlozet, I collaborated with a team of student developers to create a sustainable fashion iOS mobile app for client Tanjuria Willis. My contributions included developing a collaborative-filtering algorithm for personalized outfit recommendations and designing a SQL database to manage user CRUD functionality, ultimately serving 10,000+ users. Additionally, I proficiently used Git/GitHub for code versioning, playing a role in coordinating team responsibilities, ensuring the successful completion of sprints and feature delivery."
    },
    {
        employer: "GT WebDev",
        location: "Atlanta, GA",
        date: "August 2020 - May 2021",
        title: "Web Developer",
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
                            sx={{ fontSize: '0.7em', fontFamily: 'var(--current-font)', textTransform: 'none' }}/>
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
                                <p className='experience_description'>{experience.description}</p>
                            </div>
                        </TabPanel>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Work;