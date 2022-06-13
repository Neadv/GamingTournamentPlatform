import UserDetailsInfo from "components/UserDetailsInfo";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import React, { FC, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { userActions } from "store/reducers/userSlice";

const UserInfo: FC = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((s) => s.user);

    useEffect(() => {
        dispatch(userActions.loadUserById(Number(id)));
    }, [id]);

    return (
        <Card>
            <Card.Body>
                <Card.Title className="text-center">User #{id}</Card.Title>
                <div className="mt-3">
                    {user && (
                        <UserDetailsInfo user={user}>Test</UserDetailsInfo>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};

export default UserInfo;
