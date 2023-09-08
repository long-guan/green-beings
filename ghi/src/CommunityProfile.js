import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function CommunityProfile() {

    const [members, setMembers] = useState([]);
    const [events, setEvents] = useState([]);
    const [community, setCommunity] = useState({});
    const navigate = useNavigate();
    const { community_id } = useParams();

    async function fetchCommunity() {
        const url = `${process.env.REACT_APP_API_HOST}/api/communities/${community_id}`;
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setCommunity(data);
        };
    }

    async function fetchMembers() {
        const url = `${process.env.REACT_APP_API_HOST}/api/members/${community_id}`;
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setMembers(data);
        };
    }


    async function fetchEvents() {
        const url = `${process.env.REACT_APP_API_HOST}/api/events`;
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            const filteredEvents = data.filter((e) => e.community === parseInt(community_id));
            setEvents(filteredEvents);
        }
    };


    useEffect(() => {
        fetchCommunity();
        fetchMembers();
        fetchEvents();
    }, []);


    return(
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <h1>{community.name}</h1>
                        <div className="row">
                            <div className="col-md-6" style={{width: "100%"}}>
                                <h3>About This Community</h3>
                                <div className="p-4 card">
                                    <p className="font-italic mb-1">{community.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6" style={{ height: "300px" }}>
                                <h3>Upcoming Community Events</h3>
                                {events.map((event) => {
                                    return (
                                    <div className="card-deck" key={event.id}>
                                        <div className="card mb-4"  style={{width: "70%"}}>
                                            <div className="view overlay">
                                                {/* <img className="card-img-top"
                                                src={event.image}
                                                alt="Card image cap"/> */}
                                            </div>
                                            <div className="card-body" key={event.id}>
                                                <h4 className="card-title">{event.name}</h4>
                                                <p className="card-text">{event.description}</p>
                                                <button
                                                type="button"
                                                className="btn btn-primary btn-md"
                                                onClick={() => {
                                                    navigate(`/api/events/${event.id}`)
                                                }}>
                                                    Event Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4" style={{borderStyle: "solid"}}>
                        <table className="table">
                            <thead>
                                <tr
                                onClick={() => {
                                    navigate(`/api/members/${community_id}`)
                                }}>
                                    <th>Members</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.map(member => {
                                    return (
                                        <tr key={member.id}>
                                            <td>{member.first_name}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommunityProfile;
