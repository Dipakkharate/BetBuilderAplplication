
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [dateRange, setDateRange] = useState([]);
    const [fixtureMap, setFixtureMap] = useState([]);
    const [selectDate, setSelectDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [months] = useState(['Jan', 'Feb', 'March', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]);

    useEffect(() => {
        const today = new Date();
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(today.getDate() + i);
            dates.push(date.toDateString());
        }
        setSelectDate(
            `${months.indexOf(dates[0].split(' ')[1]) + 1}/${dates[0].split(' ')[2]}/${dates[0].split(' ')[3]}`
        );
        setDateRange(dates);
    }, []);

    useEffect(() => {
        const getFixtures = async () => {
            try {
                const { data } = await axios.get('http://cms.bettorlogic.com/api/BetBuilder/GetFixtures?sports=1');
                console.log(data, "my");
                const processData = data.filter((item) => item.MatchDate.split(' ')[0] === selectDate);
                // const processData = data.filter((item) => item.MatchId === "7/1/2023 12:00:00 AM");
                console.log(processData);
                setFixtureMap(processData);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        getFixtures();
    }, [selectDate]);

    let previousCountry = '';

    return (
        <div className='container'>

            <div className="text-center">
                {dateRange.map((date, index) => (
                    <button
                        onClick={() => {
                            let day = date.split(' ')[2]
                            if (day < 10) {
                                day = day.toString().split("")[1]
                                console.log(day);
                            }

                            setSelectDate(
                                `${months.indexOf(date.split(' ')[1]) + 1}/${day}/${date.split(' ')[3]}`
                            );

                        }}
                        className="alert alert-secondary rounded"
                        key={index}
                    >
                        {date}
                    </button>
                ))}
            </div>

            {loading && (
                <div className="preloader-container">
                    <div className="preloader"></div>
                </div>
            )}

            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm-6 offset-3">
                        <div>
                            <strong>⚽ Football</strong>
                        </div>

                        <div className="card text-center mt-3">
                            {fixtureMap.map((match) => {
                                const countryCell =
                                    match.Country === previousCountry ? null : (
                                        <div className="card-header mt-4 bg-danger text-light">{match.LeagueName}</div>
                                    );
                                previousCountry = match.Country;
                                return (
                                    <>

                                        {countryCell}
                                        <div className="light-silver card-body">
                                            <div>
                                                <Link to={`/match-details/${match?.MatchId}`} className="text-decoration-none text-dark">
                                                    {match?.Team1Name} {match?.MatchTime?.substring(0, 5)} {match?.Team2Name}
                                                </Link>
                                            </div>
                                            <hr />
                                        </div>
                                    </>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

