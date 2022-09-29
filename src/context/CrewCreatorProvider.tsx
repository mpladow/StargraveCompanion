import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Colors} from '../themes/Colors';
import {BackgroundProps, CharacterProps, TeamProps} from '../types/models';
import RealmContext from './RealmContext';
import {BackgroundSchema} from '../realm/models';
import {DropdownItem} from '../types/types';

interface CrewCreatorContextProps {
  backgrounds: BackgroundProps[];
  createNewTeam: (name: string) => void;
  currentTeam: TeamProps | undefined;
  deleteTeam: () => void;
  updateTeamName: (name: string) => void;
  createCaptain: (newCapt: CharacterProps) => void;
}

export const CrewCreatorContext = createContext<CrewCreatorContextProps>(
  {} as CrewCreatorContextProps,
);
const CrewCreatorProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const {useRealm, useQuery} = RealmContext;
  const [backgrounds, setBackgrounds] = useState<BackgroundProps[]>([]);
  const [currentTeam, setCurrentTeam] = useState<TeamProps>();
  const realm = useRealm();

  useEffect(() => {
    getBackgrounds();
    getCurrentTeam();
  }, []);

  const getBackgrounds = () => {
    const _backgrounds = realm.objects<BackgroundProps>('Background');
    if (!_backgrounds.isEmpty()) setBackgrounds(Array.from(_backgrounds));
  };
  const getCurrentTeam = () => {
    const currentTeam = realm.objects<TeamProps>('Team')[0];
    setCurrentTeam(currentTeam);
  };

  const createCaptain = async (newCaptain: CharacterProps) => {
    realm.write(() => {
      newCaptain._id = new Realm.BSON.ObjectID();
      newCaptain.Level = 15;
      newCaptain.IsCaptain = true;

      if (currentTeam){
        let team = getTeamById(currentTeam?._id.toHexString());
        if (team){
          team.Captain = team && newCaptain;
        }
      }
    });
  };
  const updateCaptain = (newCaptain: CharacterProps) => {

  };

  // get data from realmdb
  // create a new team if no team exists
  // TODO find teams only by user

  const updateTeamName = (name: string) => {
    if (currentTeam) {
      let teamToUpdate = getTeamById(currentTeam?._id.toHexString());
      realm.write(() => {
        if (teamToUpdate) teamToUpdate.TeamName = name;
        console.log('team name updated');
      });
    }
  };
  const createNewTeam = (name: string) => {
    if (!name) {
      console.log('no team name');
      return false;
    }
    realm.write(() => {
      let _newTeam = {
        _id: new Realm.BSON.ObjectId(),
        TeamName: name,
        Credits: 400,
        Experience: 0,
        Description: '',
        SpecialistSlots: 4,
      };
      let newTeamTask = realm.create<TeamProps>('Team', _newTeam);
      console.log(
        `Created new team with ID of ${newTeamTask._id.toHexString()}`,
      );
      setCurrentTeam(newTeamTask);
    });
  };

  const deleteTeam = () => {
    realm.write(() => {
      // let teamToDelete = realm
      //   .objects<TeamProps>('Team')
      //   .find(x => x._id.toHexString() == currentTeam?._id.toHexString());
      if (currentTeam) {
        let teamToDelete = getTeamById(currentTeam?._id.toHexString());
        realm.delete(teamToDelete);
        teamToDelete = undefined;
        setCurrentTeam(undefined);
      }
    });
  };

  const getTeamById = (id: string) => {
    return realm
      .objects<TeamProps>('Team')
      .find(x => x._id.toHexString() == id);
  };

  return (
    <CrewCreatorContext.Provider
      value={{
        backgrounds,
        createNewTeam,
        currentTeam,
        deleteTeam,
        updateTeamName,
        createCaptain
      }}>
      {children}
    </CrewCreatorContext.Provider>
  );
};

export const useCrewCreator = () => {
  const context = useContext(CrewCreatorContext);
  if (!context) {
    throw new Error(
      'useCrewCreator must be used within the CrewCreatorContext',
    );
  }
  return context;
};

export default CrewCreatorProvider;

const styles = StyleSheet.create({});
