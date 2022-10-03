import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Colors } from '../themes/Colors';
import { BackgroundProps, CharacterProps, EquipmentProps, PowerProps, TeamProps } from '../types/models';
import RealmContext from './RealmContext';
import { BackgroundSchema } from '../realm/models';
import { DropdownItem } from '../types/types';

interface CrewCreatorContextProps {
  backgrounds: BackgroundProps[];
  powers: PowerProps[];
  equipment: EquipmentProps[];
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
  const { useRealm, useQuery } = RealmContext;
  const [backgrounds, setBackgrounds] = useState<BackgroundProps[]>([]);
  const [powers, setPowers] = useState<PowerProps[]>([]);
  const [currentTeam, setCurrentTeam] = useState<TeamProps>();
  const [equipment, setEquipment] = useState<EquipmentProps[]>([]);
  const realm = useRealm();

  useEffect(() => {
    getBackgrounds();
    getPowers();
    getCurrentTeam();
    getEquipment();
  }, []);

  const getBackgrounds = () => {
    const _backgrounds = realm.objects<BackgroundProps>('Background');
    if (!_backgrounds.isEmpty()) setBackgrounds(Array.from(_backgrounds));
  };
  const getPowers = () => {
    const _powers = realm.objects<PowerProps>('Power');
    // console.log(_powers, 'powers')
    setPowers(Array.from(_powers));
  }

  const getEquipment = () => {
    const _equipment = realm.objects<EquipmentProps>('Equipment');
    if (!_equipment.isEmpty()) setEquipment(Array.from(_equipment));
  }

  const getCurrentTeam = () => {
    const currentTeam = realm.objects<TeamProps>('Team')[0];
    setCurrentTeam(currentTeam);
  };

  const createCaptain = async (newCaptain: CharacterProps) => {
    realm.write(() => {
      newCaptain._id = new Realm.BSON.ObjectID();
      newCaptain.Level = 15;
      newCaptain.IsCaptain = true;
      newCaptain.GearSlots = 6;
      console.log(newCaptain.Background, 'background');

      if (currentTeam) {
        let team = getTeamById(currentTeam?._id.toHexString());
        console.log(team, 'currentTeam')
        if (team) {
          team.Captain = team && newCaptain;
          console.log(team, 'team');
          setCurrentTeam(team);
          // let x = {...currentTeam, };
          // console.log(x, currentTeam);
          // setCurrentTeam((x) => {
          //   let updated = { ...x };
          //   updated.Captain = newCaptain;
          //   return updated;
          // })
        }
      }
    });
  };


  const updateCaptain = (newCaptain: CharacterProps) => {

  };
  const updateEquipment = (selectedEquipment: EquipmentProps[], isCaptain: boolean) => {
    realm.write(() => {
      if (currentTeam) {
        let team: TeamProps | undefined = getTeamById(currentTeam?._id.toHexString());
        if (isCaptain && team) {
          team.Captain.Equipment = selectedEquipment;
        }

      }
    })
  }

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
        powers,
        equipment,
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
