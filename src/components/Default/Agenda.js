import React, { Component } from 'react';
import AgendaItem from './AgendaItem';

const scheduleDays = [
    {day: "Tuesday", date: "September 21st, 2017",
    sessions: [
        { title: 'AWS Mobile Week', location: 'Walnut Room', time: '9:00 am - 11:00 am', color: '#009688' },
        { title: 'AWS Security Intro', location: 'Maple Valley Room', time: '11:00 am - 1:00 pm', color: '#2980b9' },
        { title: 'Lunch & Learn: Serverless for Developer', location: 'California Ave Room', time: '2:00 pm - 4:00 pm', color: '#009688' },
        { title: 'Mobile App Development with AWS', location: 'California Ave Room', time: '4:00 pm - 5:00 pm', color: '#009688' },
        { title: 'Amazon Cognito, Amazon Pinpoint, Ionic Framework', location: 'Walnut Room', time: '7:00 pm - 9:00 pm', color: '#2980b9' },
        { title: 'AWS Mobile Hub and AWS Device Farm Hands-on Workshops', location: 'Walnut Room', time: '10:00 pm - 11:00 pm', color: '#1043A0' }
    ]
    },
    {day: "Wednesday", date: "September 22nd, 2017",
    sessions: [
        { title: 'AWS Security Training & Preparation', location: 'Water Pavilion', time: '9:00 am - 11:00 am', color: '#2980b9' },
        { title: 'Introduction to AWS Security', location: 'California Ave Room', time: '11:00 am - 12:00 pm', color: '#1043A0' },
        { title: 'SecOps & Serverless', location: 'Walnut Room', time: '12:00 pm - 1:00 pm', color: '#2980b9' },
        { title: 'AWS Security Master Classes', location: 'Walnut Room', time: '1:00 pm - 3:00 pm', color: '#009688' },
        { title: 'Its Friday!', location: 'California Ave Room', time: '3:00 pm - 5:00 pm', color: '#009688' },
        { title: 'AWS Cost Optimization Workshop', location: 'Wisconsin Room', time: '5:00 pm - 7:00 pm', color: '#009688' },
        { title: 'Mobile Matters', location: 'California Ave Room', time: '7:00 pm - 9:00 pm', color: '#F19C00' },
        { title: 'Financing 101', location: 'Maple Valley Room', time: '10:00 pm - 11:00 pm', color: '#009688' }
    ]
    },
    {day: "Thursday", date: "September 23rd, 2017",
    sessions: [
        { title: 'Lightsail Hackathon', location: 'Maple Valley Room', time: '7:00 am - 9:00 am', color: '#F19C00' },
        { title: 'Closing the Loop on Data', location: 'Walnut Room', time: '10:00 am - 12:00 pm', color: '#F19C00' },
        { title: 'Computers Evolved', location: 'Maple Valley Room', time: '12:00 pm - 2:00 pm', color: '#2980b9' }
    ]
    },
    {day: "Friday", date: "September 24th, 2017",
    sessions: [
        { title: 'Skills, skills, and more skills', location: 'California Ave Room', time: '9:00 am - 11:00 am', color: '#009688' },
        { title: 'Amazon Athena Hands-on Lab', location: 'Walnut Room', time: '11:00 am - 12:00 pm', color: '#9b59b6' },
        { title: 'Alexa IoT Skills Workshop', location: 'Maple Valley Room', time: '4:00 pm - 5:00 pm', color: '#EB0011' },
        { title: 'Keynote Celebration with Jeff Bezos', location: 'Water Pavilion', time: '6:00 pm - 7:00 pm', color: '#9b59b6' }
    ]
    },
    {day: "Saturday", date: "September 25th, 2017",
    sessions: [
        { title: 'Morning Registration & Breakfast', location: 'Maple Valley Room', time: '9:00 am - 11:00 am', color: '#009688' },
        { title: 'Closing Keynote', location: 'Water Pavilion', time: '4:00 pm - 5:00 pm', color: '#EB0011' }
    ]
    }
];

const colors = ['#009688', '#F19C00', '#2980b9', '#1043A0', '#9b59b6', '#EB0011', '#F16600', '#f9f9f9', '#333333', '#f9cf25', '#1BC800', '#fe7fff'];

// STILL TODO:
// Assign colors to categories
// Agenda Days - Parse out day and dates from returned agenda object
// Agenda Items - Parse out dates from returned agenda object with: time duration

class Agenda extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dayIndex: 0,
            agendaDays: scheduleDays
        };

        this.switchDays = this.switchDays.bind(this);
    }

    // Switch agenda days
    switchDays(dir) {
        if (dir === 'L') {
            this.setState({ dayIndex: (this.state.dayIndex - 1) });
        } else if (dir === 'R') {
            this.setState({ dayIndex: (this.state.dayIndex + 1) })
        }
    }

    // Render sessions for specific day
    renderAgendaItems(sessions) {
        return sessions.map((session) => {
            return <AgendaItem {...session} key={session.title} />
        });
    }

    render() {
        const {dayIndex, agendaDays} = this.state;
        return (
            <div className="agenda">
                <div className="agenda-day">
                    <div className={"agenda-day-left agenda-arrow " + (dayIndex > 0 ? '' : ' invisible')} onClick={()=> this.switchDays('L')}>
                        <i className="material-icons">navigate_before</i>
                    </div>
                    <div className="agenda-day-center">
                        <div className="center-day">
                            { agendaDays[dayIndex].day }
                        </div>
                        <div className="center-date">
                            { agendaDays[dayIndex].date }
                        </div>
                    </div>
                    <div className={"agenda-day-right agenda-arrow " + (dayIndex < (agendaDays.length - 1) ? '' : ' invisible')} onClick={()=> this.switchDays('R')}>
                        <i className="material-icons">navigate_next</i>
                    </div>
                </div>
                <ul className="agenda-body">
                    { this.renderAgendaItems(agendaDays[dayIndex].sessions)}                    
                </ul>
            </div>
        );
    }    
}

export default Agenda;