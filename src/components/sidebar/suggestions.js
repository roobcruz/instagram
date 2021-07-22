import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { getSuggestedProfiles } from '../../services/firebase';
import SuggestedProfile from './suggested-profile';

const Suggestions = ({ userId, following }) => {
    const [profiles, setProfiles] = useState(null);

    // go and get the suggested profiles
    useEffect(() => {
        const suggestedProfiles = async () => {
            const response = await getSuggestedProfiles(userId, following);
            setProfiles(response);
        }

        // console.log('userId in suggestions.js', userId);
        if (userId) {
            suggestedProfiles();
        }

        console.log('Suggested profiles', profiles);
    }, [userId]);
    // use the firebase service (call using userId)
    // getSuggestedProfiles
    // call the async func ^^^ within useEffect/when comp is rendered
    // store in state
    // go and render (wait on the profiles as in 'skeleton')
    console.log('Suggested profiles again', profiles);
    return !profiles ? (
        <Skeleton count={10} height={150} className="mt-5" />
    ) : profiles.length > 0 ? (
        <div className="rounded flex flex-col">
            <div className="text-sm flex items-center align-items justify-between mb-2">
                <p className="font-bold text-gray-base">Suggestions for you</p>
            </div>
            {
                console.log('prof in return', profiles)
            }
            <div className="mt-4 grid gap-5">
                { profiles.map((profile) => (
                    <SuggestedProfile 
                        key={profile.docId}
                        profileDocId={profile.docId}
                        username={profile.username}
                        profileId={profile.userId}
                        userId={userId}
                        />
                ))}
            </div>
        </div>
    ) : (null)
}

export default Suggestions

Suggestions.propTypes = {
    userId: PropTypes.string,
    following: PropTypes.array
}