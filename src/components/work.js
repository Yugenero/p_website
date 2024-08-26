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
		employer: "Georgia Tech Research Institute",
		location: "Atlanta, GA",
		date: "May 2021 - August 2021",
		title: "Software Engineer Intern",
        description: "As a Software Engineer Intern at the Georgia Tech Research Institute, I developed a Python-based web application for the U.S. Army to visualize and analyze data from the Army's tactical network. I designed and implemented a RESTful API to interface with the Army's tactical network, enabling the visualization of network data in real-time. Additionally, I collaborated with a team of engineers to develop a user-friendly interface for the web application, ensuring the successful delivery of the project to the U.S. Army."
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
            <div className="work_tabs_container">
                <Box sx={{ display: 'flex', flexGrow: 1, bgcolor: 'inherit', height: '100%' }}>
                    
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
                            width: '1000px',
                            color: 'var(--white)',
                            bgcolor: 'inherit', // Change background color
                            '& .MuiTabs-indicator': {
                                backgroundColor: 'var(--white)',
                            },
                        }}>
                        {workExperiences.map((experience, index) => (
                            <Tab key={index} label={experience.employer}/>
                        ))}
                    </MuiTabs>

                    {workExperiences.map((experience, index) => (
                        <TabPanel key={index} value={selectedTab} index={index} className="tab_panel">
                            <h2 className='experience_title'>{experience.title} @ {experience.employer}</h2>
                            <p className='experience_location'>{experience.date}</p>
                            <p className='experience_description'>{experience.description}</p>
                        </TabPanel>
                    ))}

                </Box>
            </div>
        </div>
    );
};

export default Work;