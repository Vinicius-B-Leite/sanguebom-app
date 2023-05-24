import React from 'react';
import { View, FlatList } from 'react-native';
import { rhFactor } from '../../../utlis/rhFactor';
import RhFactorItem from '../../../components/rhFactorItem';


type Props = {
    rhFactorSelected: string,
    setRhFactorSelected: (rhF: string) => void
}
const SelectRhFactor: React.FC<Props> = ({ rhFactorSelected, setRhFactorSelected }) => {
    return (
        <View>
            <FlatList
                data={rhFactor}
                numColumns={2}
                style={{ alignItems: 'center' }}
                renderItem={({ item }) => (
                    <RhFactorItem
                        selected={item === rhFactorSelected}
                        rh={item}
                        onClick={setRhFactorSelected}
                    />
                )}
            />
        </View>
    )
}

export default SelectRhFactor;