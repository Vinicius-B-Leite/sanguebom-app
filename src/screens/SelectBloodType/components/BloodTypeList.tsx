import React from 'react';
import { FlatList, View } from 'react-native';
import { useTheme } from 'styled-components/native';
import SelectBloodTypeItem from '../../../components/SelectBloodTypeItem';

import { bloodTypesWithouRh } from '../../../utlis/bloodTypesWithouRh';
import SelectRhFactor from './SelectRhFactor';

type Props = {
    bloodTypeSelected: string,
    rhFactorSelected: string,
    setBloodTypeSelected: (bloodType: string) => void
    setRhFactorSelected: (rhFactor: string) => void
}
const BloodTypeList: React.FC<Props> = ({ bloodTypeSelected, setBloodTypeSelected, setRhFactorSelected, rhFactorSelected }) => {

    const theme = useTheme()

    return (
        <View style={{ height: theme.vh * 0.4 }}>
            <FlatList
                data={bloodTypesWithouRh}
                contentContainerStyle={{ paddingTop: theme.vh * 0.05, justifyContent: 'center' }}
                numColumns={2}
                renderItem={({ item }) =>
                    <SelectBloodTypeItem
                        selected={item === bloodTypeSelected}
                        bloodType={item}
                        onClick={(bloodType) => setBloodTypeSelected(bloodType)}
                    />
                }
                ListFooterComponent={() =>
                    <SelectRhFactor
                        rhFactorSelected={rhFactorSelected}
                        setRhFactorSelected={setRhFactorSelected}
                    />
                }
            />
        </View>
    )
}

export default BloodTypeList;