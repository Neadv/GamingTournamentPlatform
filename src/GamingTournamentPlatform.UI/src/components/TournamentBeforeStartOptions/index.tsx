import { useAppDispatch, useAppSelector } from "hooks/redux";
import { TournamentRound } from "models/tournaments/TournamentRound";
import { TournamentStage } from "models/tournaments/TournamentStage";
import React, { FC, useState } from "react";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { tournamentActions } from "store/reducers/tournamentSlice";

type RoundDateType = {
    [K: number]: string;
};

const TournamentBeforeStartOptions: FC = () => {
    const [roundDate, setRoundDate] = useState<RoundDateType | null>(null);
    const { tournamentDetails } = useAppSelector((s) => s.tournament);
    const { user } = useAppSelector((s) => s.account);

    const dispatch = useAppDispatch();

    if (!tournamentDetails) return null;

    const isTeamTournament =
        tournamentDetails.category?.allowCreatingTeams === true;

    const isReadonly = user?.id !== tournamentDetails.organizerId;

    const getRounds = (stage: TournamentStage): TournamentRound[] =>
        isTeamTournament
            ? stage.tournamentTeamRounds
            : stage.tournamentUserRounds;

    if (!roundDate) {
        const newRoundDate: RoundDateType = {};
        tournamentDetails.stages.forEach((s) => {
            getRounds(s).forEach((r) => {
                if (!newRoundDate[r.id]) {
                    newRoundDate[r.id] = r.date;
                }
            });
        });
        setRoundDate(newRoundDate);
    }

    const getRoundDateValue = (id: number) => {
        if (roundDate && roundDate[id]) {
            return new Date(roundDate[id]);
        }
        return new Date();
    };

    const setRoundDateValue = (id: number, date: Date | null) => {
        if (roundDate) {
            const newRoundDate = { ...roundDate };
            newRoundDate[id] = date?.toISOString() ?? new Date().toISOString();
            setRoundDate(newRoundDate);
        }
    };

    const save = () => {
        if (roundDate) {
            Object.keys(roundDate).forEach((k) => {
                const id = Number(k);
                const date = roundDate[id];

                dispatch(
                    tournamentActions.updateRound({
                        tournamentId: tournamentDetails.id,
                        roundId: id,
                        date: date,
                        description: "",
                    })
                );
            });
        }
    };

    console.log(tournamentDetails);

    return (
        <div>
            <h4 className="text-center">Setup round dates</h4>
            {tournamentDetails.stages.map((s) => (
                <div key={s.id}>
                    <h4>{s.name}</h4>
                    {getRounds(s).map((r, index) => (
                        <div key={r.id} className="row align-items-center">
                            <div className="col-sm-2">Round {index + 1}:</div>
                            <div className="col">
                                <DatePicker
                                    dateFormat="dd/MM/yyyy HH:mm"
                                    timeFormat="HH:mm"
                                    showTimeSelect
                                    readOnly={isReadonly}
                                    selected={getRoundDateValue(r.id)}
                                    onChange={(date) =>
                                        setRoundDateValue(r.id, date)
                                    }
                                />
                            </div>
                        </div>
                    ))}
                </div>
            ))}
            {!isReadonly && (
                <div className="d-flex justify-content-end">
                    <Button variant="secondary me-2" onClick={save}>
                        Save
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() =>
                            dispatch(
                                tournamentActions.startTournament(
                                    tournamentDetails.id
                                )
                            )
                        }
                    >
                        Start tournament
                    </Button>
                </div>
            )}
        </div>
    );
};

export default TournamentBeforeStartOptions;
