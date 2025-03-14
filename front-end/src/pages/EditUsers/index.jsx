import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { faPlus, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import NavigationHeader from '../../components/ui/NavigationHeader';
import IconButton from '../../components/ui/IconButton';
import AddUserTable, { createUser } from '../../components/ui/AddUserTable';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import './style.css';

function EditUsers() {
    const navigate = useNavigate();
    const [groupID, setGroupID] = useState(null); // Fetch groupID from localStorage
    const [groupName, setGroupName] = useState('');
    const [teams, setTeams] = useState([]);
    const [creators, setCreators] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState('');
    const [creatorEmail, setCreatorEmail] = useState('');
    const [creatorPermissions, setCreatorPermissions] = useState({
        canSeeResponses: true,
        canViewGroup: true,
        canEditForm: true,
        canDeleteForm: true,
    });
    const [responders, setResponders] = useState([]);
    const [responderEmail, setResponderEmail] = useState('');

    useEffect(() => {
        // Fetch groupID from localStorage
        const storedGroupID = localStorage.getItem('groupID');
        if (storedGroupID) {
            setGroupID(storedGroupID);
            fetchGroupName(storedGroupID);
            fetchTeams(storedGroupID);
            fetchCreators(storedGroupID);
            fetchResponders(storedGroupID);
        } else {
            console.error('No groupID found in local storage.');
        }
    }, []);

    const fetchGroupName = async (groupID) => {
        try {
            const response = await fetch(`https://api.peerfeedback.betbet.website/groups/groupname/${groupID}`);
            if (!response.ok) throw new Error('Failed to fetch group name');
            const data = await response.json();
            setGroupName(data.GroupName);
        } catch (error) {
            console.error('Error fetching group name:', error);
        }
    };

    const fetchCreators = async (groupID) => {
        try {
            const response = await fetch(`https://api.peerfeedback.betbet.website/users/getCreators/${groupID}`);
            if (!response.ok) throw new Error('Failed to fetch creators');
            const data = await response.json();
            const fetchedCreators = data.map((user) =>
                createUser(user.FirstName, user.LastName, user.UserEmail)
            );
            setCreators(fetchedCreators);
        } catch (error) {
            console.error('Error fetching creators:', error);
        }
    };

    const fetchResponders = async (groupID) => {
        try {
            const response = await fetch(`https://api.peerfeedback.betbet.website/users/getResponders/${groupID}`);
            if (!response.ok) throw new Error('Failed to fetch responders');
            const data = await response.json();
            const fetchedResponder = data.map((user) =>
                createUser(user.FirstName, user.LastName, user.UserEmail, user.TeamName)
            );
            setResponders(fetchedResponder);
        } catch (error) {
            console.error('Error fetching responders:', error);
        }
    };

    const fetchTeams = async (groupID) => {
        try {
            const response = await fetch(`https://api.peerfeedback.betbet.website/teams/${groupID}`);
            if (!response.ok) throw new Error('Failed to fetch teams');
            const data = await response.json();
            setTeams(data);
        } catch (error) {
            console.error('Error fetching teams:', error);
        }
    };

    const handleAddCreator = async () => {
        if (!creatorEmail.trim()) {
            alert("Please fill in all Creator fields");
            return;
        }

        try {
            const userResponse = await fetch(`https://api.peerfeedback.betbet.website/users/searchUser?email=${creatorEmail}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!userResponse.ok) throw new Error('Failed to search for user');

            const user = await userResponse.json();

            if (user) {

                const creatorRole = await fetch(`https://api.peerfeedback.betbet.website/users/setCreator/${groupID}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userID: user.UserID,
                        creatorPermissions: creatorPermissions,
                    }),
                });

                if (!creatorRole.ok) throw new Error('Failed to add creator to group');

                for (let i = 0; i < creatorRole.length; i++) {
                    // console.log(creatorRole[i])

                }

                const newCreator = createUser(user.FirstName, user.LastName, user.UserName, selectedTeam || null);
                // console.log("New Creator", newCreator)
                setCreators(prevCreators => [
                    ...prevCreators,
                    {
                        ...newCreator, email: creatorEmail, permissions: creatorPermissions, ID: user.UserID, userName: user.UserName
                    },
                ]);

                setCreatorEmail('');
                setCreatorPermissions({
                    canSeeResponses: true,
                    canViewGroup: true,
                    canEditForm: true,
                    canDeleteForm: true,
                });
            } else {
                alert("Creator not found. Please ensure the user is registered.");
            }
        } catch (error) {
            console.error("Error adding creator:", error);
            alert("An error occurred while adding the creator. Please try again.");
        }
    };

    const handleAddResponder = async () => {
        if (!responderEmail.trim() || !selectedTeam) {
            alert("Please fill in all Responder fields");
            return;
        }

        try {
            const responderRole = await fetch(`https://api.peerfeedback.betbet.website/users/searchUser?email=${responderEmail}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!responderRole.ok) throw new Error('Failed to search for user');

            const user = await responderRole.json();
            // console.log("User found from search:", user);

            if (user) {

                const selectedTeamEntry = teams.find(team => team.TeamID === selectedTeam);

                if (!selectedTeamEntry) {
                    console.error("Selected team not found in teams array:", selectedTeam);
                    alert("Selected team not found. Please try again.");
                    return;
                }

                // console.log("Adding user to team:", {
                // teamID: selectedTeamEntry.TeamID,
                //     teamName: selectedTeamEntry.TeamName,
                // });

                const response = await fetch(`https://api.peerfeedback.betbet.website/users/setResponder/${groupID}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        responderID: user.UserID,
                        teamID: selectedTeam,
                    }),
                });

                if (!response.ok) throw new Error('Failed to add responder to group');
                // console.log("Successfully sent request to add responder to team.");

                const newResponder = createUser(user.FirstName, user.LastName, responderEmail, selectedTeamEntry.TeamName);
                console.log("New Responder Object:", newResponder);

                setResponders(prevResponders => [
                    ...prevResponders,
                    { ...newResponder, email: responderEmail, ID: user.UserID, username: user.UserName }
                ]);

                // console.log("Updated responders list:", responders);

                setResponderEmail('');
                setSelectedTeam('');
            } else {
                alert("Responder not found. Please ensure the user is registered.");
            }
        } catch (error) {
            console.error("Error adding responder:", error);
            alert("An error occurred while adding the responder. Please try again.");
        }
    };

    const handleDeleteUser = async (userID, username, userType) => {
        // console.log("Deleting user:", userID, username, userType);
        try {
            const response = await fetch(`https://api.peerfeedback.betbet.website/users/deleteFromGroup/${groupID}/${userID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            // console.log("User deleted successfully.");

            // Update the appropriate list to remove the deleted user
            if (userType === 'Creator') {
                setCreators(prevCreators => prevCreators.filter(creator => creator.ID !== userID));
            } else if (userType === 'Responder') {
                setResponders(prevResponders => prevResponders.filter(responder => responder.ID !== userID));
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("An error occurred while deleting the user. Please try again.");
        }
    };

    const handlePermissionChange = (email, permissionKey) => {
        setCreators(prevCreators => {
            return prevCreators.map(creator => {
                if (creator.email === email) {
                    return {
                        ...creator,
                        permissions: {
                            ...creator.permissions,
                            [permissionKey]: !creator.permissions[permissionKey],
                        },
                    };
                }
                return creator;
            });
        });
    };

    return (
        <main className="create-users">
            <NavigationHeader />
            <h2 className='create-users__group-name-title'>Group: {groupName}</h2>

            <div className='create-users__user-roles'>
                <h4>Creators</h4>
                <div className='create-users__add-user-input-box'>
                    <TextField
                        label="Email"
                        variant="outlined"
                        value={creatorEmail}
                        onChange={(e) => setCreatorEmail(e.target.value)}
                        sx={{ '& > :not(style)': { m: 1, width: '45ch' } }}
                        className='custom-textfield'
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault(); // Prevent form submission
                                handleAddCreator(); // Save on Enter
                            }
                        }}
                    />
                    <IconButton
                        className='createGrpBttn'
                        icon={faPlus}
                        text="Add Creator"
                        onClick={handleAddCreator}
                    />
                </div>
                <AddUserTable
                    users={creators}
                    onDeleteUser={(userID, username) => handleDeleteUser(userID, username, 'Creator')}
                    onPermissionChange={handlePermissionChange}
                />
            </div>

            <div className='create-users__user-roles'>
                <h4>Responders</h4>
                <div className='create-users__add-user-input-box'>
                    <TextField
                        label="Email"
                        variant="outlined"
                        value={responderEmail}
                        onChange={(e) => setResponderEmail(e.target.value)}
                        sx={{ '& > :not(style)': { m: 1, width: '45ch' } }}
                        className='custom-textfield'
                    />
                    <TextField
                        select
                        label="Select Team"
                        value={selectedTeam}
                        onChange={(e) => { setSelectedTeam(e.target.value) }}
                        sx={{ '& > :not(style)': { m: 1, width: '30ch' } }}
                        className='custom-textfield'
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault(); // Prevent form submission
                                if (selectedTeam) {
                                    handleAddResponder(); // Proceed if a team is selected
                                } else {
                                    console.log("Please select a team.");
                                    // Optionally alert the user to select a team
                                }
                            }
                        }}
                    >
                        {teams.map((team) => (
                            <MenuItem key={team.TeamID} value={team.TeamID}>
                                {team.TeamName}
                            </MenuItem>
                        ))}
                    </TextField>
                    <IconButton
                        className='createGrpBttn'
                        icon={faPlus}
                        text="Add Responder"
                        onClick={handleAddResponder}
                    />
                </div>
                <AddUserTable
                    users={responders}
                    onDeleteUser={(userID, username) => handleDeleteUser(userID, username, 'Responder')}
                    showGroup={true}
                />
            </div>

            <div className='create-users__bottom-btn'>
                <IconButton
                    className='createGrpBttn'
                    icon={faArrowRight}
                    text="Creator Permissions"
                    onClick={() => navigate('/editgroup/editusers/editcreator/', { state: { groupID } })}
                />
            </div>
        </main>
    );
}

export default EditUsers;
