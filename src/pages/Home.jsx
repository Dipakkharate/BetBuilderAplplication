
import React, { useEffect, useState } from 'react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchFixtureDataAction } from '../redux_toolkit/betActions/betAction';

const Home = () => {

    const dispatch = useDispatch()
    const { allFixtureData, loading } = useSelector(state => state.fixture)
    const [dateRange, setDateRange] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [selectDate, setSelectDate] = useState('');


    const [months] = useState(['Jan', 'Feb', 'March', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);

    useEffect(() => {
        const today = new Date();
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(today.getDate() + i);
            dates.push(date.toDateString());
        }

        setDateRange(dates);
    }, []);

    useMemo(() => {
        if (allFixtureData) {
            const processData = allFixtureData?.filter((item) => item.MatchDate.split(' ')[0] === selectDate);
            setFilterData(processData);
        }
    }, [selectDate])


    useEffect(() => {
        dispatch(fetchFixtureDataAction())
    }, []);

    let previousLeagueName = '';

    return (
        <div className='container'>
            <div className="text-center">
                {dateRange.map((date, index) => (
                    <button
                        onClick={() => {

                            let day = date.split(' ')[2]
                            if (day < 10) {
                                day = day.toString().split("")[1]
                            }
                            setSelectDate(`${months.indexOf(date.split(' ')[1]) + 1}/${day}/${date.split(' ')[3]}`);
                            // 7/3/2023
                        }}
                        className="alert alert-secondary"
                        key={index}
                    >
                        {date}
                    </button>
                ))}
            </div>

            {loading ? <>
                <div className="preloader-container">
                    <div className="preloader"></div>
                </div>
            </>
                : <>
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col-sm-6 offset-3">
                                <div>
                                    <strong>⚽ Football</strong>
                                </div>

                                <div className="card text-center mt-3">
                                    {filterData?.map((match) => {
                                        const countryCell =
                                            match.LeagueName === previousLeagueName ? null : (
                                                <div className="card-header mt-4 bg-danger text-light">{match.LeagueName}</div>
                                            );
                                        previousLeagueName = match.LeagueName;
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

                </>
            }


        </div>
    );
};

export default Home;

