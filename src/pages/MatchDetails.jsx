
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
    fetchBetsAction,
    fetchFixtureDataAction,
    fetchLegsDataAction,
    fetchMarketDataAction,
} from '../redux_toolkit/betActions/betAction';

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function MatchDetails() {
    const [selectedMarket, setSelectedMarket] = useState(null);
    const [selectedLeg, setSelectedLeg] = useState(null);
    const [team, setTeam] = useState({});
    const { Match } = useParams();

    const dispatch = useDispatch();
    const { allFixtureData, betList, marketLists, legLists, loading } = useSelector((state) => state.fixture);

    useEffect(() => {
        const selected = allFixtureData?.find((obj) => obj.MatchId === Match);
        setTeam(selected);
    }, [allFixtureData, Match]);

    useEffect(() => {
        dispatch(fetchLegsDataAction());
        dispatch(fetchMarketDataAction());
    }, []);

    useEffect(() => {
        if (selectedMarket && selectedLeg) {
            dispatch(fetchBetsAction({ Match, selectedMarket: selectedMarket.MarketId, selectedLeg: selectedLeg.selectionId }));
        }
    }, [selectedMarket, selectedLeg]);

    useEffect(() => {
        if (!allFixtureData) {
            dispatch(fetchFixtureDataAction());
        }
    }, [allFixtureData]);

    const convertDate = (item) => {
        const dateTime = new Date(item);
        const month = monthNames[dateTime.getMonth()];
        const day = dateTime.getDate();
        const year = dateTime.getFullYear();
        const convertedDateTimeString = `${month} ${day}, ${year}`;
        return convertedDateTimeString;
    };

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <Link to="/" className="text-decoration-none text-light">
                        <button type="button" className="btn btn-danger">
                            <i className="bi bi-arrow-left"></i>
                        </button>
                    </Link>
                </div>
            </div>
            <div className="card">
                <div className="card-body bg-danger">
                    <h1 className="text-light">Make It A Bet Builder</h1>
                </div>
                <div className="card-body"></div>

                {team ? (
                    <>
                        <nav className="navbar navbar-expand-lg bg-dark text-light navbar-light sticky-top py-0 pe-5">
                            <div className="navbar-brand ps-5 me-0">
                                <div className="text-center text-light" style={{ marginLeft: "85px" }}>
                                    <strong>{convertDate(team?.MatchDate)}</strong>
                                    <br />
                                    <strong className="text-center">{team?.MatchTime?.substring(0, 5)}</strong>
                                </div>
                            </div>

                            <div className="collapse navbar-collapse" id="navbarCollapse">
                                <div style={{ marginLeft: "300px" }}>
                                    <h3 className="text-center">
                                        {team?.Team1Name} VS {team?.Team2Name}
                                    </h3>
                                    <h6 className="text-center">{team?.LeagueName}</h6>
                                </div>
                            </div>
                        </nav>
                    </>
                ) : (
                    <>
                        <div className="preloader-container">
                            <div className="preloader"></div>
                        </div>
                    </>
                )}
            </div>

            <div className="container mt-4">
                <div>
                    <div className="btn-group">
                        <strong>Market List:</strong>
                        <select onChange={(e) => setSelectedMarket(marketLists[e.target.selectedIndex])}>
                            {marketLists?.map((match, index) => (
                                <option key={match.MarketId} value={index}>
                                    {match.MarketName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="btn-group ms-5 mt-2">
                        <strong>Legs:</strong>
                        <select onChange={(e) => setSelectedLeg(legLists[e.target.selectedIndex])}>
                            {legLists?.map((leg, index) => (
                                <option key={leg.selectionId} value={index}>
                                    {leg.selectionId}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {betList ? <>

                <div className="container mt-5">
                    <h4>BetBuilder Bets Odds:</h4>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr className="alert alert-secondary text-danger">
                                    <th>Keys States</th>
                                    <th>Market</th>
                                    <th>Outcome</th>
                                </tr>
                            </thead>
                            <tbody>
                                {betList?.map((bet, index) => (
                                    <tr key={index}>
                                        <td>{bet.RTB}</td>
                                        <td>{bet.Market}</td>
                                        <td>{bet.Selection}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </>


                : <>
                    <div className="preloader-container">
                        <div className="preloader"></div>
                    </div>
                </>



            }
        </>
    );
}





